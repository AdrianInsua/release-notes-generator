import { Customization, Webhook as IWebhook } from 'configuration/configuration';
import { Connector } from 'connector/connector';
import { Webhook } from './webhook';
import assert from 'assert';
import log4js from 'log4js';
import axios from 'axios';
import fs from 'fs';

const logger = log4js.getLogger('TEAMS WEBHOOK');

export class TeamsWebhook extends Webhook {
    constructor(webhook?: IWebhook, connector?: Connector, verbose?: boolean) {
        super(webhook, connector, verbose);
        assert(webhook?.url !== undefined, 'An url must be configured in temas webhook');
    }

    async execute(filePath: string, customization?: Customization): Promise<void> {
        const text = fs.readFileSync(filePath, 'utf8');

        const html = await this._connector.renderMarkdown(text);

        const activityText = this._customizeHtml(html, customization);

        this._verbose && logger.info('Publishing notification using teams webhook...');

        await axios.post(
            this._webhook.url!,
            JSON.stringify({
                summary: 'RELEASE NOTES GENERATOR',
                sections: [
                    {
                        activityTitle: this._webhook.activityTitle || 'Release notification!',
                        activityImage: this._webhook.activityImage,
                        activitySubtitle:
                            this._webhook.activitySubtitle ||
                            'Generated with [@adrian.insua/release-notes-generator](https://github.com/adrianiy/release-notes-generator)',
                        activityText,
                        potentialAction: this._webhook.actions,
                    },
                ],
            }),
        );
    }

    private _customizeHtml(html: string, customization?: Customization): string {
        if (customization) {
            return Object.entries(customization).reduce((acc, curr) => {
                const [tag, styleObj] = curr;
                const regexp = new RegExp(`<${tag}>`, 'g');
                const style = this._getStyleString(styleObj);

                return acc.replace(regexp, `<${tag} style=${JSON.stringify(style)}>`);
            }, html);
        } else {
            return html;
        }
    }

    private _getStyleString(styleObject: Record<string, string>): string {
        return Object.entries(styleObject).reduce((acc, curr) => {
            const [property, value] = curr;

            return `${acc}; ${property}: ${value}`;
        }, '');
    }
}
