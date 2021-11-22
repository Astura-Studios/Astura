import { Argument } from "../../structures/Argument";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, GuildMember, TextChannel } from "discord.js";
import { Queue } from "../../structures/music/Queue";
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
                content: "You must be in a voice channel to play a song!",
                ephemeral: true
            });

            const inputSong: string = interaction.options.getString("song") as string;
            if (!inputSong) return interaction.reply({
                content: "Please provide a song to play!",
                ephemeral: true
            });

            const guildQueue: Queue = client.queues.get(interaction.guildId) as Queue;
            if (guildQueue) client.queues.set(interaction.guildId, new Queue(client, {
                guildID: interaction.guildId,
                channelID: (interaction.member as GuildMember).voice.channel?.id as string,
                textChannel: interaction.channel as TextChannel
            }));

            const { song }: any = await (await guildQueue.search(inputSong)).json();
            if (!song) return interaction.reply({
                content: "Unknown song.",
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
                                { name: "Length", value: client.util.date.convertFromMs(song.info.author), inline: true },
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