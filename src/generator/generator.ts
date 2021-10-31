import { Connector } from 'connector/connector';
import { PullRequest } from 'connector/models/pullRequest';
import { Release } from 'connector/models/release';
import { Configuration } from 'configuration/configuration';
import { CliParams } from 'commander/options';
import { confirmPublish, confirmPublishAssets, confirmPublishPreview, confirmPullRequestLabeling } from 'commander/inquirer';
import log4js from 'log4js';
import fs from 'fs';
import path from 'path';

const logger = log4js.getLogger('GENERATOR');

export abstract class Generator {
    protected _connector!: Connector;
    protected _prList!: PullRequest[];
    protected _configuration!: Configuration;
    protected _filePath!: string;
    protected _verbose: boolean;
    protected _interactive: boolean;

    constructor(connector: Connector, configuration: Configuration, cliParams: CliParams) {
        this._connector = connector;
        this._configuration = configuration;
        this._verbose = cliParams.verbose!;
        this._interactive = cliParams.interactive!;
    }

    async generateReleaseNotes(): Promise<void> {
        const list = await this._getPullRequestList();

        if (list.length) {
            const markdown = this._parsePullRequests(list);

            await this._labelPullRequests(list);

            this._storeMarkdown(markdown);
        }
    }

    async publishPreview(): Promise<void> {
        if (this._configuration.preview?.issue) {
            const issue = this._configuration.preview?.issue;
            const willPublish = !this._interactive || (await confirmPublishPreview(issue));
            willPublish && (await this._connector.publishPreview(this._filePath, issue));
        }
    }

    async publishReleaseNotes(): Promise<void> {
        if (this._configuration.publish) {
            const willPublish = !this._interactive || (await confirmPublish());
            willPublish && (await this._connector.publishChanges(this._filePath));
        }
    }

    async publishAssets(): Promise<void> {
        const { publish, assets } = this._configuration;

        if (publish && assets?.length) {
            const willPublish = !this._interactive || (await confirmPublishAssets());

            willPublish && (await this._connector.publishAssets(assets));
        }
    }

    protected _setFilePath(): void {
        const { out, name, split, suffix } = this._configuration;
        const outDir = split ? `${out}/release-notes` : out;
        const fileName = split ? `${name}-${suffix}` : name;

        if (!fs.existsSync(outDir!)) {
            fs.mkdirSync(outDir!);
        }

        this._filePath = `${outDir}/${fileName}.md`;
    }

    protected async _getPullRequestList(): Promise<PullRequest[]> {
        this._verbose && logger.info('Getting Repo data...');

        const latestRelease: Release[] = await this._connector.getLatestRelease();
        const pullRequestsList: PullRequest[] = await this._connector.getPullRequests(latestRelease?.[0]?.createdAt);
        this._configuration.suffix = this._configuration.snapshot ? `${Date.now()}` : latestRelease.slice(-1)[0].tagName;
        this._setFilePath();

        this._verbose && logger.info(`We've found ${pullRequestsList.length} pull requests to parse!`);

        return pullRequestsList;
    }

    protected async _labelPullRequests(pullRequests: PullRequest[]): Promise<void> {
        const willPublish = !this._configuration.snapshot && (!this._interactive || (await confirmPullRequestLabeling()));

        willPublish && (await Promise.all(pullRequests.map(this._connector.updatePullRequest)));
    }

    protected _loadMarkdown(): string {
        try {
            const file = fs.readFileSync(path.join(this._filePath), 'utf8');
            const title = `# ${this._configuration.title}`;

            return file.toString().replace(title, '');
        } catch (_) {
            return '';
        }
    }

    protected _storeMarkdown(markdown: string): void {
        if (!this._configuration.snapshot) {
            this._verbose && logger.info(`Saving generated MD in ${this._filePath}`);

            fs.writeFileSync(path.join(this._filePath), markdown);
        }
    }

    protected abstract _parsePullRequests(pullRequests: PullRequest[]): string;
}
