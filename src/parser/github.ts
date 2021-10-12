import { Octokit } from "octokit";
import { Parser } from "./parser";
import { gitHubConnection } from "../connections/github";

export class GitHubParser extends Parser {
  protected _connection: Octokit;

  constructor(owner: string, repo: string, token: string) {
    super(owner, repo, token);
    this._connection = gitHubConnection(token);
  }

  getPullRequests(): Promise<any> {
    return this._connection.rest.pulls.list({
      owner: this._owner,
      repo: this._repo,
    });
  }
}
