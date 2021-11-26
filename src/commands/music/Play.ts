import { Argument } from "../../structures/Argument";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, GuildMember, TextChannel } from "discord.js";
import { Queue } from "../../structures/music/Queue";
import { Song } from "../../structures/util/Interfaces";
import { configOptions } from "../../client/Config";

export default class PlayCommand extends Command {
    public constructor() {
        super("play", {
            arguments: [
                new Argument({
                    name: "song",
                    description: "The song to play in the voice channel.",
                    required: true,
                    type: "string"
                })
            ],
            category: "Music",
            channel: "guild",
            cooldown: 7,
            description: "Plays a given song in the voice channel the user is in.",
            enabledByDefault: true,
            examples: [
                "play Ascendus - Risen",
                "play https://www.youtube.com/watch?v=elYgELiZ2_4"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES", "CONNECT", "SPEAK", "USE_EXTERNAL_EMOJIS",],
                userPermissions: ["SEND_MESSAGES", "CONNECT", "SPEAK"]
            },
            usage: "play <url/song title>"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<void> {
        try {
            if (!(interaction.member as GuildMember).voice.channel) return interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        author: {
                            name: "Looks like you've been lost in the void.",
                            iconURL: interaction.user.avatarURL({ dynamic: true }) as string
                        },
                        description: `${client.markdown.userMention(interaction.user.id)}, it seems I was unable to play the song you requested for using your search query as you are not in a voice channel. Please join a voice channel first and then rerun the command.` 
                    }
                ],
                ephemeral: true
            });


            const inputSong: string = interaction.options.getString("song") as string;

            if (!client.queues.get(interaction.guildId)) client.queues.set(interaction.guildId, new Queue(client, {
                guildID: interaction.guildId,
                channelID: (interaction.member as GuildMember).voice.channel?.id as string,
                textChannel: interaction.channel as TextChannel
            }));

            const guildQueue: Queue = client.queues.get(interaction.guildId) as Queue;
            const result: Song[] | [] = await guildQueue.search(inputSong);
            const song: Song = result[0];

            if (!song) return interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        author: {
                            name: "There seems to have been a glitch...",
                            iconURL: interaction.user.avatarURL({ dynamic: true }) as string
                        },
                        description: `${client.markdown.userMention(interaction.user.id)}, it seems that I was unable to find the song you requested for using your search query. Please ensure you have spelt everything correctly and rerun the command.` 
                    }
                ],
                ephemeral: true
            });

            const isAdded: boolean = await guildQueue.play(song);

            if (isAdded) {
                return interaction.reply({
                    embeds: [
                        {
                            color: client.util.defaults.embed.color,
                            title: `Added to queue: ${song.info.author}`,
                            fields: [
                                { name: "Author", value: song.info.author, inline: true },
                                { name: "Length", value: client.util.date.convertFromMs(song.info.length, true, "d:h:m:s", "max") as string, inline: true },
                                { name: "Link", value: song.info.uri, inline: true } 
                            ]
                        }
                    ]
                });
            };
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Play Command ] ${(error as Error).stack}`);
        };
    };
};