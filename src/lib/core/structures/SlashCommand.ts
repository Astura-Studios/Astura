import { Argument } from "./Argument";
import { Category } from "./Category";
import { Choice } from "./Choice";
import { Client } from "./Client";
import { CommandChannel } from "../../base/types";
import { CommandExceptions, CommandPermissions, SlashCommandOptions } from "../../base/interfaces";
import { CommandInteraction } from "discord.js";
import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandChannelOption, SlashCommandIntegerOption, SlashCommandMentionableOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandUserOption } from "@discordjs/builders";
import { SlashSubCommand } from "./SlashSubCommand";

export class SlashCommand extends SlashCommandBuilder {
    public aliases: string[] | [];
    public arguments: Argument[] | [];
    public category: Category;
    public categoryID: string;
    public channel: CommandChannel;
    public cooldown: number;
    public description: string;
    public defaultPermission: boolean;
    public examples: string[] | [];
    public exceptions: CommandExceptions;
    public filepath: string;
    public name: string;
    public permissions?: CommandPermissions;
    public ownerOnly: boolean;
    public subCommands: SlashSubCommand[] | [];
    public usage: string;

    public constructor(name?: string, options?: SlashCommandOptions) {
        super();
        name = name as string;
        options = options as SlashCommandOptions;
        this.aliases = options.aliases || [];
        this.arguments = options.arguments || [];
        this.categoryID = options.categoryID;
        this.channel = options.channel || "guild";
        this.cooldown = options.cooldown || 0;
        this.examples = options.examples || [];
        this.exceptions = {
            ignoreCooldown: new Client().config.owners,
            ignorePermissions: new Client().config.owners
        };
        this.filepath = __filename;
        this.permissions = options.permissions || {
            clientPermissions: [],
            userPermissions: []
        },
            this.ownerOnly = options.ownerOnly || false;
        this.subCommands = options.subCommands || [];
        this.usage = options.usage;

        this.setName(name);
        this.setDescription(options.description);
        this.setDefaultPermission(options.defaultPermission || true);

        if (this.arguments.length > 0 && this.arguments.length !== 0) {
            this.arguments.forEach((argument: Argument): void => {
                switch (argument.type) {
                    case "boolean":
                        this.addBooleanOption((option: SlashCommandBooleanOption): SlashCommandBooleanOption => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                        );
                        break;

                    case "channel":
                        this.addChannelOption((option: SlashCommandChannelOption): SlashCommandChannelOption => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                        );
                        break;

                    case "integer":
                        this.addIntegerOption((option: SlashCommandIntegerOption): SlashCommandIntegerOption => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                        );
                        break;

                    case "mentionable":
                        this.addMentionableOption((option: SlashCommandMentionableOption): SlashCommandMentionableOption => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                        );
                        break;

                    case "number":
                        this.addNumberOption((option: SlashCommandNumberOption): SlashCommandNumberOption => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                        );
                        break;

                    case "role":
                        this.addRoleOption((option: SlashCommandRoleOption): SlashCommandRoleOption => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                        );
                        break;

                    case "string":
                        if (argument.choices) {
                            this.addStringOption((option: SlashCommandStringOption): Omit<SlashCommandStringOption, "setAutocomplete"> => {
                                return option
                                    .setName(argument.name)
                                    .setDescription(argument.description)
                                    .setRequired(argument.required)
                                    .addChoices(...argument.choices.map((choice: Choice) => { return { name: choice.name, value: choice.value }; }));
                            });
                        } else {
                            this.addStringOption((option: SlashCommandStringOption): SlashCommandStringOption => option
                                .setName(argument.name)
                                .setDescription(argument.description)
                                .setRequired(argument.required)
                            );
                        }
                        break;

                    case "user":
                        this.addUserOption((option: SlashCommandUserOption): SlashCommandUserOption => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                        );
                        break;
                }
            });
        }

        if (this.subCommands.length > 0) {
            this.subCommands.forEach((command: SlashSubCommand): void => {
                this.addSubcommand(command);
            });
        }
    }

    public async exec(client: Client, _interaction: CommandInteraction, _Discord: typeof import("discord.js")): Promise<any> {
        return client.console.error(`${this.constructor.name} slash command ${this.exec.name} function has not been implemented`, "astura.commandHandler", true);
    }

    public getSubCommand(name: string): SlashSubCommand {
        return (this.subCommands as SlashSubCommand[]).filter((subCommand: SlashSubCommand): boolean => subCommand.name.toLowerCase() === name.toLowerCase())[0];
    }
}