/// <reference types="node" />
import { Category } from "./Category";
import { Client } from "./Client";
import { ListenerCategory, ListenerEmitter, ListenerName } from "../../base/types";
import { ListenerOptions } from "../../base/interfaces";
export declare class Listener {
    category: Category;
    categoryID: ListenerCategory;
    emitter: ListenerEmitter;
    filepath: string;
    name: ListenerName;
    once: boolean;
    constructor(name?: ListenerName, options?: ListenerOptions);
    exec(...args: [emitter: Client | NodeJS.Process, ...any: any[]]): Promise<void | never>;
    setCategory(category: Category): Listener;
    setCategoryID(categoryID: ListenerCategory): Listener;
    setFilepath(filepath: string): Listener;
    setName(name: ListenerName): Listener;
    setOnce(once: boolean): Listener;
}
//# sourceMappingURL=Listener.d.ts.map