import 'graphql-import-node';
import { Configuration, getConfiguration } from './configuration/configuration';
import { GitHubConnector } from './connector/github';
import { GithubGenerator } from './generator/github';
import dotenv from 'dotenv';
import log4js from 'log4js';

dotenv.config();
log4js.configure({
    appenders: { out: { type: 'stdout', layout: { type: 'coloured' } } },
    categories: { default: { appenders: ['out'], level: 'debug' } },
});

const logger = log4js.getLogger('MAIN');

async function main() {
    const configuration: Configuration = getConfiguration();
    logger.info(configuration);
    const connector: GitHubConnector = new GitHubConnector(configuration);
    const generator: GithubGenerator = new GithubGenerator(connector, configuration);

    logger.debug('Starting pull requests parsing...');

    await generator.generateReleaseNotes();

    logger.debug('Release notes done!');
}

main();
