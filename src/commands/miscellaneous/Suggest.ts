import { APIMessage } from "discord-api-types";
import { Argument } from "../../structures/Argument";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, Message, MessageReaction, WebhookClient } from "discord.js";
import { configOptions } from "../../client/Config";
import { OptionChoice } from "../../structures/OptionChoice";

export default class SuggestCommand extends Command {
    public constructor() {
        super("suggest", {
            aliases: ["suggestion"],
            arguments: [
                new Argument({
                    name: "suggestion",
                    description: "Your suggestion.",
                    required: true,
                    type: "string"
                }),
                new Argument({
                    name: "urgent",
                    description: "Describe whether the suggestion is urgent or not.",
                    required: true,
                    type: "string",
                    choices: [
                        new OptionChoice("Yes", "Yes"),
                        new OptionChoice("No", "No")
                    ]
                })
            ],
            category: "Miscellaneous",
            channel: "guild",
            cooldown: 60,
            description: "Add a suggestion to be added to Astura Studio's suggestions channel.",
            enabledByDefault: true,
            examples: [
                "/suggest Add a channel",
                "/suggest Remove a role"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: [
                    "SEND_MESSAGES",
                    "USE_EXTERNAL_EMOJIS"
                ],
                userPermissions: [
                    "SEND_MESSAGES"
                ]
            },
            usage: "/suggest <suggestion>"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<void | MessageReaction> {
        try {
            if (interaction.channelId !== "902052635127988295") return interaction.reply({
                content: `Please ensure you enter a suggestion in the ${client.markdown.channelMention("902052635127988295")} channel!`,
                ephemeral: true
            });

            const suggestion: string = interaction.options.getString((this.arguments as Argument[])[0].name) as string;
            const isUrgent: string = interaction.options.getString((this.arguments as Argument[])[0].name) as string;
            const webhook: WebhookClient = new WebhookClient({
                url: "https://discord.com/api/webhooks/904551726533738546/wGNBwWV23ys2isSM4V7-tWJ3cr8_O24LMJU5cHR6yti7Hw0EmYL_V_soxk_RXiictFwF"
            });

            const webhookMessage: APIMessage = await webhook.send({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        author: {
                            name: `Astura Studios - Suggestion by ${interaction.user.tag}`,
                            iconURL: interaction.guild?.iconURL() as string
                        },
                        description: `${client.markdown.userMention(interaction.user.id)} submitted a suggestion on ${client.markdown.timestamp()}. This suggestion is ${client.markdown.bold(isUrgent.toLowerCase() === "yes" ? "urgent" : "not urgent") }. If you agree with this suggestion, react with :one:. If you disagree, you can react with :two:.`,
                        fields: [
                            { name: "Suggestion", value: suggestion },
                        ],
                        thumbnail: {
                            url: interaction.user.displayAvatarURL({ dynamic: true })
                        }
                    }
                ]
            });

            const message: Message = await interaction.channel?.messages.fetch(webhookMessage.id) as Message;
            await message.react("1️⃣")
            return message.react("2️⃣");
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Suggest Command ] ${(error as Error).stack}`);
        };
    };
};