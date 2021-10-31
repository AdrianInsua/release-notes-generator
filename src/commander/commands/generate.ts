import { configurationOptions, outputOptions, repoOptions, commonOptions, CliParams } from '../options';
import { getGenerator } from './common';
import yargs from 'yargs';

export const generate: yargs.CommandModule = {
    command: 'generate',
    aliases: ['gen'],
    describe: 'Generates Release Note markdown',
    builder: command =>
        command.options({
            ...configurationOptions,
            ...outputOptions,
            ...repoOptions,
            ...commonOptions,
        }),
    handler: async command => {
        const { generator, pluginLoader } = await getGenerator(command as CliParams);

        await generator.generateReleaseNotes();

        await generator.publishPreview();

        await generator.publishReleaseNotes();

        await generator.publishAssets();

        await pluginLoader.executePlugins();
    },
};
