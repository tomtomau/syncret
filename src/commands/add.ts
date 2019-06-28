import chalk from 'chalk';
import { ICommand } from './i-command';
import { ConfigService } from '../config/configService';

export const add: ICommand = {
  command: 'add <noteKey> <filePath>',
  action: (noteKey: string, filePath: string) => {
    const configService = ConfigService.fromEnv();
    const config = configService.readConfig();

    if (config.secrets.hasOwnProperty(noteKey)) {
      throw new Error(`Key '${noteKey}' already exists`);
    }

    // TODO: Validate the note actually exists on lastpass
    config.secrets[noteKey] = filePath;

    configService.writeConfig(config);

    console.log(chalk.green(`Successfully added the '${noteKey}' note to your syncrets`));
  },
};
