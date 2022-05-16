/// <reference types="node" />
import { Listener } from "../../lib/core/exports";
export default class ExitListener extends Listener {
    constructor();
    exec(_process: NodeJS.Process, code: number): Promise<void>;
}
//# sourceMappingURL=Exit.d.ts.map