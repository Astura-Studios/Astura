/// <reference types="node" />
import { Listener } from "../../lib/core/exports";
export default class UnhandledRejectionListener extends Listener {
    constructor();
    exec(_process: NodeJS.Process, reason: Error, promise: Promise<string>): Promise<void>;
}
//# sourceMappingURL=UnhandledRejection.d.ts.map