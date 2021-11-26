import { AsturaClient } from "../client/Client";
import { Routes } from "discord-api-types/v9";
import { Category } from "../structures/Category";
import { Collection, CommandInteraction, GuildMember, Interaction, Message, PermissionString, TextBasedChannels, TextChannel } from "discord.js";
import { Command } from "../structures/Command";
import { CommandHandlerOptions, CommandHandlerWarnings, CussWords } from "../structures/util/Interfaces";
import { REST } from "@discordjs/rest";
import { readdirSync } from "fs";

export class CommandHandler {
    public aliases: Collection<string, Command>;
    private allowDirectMessages: boolean;
    private blockBots: boolean;
    public categories: Collection<string, Category>;
    private client: AsturaClient;
    public commands: Collection<string, Command>;
    private cooldowns: Collection<string, Collection<string, number>>;
    public directory: string;
    private rest: REST;
    private warnings: CommandHandlerWarnings;

    public constructor(client: AsturaClient, options: CommandHandlerOptions) {
        // Command Handler Options
        this.allowDirectMessages = options.allowDirectMessages;
        this.blockBots = options.blockBots;
        this.directory = options.directory;
        this.warnings = options.warnings;

        // Command Handler Properties
        this.aliases = new Collection();
        this.categories = new Collection();
        this.client = client;
        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.rest = new REST({ version: "9" }).setToken(this.client.config.token);
    };

    public async registerCommands(clientID: string): Promise<unknown> {
        const categories: string[] = [];

        for (const category of readdirSync(this.directory)) {
            categories.push(category.toLowerCase());
        };  

        categories.forEach(async (category: string) => {
            const categoryName: string = this.client.util.string.capitalize(category);

            this.categories.set(categoryName, new Category(categoryName, {
                content: null,
                description: "",
                type: "command"
            }));
        });

        for (const category of categories.values()) {
            for (const commandFileName of readdirSync(`${this.directory}/${category}`).filter((fileName: string): unknown => fileName.endsWith(".js"))) {
                const commandFile = require(`${this.directory}/${category}/${commandFileName}`).default;
                const command: Command = new commandFile();

                this.commands.set(command.id, command);

                if (command.aliases) for (const alias of command.aliases) {
                    this.aliases.set(alias, command);
                };
            };

            this.categories.set(this.client.util.string.capitalize(category), new Category(this.client.util.string.capitalize(category), {
                content: this.commands.filter((cmd: Command): boolean => cmd.category.toLowerCase() === category.toLowerCase()),
                description: "",
                type: "command"
            }));    

            console.log(`${this.client.util.date.getLocalTime()} | [ ${this.client.util.string.capitalize(category)} Module ] Loaded ${readdirSync(`${this.directory}/${category}`).length} command(s)`);
        };  

        console.log(`${this.client.util.date.getLocalTime()} | [ Command Handler ] Loaded ${this.commands.size} command(s)`);

        return this.rest.put(Routes.applicationGuildCommands(clientID, this.client.guildID), {
            body: this.commands.toJSON()
        })
            .then((): void => {
                return console.log(`${this.client.util.date.getLocalTime()} | [ Command Handler ] Successfully registered ${this.commands.toJSON().length} slash commands`);
            })
            .catch((error: Error): void => {
                return console.log(`${this.client.util.date.getLocalTime()} | [ Command Handler ] ${error.stack}`);
            });
    };

    private runCooldownChecks(command: Command, interaction: CommandInteraction): Promise<void> | Promise<Message> | undefined {
        if (!this.cooldowns.has(command.id)) this.cooldowns.set(command.id, new Collection()); 

        const now: number = Date.now();
        const timestamps: Collection<string, number> = this.cooldowns.get(command.id) as Collection<string, number>;
        const cooldownAmount: number = (command.cooldown || 3) * 1000;
        const expirationTime: number = timestamps.get(interaction.user.id) as number + cooldownAmount;
        const timeLeft: number = (expirationTime - now) / 1000;

        if (timestamps.has(interaction.user.id) && !this.client.config.owners.includes(interaction.user.id) && (now < expirationTime) && !command.exceptions.ignoreCooldown.includes(interaction.user.id)) {
            return interaction.reply({
                content: this.warnings.cooldownWarning(interaction, timeLeft.toFixed(1), command),
                ephemeral: true
            }); 
        };

        timestamps.set(interaction.user.id, now);
        setTimeout((): boolean => timestamps.delete(interaction.user.id), cooldownAmount); 
    };

    private runPermissionChecks(command: Command, interaction: CommandInteraction): Promise<void> | Promise<Message> | undefined {
        if ((interaction.channel as TextBasedChannels).type === "DM" && !this.allowDirectMessages === false && command.channel === "guild") {
            return interaction.reply({
                content: this.warnings.dmOnly(interaction),
                ephemeral: true
            });
        };

        if ((interaction.channel as TextBasedChannels).type === "GUILD_TEXT" && command.channel === "dm") {
            return interaction.reply({ 
                content: this.warnings.guildOnly(interaction),
                ephemeral: true
            });
        };

        if (command.ownerOnly && !this.client.config.owners.includes((interaction.user.id))) {
            const missingPermissionsMessage: string = this.warnings.ownerOnly(interaction);

            return interaction.reply({
                embeds: [
                    this.client.util.errorEmbed({
                        type: "OWNER_ONLY",
                        client: this.client,
                        interaction: interaction,
                        errorMessage: missingPermissionsMessage
                    })
                ],
                ephemeral: true
            });
        };

        if (interaction.guild && !(interaction.channel as TextChannel).permissionsFor(interaction.guild.me as GuildMember).toArray().includes("SEND_MESSAGES")) {
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
        };

        if (interaction.guild && command.permissions.clientPermissions && !(interaction.guild.me as GuildMember).permissions.has(command.permissions.clientPermissions)) {
            const missingPermissionsMessage: string = this.warnings.clientMissingPermissions(this.client, interaction, (interaction.guild.me as GuildMember).permissions.missing(command.permissions.clientPermissions).length > 1 ?
                `${(interaction.guild.me as GuildMember).permissions.missing(command.permissions.clientPermissions).slice(0, -1).map((perm: PermissionString) => `\`${perm}\``).join(', ')} and \`${(interaction.guild.me as GuildMember).permissions.missing(command.permissions.clientPermissions).slice(-1)[0]}\`` :
                `\`${(interaction.guild.me as GuildMember).permissions.missing(command.permissions.clientPermissions)[0]}\``, command);

            return interaction.reply({
                embeds: [
                    this.client.util.errorEmbed({
                        type: "CLIENT_PERMISSIONS_MISSING",
                        client: this.client,
                        interaction: interaction,
                        errorMessage: missingPermissionsMessage
                    })
                ],
                ephemeral: true
            });
        };

        if (interaction.guild && command.permissions.userPermissions && !(interaction.member as GuildMember).permissions.has(command.permissions.userPermissions) && !command.exceptions.ignorePermissions.includes(interaction.user.id)) {
            const missingPermissionsMessage: string = this.warnings.userMissingPermissions(this.client, interaction, (interaction.member as GuildMember).permissions.missing(command.permissions.userPermissions).length > 1 ?
                `${(interaction.member as GuildMember).permissions.missing(command.permissions.userPermissions).slice(0, -1).map((perm: PermissionString) => `\`${perm}\``).join(', ')} and \`${(interaction.member as GuildMember).permissions.missing(command.permissions.userPermissions).slice(-1)[0]}\`` :
                `\`${(interaction.member as GuildMember).permissions.missing(command.permissions.userPermissions)[0]}\``, command);

            return interaction.reply({
                embeds: [
                    this.client.util.errorEmbed({
                        type: "USER_PERMISSIONS_MISSING",
                        client: this.client,
                        interaction: interaction,
                        errorMessage: missingPermissionsMessage
                    })
                ],
                ephemeral: true
            });
        };
    };

    public async load(): Promise<void> {
        this.client.on("interactionCreate", async (interaction: Interaction): Promise<any> => {
            if (!interaction.guild) return;
            if (interaction.guild && (interaction.guild?.id !== (this.client.guildID || "755687537753718815"))) return;
            if (interaction.user.bot && this.blockBots) return;
            if (!interaction.isCommand()) return;
            if (interaction.channelId === "859549114592395295") return; // #verification-support

            const command: Command = this.commands.get(interaction.commandName as string) as Command // || this.aliases.get(interaction.commandName);
            if (!command) return;

            await this.runPermissionChecks(command, interaction);
            await this.runCooldownChecks(command, interaction);

            return command.exec(this.client, interaction);
        });

        this.client.on("messageCreate", async (message: Message): Promise<void> => {
            if ((this.client.util.cussWords as CussWords)[message.content.toLowerCase() as keyof CussWords] === 2) message.delete();
            if (message.channelId === "902052635127988295" && !message.interaction && !message.webhookId && !message.author.bot) message.delete();
        });
    };
};