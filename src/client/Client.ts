import { Client, ClientUser, CommandInteraction } from "discord.js";
import { Command } from "../structures/Command";
import { CommandHandler } from "../handlers/CommandHandler";
import { Configuration } from "../structures/Configuration";
import { Database } from "../structures/database/Database";
import { ListenerHandler } from "../handlers/ListenerHandler";
import { Markdown } from "../structures/util/Markdown";
import { Utilities } from "../structures/util/Utilities";

import { configOptions } from "./Config";
import { join } from "path";

declare module "discord.js" {
    interface Client {
        commandHandler: CommandHandler;
        config: Configuration;
        db: Database;
        listenerHandler: ListenerHandler;
        markdown: Markdown;
        util: Utilities;
    }
};

export class AsturaClient extends Client {
    public commandHandler: CommandHandler;
    public config: Configuration;
    public db: Database;
    public listenerHandler: ListenerHandler;
    public markdown: Markdown;
    public util: Utilities;

    public constructor() {
        super(configOptions.clientOptions);

        this.config = new Configuration(configOptions);
        this.db = new Database(this);
        this.markdown = new Markdown();
        this.util = new Utilities(this);

        this.commandHandler = new CommandHandler(this, {
            allowDirectMessages: true,
            blockBots: true,
            directory: join(__dirname, "..", "commands"),
            warnings: {
                dmOnly: (interaction: CommandInteraction): string => `${this.markdown.userMention(interaction.user.id)}, you can only use this command in servers!`,
                guildOnly: (interaction: CommandInteraction): string => `${this.markdown.userMention(interaction.user.id)}, you can only use this command in direct message channels!`,
                ownerOnly: (interaction: CommandInteraction): string => `${this.markdown.userMention(interaction.user.id)}, only owners can use this command!`,

                clientMissingPermissions: (client: AsturaClient, interaction: CommandInteraction, permissions: string, command: Command): string => `Hey there **${interaction.user.username}**. Unfortunately ${(client.user as ClientUser).username} was unable to run the **${command.id}** command as it is missing the following permissions in this server: ${permissions}. If you do not have authorization to do change permissions, let a staff member know.`,
                missingSendPermissions: (interaction: CommandInteraction): string => `${this.markdown.userMention(interaction.user.id)}, I am missing the following permission(s): \`Send Messages\``,
                userMissingPermissions: (client: AsturaClient, interaction: CommandInteraction, permissions: string, command: Command): string => `Hey there **${interaction.user.username}**. Unfortunately ${(client.user as ClientUser).username} was unable to run the **${command.id}** command as you are missing the following permissions in this server: ${permissions}. If you do not have authorization to do change permissions, let a staff member know.`,

                cooldownWarning: (interaction: CommandInteraction, remaining: string, command: Command): string => `${this.markdown.userMention(interaction.user.id)}, please wait **${remaining}** seconds before reusing the \`${command.id}\` command!`
            }
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "..", "listeners")
        });
    };

    private async init() {
        await this.commandHandler.registerCommands(this.config.clientID);
        await this.commandHandler.load();
        await this.listenerHandler.load();

        //await this.db.init();
        //await this.db.connect();
    };

    public async start(): Promise<string | void> {
        try {
            await this.init();
            return this.login(this.config.token);
        } catch (error) {
            return console.log(`${this.util.date.getLocalTime()} | [ Astura Client ] ${(error as Error).stack}`);
        };
    };
};