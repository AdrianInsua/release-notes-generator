import { GitHubConnector } from 'connector/github';
import { PullRequest } from 'connector/models/pullRequest';
import { Configuration } from 'configuration/configuration';
import { CliParams } from '../commander/options';
import { Generator } from './generator';
import { format } from 'date-fns';

export class GithubGenerator extends Generator {
    constructor(connector: GitHubConnector, configuration: Configuration, cliParams: CliParams) {
        super(connector, configuration, cliParams);
    }

    protected _parsePullRequests(pullRequests: PullRequest[]): string {
        const oldFile = this._loadMarkdown();
        const notes = pullRequests.map(this._composeText);
        const title = `# ${this._configuration.title}\n`;
        const markdown = [title, ...notes, oldFile].join('\n');

        return markdown;
    }

    private _composeText = (pr: PullRequest) => {
        const decoration = this._configuration.decoration!;
        const icon = pr.labels.find((label: string) => decoration[label]) || '';
        const date = format(new Date(pr.createdAt), 'yyyy-MM-dd');

        return `## ${decoration[icon]}${pr.title} \n###### ${date}\n\n${pr.body}\n`;
    };
}
