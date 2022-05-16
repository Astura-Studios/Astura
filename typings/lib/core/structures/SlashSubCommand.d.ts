import { Argument } from "./Argument";
import { Client } from "./Client";
import { CommandInteraction } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { SlashSubCommandOptions } from "../../base/interfaces";
export declare class SlashSubCommand extends SlashCommandSubcommandBuilder {
    arguments: Argument[] | [];
    description: string;
    filepath: string;
    name: string;
    constructor(name?: string, options?: SlashSubCommandOptions);
    exec(client: Client, _interaction: CommandInteraction, _Discord: typeof import("discord.js")): Promise<any>;
}
//# sourceMappingURL=SlashSubCommand.d.ts.map