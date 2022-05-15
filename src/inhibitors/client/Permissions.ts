import { Client, Inhibitor, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction, GuildMember, PermissionString } from "discord.js";
import { CommandHandlerWarnings } from "../../lib/base/interfaces";
import { Constants } from "../../lib/base/constants";

export default class PermissionsInhibitor extends Inhibitor {
    public constructor() {
        super("permissions", {
            categoryID: "client",
            reason: "permissions",
            priority: 1
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, command: SlashCommand): Promise<boolean> {
        if (interaction.guild) {
            if (!(interaction.guild.me as GuildMember).permissions.has("SEND_MESSAGES")) {
                if (await interaction.user.createDM(true)) {
                    interaction.user.send({
                        embeds: [
                            {
                                color: Constants["Defaults"].embed.color.default,
                                description: ((client.commandHandler.warnings as CommandHandlerWarnings).missingSendPermissions as (client: Client, interaction: CommandInteraction) => string)(client, interaction)
                            }
                        ]
                    });

                    return false;
                } else {
                    return false;
                }
            } else if (command.permissions) {
                if (command.permissions.clientPermissions && !(interaction.guild.me as GuildMember).permissions.has(command.permissions.clientPermissions)) {
                    if (interaction.channel) {
                        interaction.channel.send({
                            embeds: [
                                {
                                    color: Constants["Defaults"].embed.color.default,
                                    description: ((client.commandHandler.warnings as CommandHandlerWarnings).clientMissingPermissions as (client: Client, interaction: CommandInteraction, permissions: string, command: SlashCommand) => string)(client, interaction, (interaction.guild.me as GuildMember).permissions.missing(command.permissions.clientPermissions).length > 1 ?
                                    `${(interaction.guild.me as GuildMember).permissions.missing(command.permissions.clientPermissions).slice(0, -1).map((perm: PermissionString): string => `\`${perm}\``).join(", ")} and \`${(interaction.guild.me as GuildMember).permissions.missing(command.permissions.clientPermissions).slice(-1)[0]}\`` :
                                    `\`${(interaction.guild.me as GuildMember).permissions.missing(command.permissions.clientPermissions)[0]}\``, command)
                                }
                            ]
                        });

                        return false;
                    } else {
                        return false;
                    }
                } else if (command.permissions.userPermissions && interaction.member && !(interaction.member as GuildMember).permissions.has(command.permissions.userPermissions)) {
                    if (interaction.channel) {
                        interaction.channel.send({
                            embeds: [
                                {
                                    color: Constants["Defaults"].embed.color.default,
                                    description: ((client.commandHandler.warnings as CommandHandlerWarnings).userMissingPermissions as (client: Client, interaction: CommandInteraction, permissions: string, command: SlashCommand) => string)(client, interaction, (interaction.member as GuildMember).permissions.missing(command.permissions.userPermissions).length > 1 ?
                                    `${(interaction.member as GuildMember).permissions.missing(command.permissions.userPermissions).slice(0, -1).map((perm: PermissionString): string => `\`${perm}\``).join(", ")} and \`${(interaction.guild.me as GuildMember).permissions.missing(command.permissions.userPermissions).slice(-1)[0]}\`` :
                                    `\`${(interaction.member as GuildMember).permissions.missing(command.permissions.userPermissions)[0]}\``, command)
                                }
                            ]
                        });

                        return false;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}