/* eslint-disable @typescript-eslint/ban-types */
import { AsturaError } from "../../util/exports";
import { Category, Client, Inhibitor, SlashCommand } from "../../core/exports";
import { Collection, Interaction } from "discord.js";
import { CommandHandlerOptions, CommandHandlerWarnings } from "../../base/interfaces";
import { Constants } from "../../base/constants";
import { EventEmitter } from "stream";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { readdirSync, statSync } from "fs";

export class CommandHandler extends EventEmitter {
    public aliases: Collection<string, SlashCommand>;
    public blockBots?: boolean;
    public categories: Collection<string, Category>;
    public client: Client;
    public commands: Collection<string, SlashCommand>;
    public cooldowns: Collection<string, Collection<string, number>>;
    public directory: string;
    public inhibitors: Collection<string, Inhibitor>;
    public rest: REST;
    public warnings?: CommandHandlerWarnings | undefined;

    public constructor(client: Client, options: CommandHandlerOptions) {
        super();
        this.aliases = new Collection<string, SlashCommand>();
        this.blockBots = options.blockBots || true;
        this.categories = new Collection<string, Category>();
        this.client = client;
        this.commands = new Collection<string, SlashCommand>();
        this.cooldowns = new Collection<string, Collection<string, number>>();
        this.directory = options.directory;
        this.rest = new REST({ version: options.apiVersion }).setToken(this.client.config.token);
        this.warnings = options.warnings || undefined;

        this.addListener("error", (error: AsturaError): void => {
            return this.client.console.error(error.stack, error.emitter as string, error.kill);
        });

        this.addListener("register", (size: number): void => {
            return this.client.console.info(`Succesfully registered ${size} commands`, "astura.commandHandler");
        });

        this.addListener("unregister", (command: SlashCommand): void => {
            return this.client.console.info(`Succesfully unregistered ${command.name} command`, "astura.commandHandler");
        });

        this.addListener("load", (size: number): void => {
            return this.client.console.info(`Succesfully loaded from ${size} command files`, "astura.commandHandler");
        });

        this.addListener("ready", (): void => {
            return this.client.console.info("Astura command handler successfully initiated", "astura.commandHandler");
        });
    }

    public register(command: SlashCommand): void {
        if (!this.categories.get(command.categoryID)) {
            this.categories.set(command.categoryID, new Category(command.categoryID, {
                commands: new Collection().set(command.name, command) as Collection<string, SlashCommand>,
                enabled: true,
                description: Constants["ModuleDescriptions"][command.categoryID],
                ownerOnly: false
            }));

            (command.category as Category | undefined) = this.categories.get(command.categoryID);
            this.commands.set(command.name, command);
        } else if (this.categories.get(command.categoryID)) {
            this.commands.set(command.name, command);

            this.categories.set(command.categoryID, new Category(command.categoryID, {
                commands: this.commands.filter((cmd: SlashCommand): boolean => cmd.categoryID === command.categoryID),
                enabled: true,
                description: Constants["ModuleDescriptions"][command.categoryID],
                ownerOnly: false
            }));
        }

        if (command.aliases) {
            command.aliases.forEach((alias: string): void => {
                const aliasCommand: SlashCommand = new SlashCommand(alias, {
                    aliases: command.aliases,
                    arguments: command.arguments,
                    categoryID: command.categoryID,
                    channel: command.channel,
                    cooldown: command.cooldown,
                    defaultPermission: command.defaultPermission,
                    description: command.description,
                    examples: command.examples,
                    ownerOnly: command.ownerOnly,
                    permissions: command.permissions || {
                        clientPermissions: [],
                        userPermissions: []
                    },
                    subCommands: command.subCommands,
                    usage: command.usage
                });

                aliasCommand.category = this.categories.get(command.categoryID) as Category;
                aliasCommand.exec = command.exec;
                this.aliases.set(alias, aliasCommand);
            });
        }
    }

    public unregister(command: SlashCommand): void {
        if (!this.categories.get(command.categoryID)) {
            this.commands.delete(command.name);
        } else if (this.categories.get(command.categoryID)) {
            const category: Category = this.categories.get(command.categoryID) as Category;
            category.commands.delete(command.name);
            this.categories.set(command.categoryID, category);
            this.commands.delete(command.name);
        }

        if (command.aliases) {
            command.aliases.forEach((alias: string): void => {
                if (this.aliases.get(alias)) {
                    this.aliases.delete(alias);
                }
            });
        }
    }

    public async load(): Promise<void> {
        if (!this.directory) return this.client.console.error("No command directory was provided", "astura.commandHandler");
        if (!readdirSync(this.directory)) return this.client.console.error("Specified directory does not exist", "astura.commandHandler");

        const directory: string[] = readdirSync(this.directory);
        const subDirectories: string[] = directory.filter((child: string): boolean => statSync(`${this.directory}/${child}`).isDirectory());
        const commandFiles: string[] = directory.filter((child: string): boolean => child.endsWith(".js")).map((file: string): string => `${this.directory}/${file}`);

        if (subDirectories.length > 0) {
            subDirectories.forEach((subDirectory: string): void => {
                readdirSync(`${this.directory}/${subDirectory}`).filter((child: string): boolean => child.endsWith(".js")).forEach((file: string): void => {
                    commandFiles.push(`${this.directory}/${subDirectory}/${file}`);
                });
            });
        }

        if (commandFiles.length === 0) return this.client.console.error("No commands found to resolve from configured directory", "astura.commandHandler", true);

        for (const commandFile of commandFiles.values()) {
            const Instance: typeof SlashCommand = (await import(commandFile) as { default: typeof SlashCommand; }).default;
            const isCommand: boolean = Instance.prototype instanceof SlashCommand;

            if (!isCommand) {
                return this.client.console.error(`Filepath ${commandFile} has no exported command`, "astura.commandHandler", true);
            } else if (isCommand) {
                const command: SlashCommand = new Instance(new Instance().name, {
                    aliases: Instance.prototype.aliases,
                    arguments: Instance.prototype.arguments,
                    categoryID: Instance.prototype.categoryID,
                    channel: Instance.prototype.channel,
                    cooldown: Instance.prototype.cooldown,
                    defaultPermission: Instance.prototype.defaultPermission,
                    description: Instance.prototype.description,
                    examples: Instance.prototype.examples,
                    ownerOnly: Instance.prototype.ownerOnly,
                    permissions: Instance.prototype.permissions || {
                        clientPermissions: [],
                        userPermissions: []
                    },
                    subCommands: Instance.prototype.subCommands,
                    usage: Instance.prototype.usage
                });

                this.register(command);
            }
        };

        this.rest.put(Routes.applicationGuildCommands(this.client.config.routeOptions.clientID, this.client.config.routeOptions.guildID), {
            body: this.commands.map((command: SlashCommand) => command.toJSON()).concat(this.aliases.map((alias: SlashCommand) => alias.toJSON())),
        })
            .then((): void => {
                this.emit("load", commandFiles.length);
                this.emit("register", this.commands.size);
                this.start();
            })
            .catch((error: Error) => this.emit("error", new AsturaError(error.stack || error.message, {
                emitter: "astura.commandHandler",
                kill: true
            })));
    }

    public reload = this.load;

    public start(): void {
        this.emit("ready");

        this.client.on("interactionCreate", async (interaction: Interaction): Promise<void> => {
            if (!interaction.inGuild() || !interaction.guild) return;
            if (interaction.guild.id !== Constants["BaseGuild"]) return;
            if (interaction.user.bot && this.blockBots) return;

            if (interaction.isCommand()) {
                const command: SlashCommand = this.commands.get(interaction.commandName) || this.aliases.get(interaction.commandName) as SlashCommand;
                if (!command) return;

                let passedChecks: boolean = true;

                for (const inhibitor of this.inhibitors.sort((a: Inhibitor, b: Inhibitor): number => b.priority - a.priority).values()) {
                    const passed: boolean = await inhibitor.exec(this.client, interaction, command) as boolean;

                    if (passed) {
                        passedChecks = true;
                    } else if (!passed) {
                        passedChecks = false;
                    }
                }

                if (passedChecks) {
                    command.exec(this.client, interaction, await import("discord.js"))
                        .catch((error: Error): Promise<void> => {
                            this.client.console.error(error.stack, "astura.commandHandler", false);
                            // new WebhookClient({ url: Constants["Webhooks"].BOT_LOGS })
                            //     .send({
                            //         content: `Looks like an error has occured:\n${error.stack}`
                            //     });

                            interaction.channel && interaction.channel.send({
                                embeds: [
                                    Constants["Embeds"].error(interaction)
                                ]
                            });

                            return new Promise((res: (value: void | PromiseLike<void>) => void, _rej: (reason?: any) => void): void => res());
                        });
                } else {
                    return;
                }
            }
        });
    }

    public setInhibitors(inhibitors: Collection<string, Inhibitor>): void {
        this.inhibitors = inhibitors;
    }
}