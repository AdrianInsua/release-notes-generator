import { CliParams } from 'commander/options';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const FILE_EXT = ['.yml', '.json'];

export interface Configuration {
    // GITHUB authorization token
    token?: string;
    // Output path
    out?: string;
    // Output fileName
    name?: string;
    // Only PRs with this labels will be included in MD
    labels?: string[];
    // Split Release-Notes on file per Relase
    // This option will create a folder in `out` dir.
    split?: boolean;
    // Should we publish changes?
    publish?: boolean;
    // Commit message
    message?: string;
    // Branch where output will be uploaded
    branch?: string;
    // Markdown title
    title?: string;
    // Notes decoration according to type
    decoration?: Record<string, string>;
}

const defaultConfiguration: Configuration = {
    token: 'GITHUB_TOKEN',
    out: '.',
    name: 'RELEASE-NOTES',
    labels: ['release-note'],
    publish: false,
    message: 'chore: update RELEASE-NOTES',
    branch: 'main',
    title: 'RELEASE NOTES',
    decoration: {
        enhancement: ':zap: ',
        bug: ':bug: ',
        refactor: ':abacus: ',
        release: ':rocket: ',
        style: ':nailcare: ',
        documentation: ':book: ',
    },
};

const searchExistentFileExt = (fileName: string): string | undefined => {
    return FILE_EXT.find((ext: string) => fs.existsSync(path.join(`${fileName}${ext}`)));
};

const loadFile = (fileName: string, ext: string): Configuration => {
    const filePath = path.join(`${fileName}${ext}`);
    const file = fs.readFileSync(filePath, 'utf8');

    switch (ext) {
        case '.yml':
            return yaml.parse(file);
        case '.json':
            return JSON.parse(file);
        default:
            return {} as Configuration;
    }
};

const loadCustomConfig = (configuration: string): Configuration => {
    const extIndex = configuration.lastIndexOf('.');
    const fileName = configuration.substr(0, extIndex);
    const ext = configuration.substr(extIndex);

    return loadFile(fileName, ext!);
};

const loadDefaultConfig = (): Configuration => {
    const fileName = '.releasenotes';
    const ext = searchExistentFileExt(fileName);

    return loadFile(fileName, ext!);
};

export const getConfiguration = (cliConfig: CliParams = {}): Configuration => {
    const { configuration } = cliConfig;

    const config = configuration ? loadCustomConfig(configuration) : loadDefaultConfig();
    const decoration = { ...defaultConfiguration.decoration, ...config?.decoration };

    return { ...defaultConfiguration, ...config, ...cliConfig, decoration };
};
