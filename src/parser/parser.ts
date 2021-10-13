import { graphql } from "@octokit/graphql/dist-types/types";
import { PullRequest } from "./models/pullRequest";

export abstract class Parser {
  protected _owner!: string;
  protected _repo!: string;
  protected _token!: string;
  protected _connection!: graphql;

  constructor() {
    this._setRepositoryProperties();
  }

  abstract connect(): void;
  abstract getPullRequests(): Promise<PullRequest[]>;

  protected abstract _setRepositoryProperties(): void;
}
