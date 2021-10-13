import { Octokit } from "octokit";

export abstract class Parser {
  protected _owner!: string;
  protected _repo!: string;
  protected _token!: string;
  protected _connection: Octokit | any;

  constructor() {
    this._setRepositoryProperties();
  }

  abstract connect(): void;
  abstract getPullRequests(): Promise<any[]>;

  protected abstract _setRepositoryProperties(): void;
}
