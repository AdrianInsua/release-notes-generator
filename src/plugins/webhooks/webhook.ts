import { Connector } from 'connector/connector';

export abstract class Webhook {
    protected _connector: Connector;
    protected _url: string;
    protected _verbose: boolean;

    constructor(url?: string, connector?: Connector, verbose?: boolean) {
        this._connector = connector!;
        this._url = url!;
        this._verbose = verbose!;
    }

    abstract execute(filePath: string): Promise<void>;
}
