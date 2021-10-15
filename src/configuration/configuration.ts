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
}

const defaultConfiguration: Configuration = {
    token: 'GITHUB_TOKEN',
    out: './',
    name: 'RELEASE_NOTES',
    labels: ['release-note'],
};

const searchExistenFileExt = (fileName: string): string | undefined => {
    return FILE_EXT.find((ext: string) => fs.existsSync(path.join(`${fileName}${ext}`)));
};

const loadFile = (fileName: string, ext: string): Record<string, unknown> => {
    const file = path.join(`${fileName}${ext}`);
    switch (ext) {
        case 'yaml':
            return yaml.parse(file);
        case 'json':
            return JSON.parse(fs.readFileSync(file, 'utf8'));
        default:
            return {};
    }
};

export const getConfiguration = (): Configuration => {
    const fileName = '.releasenotes';
    const ext = searchExistenFileExt(fileName);
    const config = loadFile(fileName, ext!);

    return { ...defaultConfiguration, ...config };
};
