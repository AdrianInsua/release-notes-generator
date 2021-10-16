import { Octokit } from 'octokit';
import { CliParams } from 'commander/options';
import { Configuration } from 'configuration/configuration';
import { PullRequest } from './models/pullRequest';
import { Release } from './models/release';
import inquirer from 'inquirer';

export abstract class Connector {
    protected _owner!: string;
    protected _repo!: string;
    protected _token!: string;
    protected _connection!: Octokit;
    protected _configuration!: Configuration;
    protected _customAuth: boolean;
    protected _verbose: boolean;
    protected _interactive: boolean;

    constructor(configuration: Configuration, cliParams: CliParams) {
        this._configuration = configuration;
        this._customAuth = cliParams.auth!;
        this._verbose = cliParams.verbose!;
        this._interactive = cliParams.interactive!;
        this._setRepositoryProperties();
    }

    async connect(): Promise<void> {
        if (this._customAuth || this._interactive) {
            const { token } = await inquirer.prompt([
                {
                    name: 'token',
                    message: "Enter your acces token. If empty we'll use env.GITHUB_TOKEN: ",
                    type: 'password',
                    defatult: '$GITHUB_TOKEN',
                },
            ]);

            this._token = token;
        }
        if (!this._token) {
            const { token: configToken } = this._configuration;
            const token = process.env[configToken!]!;

            this._token = token;
        }
    }

    abstract getLatestRelease(): Promise<Release>;
    abstract getPullRequests(since?: string): Promise<PullRequest[]>;
    abstract publishChanges(file: string): Promise<void>;

    protected abstract _setRepositoryProperties(): void;
}
