import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const FILE_EXT = ['.yml', '.json'];

export interface Configuration {
    // GITHUB authorization token
    token: string;
    // Output path
    out?: string;
    // Output fileName
    name?: string;
    // Only PRs with this labels will be included in MD
    labels?: string[];
    // Split Release-Notes on file per Relase
    // This option will create a folder in `out` dir.
    split?: boolean;
    // Should we commit changes?
    commit?: boolean;
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
    commit: true,
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

export const getConfiguration = (): Configuration => {
    const fileName = '.releasenotes';
    const ext = searchExistentFileExt(fileName);
    const config = loadFile(fileName, ext!);
    const decoration = { ...defaultConfiguration.decoration, ...config.decoration };

    return { ...defaultConfiguration, ...config, decoration };
};
