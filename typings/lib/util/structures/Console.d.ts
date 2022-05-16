import { TableOptions, TableRow } from "../../base/interfaces";
export declare class Console {
    error(message: any, emitter: string, kill?: boolean): void | never;
    warn(message: any, emitter: string): void;
    info(message: any, emitter: string): void;
    ready(message: any, emitter: string): void;
    table(options: TableOptions, rows: TableRow[]): any;
    log(message: any): void;
}
//# sourceMappingURL=Console.d.ts.map