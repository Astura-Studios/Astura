import { CategoryOptions } from "../../base/interfaces";
import { Collection } from "discord.js";
import { Inhibitor } from "./Inhibitor";
import { Listener } from "./Listener";
import { SlashCommand } from "./SlashCommand";
export declare class Category {
    commands: Collection<string, SlashCommand>;
    enabled: boolean;
    description?: string;
    inhibitors: Collection<string, Inhibitor>;
    listeners: Collection<string, Listener>;
    name: string;
    ownerOnly: boolean;
    constructor(name: string, options: CategoryOptions);
    reloadAll(): void;
    setCommands(commands: Collection<string, SlashCommand>): this;
    setEnabled(enabled: boolean): this;
    setDescription(description: string): this;
    setInhibitors(inhibitors: Collection<string, Inhibitor>): this;
    setListeners(listeners: Collection<string, Listener>): this;
    setName(name: string): this;
    setOwnerOnly(ownerOnly: boolean): this;
}
//# sourceMappingURL=Category.d.ts.map