import {ConfigService} from "../config/configService";
import lastpass, {IEntryData} from '@absolunet/lastpass-sdk';
import chalk from 'chalk';
import fs from 'fs';

export async function sync() {
    const configService = ConfigService.fromEnv();

    const syncrets = configService.readConfig().secrets;

    console.log(`Processing ${Object.keys(syncrets).length} secure notes`);

    for (let key in syncrets) {
        if (!syncrets.hasOwnProperty(key)) {
            continue;
        }

        const fileOutput = syncrets[key];

        console.log(chalk.blue(`Retrieving note '${key}`));
        const entryData = await getStringFromLastpass(key);
        console.log(chalk.green(`Found note! Writing to ${fileOutput}`));
        fs.writeFileSync(fileOutput, entryData.note);
    }
}

async function getStringFromLastpass(key: string): Promise<IEntryData> {
    const secret = await lastpass.show(key);

    return secret.data[0];
}
