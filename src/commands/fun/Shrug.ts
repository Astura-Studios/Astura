import { Argument } from "../../structures/Argument";
import { APIMessage } from "discord-api-types/V9";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, GuildMember, Message, TextChannel, Webhook } from "discord.js";
import { configOptions } from "../../client/Config";

export default class ShrugCommand extends Command {
    public constructor() {
        super("shrug", {
            arguments: [
                new Argument({
                    name: "message",
                    description: "Your message",
                    required: false,
                    type: "string"
                })
            ],
            category: "Fun",
            channel: "all",
            cooldown: 1,
            description: "Appends ¯\\\_(ツ)\_/¯ to your message.",
            enabledByDefault: true,
            examples: [
                "/shrug",
                "/shrug Hello, World!"
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
                    "MANAGE_WEBHOOKS"
                ],
                userPermissions: [
                    "SEND_MESSAGES",
                    "ADMINISTRATOR"
                ]
            },
            usage: "/shrug [message]"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<APIMessage | Message<boolean> | void> {
        try {
            const webhook: Webhook = await (interaction.channel as TextChannel).createWebhook((interaction.member as GuildMember).nickname || interaction.user.username, {
                avatar: interaction.user.displayAvatarURL()
            });
            const message: string = interaction.options.getString((this.arguments as Argument[])[0].name) as string;
            
            if (message) {
                await webhook.send(`${message} ¯\\\_(ツ)\_/¯`)
                    .then(() => {
                        return webhook.delete();
                    });
            } else {
                await webhook.send(`¯\\\_(ツ)\_/¯`)
                    .then(() => {
                        return webhook.delete();
                    });
            };
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Shrug Command ] ${(error as Error).stack}`);
        };
    };
};