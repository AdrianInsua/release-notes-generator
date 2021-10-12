import { Octokit } from "octokit";
import { gitHubConnection } from "../connections/github";

export class GitHubParser {
  private _owner: string;
  private _repo: string;
  private _connection: Octokit;

  constructor(owner: string, repo: string, token: string) {
    this._owner = owner;
    this._repo = repo;
    this._connection = gitHubConnection(token);
  }

  getPullRequests(): Promise<any> {
    return this._connection.rest.pulls.list({
      owner: this._owner,
      repo: this._repo,
    });
  }
}

export const getPullRequests = async (
  connection: Octokit,
  owner: string,
  repo: string
) => {
  await connection.rest.pulls.list({ owner, repo });
};
