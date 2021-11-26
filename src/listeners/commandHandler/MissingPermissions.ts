import { AsturaClient } from "../../client/Client";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import { Listener } from "../../structures/Listener";
import { MissingPermissions } from "../../structures/util/Types";

export default class MissingPermissionsListener extends Listener {
    public constructor() {
        super("missingPermissions", {
            category: "commandHandler",
            emitter: "commandHandler",
            name: "missingPermissions"
        });
    };

    public async exec(_client: AsturaClient, interaction: CommandInteraction, embed: MessageEmbed, type: MissingPermissions): Promise<void | Message<boolean>> {
        if (type === "CLIENT_SEND_PERMISSIONS_MISSING") {
            return interaction.user.send({
                embeds: [
                    embed
                ]
            });
        } else {
            return interaction.reply({
                embeds: [
                    embed
                ],
                ephemeral: true
            });
        };
    };
};