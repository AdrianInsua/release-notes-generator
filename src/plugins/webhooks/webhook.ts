import { Webhook as IWebhook } from 'configuration/configuration';
import { Connector } from 'connector/connector';

export abstract class Webhook {
    protected _connector: Connector;
    protected _webhook: IWebhook;
    protected _verbose: boolean;

    constructor(webhook?: IWebhook, connector?: Connector, verbose?: boolean) {
        this._webhook = webhook!;
        this._connector = connector!;
        this._verbose = verbose!;
    }

    abstract execute(filePath: string): Promise<void>;
}
