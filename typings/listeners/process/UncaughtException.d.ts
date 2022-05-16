/// <reference types="node" />
import { Listener } from "../../lib/core/exports";
export default class UnhandledCaughtListener extends Listener {
    constructor();
    exec(_process: NodeJS.Process, error: Error, origin: NodeJS.UncaughtExceptionOrigin): Promise<void>;
}
//# sourceMappingURL=UncaughtException.d.ts.map