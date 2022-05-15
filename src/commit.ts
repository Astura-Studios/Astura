import { createInterface, Interface } from "readline";
import { exec as _exec, PromiseWithChild } from "child_process";
import { promisify } from "util";   
import chalk from "chalk";

interface ExecOptions {
    stdout: string;
    stderr: string;
}

const input: Interface = createInterface({
    input: process.stdin,
    output: process.stdout
});

const exec: (command: string) => PromiseWithChild<ExecOptions> = promisify(_exec);

input.question("Enter your commit message: ", async (message: string): Promise<void> => {
    const start: [number, number] = process.hrtime();
    const { stdout, stderr }: ExecOptions = await exec(`git add . && git commit -m "${message}" && git push origin main`);
    console.log("\n" + chalk.blue(stdout));
    stderr ? console.log(chalk.red(stderr) + "\n" + chalk.yellow(`Executed in ${process.hrtime(start)[1] / 1e6}ms`)) : console.log(chalk.yellow(`Executed in ${process.hrtime(start)[1] / 1e6}ms`));
    input.close();
});