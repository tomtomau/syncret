import { add } from './add';
import { ICommand } from './i-command';
import { init } from './init';
import { ls } from './ls';
import { rm } from './rm';
import { sync } from './sync';

export const commands: ICommand[] = [init, ls, add, sync, rm];
