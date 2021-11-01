import { AsturaClient } from "../client/Client";
import { Category } from "../structures/Category";
import { Collection } from "discord.js";
import { Listener } from "../structures/Listener";
import { ListenerHandlerOptions } from "../structures/util/Interfaces";
import { readdirSync } from "fs";

export class ListenerHandler {
    public categories: Collection<string, Category>;
    public client: AsturaClient;
    private directory: string;
    public listeners: Collection<string, Listener>

    constructor(client: AsturaClient, options: ListenerHandlerOptions) {
        this.categories = new Collection();
        this.client = client;
        this.directory = options.directory;
        this.listeners = new Collection();
    };

    public async load(): Promise<void> {
        try {
            const categories: string[] = [];

            for (const category of readdirSync(this.directory)) {
                categories.push(category.toLowerCase());
            };

            categories.forEach(async category => {
                const categoryName: string = this.client.util.string.capitalize(category);
                
                this.categories.set(categoryName, new Category(categoryName, {
                    content: null,
                    description: "",
                    type: "listener"
                }));
            });

            for (const category of categories.values()) {
                for (const listenerFileName of readdirSync(`${this.directory}/${category}`).filter(fileName => fileName.endsWith(".js"))) {
                    const listenerFile = require(`${this.directory}/${category}/${listenerFileName}`).default;
                    const listener: Listener = new listenerFile();

                    this.listeners.set(listener.name, listener);
    
                    switch (listener.emitter) {
                        case "client":
                            this.client.on(listener.name as string, listener.exec.bind(null, this.client));
    
                        case "process":
                            process.on(listener.name, listener.exec.bind(null, process));
                    };
                };

                const categoryName: string = this.client.util.string.capitalize(category);
                const categoryListeners: Collection<string, Listener> = this.listeners.filter(listener => listener.category.toLowerCase() === category.toLowerCase())

                this.categories.set(categoryName, new Category(categoryName, {
                    content: categoryListeners,
                    description: this.client.util.categoryDescriptions.listeners[category.toLowerCase() as "client" | "process"],
                    type: "listener"
                }));

                console.log(`${this.client.util.date.getLocalTime()} | [ ${this.client.util.string.capitalize(category)} Events ] Loaded ${readdirSync(`${this.directory}/${category}`).length} listener event(s)`); 
            };

            return console.log(`${this.client.util.date.getLocalTime()} | [ Listener Handler ] Loaded ${this.listeners.size} listener event(s)`);
        } catch (error) {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Listener Handler ] ${(error as Error).stack}`);
        };
    };
};