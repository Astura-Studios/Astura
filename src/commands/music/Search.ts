import { Argument } from "../../structures/Argument";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, GuildMember, Message, TextChannel } from "discord.js";
import { Queue } from "../../structures/music/Queue";
import { configOptions } from "../../client/Config";

export default class SearchCommand extends Command {
    public constructor() {
        super("play", {
            arguments: [
                new Argument({
                    name: "query",
                    description: "The search queury you want to use to search for a song.",
                    required: true,
                    type: "string"
                })
            ],
            category: "Music",
            channel: "guild",
            cooldown: 5,
            description: "Uses a provided search query and returns a list of songs with names similiar to the search query.",
            enabledByDefault: true,
            examples: [
                "search Ascendus - Legacy",
                "search Ascendus - Resurgence"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
                userPermissions: ["SEND_MESSAGES"]
            },
            usage: "search <query>"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<any> {
        try {
            const searchQuery: string = interaction.options.getString("query") as string;
            if (!searchQuery) return interaction.reply({
                content: "Please provide a search query.",
                ephemeral: true
            });
            
            if (!(interaction.member as GuildMember).voice.channel) return interaction.reply({
                content: "You are not in a voice channel.",
                ephemeral: true
            });

            const guildQueue: Queue = client.queues.get(interaction.guildId) as Queue;
            if (guildQueue) client.queues.set(interaction.guildId, new Queue(client, {
                guildID: interaction.guildId,
                channelID: (interaction.member as GuildMember).voice.channel?.id as string,
                textChannel: interaction.channel as TextChannel
            }));

            const songs: any = await (await guildQueue.search(searchQuery)).json();
            if (!songs || songs.length === 0) return interaction.reply({
                content: "Unknown song.",
                ephemeral: true
            });

            const list: any = songs.slice(0, 5);
            const options: any = list.map((song: any, index: any) => `${++index}) ${song.info.title} - ${song.info.author} - ${client.util.date.convertFromMs(song.info.length)}`);

            interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        title: "Search Results",
                        description: client.markdown.codeBlock(`${options.join("\n")}\n`)
                    }
                ]
            });

            const filter = (m: Message): boolean => m.author.id === interaction.user.id && ["1", "2", "3", "4", "5", "cancel"].includes(m.content);
            const chosenSong: string = (await (await (interaction.channel as TextChannel).awaitMessages({ filter, max: 1 }))).first()?.content as string;
            if (chosenSong === "cancel") return interaction.reply({
                content: "Cancelled search command.",
                ephemeral: true
            });

            const song: any = list[parseInt(chosenSong) - 1];
            const isAdded: boolean = await guildQueue.play(song);

            if (isAdded) {
                return interaction.reply({
                    embeds: [
                        {
                            color: client.util.defaults.embed.color,
                            title: `Added to queue: ${song.info.author}`,
                            fields: [
                                { name: "Author", value: song.info.author, inline: true },
                                { name: "Length", value: client.util.date.convertFromMs(song.info.author), inline: true },
                                { name: "Link", value: song.info.uri, inline: true } 
                            ]
                        }
                    ]
                });
            }
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Search Command ] ${(error as Error).stack}`);
        };
    };
};