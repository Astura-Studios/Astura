const util = require("util");
const exec = util.promisify(require("child_process").exec);

exec("tsc && git add . && git commit -m \"Testing CLI\" && git push origin main");