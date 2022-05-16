import type { AsturaErrorOptions } from "../../base/interfaces";
export declare class AsturaError extends Error {
    emitter: string | undefined;
    kill: boolean;
    constructor(message: string, options: AsturaErrorOptions);
}
//# sourceMappingURL=AsturaError.d.ts.map