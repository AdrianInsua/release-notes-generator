import 'graphql-import-node';
import dotenv from 'dotenv';
import log4js from 'log4js';

dotenv.config();
log4js.configure({
    appenders: { out: { type: 'stdout', layout: { type: 'coloured' } } },
    categories: { default: { appenders: ['out'], level: 'debug' } },
});

import './commander';
