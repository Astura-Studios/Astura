const util = require("util");
const exec = util.promisify(require("child_process").exec);
require("dotenv").config()

/**
 * Commits recent changes made within the code to the GitHub repository, using the COMMIT_MESSAGE environment variable from the .env file for commiting after compiling TypeScript code.
 * @async
 * @function
 * @type {Promise<void>}
 */
async function push() {
    const { stdout, stderr } = await exec(`tsc && git add . && git commit -m \"${process.env.COMMIT_MESSAGE}\" && git push origin main`);
    console.log(stdout);
    console.error(stderr);
};

push();