import { Connector } from "./connector";
import { Octokit } from "octokit";
import {
  graphql,
  GraphQlQueryResponseData,
} from "@octokit/graphql/dist-types/types";
import { PullRequest } from "./models/pullRequest";
import { Release } from "./models/release";
import {
  converToGraphQlConnection,
  gitHubConnection,
} from "./../connections/github";
import prQuery from "./queries/pull_requests.graphql";
import releaseQuery from "./queries/latest_release.graphql";

interface Edge<T> {
  cursor: string;
  node: T;
}

export class GitHubConnector extends Connector {
  protected _connection!: Octokit;
  protected _graphQl!: graphql;

  constructor() {
    super();
    this._connection = gitHubConnection(this._token);
    this._graphQl = converToGraphQlConnection(this._connection);
  }

  async getLatestRelease(): Promise<Release> {
    const query = releaseQuery.loc!.source.body;

    const data = (await this._graphQl(query, {
      owner: this._owner,
      name: this._repo,
    })) as GraphQlQueryResponseData;

    return data.repository?.latestRelease;
  }

  async getPullRequests(since?: string): Promise<PullRequest[]> {
    const query = prQuery.loc!.source.body;
    const created = since ? `created:>${since}` : "";
    const queryString = `repo:${this._owner}/${this._repo} is:open is:pr ${created}`;
    const response: PullRequest[] = await this._paginatedResponse<PullRequest>(
      query,
      { queryString }
    );

    return response;
  }

  publishChanges(): void {
    console.log("not implemented yet!");
  }

  protected _setRepositoryProperties(): void {
    const token = process.env.TOKEN!;
    const repository = process.env.GITHUB_REPOSITORY;
    const [owner, repo] = repository?.split("/") || [];

    this._token = token;
    this._owner = owner;
    this._repo = repo;
  }

  private async _paginatedResponse<T>(
    query: string,
    params: Record<string, unknown>,
    response: T[] = []
  ): Promise<T[]> {
    const data = (await this._graphQl(
      query,
      params
    )) as GraphQlQueryResponseData;
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
