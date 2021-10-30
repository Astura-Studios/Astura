import { Client } from "discord.js";
import { Configuration } from "../structures/Configuration";
import { Database } from "../structures/database/Database";
import { ListenerHandler } from "../handlers/ListenerHandler";
import { Markdown } from "../structures/util/Markdown";
import { Utilities } from "../structures/util/Utilities";

import { configOptions } from "./Config";
import { join } from "path";

declare module "discord.js" {
    interface Client {
        config: Configuration;
        db: Database;
        listenerHandler: ListenerHandler;
        markdown: Markdown;
        util: Utilities;
    }
};

export class AsturaClient extends Client {
    public config: Configuration;
    public db: Database;
    public listenerHandler: ListenerHandler;
    public markdown: Markdown;
    public util: Utilities;

    public constructor() {
        super(configOptions.clientOptions);

        this.config = new Configuration(configOptions);
        this.db = new Database(this);
        this.markdown = new Markdown();
        this.util = new Utilities(this);

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "..", "listeners")
        });
    };

    private async init() {
        // this.commandHandler.load();
        this.listenerHandler.load();

        //await this.db.init();
        //await this.db.connect();
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