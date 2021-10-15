import { Connector } from 'connector/connector';
import { PullRequest } from 'connector/models/pullRequest';
import { Release } from 'connector/models/release';
import { Configuration } from 'configuration/configuration';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';

export abstract class Generator {
    protected _connector!: Connector;
    protected _prList!: PullRequest[];
    protected _configuration!: Configuration;
    protected _filePath!: string;

    constructor(connector: Connector, configuration: Configuration) {
        this._connector = connector;
        this._configuration = configuration;
        this._setFilePath();
    }

    async generateReleaseNotes(): Promise<void> {
        const list = await this._getPullRequestList();
        const markdown = this._parsePullRequests(list);

        this._storeMarkdown(markdown);
        await this._publishReleaseNotes();
    }

    protected _setFilePath(): void {
        const { out, name, split } = this._configuration;
        const outDir = split ? `${out}/release-notes` : out;
        const fileName = split ? `${name}-${format(new Date(), 'yyyy-MM-ddHHmmss')}` : name;

        if (!fs.existsSync(outDir!)) {
            fs.mkdirSync(outDir!);
        }

        this._filePath = `${outDir}/${fileName}.md`;
    }

    protected async _getPullRequestList(): Promise<PullRequest[]> {
        const latestRelease: Release = await this._connector.getLatestRelease();
        const pullRequestsList: PullRequest[] = await this._connector.getPullRequests(latestRelease.createdAt);

        return pullRequestsList;
    }

    protected _loadMarkdown(): string {
        try {
            const file = fs.readFileSync(path.join(this._filePath), 'utf8');
            const title = `# ${this._configuration.title}\n`;

            return file.toString().replace(title, '');
        } catch (_) {
            return '';
        }
    }

    protected _storeMarkdown(markdown: string): void {
        fs.writeFileSync(path.join(this._filePath), markdown);
    }

    protected async _publishReleaseNotes(): Promise<void> {
        if (this._configuration.commit) {
            await this._connector.publishChanges(this._filePath);
        }
    }

    protected abstract _parsePullRequests(pullRequests: PullRequest[]): string;
}
