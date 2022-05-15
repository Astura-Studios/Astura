import { Console, Listener } from "../../lib/core/exports";

export default class UnhandledRejectionListener extends Listener {
    public constructor() {
        super("unhandledRejection", {
            emitter: "process",
            categoryID: "process",
            once: false
        });
    }

    public async exec(_process: NodeJS.Process, reason: Error, promise: Promise<string>): Promise<void> {
        const console: Console = new Console();
        return console.error(`Unhandled rejection: ${reason.stack}\nOrigin: ${promise}`, "astura.process", false);
    }
}