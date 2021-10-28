import { Listener } from "../../structures/Listener";

export default class UncaughtExceptionListener extends Listener {
    public constructor() {
        super("uncaughtException", {
            category: "process",
            emitter: "process",
            name: "uncaughtException"
        });
    };

    public async exec(error: Error) {
        try {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Processs ] Uncaught Exception: ${error.stack}`);
        } catch (error) {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Listener Handler ] ${(error as Error).stack}`);
        };
    };
};