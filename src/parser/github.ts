import { Parser } from "./parser";
import {
  graphql,
  GraphQlQueryResponseData,
} from "@octokit/graphql/dist-types/types";
import { gitHubConnection } from "../connections/github";
import prQuery from "./queries/pull_requests.graphql";

interface PullRequest {
  title: string;
  bodyText: string;
  createdAt: string;
}

interface Edge {
  cursor: string;
  node: PullRequest;
}

export class GitHubParser extends Parser {
  protected _connection!: graphql;

  constructor() {
    super();
  }

  connect() {
    this._connection = gitHubConnection(this._token);
  }

  async getPullRequests(): Promise<any[]> {
    let cursor = null;
    const response: any[] = [];
    const query = prQuery.loc!.source.body;
    const queryString = `repo:${this._owner}/${this._repo} is:merged is:pr`;

    do {
      const data = (await this._connection(query, {
        queryString,
        cursor,
      })) as GraphQlQueryResponseData;
      const edges = data.search?.edges;

      cursor = null;

      edges.forEach((edge: Edge) => {
        cursor = edge.cursor;
        response.push(edge.node);
      });
    } while (cursor);

    return response;
  }

  protected _setRepositoryProperties() {
    const token = process.env.TOKEN!;
    const repository = process.env.GITHUB_REPOSITORY;
    const [owner, repo] = repository?.split("/") || [];

    this._owner = owner;
    this._repo = repo;
    this._token = token;
  }
}
