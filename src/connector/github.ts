import { Connector } from './connector';
import { Octokit } from 'octokit';
import { Configuration } from 'configuration/configuration';
import { GraphQlQueryResponseData } from '@octokit/graphql/dist-types/types';
import { LabelNode, PullRequest, PullRequestResponse } from './models/pullRequest';
import { Release, ReleaseNode } from './models/release';
import { gitHubConnection } from 'connections/github';
import { CliParams } from 'commander/options';
import prQuery from './queries/pull_requests.graphql';
import releaseQuery from './queries/latest_release.graphql';
import lastNReleasesQuery from './queries/last_n_releases.graphql';
import log4js from 'log4js';
import fs from 'fs';
import path from 'path';

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

    async getLatestRelease(): Promise<Release[]> {
        if (this._configuration.since) {
            return [{ createdAt: this._configuration.since, tagName: 'mock' }];
        }

        if (this._configuration.snapshot) {
            return await this._getSnapshotRelease();
        } else {
            return await this._getLatestNReleases();
        }
    }

    async getPullRequests(since?: string): Promise<PullRequest[]> {
        this._verbose && logger.info(`Fetching pull requests since ${since}...`);

        const labels = this._getLabelFilter();
        const query = prQuery.loc!.source.body;
        const created = since ? `created:>${since}` : '';
        const queryString = `repo:${this._owner}/${this._repo} ${this._configuration.filter} is:pr ${labels} ${created}`;
        const response: PullRequestResponse[] = await this._paginatedResponse<PullRequestResponse>(query, { queryString });

        return response.map(this._parsePullRequest);
    }

    updatePullRequest = async (pullRequest: PullRequest): Promise<void> => {
        this._verbose && logger.info(`Labeling pull request ${pullRequest.number} with in-release-note`);

        await this._connection.rest.issues.addLabels({
            owner: this._owner,
            repo: this._repo,
            issue_number: pullRequest.number,
            labels: this._configuration.labels?.end,
        });
    };

    async publishPreview(file: string, issue: number): Promise<void> {
        const filePath = file.replace('./', '');

        await this._publishComment(filePath, issue);
    }

    async publishChanges(file: string, message?: string): Promise<void> {
        const filePath = file.replace('./', '');
        const sha = await this._getSha(filePath);

        await this._publishCommit(filePath, sha, message);
    }

    async publishAssets(files: string[]): Promise<void> {
        await Promise.all(files.map(file => this.publishChanges(file, 'chore: asset file upload [skip ci]')));
    }

    async renderMarkdown(data: string): Promise<string> {
        const markdown = await this._connection.rest.markdown.renderRaw({ data });

        return markdown.data;
    }

    protected _setRepoData(repository: string): void {
        super._setRepoData(repository || process.env.GITHUB_REPOSITORY!);
    }

    private async _getLatestNReleases(): Promise<Release[]> {
        this._verbose && logger.info(`Getting latest 2 releases...`);

        const query = lastNReleasesQuery.loc!.source.body;

        const data = (await this._connection.graphql(query, {
            owner: this._owner,
            name: this._repo,
            last: 2,
        })) as GraphQlQueryResponseData;

        const releases: ReleaseNode = data.repository?.releases;

        this._verbose && logger.info(`We've found ${releases.nodes.length} releases!`);

        const latestRelease: Release = releases.nodes[0];

        this._verbose && logger.info(`Latest release ${latestRelease?.tagName} date is ${latestRelease?.createdAt}`);

        return releases.nodes;
    }

    private async _getSnapshotRelease(): Promise<Release[]> {
        this._verbose && logger.info('Getting latest release...');

        const query = releaseQuery.loc!.source.body;

        const data = (await this._connection.graphql(query, {
            owner: this._owner,
            name: this._repo,
        })) as GraphQlQueryResponseData;

        const latestRelease: Release = data.repository?.latestRelease;

        this._verbose && logger.info(`Latest release ${latestRelease?.tagName} date is ${latestRelease?.createdAt}`);

        return [latestRelease];
    }

    private _getLabelFilter(): string {
        const { labels: { include, ignore } = {} } = this._configuration;

        const labelFilter = include?.map((value: string) => `label:${value}`).join(' ') || '';
        const ignoredLabelsFilter = ignore?.map((value: string) => `-label:${value}`).join(' ') || '';

        return `${labelFilter} ${ignoredLabelsFilter}`;
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

    private async _getSha(filePath: string): Promise<string | undefined> {
        try {
            const result = (await this._connection.rest.repos.getContent({
                owner: this._owner,
                repo: this._repo,
                path: filePath,
                ref: this._configuration.branch!,
            })) as ShaResponse;

            const sha = result.data?.sha;

            return sha;
        } catch (_) {
            return undefined;
        }
    }

    private async _publishCommit(filePath: string, sha?: string, message: string = this._configuration.message!): Promise<number> {
        this._verbose && logger.info('We are going to commit changes...');

        const { branch } = this._configuration;
        const content = fs.readFileSync(path.join(filePath), { encoding: 'base64' });
        const result = await this._connection.rest.repos.createOrUpdateFileContents({
            owner: this._owner,
            repo: this._repo,
            path: filePath,
            message,
            content,
            sha,
            branch,
        });

        return result.status;
    }

    private async _publishComment(filePath: string, issue_number: number): Promise<number> {
        this._verbose && logger.info(`We are going to comment issue ${issue_number} changes...`);

        const content = fs.readFileSync(path.join(filePath), { encoding: 'utf8' });
        const { header, footer } = this._configuration.preview!;
        const body = `${header}\n${content}\n${footer}`;

        const result = await this._connection.rest.issues.createComment({
            owner: this._owner,
            repo: this._repo,
            issue_number,
            body,
        });

        return result.status;
    }
}
