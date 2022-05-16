import { Category, Client, Inhibitor, SlashCommand } from "../../core/exports";
import { Collection } from "discord.js";
import { CommandHandlerOptions, CommandHandlerWarnings } from "../../base/interfaces";
import { EventEmitter } from "stream";
import { REST } from "@discordjs/rest";
export declare class CommandHandler extends EventEmitter {
    aliases: Collection<string, SlashCommand>;
    blockBots?: boolean;
    categories: Collection<string, Category>;
    client: Client;
    commands: Collection<string, SlashCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    directory: string;
    inhibitors: Collection<string, Inhibitor>;
    rest: REST;
    warnings?: CommandHandlerWarnings | undefined;
    constructor(client: Client, options: CommandHandlerOptions);
    register(command: SlashCommand): void;
    unregister(command: SlashCommand): void;
    load(): Promise<void>;
    reload: () => Promise<void>;
    start(): void;
    setInhibitors(inhibitors: Collection<string, Inhibitor>): void;
}
//# sourceMappingURL=CommandHandler.d.ts.map