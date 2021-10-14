import { Octokit } from "octokit";
import { PullRequest } from "./models/pullRequest";
import { Release } from "./models/release";

export abstract class Connector {
  protected _owner!: string;
  protected _repo!: string;
  protected _token!: string;
  protected _connection!: Octokit;

  constructor() {
    this._setRepositoryProperties();
  }

  abstract getLatestRelease(): Promise<Release>;
  abstract getPullRequests(since?: string): Promise<PullRequest[]>;
  abstract publishChanges(): void;

  protected abstract _setRepositoryProperties(): void;
}
