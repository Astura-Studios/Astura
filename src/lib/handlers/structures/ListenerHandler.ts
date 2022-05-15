/* eslint-disable @typescript-eslint/ban-types */
import { AsturaError } from "../../util/exports";
import { Category, Client, Listener } from "../../core/exports";
import { ClientEvents, Collection } from "discord.js";
import { EventEmitter } from "stream";
import { ListenerHandlerOptions } from "../../base/interfaces";
import { ListenerName } from "../../base/types";

import { readdirSync, statSync } from "fs";

declare module "stream" {
    class EventEmitter {
        public emit(eventName: ListenerName | symbol, ...args: any[]): boolean;
        public addListener(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        public removeListener(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        public removeAllListeners(event?: ListenerName | symbol): this;
        public on(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        public once(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        public off(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        public eventNames(): (ListenerName | symbol)[];
        public getMaxListeners(): number;
        public listenerCount(eventName: ListenerName | symbol): number;
        public listeners(eventName: ListenerName | symbol): Function[];
        public prependListener(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        public prependOnceListener(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        public rawListeners(eventName: ListenerName | symbol): Function[];
        public setMaxListeners(n: number): this;
    }
}

export class ListenerHandler extends EventEmitter {
    public categories: Collection<string, Category>;
    public client: Client;
    public directory: string;
    public _listeners: Collection<string, Listener>;

    public constructor(client: Client, options: ListenerHandlerOptions) {
        super();
        this.categories = new Collection<string, Category>();
        this.client = client;
        this.directory = options.directory;
        this._listeners = new Collection<string, Listener>();

        this.addListener("error", (error: AsturaError): void => {
            return this.client.console.error(error.stack, error.emitter as string, error.kill);
        });

        this.addListener("register", (size: number): void => {
            return this.client.console.info(`Succesfully registered ${size} listeners`, "astura.listenerHandler");
        });

        this.addListener("unregister", (listener: Listener): void => {
            return this.client.console.info(`Succesfully unregistered ${listener.name} listener`, "astura.listenerHandler");
        });

        this.addListener("load", (size: number): void => {
            return this.client.console.info(`Succesfully loaded from ${size} listener files`, "astura.listenerHandler");
        });

        this.addListener("ready", (): void => {
            return this.client.console.info("Astura listener handler successfully initiated", "astura.listenerHandler");
        });
    }

    public register(listener: Listener): void {
        if (!this.categories.get(listener.categoryID)) {
            this.categories.set(listener.categoryID, new Category(listener.categoryID, {
                listeners: new Collection().set(listener.name, listener) as Collection<string, Listener>,
                enabled: true,
                description: undefined,
                ownerOnly: false
            }));

            (listener.category as Category | undefined) = this.categories.get(listener.categoryID);
            this._listeners.set(listener.name, listener);
        } else if (this.categories.get(listener.categoryID)) {
            this._listeners.set(listener.name, listener);

            this.categories.set(listener.categoryID, new Category(listener.categoryID, {
                listeners: this._listeners.filter((_listener: Listener): boolean => _listener.categoryID === listener.categoryID),
                enabled: true,
                description: undefined,
                ownerOnly: false
            }));
        }
    }

    public unregister(listener: Listener): void {
        if (!this.categories.get(listener.categoryID)) {
            this._listeners.delete(listener.name);
        } else if (this.categories.get(listener.categoryID)) {
            const category: Category = this.categories.get(listener.categoryID) as Category;
            category.listeners.delete(listener.name);
            this.categories.set(listener.categoryID, category);
            this._listeners.delete(listener.name);
        }
    }

    public async load(): Promise<void> {
        if (!this.directory) return this.client.console.error("No listener directory was provided", "astura.listenerHandler");
        if (!readdirSync(this.directory)) return this.client.console.error("Specified directory does not exist", "astura.listenerHandler");

        const directory: string[] = readdirSync(this.directory);
        const subDirectories: string[] = directory.filter((child: string): boolean => statSync(`${this.directory}/${child}`).isDirectory());
        const listenerFiles: string[] = directory.filter((child: string): boolean => child.endsWith(".js")).map((file: string): string => `${this.directory}/${file}`);

        if (subDirectories.length > 0) {
            subDirectories.forEach((subDirectory: string): void => {
                readdirSync(`${this.directory}/${subDirectory}`).filter((child: string): boolean => child.endsWith(".js")).forEach((file: string): void => {
                    listenerFiles.push(`${this.directory}/${subDirectory}/${file}`);
                });
            });
        }

        if (listenerFiles.length === 0) return this.client.console.error("No listeners found to resolve from configured directory", "astura.listenerHandler", true);

        for (const listenerFile of listenerFiles.values()) {
            const Instance: typeof Listener = (await import(listenerFile) as { default: typeof Listener; }).default;
            const isListener: boolean = Instance.prototype instanceof Listener;

            if (!isListener) {
                return this.client.console.error(`Filepath ${listenerFile} has no exported listener`, "astura.listenerHandler", true);
            } else if (isListener) {
                const listener: Listener = new Instance(Instance.prototype.name, {
                    categoryID: Instance.prototype.categoryID,
                    emitter: Instance.prototype.emitter,
                    once: Instance.prototype.once
                });

                this.register(listener);
                this.start(listener);
            }
        };

        this.emit("load", listenerFiles.length);
        this.emit("register", this._listeners.size);
        this.emit("ready");
    }

    public reload = this.load;

    public start(listener: Listener): void {
        if (listener.once) {
            switch (listener.emitter) {
                case "client": this.client.once(listener.name as keyof ClientEvents, listener.exec.bind(null, this.client));
                case "process": process.once(listener.name, listener.exec.bind(null, process));
                // case "commandHandler": this.client.commandHandler.once(listener.name, listener.exec.bind(null, this.client)); 
                // case "inhibitorHandler": this.client.inhibitorHandler.once(listener.name, listener.exec.bind(null, this.client));
            }
        } else if (!listener.once) {
            switch (listener.emitter) {
                case "client": this.client.addListener(listener.name as keyof ClientEvents, listener.exec.bind(null, this.client));
                case "process": process.addListener(listener.name as NodeJS.Signals, listener.exec.bind(null, process));
                // case "commandHandler": this.client.commandHandler.on(listener.name, listener.exec.bind(null, this.client));
                // case "inhibitorHandler": this.client.inhibitorHandler.on(listener.name, listener.exec.bind(null, this.client));
            }
        }
    }
}