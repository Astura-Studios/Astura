import { Console, Listener } from "../../lib/core/exports";

export default class UnhandledCaughtListener extends Listener {
    public constructor() {
        super("uncaughtException", {
            emitter: "process",
            categoryID: "process",
            once: false
        });
    }

    public async exec(_process: NodeJS.Process, error: Error, origin: NodeJS.UncaughtExceptionOrigin): Promise<void> {
        const console: Console = new Console();
        return console.error(`Uncaught exception: ${error.stack}\nOrigin: ${origin}`, "astura.process", false);
    }
}
