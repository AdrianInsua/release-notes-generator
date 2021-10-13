import { Parser } from "./parser";
import {
  graphql,
  GraphQlQueryResponseData,
} from "@octokit/graphql/dist-types/types";
import { gitHubConnection } from "../connections/github";
import { PullRequest } from "./models/pullRequest";
import {Release} from "./models/release";
import prQuery from "./queries/pull_requests.graphql";
import releaseQuery from './queries/latest_release.graphql';

interface Edge<T> {
  cursor: string;
  node: T;
}

export class GitHubParser extends Parser {
  protected _connection!: graphql;

  constructor() {
    super();
  }

  connect(): void {
    this._connection = gitHubConnection(this._token);
  }

  async getLatestRelease(): Promise<Release> {
    const query = releaseQuery.loc!.source.body;

    const data = (await this._connection(query, { owner: this._owner, name: this._repo })) as GraphQlQueryResponseData;

    return data.repository?.latestRelease;
  }

  async getPullRequests(since?: string): Promise<PullRequest[]> {
    const query = prQuery.loc!.source.body;
    const created = since ? `created:>${since}` : '';
    const queryString = `repo:${this._owner}/${this._repo} is:merged is:pr ${ created }`;
    console.log(queryString);
    const response: PullRequest[] = await this._paginatedResponse<PullRequest>(query, { queryString });

    return response;
  }

  protected _setRepositoryProperties(): void {
    const token = process.env.TOKEN!;
    const repository = process.env.GITHUB_REPOSITORY;
    const [owner, repo] = repository?.split("/") || [];

    this._owner = owner;
    this._repo = repo;
    this._token = token;
  }

  private async _paginatedResponse<T>(query: string, params: Record<string, unknown>, response: T[] = []): Promise<T[]> {
      const data = (await this._connection(query, params)) as GraphQlQueryResponseData;
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
}
