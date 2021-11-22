/**
import { AsturaClient } from "../../client/Client";
import { Listener } from "../../structures/Listener";

export default class MyListener extends Listener {
    public constructor() {
        super("", {
            category: "client",
            emitter: "client",
            name: ""
        });
    };

    public async exec(_client: AsturaClient, ...parameters): Promise<void> {
        try {
            
        } catch (error) {
            return console.log(`${this.client.util.date.getLocalTime()} | [ My Listener ] ${(error as Error).stack}`);
        };
    };
};
**/