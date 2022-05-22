import { APIRole } from "discord-api-types/v10";
import { Argument, Choice, Client } from "../../lib/core/exports";
import { CommandInteraction, Role, TextChannel } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { SlashCommand } from "../../lib/core/exports";

// Make this send to logs

export type GuildConfig = {
    guildID?: string;
    owners?: string[];
    verificationChannelID?: string | null;
    verificationRoleID?: string | null;
    suggestionsChannelID?: string | null;
    muteRoleID?: string | null;
    serverStatisticsEnabled?: boolean | null;
    totalMembersChannelID?: string | null;
    memberCountChannelID?: string | null;
    botCountChannelID?: string | null;
    goalCountChannelID?: string | null;
    goalCount?: number | null;
    boostTierChannelID?: string | null;
    staffRoleID?: string | null;
    adminRoleID?: string | null;
    executiveRoleID?: string | null;
    messageLogChannelID?: string | null;
    moderationLogChannelID?: string | null;
    serverLogChannelID?: string | null;
    asturaLogChannelID?: string | null;
};

export default class GuildConfigCommand extends SlashCommand {
    public constructor() {
        super("guildconfig", {
            aliases: ["guildconf", "serverconf", "serverconfig"],
            arguments: [
                new Argument({
                    name: "setting",
                    description: "The server setting you want to configure.",
                    required: true,
                    type: "string",
                    choices: [
                        new Choice("verificationchannel", "verificationchannel"),
                        new Choice("verificationrole", "verificationrole"),
                        new Choice("suggestionschannel", "suggestionschannel"),
                        new Choice("muterole", "muterole"),
                        new Choice("serverstats", "serverstats"),
                        new Choice("totalmemberschannel", "totalmemberschannel"),
                        new Choice("membercountchannel", "membercountchannel"),
                        new Choice("botcountchannel", "botcountchannel"),
                        new Choice("goalcountchannel", "goalcountchannel"),
                        new Choice("goalcount", "goalcount"),
                        new Choice("boosttierchannel", "boosttierchannel"),
                        new Choice("staffrole", "staffrole"),
                        new Choice("adminrole", "adminrole"),
                        new Choice("executiverole", "executiverole"),
                        new Choice("messagelogchannel", "messagelogchannel"),
                        new Choice("moderationlogchannel", "moderationlogchannel"),
                        new Choice("serverlogchannel", "serverlogchannel"),
                        new Choice("asturalogchannel", "asturalogchannel"),
                    ]
                }),
                new Argument({
                    name: "role",
                    description: "The role you want to set for a role server setting.",
                    required: false,
                    type: "role"
                }),
                new Argument({
                    name: "channel",
                    description: "The channel you want to set for a channel server setting.",
                    required: false,
                    type: "channel"
                }),
                new Argument({
                    name: "goal",
                    description: "The member count goal you want to set.",
                    required: false,
                    type: "number"
                }),
                new Argument({
                    name: "value",
                    description: "The boolean value to set the server setting to.",
                    required: false,
                    type: "boolean"
                })
            ],
            categoryID: "Configuration",
            channel: "guild",
            cooldown: 5,
            defaultPermission: true,
            description: "Configure the server settings.",
            examples: [
                "/guildconfig serverstats true",
                "/serverconf goalcount 200"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: [],
                userPermissions: ["ADMINISTRATOR"]
            },
            usage: "/guildconfig <setting> <value>",
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void> {
        const setting: string = interaction.options.getString("setting") as string;
        const role: Role | APIRole | null = interaction.options.getRole("role");
        const channel: TextChannel | null = interaction.options.getChannel("channel") as TextChannel | null;
        const goal: number | null = interaction.options.getNumber("goal");
        const value: boolean | null = interaction.options.getBoolean("value");

        const updateConf = (data: GuildConfig): void => {
            client.db.guildConfig.update({
                where: {
                    guildID: interaction.guild?.id
                },
                data
            })
                .then((): Promise<void> => interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed({
                            color: Constants["Defaults"].embed.color.default,
                            description: `<:white_check_mark:866924630785785876> **Successfully updated server configuration settings for ${interaction.guild?.name}**`
                        })
                    ]
                }))
                .catch((): Promise<void> => interaction.reply({
                    content: "Looks like an error occurred, unable to update settings.",
                    ephemeral: true
                }));
        };

        if (!role && !channel && !goal && !value) {
            return interaction.reply({
                content: "Please provide a server setting.",
                ephemeral: true
            });
        };

        switch (setting) {
            case "verificationchannel": return updateConf({ verificationChannelID: channel?.id });
            case "verificationrole": return updateConf({ verificationRoleID: role?.id });
            case "suggestionschannel": return updateConf({ suggestionsChannelID: channel?.id });
            case "muterole": return updateConf({ muteRoleID: role?.id });
            case "serverstats": return updateConf({ serverStatisticsEnabled: value });
            case "totalmemberschannel": return updateConf({ totalMembersChannelID: channel?.id });
            case "membercountchannel": return updateConf({ memberCountChannelID: channel?.id });
            case "botcountchannel": return updateConf({ botCountChannelID: channel?.id });
            case "goalcountchannel": return updateConf({ goalCountChannelID: channel?.id });
            case "boosttierchannel": return updateConf({ boostTierChannelID: channel?.id });
            case "staffrole": return updateConf({ staffRoleID: role?.id });
            case "adminrole": return updateConf({ adminRoleID: role?.id });
            case "executiverole": return updateConf({ executiveRoleID: role?.id });
            case "messagelogchannel": return updateConf({ messageLogChannelID: channel?.id });
            case "moderationlogchannel": return updateConf({ moderationLogChannelID: channel?.id });
            case "serverlogchannel": return updateConf({ serverLogChannelID: channel?.id });
            case "asturalogchannel": return updateConf({ asturaLogChannelID: channel?.id });

            default: return interaction.reply({
                content: "Please provide a valid server setting.",
                ephemeral: true
            });
        }
    }
}