import chalk from 'chalk';
import { ConfigService } from '../config/configService';
import { defaultConfig } from '../config/defaultConfig';
import { ICommand } from './i-command';

function hasConfig(configService: ConfigService) {
  try {
    configService.readConfig();

    return true;
  } catch (e) {
    return false;
  }
}

export const init: ICommand = {
  command: 'init',

  action: () => {
    const homeDir = process.env.HOME as string;
    const configService = new ConfigService(homeDir);
    const syncretFile = configService.getConfigPath();

    console.log(`Creating an empty .syncret.json in ${homeDir}`);

    if (hasConfig(configService)) {
      console.error(chalk.red(`${syncretFile} already exists`));
      process.exit(1);

      return;
    }

    configService.writeConfig(defaultConfig);
    console.log(`Wrote ${syncretFile}`);
    process.exit(0);
  },
};
