"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const discord_api_types_1 = require("discord-api-types");
const Category_1 = require("../structures/Category");
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const fs_1 = require("fs");
class CommandHandler {
    constructor(client, options) {
        // Command Handler Options
        this.allowDirectMessages = options.allowDirectMessages;
        this.blockBots = options.blockBots;
        this.directory = options.directory;
        this.warnings = options.warnings;
        // Command Handler Properties
        this.aliases = new discord_js_1.Collection();
        this.categories = new discord_js_1.Collection();
        this.client = client;
        this.commands = new discord_js_1.Collection();
        this.rest = new rest_1.REST({ version: "9" }).setToken(this.client.config.token);
    }
    ;
    registerCommands() {
        return this.rest.put(discord_api_types_1.Routes.applicationCommands(this.client.user.id), {
            body: this.commands.toJSON()
        })
            .then(() => {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Command Handler ] Successfully registered ${this.commands.toJSON().length} slash commands`);
        })
            .catch((error) => {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Command Handler ] ${error.stack}`);
        });
    }
    ;
    runPermissionChecks(command, interaction) {
        if (interaction.channel.type === "DM" && !this.allowDirectMessages === false && command.channel === "guild") {
            return interaction.reply(this.warnings.dmOnly(interaction));
        }
        ;
        if (interaction.channel.type === "GUILD_TEXT" && command.channel === "dm") {
            return interaction.reply(this.warnings.guildOnly(interaction));
        }
        ;
        if (command.ownerOnly && !this.client.config.owners.includes((interaction.user.id))) {
            const missingPermissionsMessage = this.warnings.ownerOnly(interaction);
            return interaction.reply({
                embeds: [
                    this.client.util.errorEmbed({
                        type: "OWNER_ONLY",
                        client: this.client,
                        interaction: interaction,
                        errorMessage: missingPermissionsMessage
                    })
                ]
            });
        }
        ;
        if (interaction.guild && !interaction.channel.permissionsFor(interaction.guild.me).toArray().includes("SEND_MESSAGES")) {
            return interaction.user.send({
                embeds: [
                    this.client.util.errorEmbed({
                        type: "CLIENT_PERMISSIONS_MISSING",
                        client: this.client,
                        interaction: interaction,
                        errorMessage: this.warnings.clientMissingPermissions(this.client, interaction, "`Send Messages`", command)
                    })
                ]
            });
        }
        ;
        if (interaction.guild && command.permissions.clientPermissions && !interaction.guild.me.permissions.has(command.permissions.clientPermissions)) {
            const missingPermissionsMessage = this.warnings.clientMissingPermissions(this.client, interaction, interaction.guild.me.permissions.missing(command.permissions.clientPermissions).length > 1 ?
                `${interaction.guild.me.permissions.missing(command.permissions.clientPermissions).slice(0, -1).map((perm) => `\`${perm}\``).join(', ')} and \`${interaction.guild.me.permissions.missing(command.permissions.clientPermissions).slice(-1)[0]}\`` :
                `\`${interaction.guild.me.permissions.missing(command.permissions.clientPermissions)[0]}\``, command);
            return interaction.reply({
                embeds: [
                    this.client.util.errorEmbed({
                        type: "CLIENT_PERMISSIONS_MISSING",
                        client: this.client,
                        interaction: interaction,
                        errorMessage: missingPermissionsMessage
                    })
                ]
            });
        }
        ;
        if (interaction.guild && command.permissions.userPermissions && !interaction.member.permissions.has(command.permissions.userPermissions) && !command.exceptions.ignorePermissions.includes(interaction.user.id)) {
            const missingPermissionsMessage = this.warnings.userMissingPermissions(this.client, interaction, interaction.member.permissions.missing(command.permissions.userPermissions).length > 1 ?
                `${interaction.member.permissions.missing(command.permissions.userPermissions).slice(0, -1).map((perm) => `\`${perm}\``).join(', ')} and \`${interaction.member.permissions.missing(command.permissions.userPermissions).slice(-1)[0]}\`` :
                `\`${interaction.member.permissions.missing(command.permissions.userPermissions)[0]}\``, command);
            return interaction.reply({
                embeds: [
                    this.client.util.errorEmbed({
                        type: "USER_PERMISSIONS_MISSING",
                        client: this.client,
                        interaction: interaction,
                        errorMessage: missingPermissionsMessage
                    })
                ]
            });
        }
        ;
    }
    ;
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = [];
            for (const category of (0, fs_1.readdirSync)(this.directory)) {
                categories.push(category.toLowerCase());
            }
            ;
            categories.forEach((category) => __awaiter(this, void 0, void 0, function* () {
                const categoryName = this.client.util.string.capitalize(category);
                this.categories.set(categoryName, new Category_1.Category(categoryName, {
                    content: null,
                    description: "",
                    type: "command"
                }));
            }));
            for (const category of categories.values()) {
                for (const commandFileName of (0, fs_1.readdirSync)(`${this.directory}/${category}`).filter(fileName => fileName.endsWith(".js"))) {
                    const commandFile = require(`${this.directory}/${category}/${commandFileName}`).default;
                    const command = new commandFile();
                    this.commands.set(command.id, command);
                    if (command.aliases)
                        for (const alias of command.aliases) {
                            this.aliases.set(alias, command);
                        }
                    ;
                }
                ;
                this.categories.set(this.client.util.string.capitalize(category), new Category_1.Category(this.client.util.string.capitalize(category), {
                    content: this.commands.filter(cmd => cmd.category.toLowerCase() === category.toLowerCase()),
                    description: "",
                    type: "command"
                }));
                console.log(`${this.client.util.date.getLocalTime()} | [ ${this.client.util.string.capitalize(category)} Module ] Loaded ${(0, fs_1.readdirSync)(`${this.directory}/${category}`).length} command(s)`);
            }
            ;
            console.log(`${this.client.util.date.getLocalTime()} | [ Command Handler ] Loaded ${this.commands.size} command(s)`);
            this.client.on("interactionCreate", (interaction) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (interaction.user.bot && this.blockBots)
                    return;
                if (!interaction.isCommand())
                    return;
                const command = this.commands.get((_a = interaction.command) === null || _a === void 0 ? void 0 : _a.name);
                if (!command)
                    return;
                yield this.runPermissionChecks(command, interaction);
                yield this.registerCommands();
                return command.exec(this.client, interaction);
            }));
        });
    }
    ;
}
exports.CommandHandler = CommandHandler;
;
