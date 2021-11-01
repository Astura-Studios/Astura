import { AsturaClient } from "../client/Client";
import { Emitter } from "./util/Types";
import { ExtendedError } from "../extensions/Error";
import { ListenerCategory, ListenerType } from "./util/Types";
import { ListenerOptions } from "./util/Interfaces";

export class Listener {
    public category: ListenerCategory;
    public client: AsturaClient;
    public emitter: Emitter;
    public id: string;
    public name: ListenerType;

    public constructor(id: string, options: ListenerOptions) {
        this.category = options.category;
        this.client = new AsturaClient();
        this.emitter = options.emitter;
        this.id = id;
        this.name = options.name;
    };

    public async exec(..._args: any[]): Promise<any> {
        throw new ExtendedError("NOT_IMPLEMENTED", new AsturaClient(), this.constructor.name, this.exec.name);
    };
};