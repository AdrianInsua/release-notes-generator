import { GitHubConnector } from 'connector/github';
import { PullRequest } from 'connector/models/pullRequest';
import { Configuration } from 'configuration/configuration';
import { Generator } from './generator';

const composeText = (pr: PullRequest) => `### ${pr.title} \n##### ${pr.createdAt}\n\n${pr.body}\n`;

export class GithubGenerator extends Generator {
    constructor(parser: GitHubConnector, configuration: Configuration) {
        super(parser, configuration);
    }

    protected _parsePullRequests(pullRequests: PullRequest[]): string {
        const oldFile = this._loadMarkdown();
        const notes = pullRequests.map(composeText);
        const markdown = [`# RELEASE NOTES\n `, ...notes, oldFile].join('\n');

        return markdown;
    }
}
