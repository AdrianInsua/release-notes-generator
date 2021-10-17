import { configurationOptions, repoOptions, commonOptions, CliParams } from '../options';
import { getGenerator } from './common';
import yargs from 'yargs';

export const publish: yargs.CommandModule = {
    command: 'publish',
    aliases: ['pub'],
    describe: 'Pubish Release Note in your repo',
    builder: command =>
        command.options({
            ...configurationOptions,
            ...repoOptions,
            ...commonOptions,
        }),
    handler: async command => {
        const { generator, pluginLoader } = await getGenerator(command as CliParams);

        await generator.publishReleaseNotes();

        await generator.publishAssets();

        await pluginLoader.executePlugins();
    },
};
