import { Category } from "./Category";
import { Client } from "./Client";
import { ListenerCategory, ListenerEmitter, ListenerName } from "../../base/types";
import { ListenerOptions } from "../../base/interfaces";

export class Listener {
    public category: Category;
    public categoryID: ListenerCategory;
    public emitter: ListenerEmitter;
    public filepath: string;
    public name: ListenerName;
    public once: boolean;

    public constructor(name?: ListenerName, options?: ListenerOptions) {
        this.categoryID = (options as ListenerOptions).categoryID;
        this.emitter = (options as ListenerOptions).emitter;
        this.filepath = __filename;
        this.name = name as ListenerName;
        this.once = (options as ListenerOptions).once || false;
    }

    public async exec(...args: [emitter: Client | NodeJS.Process, ...any: any[]]): Promise<void | never> {
        return (args[0] as Client).console.error(`${this.constructor.name} listener ${this.exec.name} function has not been implemented`, "astura.listenerHandler", true);
    }

    public setCategory(category: Category): Listener {
        this.category = category;
        return this;
    }

    public setCategoryID(categoryID: ListenerCategory): Listener {
        this.categoryID = categoryID;
        return this;
    }

    public setFilepath(filepath: string): Listener {
        this.filepath = filepath;
        return this;
    }

    public setName(name: ListenerName): Listener {
        this.name = name;
        return this;
    }

    public setOnce(once: boolean): Listener {     
        this.once = once;
        return this;
    }
}