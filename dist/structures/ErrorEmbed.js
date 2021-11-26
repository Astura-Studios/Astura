"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEmbed = void 0;
class ErrorEmbed {
    invalidArguments(client, command, interaction, errorMessage) {
        return client.util.embed({
            color: client.util.defaults.embed.color,
            author: {
                name: "This command was cancelled as the provided arguments were invalid.",
                icon_url: interaction.user.displayAvatarURL({ dynamic: true })
            },
            description: `Hey there **${interaction.user.username}**, the \`${command.id}\` command was cancelled as the arguments you provided for the command were invalid. ${errorMessage} In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Command Usage:** \`${command.usage}\`\n**Command Usage Example:** \`${Array.isArray(command.examples) ? command.examples[0] : command.examples}\``
        });
    }
    ;
    missingAruments(client, command, interaction, errorMessage) {
        return client.util.embed({
            color: client.util.defaults.embed.color,
            author: {
                name: "This command was cancelled as no required arguments were provided.",
                icon_url: interaction.user.displayAvatarURL({ dynamic: true })
            },
            description: `Hey there **${interaction.user.username}**, the \`${command.id}\` command was cancelled as no arguments that are required for the command were provided. ${errorMessage} In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Command Usage:** \`${command.usage}\`\n**Command Usage Example:** \`${Array.isArray(command.examples) ? command.examples[0] : command.examples}\``
        });
    }
    ;
    userPermissionsMissing(client, errorMessage, interaction) {
        return client.util.embed({
            color: client.util.defaults.embed.color,
            author: {
                name: "Looks like you're missing permissions! You must construct additional pylons.",
                icon_url: interaction.user.displayAvatarURL({ dynamic: true })
            },
            description: errorMessage
        });
    }
    ;
    clientPermissionsMissing(client, errorMessage, interaction) {
        return client.util.embed({
            color: client.util.defaults.embed.color,
            author: {
                name: "Looks like I'm missing permissions in the server! Party time's over.",
                icon_url: interaction.user.displayAvatarURL({ dynamic: true })
            },
            description: errorMessage
        });
    }
    ;
    ownerOnly(client, errorMessage, interaction) {
        return client.util.embed({
            color: client.util.defaults.embed.color,
            author: {
                name: "You have restricted access. This command is reserved for the VIPs only.",
                icon_url: interaction.user.displayAvatarURL({ dynamic: true })
            },
            description: errorMessage
        });
    }
    ;
}
exports.ErrorEmbed = ErrorEmbed;
;
