import { Argument } from "./Argument";
import { Category } from "./Category";
import { Client } from "./Client";
import { CommandChannel } from "../../base/types";
import { CommandExceptions, CommandPermissions, SlashCommandOptions } from "../../base/interfaces";
import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashSubCommand } from "./SlashSubCommand";
export declare class SlashCommand extends SlashCommandBuilder {
    aliases: string[] | [];
    arguments: Argument[] | [];
    category: Category;
    categoryID: string;
    channel: CommandChannel;
    cooldown: number;
    description: string;
    defaultPermission: boolean;
    examples: string[] | [];
    exceptions: CommandExceptions;
    filepath: string;
    name: string;
    permissions?: CommandPermissions;
    ownerOnly: boolean;
    subCommands: SlashSubCommand[] | [];
    usage: string;
    constructor(name?: string, options?: SlashCommandOptions);
    exec(client: Client, _interaction: CommandInteraction, _Discord: typeof import("discord.js")): Promise<any>;
    getSubCommand(name: string): SlashSubCommand;
}
//# sourceMappingURL=SlashCommand.d.ts.map