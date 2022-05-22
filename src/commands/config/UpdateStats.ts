import { Client, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction, GuildChannel, GuildMember } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { GuildConfig } from "@prisma/client";

export default class UpdateStatsCommand extends SlashCommand {
    public constructor() {
        super("updatestats", {
            aliases: ["updatestatistics"],
            arguments: [],
            categoryID: "Configuration",
            channel: "guild",
            cooldown: 5,
            defaultPermission: true,
            description: "Update the current server statistics manully.",
            examples: [
                "/updatestats"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: [],
                userPermissions: ["ADMINISTRATOR"]
            },
            usage: "/updatestats"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void> {
        const guildConfig: GuildConfig = await client.db.guildConfig.findUnique({
            where: {
                guildID: interaction.guild?.id
            }
        }) as GuildConfig;

        if (guildConfig.totalMembersChannelID && guildConfig.memberCountChannelID && guildConfig.botCountChannelID) {
            const ALL_MEMBERS: GuildChannel = interaction.guild?.channels.cache.get(guildConfig.totalMembersChannelID) as GuildChannel;
            const MEMBERS: GuildChannel = interaction.guild?.channels.cache.get(guildConfig.memberCountChannelID) as GuildChannel;
            const BOTS: GuildChannel = interaction.guild?.channels.cache.get(guildConfig.botCountChannelID) as GuildChannel;

            ALL_MEMBERS.setName(`Total Members: ${interaction.guild?.memberCount}`);
            MEMBERS.setName(`Member Count: ${(await interaction.guild?.members.fetch())?.filter((member: GuildMember): boolean => !member.user.bot).size}`);
            BOTS.setName(`Bot Count: ${(await interaction.guild?.members.fetch())?.filter((member: GuildMember): boolean => member.user.bot).size}`);

            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        description: `<:white_check_mark:866924630785785876> **Successfully updated server configuration settings for ${interaction.guild?.name}**`
                    })
                ]
            });
        } else {
            return interaction.reply({
                content: "Channels have not been set, cannot configure.",
                ephemeral: true
            });
        }
    }
}