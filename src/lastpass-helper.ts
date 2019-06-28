import lastpass, { IEntryData } from '@absolunet/lastpass-sdk';

export class LastpassHelper {
  public static async getKey(key: string): Promise<IEntryData> {
    const secret = await lastpass.show(key);

    return secret.data[0];
  }

  public static async removeKey(key: string): Promise<void> {
    await lastpass.rm(key);
  }

}
