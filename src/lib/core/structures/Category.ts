import { CategoryOptions } from "../../base/interfaces";
import { Collection } from "discord.js";
import { Inhibitor } from "./Inhibitor";
import { Listener } from "./Listener";
import { SlashCommand } from "./SlashCommand";

export class Category {
    public commands: Collection<string, SlashCommand>;
    public enabled: boolean;
    public description?: string;
    public inhibitors: Collection<string, Inhibitor>;
    public listeners: Collection<string, Listener>;
    public name: string;
    public ownerOnly: boolean;

    public constructor(name: string, options: CategoryOptions) {
        this.commands = options.commands || new Collection<string, SlashCommand>();
        this.enabled = options.enabled || true;
        this.description = options.description || undefined;
        this.inhibitors = options.inhibitors || new Collection<string, Inhibitor>();
        this.listeners = options.listeners || new Collection<string, Listener>();
        this.name = name;
        this.ownerOnly = options.ownerOnly || false;
    }

    public reloadAll() {
        if (this.commands) {
            this.commands.forEach((command: SlashCommand): void => {
                this.commands.delete(command.name);
            });
        }
    }

    public setCommands(commands: Collection<string, SlashCommand>): this {
        this.commands = commands;
        return this;
    }

    public setEnabled(enabled: boolean): this {
        this.enabled = enabled;
        return this;
    }

    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public setInhibitors(inhibitors: Collection<string, Inhibitor>): this {
        this.inhibitors = inhibitors;
        return this;
    }

    public setListeners(listeners: Collection<string, Listener>): this {
        this.listeners = listeners;
        return this;
    }

    public setName(name: string): this {
        this.name = name;
        return this;
    }

    public setOwnerOnly(ownerOnly: boolean): this {
        this.ownerOnly = ownerOnly;
        return this;
    }
}