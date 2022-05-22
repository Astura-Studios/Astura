import { Client, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction } from "discord.js";
import { Constants } from "../../lib/base/constants";

export default class ClearConfigCommand extends SlashCommand {
    public constructor() {
        super("clearconfig", {
            aliases: ["clearconf"],
            arguments: [],
            categoryID: "Configuration",
            channel: "guild",
            cooldown: 5,
            defaultPermission: true,
            description: "Resets the current server configuration settings.",
            examples: [
                "/clearconfig"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: [],
                userPermissions: ["ADMINISTRATOR"]
            },
            usage: "/clearconfig"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void> {
        await client.db.guildConfig.delete({
            where: {
                guildID: Constants["BaseGuild"],
            }
        })
        .then((): Promise<void> => interaction.reply({
            embeds: [
                new Discord.MessageEmbed({
                    color: Constants["Defaults"].embed.color.default,
                    description: `<:white_check_mark:866924630785785876> **Successfully cleared server configuration settings for ${interaction.guild?.name}**`
                })
            ]
        }))
        .catch((): Promise<void> => interaction.reply({
            content: "Looks like an error occurred, unable to update settings.",
            ephemeral: true
        }));
    }
}