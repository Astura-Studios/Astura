/* eslint-disable @typescript-eslint/ban-types */
import { AsturaError } from "../../util/exports";
import { Category, Client, Inhibitor } from "../../core/exports";
import { Collection } from "discord.js";
import { EventEmitter } from "stream";
import { InhibitorHandlerOptions } from "../../base/interfaces";
import { ListenerEmitter } from "../../base/types";

import { readdirSync, statSync } from "fs";

export class InhibitorHandler extends EventEmitter {
    public categories: Collection<string, Category>;
    public client: Client;
    public directory: string;
    public inhibitors: Collection<string, Inhibitor>;

    public constructor(client: Client, options: InhibitorHandlerOptions) {
        super();
        this.categories = new Collection<string, Category>();
        this.client = client;
        this.directory = options.directory;
        this.inhibitors = new Collection<string, Inhibitor>();

        this.addListener("error", (error: AsturaError): void => {
            return this.client.console.error(error.stack, error.emitter as string, error.kill);
        });

        this.addListener("register", (size: number): void => {
            return this.client.console.info(`Succesfully registered ${size} inhibitors`, "astura.inhibitorHandler");
        });

        this.addListener("unregister", (inhibitor: Inhibitor): void => {
            return this.client.console.info(`Succesfully unregistered ${inhibitor.name} inhibitor`, "astura.inhibitorHandler");
        });

        this.addListener("load", (size: number): void => {
            return this.client.console.info(`Succesfully loaded from ${size} inhibitor files`, "astura.inhibitorHandler");
        });

        this.addListener("ready", (): void => {
            return this.client.console.info("Astura inhibitor handler successfully initiated", "astura.inhibitorHandler");
        });
    }

    public register(inhibitor: Inhibitor): void {
        if (!this.categories.get(inhibitor.categoryID as string)) {
            this.categories.set(inhibitor.categoryID as string, new Category(inhibitor.categoryID as string, {
                inhibitors: new Collection().set(inhibitor.name, inhibitor) as Collection<string, Inhibitor>,
                enabled: true,
                description: undefined,
                ownerOnly: false
            }));

            inhibitor.category = this.categories.get(inhibitor.categoryID) as Category;
            this.inhibitors.set(inhibitor.name, inhibitor);
        } else if (this.categories.get(inhibitor.categoryID as string)) {
            this.inhibitors.set(inhibitor.name, inhibitor);

            this.categories.set(inhibitor.categoryID as string, new Category(inhibitor.categoryID as string, {
                inhibitors: this.inhibitors.filter((_inhibitor: Inhibitor): boolean => _inhibitor.categoryID === inhibitor.categoryID),
                enabled: true,
                description: undefined,
                ownerOnly: false
            }));
        }
    }

    public unregister(inhibitor: Inhibitor) {
        if (!this.categories.get(inhibitor.categoryID as string)) {
            this.inhibitors.delete(inhibitor.name);
        } else if (this.categories.get(inhibitor.categoryID as string)) {
            const category: Category = this.categories.get(inhibitor.categoryID as string) as Category;
            category.inhibitors.delete(inhibitor.name);
            this.categories.set(inhibitor.categoryID as string, category);
            this.inhibitors.delete(inhibitor.name);
        }
    }

    public async load(): Promise<void> {
        if (!this.directory) return this.client.console.error("No inhibitor directory was provided", "astura.inhibitiorHandler");
        if (!readdirSync(this.directory)) return this.client.console.error("Specified directory does not exist", "astura.inhibitorHandler");

        const directory: string[] = readdirSync(this.directory);
        const subDirectories: string[] = directory.filter((child: string): boolean => statSync(`${this.directory}/${child}`).isDirectory());
        const inhibitorFiles: string[] = directory.filter((child: string): boolean => child.endsWith(".js")).map((file: string): string => `${this.directory}/${file}`);

        if (subDirectories.length > 0) {
            subDirectories.forEach((subDirectory: string): void => {
                readdirSync(`${this.directory}/${subDirectory}`).filter((child: string): boolean => child.endsWith(".js")).forEach((file: string): void => {
                    inhibitorFiles.push(`${this.directory}/${subDirectory}/${file}`);
                });
            });
        }

        if (inhibitorFiles.length === 0) return this.client.console.error("No inhibitors found to resolve from configured directory", "astura.inhibitorHandler", true);

        for (const inhibitorFile of inhibitorFiles.values()) {
            const Instance: typeof Inhibitor = (await import(inhibitorFile) as { default: typeof Inhibitor; }).default;
            const isInhibitor: boolean = Instance.prototype instanceof Inhibitor;

            if (!isInhibitor) {
                return this.client.console.error(`Filepath ${inhibitorFile} has no exported inhibitor`, "astura.inhibitorHandler", true);
            } else if (isInhibitor) {
                const inhibitor: Inhibitor = new Instance(Instance.prototype.name, {
                    categoryID: Instance.prototype.categoryID as ListenerEmitter,
                    reason: Instance.prototype.reason,
                    priority: Instance.prototype.priority
                });

                this.register(inhibitor);
            }
        };

        this.emit("load", inhibitorFiles.length);
        this.emit("register", this.inhibitors.size);
        this.start();
    }

    public reload = this.load;

    public start(): void {
        this.client.commandHandler.setInhibitors(this.inhibitors);
        this.emit("ready");
    }
}