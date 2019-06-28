import {Command} from "commander";

export interface ICommand {
    command: string;
    configure?: (commander: Command) => void;
    action: (...args: any) => void;
}
