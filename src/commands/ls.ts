import chalk from 'chalk';
import fs from 'fs';
import { ConfigService } from '../config/configService';
import { ICommand } from './i-command';

export const ls: ICommand = {
  action: () => {
    const configService = ConfigService.fromEnv();

    const syncrets = configService.readConfig().secrets;

    console.log(chalk.green(`${Object.keys(syncrets).length} keys mapped to the filesystem`));

    for (let key in syncrets) {
      if (!syncrets.hasOwnProperty(key)) {
        continue;
      }

      const path = syncrets[key];
      const fileExists = fs.existsSync(path);
      const coloredPath = fileExists ? chalk.bgGreen(path) : chalk.bgRed(path);

      console.log(`${key} => ${coloredPath}`);
    }
  },
  command: 'ls',
};
