import {ConfigService} from "../config/configService";
import chalk from 'chalk';

export function add(noteKey: string, filePath: string) {
    const configService = ConfigService.fromEnv();
    const config = configService.readConfig();

    if (config.secrets.hasOwnProperty(noteKey)) {
        throw new Error(`Key '${noteKey}' already exists`);
    }

    // TODO: Validate the note actually exists on lastpass
    config.secrets[noteKey] = filePath;

    configService.writeConfig(config);

    console.log(chalk.green(`Successfully added the '${noteKey}' note to you syncrets`));
}
