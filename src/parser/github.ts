import { Octokit } from "octokit";
import { Parser } from "./parser";
import { gitHubConnection } from "../connections/github";

export class GitHubParser extends Parser {
  protected _connection!: Octokit;

  constructor() {
    super();
  }

  connect() {
    this._connection = gitHubConnection(this._token);
  }

  getPullRequests(): Promise<any> {
    return this._connection.rest.pulls.list({
      owner: this._owner,
      repo: this._repo,
      state: "closed",
    });
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
