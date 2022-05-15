import { CommandInteraction } from "discord.js";
import { Category } from "./Category";
import { Client } from "./Client";
import { InhibitorCategory } from "../../base/types";
import { InhibitorOptions } from "../../base/interfaces";
import { SlashCommand } from "./SlashCommand";

export class Inhibitor {
    public category: Category;
    public categoryID: InhibitorCategory;
    public filepath: string;
    public name: string;
    public reason: string;
    public priority: number;

    public constructor(name: string, options: InhibitorOptions) {
        this.categoryID = options.categoryID;
        this.filepath = __filename;
        this.name = name;
        this.reason = options.reason;
        this.priority = options.priority;
    }

    public async exec(client: Client, _interaction: CommandInteraction, _command: SlashCommand): Promise<boolean | void | never> {
        return client.console.error(`${this.constructor.name} inhibitor ${this.exec.name} function has not been implemented`, "astura.inhibitorHandler", true);
    }

    public setCategory(category: Category): Inhibitor {
        this.category = category;
        return this;
    }

    public setCategoryID(categoryID: InhibitorCategory): Inhibitor {
        this.categoryID = categoryID;
        return this;
    }

    public setFilepath(filepath: string): Inhibitor {
        this.filepath = filepath;
        return this;
    }

    public setName(name: string): Inhibitor {
        this.name = name;
        return this;
    }

    public setReason(reason: string): Inhibitor {
        this.reason = reason;
        return this;
    }

    public setPriority(priority: number): Inhibitor {
        this.priority = priority;
        return this;
    }
}