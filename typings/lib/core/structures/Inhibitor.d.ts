import { CommandInteraction } from "discord.js";
import { Category } from "./Category";
import { Client } from "./Client";
import { InhibitorCategory } from "../../base/types";
import { InhibitorOptions } from "../../base/interfaces";
import { SlashCommand } from "./SlashCommand";
export declare class Inhibitor {
    category: Category;
    categoryID: InhibitorCategory;
    filepath: string;
    name: string;
    reason: string;
    priority: number;
    constructor(name: string, options: InhibitorOptions);
    exec(client: Client, _interaction: CommandInteraction, _command: SlashCommand): Promise<boolean | void | never>;
    setCategory(category: Category): Inhibitor;
    setCategoryID(categoryID: InhibitorCategory): Inhibitor;
    setFilepath(filepath: string): Inhibitor;
    setName(name: string): Inhibitor;
    setReason(reason: string): Inhibitor;
    setPriority(priority: number): Inhibitor;
}
//# sourceMappingURL=Inhibitor.d.ts.map