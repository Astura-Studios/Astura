import { Argument } from "./Argument";
import { Choice } from "./Choice";
import { Client } from "./Client";
import { CommandInteraction } from "discord.js";
import { SlashCommandBooleanOption, SlashCommandChannelOption, SlashCommandIntegerOption, SlashCommandMentionableOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandUserOption } from "@discordjs/builders";
import { SlashSubCommandOptions } from "../../base/interfaces";

export class SlashSubCommand extends SlashCommandSubcommandBuilder {
    public arguments: Argument[] | [];
    public description: string;
    public filepath: string;
    public name: string;

    public constructor(name?: string, options?: SlashSubCommandOptions) {
        super();
        this.arguments = (options as SlashSubCommandOptions).arguments || [];
        this.filepath = __filename;
        this.setName(name as string);
        this.setDescription((options as SlashSubCommandOptions).description);

        if (this.arguments.length > 0) {
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
                                argument.choices.forEach((choice: Choice): Omit<SlashCommandStringOption, "setAutocomplete"> => option.addChoice(choice.name, choice.value));
                                return option
                                    .setName(argument.name)
                                    .setDescription(argument.description)
                                    .setRequired(argument.required);
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
    }

    public async exec(client: Client, _interaction: CommandInteraction, _Discord: typeof import("discord.js")): Promise<any> {
        return client.console.error(`${this.constructor.name} slash sub command ${this.exec.name} function has not been implemented`, "astura.commandHandler", true);
    }
}