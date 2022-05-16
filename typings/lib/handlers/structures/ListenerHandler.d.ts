import { Category, Client, Listener } from "../../core/exports";
import { Collection } from "discord.js";
import { EventEmitter } from "stream";
import { ListenerHandlerOptions } from "../../base/interfaces";
import { ListenerName } from "../../base/types";
declare module "stream" {
    class EventEmitter {
        emit(eventName: ListenerName | symbol, ...args: any[]): boolean;
        addListener(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        removeListener(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        removeAllListeners(event?: ListenerName | symbol): this;
        on(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        once(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        off(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        eventNames(): (ListenerName | symbol)[];
        getMaxListeners(): number;
        listenerCount(eventName: ListenerName | symbol): number;
        listeners(eventName: ListenerName | symbol): Function[];
        prependListener(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        prependOnceListener(eventName: ListenerName | symbol, listener: (...args: any[]) => void): this;
        rawListeners(eventName: ListenerName | symbol): Function[];
        setMaxListeners(n: number): this;
    }
}
export declare class ListenerHandler extends EventEmitter {
    categories: Collection<string, Category>;
    client: Client;
    directory: string;
    _listeners: Collection<string, Listener>;
    constructor(client: Client, options: ListenerHandlerOptions);
    register(listener: Listener): void;
    unregister(listener: Listener): void;
    load(): Promise<void>;
    reload: () => Promise<void>;
    start(listener: Listener): void;
}
//# sourceMappingURL=ListenerHandler.d.ts.map