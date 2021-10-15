import { Connector } from 'connector/connector';
import { PullRequest } from 'connector/models/pullRequest';
import { Release } from 'connector/models/release';
import { Configuration } from 'configuration/configuration';
import fs from 'fs';
import path from 'path';

export abstract class Generator {
    protected _parser!: Connector;
    protected _prList!: PullRequest[];
    protected _configuarion!: Configuration;

    constructor(parser: Connector, configuration: Configuration) {
        this._parser = parser;
        this._configuarion = configuration;
    }

    async generateReleaseNotes(): Promise<void> {
        const list = await this._getPullRequestList();
        const markdown = this._parsePullRequests(list);

        this._storeMarkdown(markdown);
        this._publishReleaseNotes();
    }

    protected async _getPullRequestList(): Promise<PullRequest[]> {
        const latestRelease: Release = await this._parser.getLatestRelease();
        const pullRequestsList: PullRequest[] = await this._parser.getPullRequests(latestRelease.createdAt);

        return pullRequestsList;
    }

    protected _loadMarkdown(): string {
        const file = fs.readFileSync(path.join(`${this._configuarion.out}/${this._configuarion.name}.md`), 'utf8');

        return file.toString();
    }

    protected _storeMarkdown(markdown: string): void {
        fs.writeFileSync(path.join(`${this._configuarion.out}/${this._configuarion.name}.md`), markdown);
    }

    protected _publishReleaseNotes(): void {
        if (this._configuarion.commit) {
            this._parser.publishChanges();
        }
    }

    protected abstract _parsePullRequests(pullRequests: PullRequest[]): string;
}
