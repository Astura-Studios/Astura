const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { config } = require("dotenv");

config();

async function push() {
    const { stdout, stderr } = await exec(`tsc && git add . && git commit -m \"${process.env.COMMIT_MESSAGE}\" && git push origin main`);
    console.log(stdout);
    console.error(stderr);
};

push();