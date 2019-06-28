#!/usr/bin/env node

import chalk from 'chalk';

import commander from 'commander';
const clear = require('clear');

const program = commander
    .version('0.0.1')
    .description("A CLI tool for syncing Lastpass notes as files");

import { commands } from "./commands/main";

clear();
console.log(
    chalk.blue(
        'Welcome to syncret'
    )
);

for (const command of commands) {
    const commandProgram = program.command(command.command);

    if (typeof command.configure === 'function') {
        command.configure(commandProgram);
    }

    commandProgram.action(command.action);
}

// program
//     .command('add <noteKey> <filePath>')
//     .action(commands.add);
//
// program
//     .command('ls')
//     .action(commands.ls);
//
// program
//     .command('sync')
//     .action(commands.sync);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
