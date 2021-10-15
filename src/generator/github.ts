import { GitHubConnector } from 'connector/github';
import { PullRequest } from 'connector/models/pullRequest';
import { Configuration } from 'configuration/configuration';
import { Generator } from './generator';
import { promises as fs } from 'fs';
import path from 'path';

const composeText = (pr: PullRequest) => `### ${pr.title} \n##### ${pr.createdAt}\n\n${pr.body}\n`;

export class GithubGenerator extends Generator {
    constructor(parser: GitHubConnector, configuration: Configuration) {
        super(parser, configuration);
    }

    protected async _parsePullRequests(pullRequests: PullRequest[]): Promise<string> {
        const oldFile = await this._loadMarkdown();
        const notes = pullRequests.map(composeText);
        const markdown = [`# RELEASE NOTES\n `, ...notes, oldFile].join('\n');

        return markdown;
    }

    protected async _loadMarkdown(): Promise<string> {
        const file = await fs.readFile(path.join('./RELEASE-NOTES.md'));

        return file.toString();
    }

    protected _storeMarkdown(markdown: string): void {
        fs.writeFile(path.join('./RELEASE-NOTES.md'), markdown);
    }

    protected _publishReleaseNotes(): void {
        this._parser.publishChanges();
    }
}
