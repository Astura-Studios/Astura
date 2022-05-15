import chalkTable from "chalk-table";
import fs from "fs";
import path from "path";
import util from "util";

import { Chalk } from "./Chalk";
import { TableOptions, TableRow } from "../../base/interfaces";

export class Console {
    public error(message: any, emitter: string, kill?: boolean): void | never {
        const logFilePath: string = path.join(__dirname, "..", "..", "..", "..", "logs", "debug.log");
        const logFile: fs.WriteStream = fs.createWriteStream(logFilePath, {
            flags: "w"
        });

        logFile.write(util.format(message) + "\n");

        if (kill) {
            console.log(Chalk.error(message, emitter));
            return process.exit(1);
        } else {
            return console.log(Chalk.error(message, emitter));
        }
    }   

    public warn(message: any, emitter: string): void {
        const logFilePath: string = path.join(__dirname, "..", "..", "..", "..", "logs", "warn.log");
        const logFile: fs.WriteStream = fs.createWriteStream(logFilePath, {
            flags: "w"
        });

        logFile.write(util.format(message) + "\n");
        return console.log(Chalk.warn(message, emitter));
    }

    public info(message: any, emitter: string): void {
        const logFilePath: string = path.join(__dirname, "..", "..", "..", "..", "logs", "info.log");
        const logFile: fs.WriteStream = fs.createWriteStream(logFilePath, {
            flags: "w"
        });

        logFile.write(util.format(message) + "\n");
        return console.log(Chalk.info(message, emitter));
    }

    public ready(message: any, emitter: string): void {
        return console.log(Chalk.ready(message, emitter));
    }

    public table(options: TableOptions, rows: TableRow[]): any {
        return chalkTable(options, rows);
    }

    public log(message: any): void {
        const logFilePath: string = path.join(__dirname, "..", "..", "..", "..", "logs", "console.log");
        const logFile: fs.WriteStream = fs.createWriteStream(logFilePath, {
            flags: "w"
        });

        logFile.write(util.format(message) + "\n");
        process.stdout.write(util.format(message) + "\n");        
    }
}