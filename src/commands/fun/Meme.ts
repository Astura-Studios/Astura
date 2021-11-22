import { APIMessage } from "discord-api-types/v9";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, Message } from "discord.js";
import { Meme } from "../../structures/util/Interfaces";
import { configOptions } from "../../client/Config";
import fetch, { Response } from "node-fetch";

export default class MemeCommand extends Command {
    public constructor() {
        super("meme", {
            category: "Fun",
            channel: "all",
            cooldown: 5,
            description: "Fetches a random meme post from Reddit.",
            enabledByDefault: true,
            examples: [
                "/meme"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: [
                    "SEND_MESSAGES"
                ],
                userPermissions: [
                    "SEND_MESSAGES"
                ]
            },
            usage: "/meme"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<APIMessage | Message<boolean> | void> {
        try {
            fetch("https://meme-api.herokuapp.com/gimme")
                .then((response: Response): any => response.json())
                .then((content: Meme): Promise<void> => {
                    return interaction.reply({
                        embeds: [
                            {
                                color: client.util.defaults.embed.color,
                                title: `${content.title} (by ${content.author})`,
                                url: content.postLink,
                                image: {
                                    url: content.url
                                },
                                description: `<:thumbs_up_white:796179483253538898> ${content.ups}`/**`, <:thumbs_down_white:796178894809202719> ${memeDownvotes}, <:chat_white_icon:796178895119581224> ${memeComments}`**/
                            }
                        ]
                    });
                })
                .catch((error: Error): Promise<void> => {
                    console.log(`${client.util.date.getLocalTime()} | [ Shrug Command ] ${(error as Error).stack}`);

                    return interaction.reply({
                        content: "Something went wrong! Please try again.",
                        ephemeral: true
                    });
                });
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Shrug Command ] ${(error as Error).stack}`);
        };
    };
};