import { generate } from './commands/generate';
import { publish } from './commands/publish';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

const commander = yargs(hideBin(process.argv))
    .command(generate)
    .command(publish)
    .help().argv;

export default commander;
