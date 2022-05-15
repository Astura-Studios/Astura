import { Client as _Client, ClientOptions as _ClientOptions, Intents as _Intents } from "discord.js";
import { CommandHandler, InhibitorHandler, ListenerHandler } from "../../handlers/exports";
import { ClientOptions, ConfigOptionsSymbol } from "../../base/types";
import { Collection } from "@discordjs/collection";
import { ConfigOptions, EditSnipe, Snipe } from "../../base/interfaces";
import { Console } from "../../util/exports";
import { Constants } from "../../base/constants";
import { PrismaClient } from "@prisma/client";

import devBoot from "../../../scripts/dev-init";
import config from "../../../../astura.config";
import prodBoot from "../../../scripts/start-init";

export class Client extends _Client {
    public commandHandler: CommandHandler;
    public config: ConfigOptions;
    public console: Console;
    public db: PrismaClient;
    public editSnipes: Collection<string, EditSnipe[]>;
    public inhibitorHandler: InhibitorHandler;
    public listenerHandler: ListenerHandler;
    public snipes: Collection<string, Snipe[]>;

    public constructor(options?: ClientOptions | undefined) {
        super(typeof options !== "undefined" ?
            {
                ...{
                    intents: Constants["Intents"]
                }, ...options as Omit<ClientOptions, ConfigOptionsSymbol>
            } : {
                intents: Constants["Intents"]
            });

        this.config = config;
        this.commandHandler = new CommandHandler(this, this.config.commandHandler);
        this.console = new Console();
        this.db = new PrismaClient();
        this.editSnipes = new Collection<string, EditSnipe[]>();
        this.inhibitorHandler = new InhibitorHandler(this, this.config.inhibitorHandler);
        this.listenerHandler = new ListenerHandler(this, this.config.listenerHandler);
        this.snipes = new Collection<string, Snipe[]>();
    }

    private async init(): Promise<void> {
        this.db.$connect();
        this.inhibitorHandler.load();
        this.commandHandler.load();
        this.listenerHandler.load();
    }

    public async start(): Promise<void> {
        if (process.env.NODE_ENV === "development") {
            devBoot();
        } else if (process.env.NODE_ENV === "production") {
            prodBoot();
        } else {
            devBoot();
        }

        await this.init()
            .then((): Promise<string> => this.login(this.config.token))
            .catch((error: Error): void => this.console.error(error.stack, "astura.client", true));
    }

    public setConfig(config: ConfigOptions): this {
        this.config = config;
        return this;
    }

    public setCommandHandler(commandHandler: CommandHandler): this {
        this.commandHandler = commandHandler;
        return this;
    }

    public setInhibitorHandler(inhibitorHandler: InhibitorHandler): this {
        this.inhibitorHandler = inhibitorHandler;
        return this;
    }

    public setListenerHandler(listenerHandler: ListenerHandler): this {
        this.listenerHandler = listenerHandler;
        return this;
    }
}