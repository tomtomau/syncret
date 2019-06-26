#!/usr/bin/env node

import chalk from 'chalk';
import {init} from './commands/init';
import {add} from './commands/add';
import {sync} from './commands/sync';

const clear = require('clear');

const program = require('commander')
    .version('0.0.1')
    .description("A CLI tool for syncing Lastpass notes as files");

const commands = {
    init,
    add,
    sync
};

clear();
console.log(
    chalk.blue(
        'Welcome to syncret'
    )
);

program
    .command('init')
    .action(commands.init);

program
    .command('add <noteKey> <filePath>')
    .action(commands.add);

program
    .command('sync')
    .action(commands.sync);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
