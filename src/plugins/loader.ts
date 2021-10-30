import { Configuration } from 'configuration/configuration';
import { Connector } from 'connector/connector';
import { CliParams } from 'commander/options';
import { TeamsWebhook } from './webhooks/teams';
import { Webhook } from './webhooks/webhook';
import { format } from 'date-fns';
import inquirer from 'inquirer';
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
        this._setFilePath();
    }

    async executePlugins(): Promise<void> {
        if (this._configuration.webhooks) {
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
            willExecute &&
                this._webhooks?.map((webhook: Webhook) => {
                    webhook.execute(this._filePath, this._configuration.notification!.style);
                });
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
        const { out, name, split, suffix } = this._configuration;
        const outDir = split ? `${out}/release-notes` : out;
        const fileName = split ? `${name}-${format(suffix!, 'yyyy-MM-ddHHmmss')}` : name;

        if (!fs.existsSync(outDir!)) {
            fs.mkdirSync(outDir!);
        }

        this._filePath = `${outDir}/${fileName}.md`;
    }
}
