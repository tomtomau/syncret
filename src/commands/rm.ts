import chalk from 'chalk';
import * as commander from 'commander';
import { ConfigService } from '../config/configService';
import { LastpassHelper } from '../lastpass-helper';
import { ICommand } from './i-command';
import fs from 'fs';

export const rm: ICommand = {
  command: 'rm <key>',
  configure: (command: commander.Command) => {
    command
      .option('-f, --force', 'Whether it actually removes it')
      .option('-l, --local', 'Remove the local file')
      .option('-r, --remote', 'Remove the LastPass secure note');
  },
  action: async (key: string, options: { force: boolean, local: boolean, remote: boolean }) => {
    const force = options.force;
    const positiveDeletion = (a: string) => console.log(' * ' + (force ? `Deleting ${a}` : `Would delete ${a}`));
    const negativeDeletion = (a: string) => console.log(' * ' + (force ? `Not deleting ${a}` : `Would not delete ${a}`));

    // TODO: Check key exists
    const configService = ConfigService.fromEnv();
    const config = configService.readConfig();

    if (!config.secrets.hasOwnProperty(key)) {
      console.log(chalk.bgRed(`'${key}' does not exist in .syncret.json - perhaps it is already deleted?`));
      process.exit(1);
    }

    const file = config.secrets[key];
    const fileExists = fs.existsSync(file);

    let noteExists = true;
    try {
      await LastpassHelper.getKey(key);
    } catch {
      noteExists = false;
    }

    // Handle local
    positiveDeletion(`${key} in .syncret.json`);
    if (force) {
      // TODO: Update config
      delete config.secrets[key];
      configService.writeConfig(config);
    }

    let encounteredErrors = false;
    if (options.local) {
      if (fileExists) {
        positiveDeletion(`local file ${file}`);
      } else {
        negativeDeletion(`local file ${file} - file does not exist`);
      }

      if (force && fileExists) {
        try {
          fs.unlinkSync(file);
        } catch {
          console.log(chalk.bgRed(`Could not delete file ${file} - continuing otherwise`))
          encounteredErrors = true;
        }
      }
    } else {
      negativeDeletion(`local file ${file}`);
    }

    if (options.remote) {
      if (noteExists) {
        positiveDeletion(`LastPass secure note ${key}`);
      } else {
        negativeDeletion(`LastPass secure note ${key} - note does not exist`);
      }

      if (force && noteExists) {
        await LastpassHelper.removeKey(key);
      }
    } else {
      negativeDeletion(`LastPass secure note ${key}`);
    }

    if (encounteredErrors)  {
      process.exit(1);
      return;
    }
  },
};
