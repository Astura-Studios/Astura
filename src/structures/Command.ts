import { Argument } from "./Argument";
import { AsturaClient } from "../client/Client";
import { CommandChannel } from "./util/Types";
import { CommandExceptions, CommandOptions, CommandPermissions } from "./util/Interfaces";
import { CommandInteraction } from "discord.js";
import { ExtendedError } from "../extensions/Error";
import { SlashCommandBuilder } from "@discordjs/builders";

export class Command extends SlashCommandBuilder {
    public aliases?: string[];
    public arguments: Argument[] | undefined;
    public category: string;
    public channel: CommandChannel;
    public cooldown: number;
    public description: string;
    public enabledByDefault: boolean;
    public examples: string[];
    public exceptions: CommandExceptions;
    public id: string;
    public isSubCommand: boolean;
    public permissions: CommandPermissions;
    public ownerOnly: boolean;
    public subCommands: Command[] | undefined;
    public usage: string;

    public constructor(id: string, options: CommandOptions) {
        super();
        this.aliases = options.aliases;
        this.arguments = options.arguments;
        this.category = options.category;
        this.channel = options.channel;
        this.cooldown = options.cooldown;
        this.description = options.description;
        this.enabledByDefault = options.enabledByDefault;
        this.examples = options.examples;
        this.exceptions = options.exceptions;
        this.id = id;
        this.isSubCommand = options.isSubCommand;
        this.permissions = options.permissions;
        this.ownerOnly = options.ownerOnly;
        this.subCommands = options.subCommands;
        this.usage = options.usage;

        this.setName(this.id);
        this.setDescription(this.description);
        this.setDefaultPermission(this.enabledByDefault);

        if (this.arguments) this.arguments.forEach(argument => {
            switch (argument.type) {
                case "boolean":
                    this.addBooleanOption(option => option
                        .setName(argument.name)
                        .setDescription(argument.description)
                        .setRequired(argument.required)
                    );
                    break;

                case "channel":
                    this.addChannelOption(option => option
                        .setName(argument.name)
                        .setDescription(argument.description)
                        .setRequired(argument.required)
                    );
                    break;

                case "integer":
                    this.addIntegerOption(option => option
                        .setName(argument.name)
                        .setDescription(argument.description)
                        .setRequired(argument.required)
                    );
                    break;

                case "mentionable":
                    this.addMentionableOption(option => option
                        .setName(argument.name)
                        .setDescription(argument.description)
                        .setRequired(argument.required)
                    );
                    break;

                case "number":
                    this.addNumberOption(option => option
                        .setName(argument.name)
                        .setDescription(argument.description)
                        .setRequired(argument.required)
                    );
                    break;

                case "role":
                    this.addRoleOption(option => option
                        .setName(argument.name)
                        .setDescription(argument.description)
                        .setRequired(argument.required)
                    );
                    break;

                case "string":
                    if (argument.choices) {
                        const choices: [string, string][] = [];
                        argument.choices.forEach(choice => {
                            return [choice.name, choice.value];
                        });
    
                        this.addStringOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                            .addChoices(choices)
                        );
                    } else {   
                        this.addStringOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required)
                        );
                    };
                    break;

                case "user":
                    this.addUserOption(option => option
                        .setName(argument.name)
                        .setDescription(argument.description)
                        .setRequired(argument.required)
                    );
                    break;
            };
        });

        if (this.subCommands) this.subCommands.forEach(command => {
            this.addSubcommand(subcommand => subcommand
                .setName(command.id)
                .setDescription(command.description)
            );
        });
    };

    public async exec(_client: AsturaClient, _interaction: CommandInteraction): Promise<any> {
        throw new ExtendedError("NOT_IMPLEMENTED", _client, this.constructor.name, this.exec.name);
    };
};