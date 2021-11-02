import { Configuration } from 'configuration/configuration';
import { Connector } from 'connector/connector';
import { CliParams } from 'commander/options';
import { TeamsWebhook } from './webhooks/teams';
import { Webhook } from './webhooks/webhook';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

export class PluginLoader {
    private _configuration: Configuration;
    private _connector: Connector;
    private _webhooks!: Webhook[];
    private _filePath!: string;
    private _verbose: boolean;
    private _interactive: boolean;

    constructor(connector: Connector, configuration: Configuration, cliParams: CliParams) {
        this._configuration = configuration;
        this._connector = connector;
        this._verbose = cliParams.verbose!;
        this._interactive = cliParams.interactive!;

        this._createHooks();
    }

    async executePlugins(): Promise<void> {
        if (Object.keys(this._configuration.webhooks || {}).length) {
            let willExecute = true;
            if (this._interactive) {
                const { response } = await inquirer.prompt([
                    {
                        name: 'response',
                        type: 'confirm',
                        message: 'Do you want to execute webhooks?',
                    },
                ]);

                willExecute = response;
            }
            if (willExecute) {
                this._setFilePath();
                this._webhooks?.map((webhook: Webhook) => {
                    webhook.execute(this._filePath, this._configuration.notification!.style);
                });
            }
        }
    }

    private _createHooks(): void {
        const { webhooks } = this._configuration;

        this._webhooks = Object.keys(webhooks!)
            .map((key: string) => {
                switch (key) {
                    case 'teams':
                        return new TeamsWebhook(webhooks?.[key], this._connector, this._verbose);
                    default:
                        return null;
                }
            })
            .filter(Boolean) as Webhook[];
    }

    private _setFilePath(): void {
        const { out, name, split } = this._configuration;
        const outDir = split ? `${out}/release-notes` : out;
        const fileName = split ? this._getLatestFile(outDir!) : `${name}.md`;

        if (!fs.existsSync(outDir!)) {
            fs.mkdirSync(outDir!);
        }

        this._filePath = `${outDir}/${fileName}`;
    }

    private _getLatestFile(outDir: string): string {
        const files = fs.readdirSync(outDir);

        const creationDates = files.map(file => ({
            file,
            creationTime: fs.statSync(path.join(outDir, file)).ctime.getTime(),
        }));
        const lastFile = creationDates.sort((a, b) => b.creationTime - a.creationTime)[0];

        return lastFile.file;
    }
}
