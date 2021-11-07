import { AsturaClient } from "../../client/Client";
import { Listener } from "../../structures/Listener";

export default class ErrorListener extends Listener {
    public constructor() {
        super("error", {
            category: "client",
            emitter: "client",
            name: "error"
        });
    };

    public async exec(_client: AsturaClient, error: Error): Promise<void> {
        try {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Error Listener ] ${(error as Error).stack}`);
        } catch (error) {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Error Listener ] ${(error as Error).stack}`);
        };
    };
};