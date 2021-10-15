import { Connector } from './connector';
import { Octokit } from 'octokit';
import { Configuration } from 'configuration/configuration';
import { GraphQlQueryResponseData } from '@octokit/graphql/dist-types/types';
import { LabelNode, PullRequest, PullRequestResponse } from './models/pullRequest';
import { Release } from './models/release';
import { gitHubConnection } from './../connections/github';
import prQuery from './queries/pull_requests.graphql';
import releaseQuery from './queries/latest_release.graphql';
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

export class GitHubConnector extends Connector {
    protected _connection!: Octokit;

    constructor(configuration: Configuration) {
        super(configuration);

        this._connection = gitHubConnection(this._token);
    }

    async getLatestRelease(): Promise<Release> {
        const query = releaseQuery.loc!.source.body;

        const data = (await this._connection.graphql(query, {
            owner: this._owner,
            name: this._repo,
        })) as GraphQlQueryResponseData;

        return data.repository?.latestRelease;
    }

    async getPullRequests(since?: string): Promise<PullRequest[]> {
        const labels = this._getLabelFilter();
        const query = prQuery.loc!.source.body;
        const created = since ? `created:>${since}` : '';
        const queryString = `repo:${this._owner}/${this._repo} is:open is:pr ${labels} ${created}`;
        const response: PullRequestResponse[] = await this._paginatedResponse<PullRequestResponse>(query, { queryString });

        return response.map(this._parsePullRequest);
    }

    async publishChanges(file: string): Promise<void> {
        const filePath = file.replace('./', '');
        const sha = await this._getSha(filePath);

        await this._publishCommit(filePath, sha);
    }

    protected _setRepositoryProperties(): void {
        const { token: configToken } = this._configuration;
        const token = process.env[configToken!]!;
        const repository = process.env.GITHUB_REPOSITORY;
        const [owner, repo] = repository?.split('/') || [];

        this._token = token;
        this._owner = owner;
        this._repo = repo;
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

    private async _getSha(path: string): Promise<string | undefined> {
        try {
            const result = (await this._connection.rest.repos.getContent({
                owner: this._owner,
                repo: this._repo,
                path,
            })) as ShaResponse;

            const sha = result.data?.sha;

            return sha;
        } catch (_) {
            return undefined;
        }
    }

    private async _publishCommit(filePath: string, sha?: string): Promise<number> {
        const content = fs.readFileSync(path.join(filePath), { encoding: 'base64' });
        const result = await this._connection.rest.repos.createOrUpdateFileContents({
            owner: this._owner,
            repo: this._repo,
            path: filePath,
            message: this._configuration.message!,
            content,
            sha,
        });

        return result.status;
    }
}
