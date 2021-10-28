import { Client } from "discord.js";
import { Configuration } from "../structures/Configuration";
import { Database } from "../structures/database/Database";
import { ListenerHandler } from "../handlers/ListenerHandler";
import { Utilities } from "../structures/Utilities";

import { configOptions } from "./Config";
import { join } from "path";

declare module "discord.js" {
    interface Client {
        config: Configuration;
        db: Database;
        listenerHandler: ListenerHandler;
        util: Utilities;
    }
};

export class AsturaClient extends Client {
    public config: Configuration;
    public db: Database;
    public util: Utilities;

    public constructor() {
        super(configOptions.clientOptions);

        this.config = new Configuration(configOptions);

        this.db = new Database({
            dbName: this.config.databaseName
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "..", "commands"),
        });

        this.util = new Utilities(this);
    };

    private async init() {
        // this.commandHandler.load();
        this.listenerHandler.load();

        await this.db.connect();
    };

    public async start(): Promise<string | void> {
        try {
            await this.init();
            return this.login(this.config.token);
        } catch (error) {
            return console.log(`${this.util.date.getLocalTime()} | [ Astura Client ] ${(error as Error).stack}`);
        };
    };
};