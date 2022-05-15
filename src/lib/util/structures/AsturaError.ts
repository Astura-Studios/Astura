import type { AsturaErrorOptions } from "../../base/interfaces";

export class AsturaError extends Error {
    public emitter: string | undefined;
    public kill: boolean;

    public constructor(message: string, options: AsturaErrorOptions) {
        super(message);
        this.emitter = options.emitter || undefined;
        this.kill = options.kill || false;
    }
}