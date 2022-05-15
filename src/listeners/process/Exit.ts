import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";

export default class ExitListener extends Listener {
    public constructor() {
        super("exit", {
            categoryID: "process",
            emitter: "process",
            once: false
        });
    }

    public async exec(_process: NodeJS.Process, code: number): Promise<void> {
        const client: Client = new Client();
        client.db.$disconnect();
        return client.console.info(`Exiting with code ${code} (${Constants["ErrorCodes"][code]})`, "astura.process"); 
    }
}