import {defaultConfig} from "../config/defaultConfig";

const fs = require('fs');
import chalk from 'chalk';
import {ConfigService} from "../config/configService";

export function init() {
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
}

function hasConfig(configService: ConfigService) {
    try {
        configService.readConfig();

        return true;
    } catch (e) {
        return false;
    }
}
