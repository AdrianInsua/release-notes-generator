import { Connector } from 'connector/connector';
import { PullRequest } from 'connector/models/pullRequest';
import { Release } from 'connector/models/release';
import { Configuration } from 'configuration/configuration';
import { CliParams } from 'commander/options';
import { format } from 'date-fns';
import log4js from 'log4js';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

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
        this._setFilePath();
    }

    async generateReleaseNotes(): Promise<void> {
        const list = await this._getPullRequestList();
        const markdown = this._parsePullRequests(list);

        this._storeMarkdown(markdown);
    }

    async publishReleaseNotes(): Promise<void> {
        if (this._configuration.publish) {
            let willPublish = true;
            if (this._interactive) {
                const { response } = await inquirer.prompt([
                    {
                        name: 'response',
                        type: 'confirm',
                        message: 'Do you want to publish your RELEASE-NOTES?',
                    },
                ]);

                willPublish = response;
            }
            willPublish && (await this._connector.publishChanges(this._filePath));
        }
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
        this._verbose && logger.info('Getting Repo data...');

        const latestRelease: Release = await this._connector.getLatestRelease();
        const pullRequestsList: PullRequest[] = await this._connector.getPullRequests(latestRelease?.createdAt);

        this._verbose && logger.info(`We've found ${pullRequestsList.length} pull requests to parse!`);

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
        this._verbose && logger.info(`Saving generated MD in ${this._filePath}`);

        fs.writeFileSync(path.join(this._filePath), markdown);
    }

    protected abstract _parsePullRequests(pullRequests: PullRequest[]): string;
}
