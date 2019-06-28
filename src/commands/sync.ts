import chalk from 'chalk';
import fs from 'fs';
import { ConfigService } from '../config/configService';
import { LastpassHelper } from '../lastpass-helper';
import { ICommand } from './i-command';

export const sync: ICommand = {
  command: 'sync',
  action: async () => {
    const configService = ConfigService.fromEnv();

    const syncrets = configService.readConfig().secrets;

    console.log(`Processing ${Object.keys(syncrets).length} secure notes`);

    for (let key in syncrets) {
      if (!syncrets.hasOwnProperty(key)) {
        continue;
      }

      const fileOutput = syncrets[key];

      console.log(chalk.blue(`Retrieving note '${key}'`));
      const entryData = await LastpassHelper.getKey(key);
      console.log(chalk.green(`Found note! Writing to ${fileOutput}`));
      fs.writeFileSync(fileOutput, entryData.note);
    }
  },
};

