import { configurationOptions, outputOptions, gitHubOptions, commonOptions, CliParams } from '../options';
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
            ...gitHubOptions,
            ...commonOptions,
        }),
    handler: async command => {
        const generator = await getGenerator(command as CliParams);

        await generator.generateReleaseNotes();

        await generator.publishReleaseNotes();
    },
};
