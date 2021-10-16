import { getConfiguration } from 'configuration/configuration';
import { GitHubConnector } from 'connector/github';
import { GithubGenerator } from 'generator/github';
import { Generator } from 'generator/generator';
import { CliParams } from '../options';

export const getGenerator = async (cliParams: CliParams): Promise<Generator> => {
    const config = getConfiguration(cliParams);
    const connector = new GitHubConnector(config, cliParams);
    const generator = new GithubGenerator(connector, config, cliParams);

    await connector.setRepositoryProperties();
    await connector.connect();

    return generator;
};
