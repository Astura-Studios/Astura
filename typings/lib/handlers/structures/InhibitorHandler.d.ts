import { Category, Client, Inhibitor } from "../../core/exports";
import { Collection } from "discord.js";
import { EventEmitter } from "stream";
import { InhibitorHandlerOptions } from "../../base/interfaces";
export declare class InhibitorHandler extends EventEmitter {
    categories: Collection<string, Category>;
    client: Client;
    directory: string;
    inhibitors: Collection<string, Inhibitor>;
    constructor(client: Client, options: InhibitorHandlerOptions);
    register(inhibitor: Inhibitor): void;
    unregister(inhibitor: Inhibitor): void;
    load(): Promise<void>;
    reload: () => Promise<void>;
    start(): void;
}
//# sourceMappingURL=InhibitorHandler.d.ts.map