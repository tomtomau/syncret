declare module '@absolunet/lastpass-sdk' {
    const lastpass: Lastpass;

    export interface IEntryData {
        id: string;
        name: string,
        fullname: string,
        last_modified_gmt: Date,
        note: string,
    }

    export interface IEntry {
        success: boolean,
        data: IEntryData[],
        raw: string,
    }

    interface Lastpass {
        show: (key: string) => Promise<IEntry>;
        rm: (key: string) => Promise<{ success: boolean}>;
    }

    export default lastpass;
}
