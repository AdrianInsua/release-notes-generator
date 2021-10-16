import { generate } from './commands/generate';
import { publish } from './commands/publish';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

export default yargs(hideBin(process.argv))
    .command(generate)
    .command(publish)
    .help().argv;
