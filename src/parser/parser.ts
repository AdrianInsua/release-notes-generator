import { Octokit } from "octokit";

export abstract class Parser {
  protected _owner: string;
  protected _repo: string;
  protected _token: string;
  protected _connection: Octokit | any;

  constructor(owner: string, repo: string, token: string) {
    this._owner = owner;
    this._repo = repo;
    this._token = token;
  }

  abstract getPullRequests(): Promise<any>;
}
