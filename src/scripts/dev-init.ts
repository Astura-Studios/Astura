import config from "../../astura.config";
import os from "os";

import { Chalk, Console } from "../lib/util/exports";
import { exec, ExecException } from "child_process";

const console: Console = new Console();

const banner: string[] = [
    "\n",
    "&",
    "//%",
    "////(\t\u0020&",
    "///////&\u0020((#                  __  __       _        _        ____        _  ",
    "**///////####(               |  \\/  | __ _| |_ _ __(_)_  __ | __ )  ___ | |_ ",
    "\u0020***///////#####             | |\\/| |/ _` | __| '__| \\ \\/ / |  _ \\ / _ \\| __|",
    "\u0020\u0020\u0020,**/////(((%%##           | |  | | (_| | |_| |  | |>  <  | |_) | (_) | |_ ",
    "((((((*/////((((%%%%&        |_|  |_|\\__,_|\\__|_|  |_/_/\\_\\ |____/ \\___/ \\__|",
    "(((((((#*///(((((#&%%%%",
    "\u0020%((((((((%/((((####&%%%&",
    "\u0020\u0020\u0020\u0020\u0020((((((##(((######%&&&&"
];

const details: string[] = [
    "\n",
    `\u0020\u0020\u0020Version               ::  ${config.version}`,
    `\u0020\u0020\u0020Release               ::  ${config.release}`,
    "\u0020\u0020\u0020Branch                ::  main",
    "\u0020\u0020\u0020Instance              ::  development",
    `\u0020\u0020\u0020Operating System      ::  ${os.platform()} ${os.arch()} (${os.release()} Release)`,
    `\u0020\u0020\u0020Current User          ::  ${os.userInfo().username} (${os.hostname()})`,
    `\u0020\u0020\u0020CPU Usage             ::  ${Math.floor((process.cpuUsage().user / process.cpuUsage().system) * 100)}%`,
    `\u0020\u0020\u0020Memory Usage          ::  ${(Math.round(((os.totalmem() / 1e9 - os.freemem() / 1e9) + Number.EPSILON) * 100) / 100).toFixed(2)}/${(Math.round((os.totalmem() / 1e9 + Number.EPSILON) * 100) / 100).toFixed(2)} GB (${Math.floor((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100)}%)`
];

exec("git rev-parse --abbrev-ref HEAD", (err: ExecException | null, stdout: string): void => {
    if (err) {
        return;
    }

    if (typeof stdout === "string") {
        details[4] = `\u0020\u0020\u0020Branch                ::  ${stdout.trim()}`;
    }
});

const message: string[] = [
    "\n",
    Chalk.info("intiial bootup and compilation processes completed", "astura.checks"),
    Chalk.info(`Starting Launcher on ${os.hostname()} with PID ${process.pid}`, "astura.launcher"),
    Chalk.info(`${__filename} started by ${os.userInfo().username}`, "astura.launcher"),
    `\t\t\t\t\t\t\t\t        in ${__dirname}`,
    Chalk.info(`OS: ${os.platform()}, Arch: ${os.arch()}`, "system"),
    Chalk.info("Initiating process for Astura on development instance", "astura.launcher"),
    Chalk.info(`Using version ${config.version} on ${config.release} release`, "astura.launcher"),
    Chalk.info("Using astura.config.js configuration file for Astura configuration", "astura.config")
];

const devBoot = (): void => {
    if (!config.token.match(/[A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g)) {
        message.push(Chalk.error("module.exports.token is set to an invalid token, please replace with valid Discord bot token", "astura.config"));
        console.log([
            banner.join("\n"),
            details.join("\n"),
            message.join("\n")
        ].join("\n"));
        process.exit(1);
    } else if (config.token.match(/[A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g)) {
        message.push(Chalk.ready("Activating Astura...", "astura.launcher"), "\n");

        console.log([
            banner.join("\n"),
            details.join("\n"),
            message.join("\n")
        ].join("\n"));
    }
};

export default devBoot;