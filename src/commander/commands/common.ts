import { getConfiguration } from 'configuration/configuration';
import { GitHubConnector } from 'connector/github';
import { GithubGenerator } from 'generator/github';
import { PluginLoader } from 'plugins/loader';
import { Generator } from 'generator/generator';
import { CliParams } from '../options';

interface Response {
    generator: Generator;
    pluginLoader: PluginLoader;
}

export const getGenerator = async (cliParams: CliParams): Promise<Response> => {
    const config = getConfiguration(cliParams);
    const connector = new GitHubConnector(config, cliParams);
    const generator = new GithubGenerator(connector, config, cliParams);
    const pluginLoader = new PluginLoader(connector, config, cliParams);

    await connector.setRepositoryProperties();
    await connector.connect();

    return { generator, pluginLoader };
};
