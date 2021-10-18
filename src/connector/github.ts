import { Connector } from './connector';
import { Octokit } from 'octokit';
import { Configuration } from 'configuration/configuration';
import { GraphQlQueryResponseData } from '@octokit/graphql/dist-types/types';
import { LabelNode, PullRequest, PullRequestResponse } from './models/pullRequest';
import { Release } from './models/release';
import { gitHubConnection } from 'connections/github';
import { CliParams } from 'commander/options';
import prQuery from './queries/pull_requests.graphql';
import releaseQuery from './queries/latest_release.graphql';
import log4js from 'log4js';
import fs from 'fs';

interface RepoData {
    repo: string;
    owner: string;
}

interface Edge<T> {
    cursor: string;
    node: T;
}

interface Sha {
    sha?: string;
    content?: string;
}

interface TreeNode extends Sha {
    path: string;
    mode: '100644' | '100755' | '040000' | '160000' | '120000' | undefined;
}

interface ShaResponseData extends Sha {
    [key: string]: unknown;
}

interface ShaResponse {
    data: ShaResponseData;
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

    updatePullRequest = async (pullRequest: PullRequest): Promise<void> => {
        this._verbose && logger.info(`Labeling pull request ${pullRequest.number} with in-release-note`);

        await this._connection.rest.issues.addLabels({
            owner: this._owner,
            repo: this._repo,
            issue_number: pullRequest.number,
            labels: ['in-release-note'],
        });
    };

    async publishAssets(files: string[], message = 'chore: asset file upload [skip ci]'): Promise<void> {
        const { branch, gpgKey } = this._configuration;
        const ref = `heads/${branch}`;
        const tree: TreeNode[] = await Promise.all(files.map(this._createTreeNode));
        const repoData = { repo: this._repo, owner: this._owner };
        const gitHubRef = await this._getRef(repoData, ref);
        console.log(gpgKey);
        const gitHubTree = await this._getTree(repoData, tree, gitHubRef);
        const commit = await this._createCommit(repoData, message, gpgKey!, gitHubTree, gitHubRef);

        await this._updateRef(repoData, ref, commit);
    }

    async publishChanges(file: string, message?: string): Promise<void> {
        await this.publishAssets([file], message);
    }

    async renderMarkdown(data: string): Promise<string> {
        const markdown = await this._connection.rest.markdown.renderRaw({ data });

        return markdown.data;
    }

    protected _setRepoData(repository: string): void {
        super._setRepoData(repository || process.env.GITHUB_REPOSITORY!);
    }

    private _getLabelFilter(): string {
        const { labels, ignoredLabels } = this._configuration;

        const labelFilter = labels?.map((value: string) => `label:${value}`).join(' ') || '';
        const ignoredLabelsFilter = ignoredLabels?.map((value: string) => `-label:${value}`).join(' ') || '';

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

    private async _getSha(filePath: string): Promise<Sha> {
        try {
            const content = fs.readFileSync(filePath, { encoding: 'base64' });
            const result = (await this._connection.rest.git.createBlob({
                owner: this._owner,
                repo: this._repo,
                content,
            })) as ShaResponse;

            const sha = result.data?.sha;

            return { sha, content };
        } catch (_) {
            return { sha: undefined };
        }
    }

    private _createTreeNode = async (path: string): Promise<TreeNode> => {
        const { content } = await this._getSha(path);
        const mode = '100644' as const;

        return { content, path, mode };
    };

    async _getRef(repoData: RepoData, ref: string): Promise<string> {
        const githubRef = await this._connection.rest.git.getRef({ ...repoData, ref });

        return githubRef.data.object.sha;
    }

    async _getTree(repoData: RepoData, tree: TreeNode[], base_tree: string): Promise<string> {
        const gitHubTree = await this._connection.rest.git.createTree({
            ...repoData,
            type: 'blob' as const,
            tree,
            base_tree,
        });

        return gitHubTree.data.sha;
    }

    async _createCommit(repoData: RepoData, message: string, signature: string, tree: string, parents: string): Promise<string> {
        signature = signature.split('\n').join('\\n');
        console.log(signature);
        const commit = await this._connection.rest.git.createCommit({
            ...repoData,
            message,
            tree,
            signature,
            verfied: true,
            parents: [parents],
        });

        return commit.data.sha;
    }

    async _updateRef(repoData: RepoData, ref: string, sha: string): Promise<void> {
        await this._connection.rest.git.updateRef({
            ...repoData,
            ref,
            sha,
        });
    }
}
