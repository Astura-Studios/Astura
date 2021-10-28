import { Listener } from "../../structures/Listener";

export default class UnhandledRejectionListener extends Listener {
    public constructor() {
        super("unhandledRejection", {
            category: "process",
            emitter: "process",
            name: "unhandledRejection"
        });
    };

    public async exec(error: Error) {
        try {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Processs ] Unhandled Rejection: ${error.stack}`);
        } catch (error) {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Listener Handler ] ${(error as Error).stack}`);
        };
    };
};