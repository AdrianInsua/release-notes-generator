import { Connector } from './connector';
import { Octokit } from 'octokit';
import { Configuration } from 'configuration/configuration';
import { GraphQlQueryResponseData } from '@octokit/graphql/dist-types/types';
import { LabelNode, PullRequest, PullRequestResponse } from './models/pullRequest';
import { Release } from './models/release';
import { gitHubConnection } from 'connections/github';
import { CliParams } from 'commander/options';
import { exec } from 'child_process';
import prQuery from './queries/pull_requests.graphql';
import releaseQuery from './queries/latest_release.graphql';
import log4js from 'log4js';

interface Edge<T> {
    cursor: string;
    node: T;
}

interface ShaResponse {
    data: {
        [key: string]: unknown;
        sha: string;
    };
}

const logger = log4js.getLogger('CONNECTOR');

export class GitHubConnector extends Connector {
    protected _connection!: Octokit;

    constructor(configuration: Configuration, cliParams: CliParams) {
        super(configuration, cliParams);
        this._defaultOptions = {
            token: 'GITHUB_TOKEN',
            repo: 'GITHUB_REPOSITORY',
        };
    }

    async connect(): Promise<void> {
        await super.connect();

        this._connection = gitHubConnection(this._token);
    }

    async getLatestRelease(): Promise<Release> {
        this._verbose && logger.info('Getting latest release...');

        const query = releaseQuery.loc!.source.body;

        const data = (await this._connection.graphql(query, {
            owner: this._owner,
            name: this._repo,
        })) as GraphQlQueryResponseData;

        const latestRelease: Release = data.repository?.latestRelease;

        this._verbose && logger.info(`Latest release date is ${latestRelease?.createdAt}`);

        return latestRelease;
    }

    async getPullRequests(since?: string): Promise<PullRequest[]> {
        this._verbose && logger.info(`Fetching pull requests since ${since}...`);

        const labels = this._getLabelFilter();
        const query = prQuery.loc!.source.body;
        const created = since ? `created:>${since}` : '';
        const queryString = `repo:${this._owner}/${this._repo} is:closed is:pr ${labels} ${created}`;
        const response: PullRequestResponse[] = await this._paginatedResponse<PullRequestResponse>(query, { queryString });

        return response.map(this._parsePullRequest);
    }

    async publishChanges(file: string): Promise<void> {
        const filePath = file.replace('./', '');

        await this._publishCommit(filePath);
    }

    protected _setRepoData(repository: string): void {
        super._setRepoData(repository || process.env.GITHUB_REPOSITORY!);
    }

    private _getLabelFilter(): string {
        return this._configuration.labels?.map((value: string) => `label:${value}`).join(' ') || '';
    }

    private _parsePullRequest(pr: PullRequestResponse): PullRequest {
        const { nodes } = pr.labels;

        return { ...pr, labels: nodes.map((node: LabelNode) => node.name) };
    }

    private async _paginatedResponse<T>(query: string, params: Record<string, unknown>, response: T[] = []): Promise<T[]> {
        const data = (await this._connection.graphql(query, params)) as GraphQlQueryResponseData;
        const edges = data.search?.edges;

        edges?.forEach((edge: Edge<T>) => {
            params.cursor = edge.cursor;
            response.push(edge.node);
        });

        if (!edges?.length) {
            return response;
        }

        return this._paginatedResponse<T>(query, params, response);
    }

    private _publishCommit(filePath: string): number {
        this._verbose && logger.info('We are going to commit changes...');

        exec(`git add ${filePath} && git commit -m "${this._configuration.message}" --no-verify && git push && git pull`, error => {
            logger.error(error);
            return 0;
        });

        return 200;
    }
}
