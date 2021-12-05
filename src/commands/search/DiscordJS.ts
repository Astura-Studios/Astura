import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, Message, MessageReaction, User } from "discord.js";

import { configOptions } from "../../client/Config";

export default class DiscordJSCommand extends Command {
    public constructor() {
        super("djs", {
            aliases: ["discordjs"],
            category: "Search",
            channel: "all",
            cooldown: 4,
            description: "Fetches information from the official discord.js documentation using a provided search query.",
            enabledByDefault: true,
            examples: [
                "djs Client",
                "discordjs TextChannel#send()"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES", "ADD_REACTIONS", "USE_EXTERNAL_EMOJIS"],
                userPermissions: ["SEND_MESSAGES"]
            },
            usage: "djs <query>",
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction) {
        try {
            const query: string = interaction.options.getString("query") as string;
            const URL: string = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;
            const data: Response = await fetch(URL);
            const embed: any = await data.json();

            if (!embed || embed.error) {
                const promise: Promise<unknown> = new Promise((resolve: (value: unknown) => void, _reject: (reason?: any) => void): void => {
                    return resolve(
                        interaction.reply({
                            embeds: [
                                {
                                    color: 0x2296f3,
                                    author: {
                                        name: `Discord.js Docs (stable)`,
                                        iconURL: "https://images-ext-1.discordapp.net/external/5T4uh_keplxixt9k8Rnivq5dMvrLOW2Z11k-OXn-3io/https/discord.js.org/favicon.ico"
                                    },
                                    title: "Search results:",
                                    description: "No results found."
                                }
                            ]
                        })
                    );
                });

                promise.then(async (): Promise<void> => {
                    const message: Message = (interaction.channel?.lastMessage as Message);
                    message.react("🗑️");

                    let react;
                    const filter = (reaction: MessageReaction, user: User) => reaction.emoji.name === "🗑️" && user.id === message.author.id;
                    react = await message.awaitReactions({ filter, time: undefined, max: 1, errors: ["time"] });
                    if (react && react.first()) message.delete();
                });
            } else {
                const promise: Promise<unknown> = new Promise((resolve: (value: unknown) => void, _reject: (reason?: any) => void): void => {
                    return resolve(
                        interaction.reply({
                            embeds: [
                                embed
                            ]
                        })
                    );
                });

                promise.then(async (): Promise<void> => {
                    const message: Message = (interaction.channel?.lastMessage as Message);
                    message.react("🗑️");

                    let react;
                    const filter = (reaction: MessageReaction, user: User) => reaction.emoji.name === "🗑️" && user.id === message.author.id;
                    react = await message.awaitReactions({ filter, time: undefined, max: 1, errors: ["time"] });
                    if (react && react.first()) message.delete();
                });
            };
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ DiscordJS Command ] ${(error as Error).stack}`)
        };  
    };
};