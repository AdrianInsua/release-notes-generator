import { Connector } from "connector/connector";
import { PullRequest } from "connector/models/pullRequest";
import { Release } from "connector/models/release";

export abstract class Generator {
  protected _parser!: Connector;
  protected _prList!: PullRequest[];

  constructor(parser: Connector) {
    this._parser = parser;
  }

  async generateReleaseNotes(): Promise<void> {
    const list = await this._getPullRequestList();
    const markdown = await this._parsePullRequests(list);

    this._storeMarkdown(markdown);
    this._publishReleaseNotes();
  }

  protected async _getPullRequestList(): Promise<PullRequest[]> {
    const latestRelease: Release = await this._parser.getLatestRelease();
    const pullRequestsList: PullRequest[] = await this._parser.getPullRequests(
      latestRelease.createdAt
    );

    return pullRequestsList;
  }

  protected abstract _parsePullRequests(
    pullRequests: PullRequest[]
  ): Promise<string>;
  protected abstract _loadMarkdown(): Promise<string>;
  protected abstract _storeMarkdown(markdown: string): void;
  protected abstract _publishReleaseNotes(): void;
}
