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
const Manager_1 = require("../structures/music/Manager");
const Markdown_1 = require("../structures/util/Markdown");
const Utilities_1 = require("../structures/util/Utilities");
const Config_1 = require("./Config");
const path_1 = require("path");
const Nodes_1 = require("../structures/music/Nodes");
;
class AsturaClient extends discord_js_1.Client {
    constructor() {
        super(Config_1.configOptions.clientOptions);
        this.config = new Configuration_1.Configuration(Config_1.configOptions);
        this.db = new Database_1.Database(this);
        this.guild = this.guilds.cache.get("760659394370994197");
        this.guildID = "760659394370994197";
        this.manager = new Manager_1.Manager(this);
        this.markdown = new Markdown_1.Markdown();
        this.nodes = Nodes_1.nodes;
        this.util = new Utilities_1.Utilities(this);
        this.queues = new discord_js_1.Collection();
        this.commandHandler = new CommandHandler_1.CommandHandler(this, {
            allowDirectMessages: true,
            blockBots: true,
            directory: (0, path_1.join)(__dirname, "..", "commands"),
            warnings: {
                dmOnly: (interaction) => `${this.markdown.userMention(interaction.user.id)}, you can only use this command in servers!`,
                guildOnly: (interaction) => `${this.markdown.userMention(interaction.user.id)}, you can only use this command in direct message channels!`,
                ownerOnly: (interaction) => `${this.markdown.userMention(interaction.user.id)}, it seems that I was unable to execute the command because it is reserved for the owners of the bot. If you think this is a mistake, feel free to contact the bot developers (${this.markdown.userMention(this.config.owners[0])}).`,
                clientMissingPermissions: (client, interaction, permissions, command) => `Hey there **${interaction.user.username}**. Unfortunately ${client.user.username} was unable to run the **${command.id}** command as it is missing the following permissions in this server: ${permissions}. If you do not have authorization to do change permissions, let a staff member know.`,
                missingSendPermissions: (interaction) => `${this.markdown.userMention(interaction.user.id)}, it seems that I was unable to execute the command as I am missing the following permission(s) in the server: \`Send Messages\``,
                userMissingPermissions: (client, interaction, permissions, command) => `${this.markdown.userMention(interaction.user.id)}, it seems that I was unable to execute the **${command.id}** command as you are missing the following permissions in this server: ${permissions}. Please ensure you have the correct permissions required and rerun the command. If you think this is a mistake, feel free to contact the bot developers (${this.markdown.userMention(this.config.owners[0])}).`,
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
            yield this.db.init();
            yield this.db.connect();
            yield this.manager.connect();
            this.manager.on("error", (error, _node) => {
                return console.log(`[ Lavalink Manager ] ${error.stack}`);
            });
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
