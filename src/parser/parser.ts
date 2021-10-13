import { graphql } from "@octokit/graphql/dist-types/types";
import { PullRequest } from "./models/pullRequest";
import { Release } from "./models/release";

export abstract class Parser {
  protected _owner!: string;
  protected _repo!: string;
  protected _token!: string;
  protected _connection!: graphql;

  constructor() {
    this._setRepositoryProperties();
  }

  abstract connect(): void;
  abstract getLatestRelease(): Promise<Release>;
  abstract getPullRequests(since?: string): Promise<PullRequest[]>;

  protected abstract _setRepositoryProperties(): void;
}
