const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function push() {
    const { stdout, stderr } =await exec("tsc && git add . && git commit -m \"Testing CLI v2\" && git push origin main");
    console.log("stdout:", stdout);
    console.error("stderr:", stderr);
};

push();