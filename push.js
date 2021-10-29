const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function push() {
    const { stdout, stderr } = await exec("tsc && git add . && git commit -m \"Updated push file\" && git push origin main");
    console.log(stdout);
    console.error(stderr);
};

push();