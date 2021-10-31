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
exports.AsturaClient = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("../handlers/CommandHandler");
const Configuration_1 = require("../structures/Configuration");
const Database_1 = require("../structures/database/Database");
const ListenerHandler_1 = require("../handlers/ListenerHandler");
const Markdown_1 = require("../structures/util/Markdown");
const Utilities_1 = require("../structures/util/Utilities");
const Config_1 = require("./Config");
const path_1 = require("path");
;
class AsturaClient extends discord_js_1.Client {
    constructor() {
        super(Config_1.configOptions.clientOptions);
        this.config = new Configuration_1.Configuration(Config_1.configOptions);
        this.db = new Database_1.Database(this);
        this.markdown = new Markdown_1.Markdown();
        this.util = new Utilities_1.Utilities(this);
        this.commandHandler = new CommandHandler_1.CommandHandler(this, {
            allowDirectMessages: true,
            blockBots: true,
            directory: (0, path_1.join)(__dirname, "..", "commands"),
            warnings: {
                dmOnly: (interaction) => `${this.markdown.userMention(interaction.user.id)}, you can only use this command in servers!`,
                guildOnly: (interaction) => `${this.markdown.userMention(interaction.user.id)}, you can only use this command in direct message channels!`,
                ownerOnly: (interaction) => `${this.markdown.userMention(interaction.user.id)}, only owners can use this command!`,
                clientMissingPermissions: (client, interaction, permissions, command) => `Hey there **${interaction.user.username}**. Unfortunately ${client.user.username} was unable to run the **${command.id}** command as it is missing the following permissions in this server: ${permissions}. If you do not have authorization to do change permissions, let a staff member know.`,
                missingSendPermissions: (interaction) => `${this.markdown.userMention(interaction.user.id)}, I am missing the following permission(s): \`Send Messages\``,
                userMissingPermissions: (client, interaction, permissions, command) => `Hey there **${interaction.user.username}**. Unfortunately ${client.user.username} was unable to run the **${command.id}** command as you are missing the following permissions in this server: ${permissions}. If you do not have authorization to do change permissions, let a staff member know.`,
                cooldownWarning: (interaction, remaining, command) => `${this.markdown.userMention(interaction.user.id)}, please wait **${remaining}** seconds before reusing the \`${command.id}\` command!`
            }
        });
        this.listenerHandler = new ListenerHandler_1.ListenerHandler(this, {
            directory: (0, path_1.join)(__dirname, "..", "listeners")
        });
    }
    ;
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commandHandler.registerCommands(this.config.clientID);
            yield this.commandHandler.load();
            yield this.listenerHandler.load();
            //await this.db.init();
            //await this.db.connect();
        });
    }
    ;
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.init();
                return this.login(this.config.token);
            }
            catch (error) {
                return console.log(`${this.util.date.getLocalTime()} | [ Astura Client ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.AsturaClient = AsturaClient;
;
