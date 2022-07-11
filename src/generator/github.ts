import { GitHubConnector } from 'connector/github';
import { PullRequest } from 'connector/models/pullRequest';
import { Configuration } from 'configuration/configuration';
import { CliParams } from 'commander/options';
import { Generator } from './generator';

export class GithubGenerator extends Generator {
    constructor(connector: GitHubConnector, configuration: Configuration, cliParams: CliParams) {
        super(connector, configuration, cliParams);
    }

    protected _parsePullRequests(pullRequests: PullRequest[]): string {
        const { suffix } = this._configuration;

        const oldFile = this._configuration.split ? '' : this._loadMarkdown();
        const notes = this._sortPullRequestByType(pullRequests).map(this._composeText);
        const folder = `v${suffix?.split('.')[0]}`;
        const header = this._configuration.header?.length ? `${this._configuration.header.replace('${versionFolder}', folder).replace('${version}', suffix!)}\n` : '';
        const title = this._configuration.title?.length ? `# ${this._configuration.title.replace('${version}', suffix!)}\n` : '';
        const markdown = [header, title, ...notes, oldFile].join('\n');

        return markdown;
    }

    private _composeText = (pr: PullRequest) => {
        const decoration = this._configuration.decoration!;
        const ignoredText = this._configuration.ignoreTag;
        const ignoredRegexp = new RegExp(`${ignoredText}(\\r\\n*.*)*${ignoredText}`, 'g');
        const decorationMatch = pr.labels.find((label: string) => decoration[label]) || '';
        const date = new Date(pr.createdAt).toISOString().split('T')[0];
        const body = pr.body?.replace(ignoredRegexp, '').replace(/\n\s*\n\s*\n/g, '\n') || '';

        return `${decoration[decorationMatch] || ''}${pr.title} \n###### ${date}\n\n${body}\n`;
    };
}
