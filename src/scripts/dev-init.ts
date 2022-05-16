import config from "../../astura.config";
import os from "os";

import { Chalk, Console } from "../lib/util/exports";
import { exec, ExecException } from "child_process";

const console: Console = new Console();

const banner: string[] = [
    "\n",
    "KXNW" + "\u0020".repeat("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM".length) + "WXK",
    "00KKNW" + "\u0020".repeat("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM".length) + "WNKK00",
    "00000KXNW" + "\u0020".repeat("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM".length) + "WNXK00000",
    "00000000KXNW" + "\u0020".repeat("MMMMMMMMMMMMMMMMMMMMMMMMMM".length) + "WNXK00000000",
    "NXK0000OO000kkO0XW" + "\u0020".repeat("MMMMMMMMMMMMMM".length) + "WXKOkk000OO0000KKX",
    "MWWXKK0xodkkkkkkkOKNW" + "\u0020".repeat("MMMMMMMM".length) + "WNKOkkkkkOkdox0KKXWWM",
    "\u0020".repeat("MMMM".length) + "WNXkolooodxxkkkk0KNW" + "\u0020".repeat("MM".length) + "WNK0kkxkxxdooolokXNW" + "\u0020".repeat("MMMM".length),
    "\u0020".repeat("MMMMMM".length) + "W0xdolcclodxkkkkk0000kkkkkxdolcclodx0W" + "\u0020".repeat("MMMMMM".length),
    "\u0020".repeat("MMMMMM".length) + "WKkxxdlcccclodxkkxxxxkkxdolccccldxxkKW" + "\u0020".repeat("MMMMMM".length) + "\u0020".repeat(5) + "     _        _                   ",
    "\u0020".repeat("MMMMMM".length) + "WKkxxdlcccclodxkkxxxxkkxdolccccldxxkKW" + "\u0020".repeat("MMMMMM".length) + "\u0020".repeat(5) + "    / \\   ___| |_ _   _ _ __ __ _ ",
    "\u0020".repeat("MMMMMM".length) + "WKkxxdlcccclodxkkxxxxkkxdolccccldxxkKW" + "\u0020".repeat("MMMMMM".length) + "\u0020".repeat(5) + "   / _ \\ / __| __| | | | '__/ _` |",
    "\u0020".repeat("MMMMMM".length) + "WKkxxdlcccclodxkkxxxxkkxdolccccldxxkKW" + "\u0020".repeat("MMMMMM".length) + "\u0020".repeat(5) + "  / ___ \\\\__ \\ |_| |_| | | | (_| |",
    "\u0020".repeat("MMMMMM".length) + "WKkkkxocccccclxkkxxxkkkxlccccccoxkkkKW" + "\u0020".repeat("MMMMMM".length) + "\u0020".repeat(5) + " /_/   \\_\\___/\\__|\\__,_|_|  \\__,_|",
    "\u0020".repeat("MMMMMM".length) + "WKkkxkxdolccclodxxxxxxdolccclodxxkkkKW" + "\u0020".repeat("MMMMMM".length),
    "\u0020".repeat("MMMMMMM".length) + "WX0Okkkkxdollllooooooolllodxxkkkk0XW" + "\u0020".repeat("MMMMMMM".length),
    "\u0020".repeat("MMMMMMMMM".length) + "WNX0kkkkkxxdoc::::cldxxxkkkk0KNW" + "\u0020".repeat("MMMMMMMMM".length),
    "\u0020".repeat("MMMMMMMMMMMM".length) + "WNK0kxxdddolcclodddxxkOKNW" + "\u0020".repeat("MMMMMMMMMMMM ".length),
    "\u0020".repeat("MMMMMMMMMMMMMMM".length) + "WKkdoddddddddddodkKW" + "\u0020".repeat("MMMMMMMMMMMMMMM".length),
    "\u0020".repeat("MMMMMMMMMMMMMMMM".length) + "N0OOkxxddddxxkkO0N" + "\u0020".repeat("MMMMMMMMMMMMMMMM".length),
    "\u0020".repeat("MMMMMMMMMMMMMMMM".length) + "N00000OkkkkO00000N" + "\u0020".repeat("MMMMMMMMMMMMMMMM".length),
    "\u0020".repeat("MMMMMMMMMMMMMMMM".length) + "N0000KXNWWNXK0000N" + "\u0020".repeat("MMMMMMMMMMMMMMMM".length),
    "\u0020".repeat("MMMMMMMMMMMMMMMM".length) + "NKKXNW" + "\u0020".repeat("MMMMMM".length) + "WNXKKN" + "\u0020".repeat("MMMMMMMMMMMMMMMM".length),
    "\u0020".repeat("MMMMMMMMMMMMMMMM".length) + "NXN" + "\u0020".repeat("MMMMMMMMMMMM".length) + "NXN" + "\u0020".repeat("MMMMMMMMMMMMMMMM".length)
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
    Chalk.info("Intitial bootup and compilation processes completed", "astura.checks"),
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