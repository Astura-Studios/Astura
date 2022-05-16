import { Client as _Client } from "discord.js";
import { CommandHandler, InhibitorHandler, ListenerHandler } from "../../handlers/exports";
import { ClientOptions } from "../../base/types";
import { Collection } from "@discordjs/collection";
import { ConfigOptions, EditSnipe, Snipe } from "../../base/interfaces";
import { Console } from "../../util/exports";
import { PrismaClient } from "@prisma/client";
export declare class Client extends _Client {
    commandHandler: CommandHandler;
    config: ConfigOptions;
    console: Console;
    db: PrismaClient;
    editSnipes: Collection<string, EditSnipe[]>;
    inhibitorHandler: InhibitorHandler;
    listenerHandler: ListenerHandler;
    snipes: Collection<string, Snipe[]>;
    constructor(options?: ClientOptions | undefined);
    private init;
    start(): Promise<void>;
    setConfig(config: ConfigOptions): this;
    setCommandHandler(commandHandler: CommandHandler): this;
    setInhibitorHandler(inhibitorHandler: InhibitorHandler): this;
    setListenerHandler(listenerHandler: ListenerHandler): this;
}
//# sourceMappingURL=Client.d.ts.map