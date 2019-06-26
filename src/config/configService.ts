import fs from 'fs';
import {ISyncretConfig} from "./syncret-config";

export class ConfigService {
    constructor(private readonly homeDir: string) {
    }

    static fromEnv() {
        return new ConfigService(process.env.HOME as string);
    }

    public readConfig(): ISyncretConfig {
        let data: string;
        try {
            data = fs.readFileSync(this.getConfigPath(), 'utf-8');
        } catch (e) {
            throw new Error(`The config file could not be read from ${this.getConfigPath()}`);
        }

        try {
            return JSON.parse(data) as ISyncretConfig;
        } catch (e) {
            throw new Error('An error occurred parsing the config file');
        }
    }

    public writeConfig(config: ISyncretConfig): void {
        fs.writeFileSync(this.getConfigPath(), JSON.stringify(config));
    }

    public getConfigPath() {
        return `${this.homeDir}/.syncret.json`;
    }

}
