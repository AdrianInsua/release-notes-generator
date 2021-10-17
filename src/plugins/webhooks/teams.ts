import { Connector } from 'connector/connector';
import { Webhook } from './webhook';
import assert from 'assert';
import log4js from 'log4js';
import axios from 'axios';
import fs from 'fs';

const logger = log4js.getLogger('TEAMS WEBHOOK');

export class TeamsWebhook extends Webhook {
    constructor(url?: string, connector?: Connector, verbose?: boolean) {
        super(url, connector, verbose);
        assert(url !== undefined, 'An url must be configured in temas webhook');
    }

    async execute(filePath: string): Promise<void> {
        const text = fs.readFileSync(filePath, 'utf8');

        const html = await this._connector.renderMarkdown(text);

        this._verbose && logger.info('Publishing notification using teams webhook...');

        await axios.post(
            this._url,
            JSON.stringify({
                summary: 'RELEASE NOTES GENERATOR',
                sections: [
                    {
                        activityTitle: 'Release notification!',
                        activitySubtitle: 'Generated with @adrian.insua/release-notes-generator',
                        activityText: html,
                    },
                ],
            }),
        );
    }
}
