import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generate } from './commands/generate';
import { publish } from './commands/publish';

export default yargs(hideBin(process.argv))
    .command(generate)
    .command(publish)
    .help().argv;
