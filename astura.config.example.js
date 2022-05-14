const { Format } = require("./build/lib/util/exports");
const { version } = require("./package.json");

/**
 * The configuration options for Astura.
 * Ignore all options except for the "token" option. Replace "ASTURA_TOKEN" with a valid token.
 * Create a copy of this file and rename it to "astura.config.js". Do not delete this file.
 * @type {import("./src/lib/base/interfaces").ConfigOptions}
 */
module.exports = {
    "commandHandler": {
        "apiVersion": "9",
        "blockBots": true,
        "directory": `${process.cwd()}/build/commands`,
        "warnings": {
            "ownerOnly": (_client, interaction) => `${Format.userMention(interaction.user.id)}, it seems that I was unable to execute the command because it is reserved for the owners of the bot. If you think this is a mistake, feel free to contact the bot developers (${Format.userMention(module.exports.owners[0])}).`,

            "clientMissingPermissions": (client, interaction, permissions, command) => `Hey there **${interaction.user.username}**. Unfortunately ${client.user.username} was unable to run the **${command.name}** command as it is missing the following permissions in this server: ${permissions}. If you do not have authorization to do change permissions, let a staff member know.`,
            "missingSendPermissions": (_client, interaction) => `${Format.userMention(interaction.user.id)}, it seems that I was unable to execute the command as I am missing the following permission(s) in the server: \`Send Messages\``,
            "userMissingPermissions": (_client, interaction, permissions, command) => `${Format.userMention(interaction.user.id)}, it seems that I was unable to execute the **${command.name}** command as you are missing the following permissions in this server: ${permissions}. Please ensure you have the correct permissions required and rerun the command. If you think this is a mistake, feel free to contact the bot developers (${client.format.userMention(module.exports.owners[0])}).`,

            "cooldownWarning": (_client, interaction, remaining, command) => `${Format.userMention(interaction.user.id)}, please wait **${remaining}** seconds before reusing the \`${command.name}\` command!`
        }
    },
    "inhibitorHandler": {
        "directory": `${process.cwd()}/build/inhibitors`
    },
    "listenerHandler": {
        "directory": `${process.cwd()}/build/listeners`
    },
    "routeOptions": {
        "clientID": "859422848199819284",
        "guildID": "755687537753718815"
    },
    "owners": ["760995822120468511", "752114457202917436", "599324888716804108"],
    "release": "alpha",
    "token": "ASTURA_TOKEN",
    "version": version
}