import { Options } from 'yargs';

export interface CliParams {
    auth?: boolean;
    configuration?: string;
    interactive?: boolean;
    verbose?: boolean;
}

export const repoOptions: Record<string, Options> = {
    auth: {
        alias: 'a',
        type: 'boolean',
        description: 'Manual creadentials input',
    },
    repo: {
        alias: 'r',
        type: 'string',
        description: 'Repo in format user/repo',
    },
    message: {
        alias: 'm',
        type: 'string',
        description: 'Commit message',
    },
    publish: {
        alias: 'p',
        type: 'boolean',
        description: 'Publish output to your repo',
    },
};

export const configurationOptions: Record<string, Options> = {
    configuration: {
        alias: 'c',
        type: 'string',
        description: 'Configuration file path',
    },
};

export const outputOptions: Record<string, Options> = {
    output: {
        alias: ['out', 'o'],
        type: 'string',
        description: 'Output path',
    },
    name: {
        alias: 'n',
        type: 'string',
        description: 'Output file name',
    },
};

export const commonOptions: Record<string, Options> = {
    assets: {
        type: 'string',
        description: 'File to upload in publish process',
    },
    verbose: {
        alias: 'v',
        type: 'boolean',
        description: 'Makes the script verbose',
    },
    interactive: {
        alias: 'i',
        type: 'boolean',
        description: 'Executes interactive version of the script',
    },
};
