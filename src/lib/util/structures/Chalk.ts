import chalk from "chalk";

export class Chalk {
    public static info(message: any, emitter: string): string {
        return `${chalk.green(new Date().toLocaleDateString().replaceAll("/", "-"))} ${chalk.green(new Date().toLocaleTimeString().replace("am", "AM").replace("pm", "PM"))}  ${chalk.blue("INFO")}    --- [main] ${chalk.blueBright(emitter)}${"\u0020".repeat((27 - emitter.length) + 1)}: ${message}`;
    }

    public static ready(message: any, emitter: string): string {
        return `${chalk.green(new Date().toLocaleDateString().replaceAll("/", "-"))} ${chalk.green(new Date().toLocaleTimeString().replace("am", "AM").replace("pm", "PM"))}  ${chalk.green("READY")}   --- [main] ${chalk.blueBright(emitter)}${"\u0020".repeat((27 - emitter.length) + 1)}: ${message}`;
    }

    public static warn(message: any, emitter: string): string {
        return `${chalk.green(new Date().toLocaleDateString().replaceAll("/", "-"))} ${chalk.green(new Date().toLocaleTimeString().replace("am", "AM").replace("pm", "PM"))}  ${chalk.yellow("WARNING")} --- [main] ${chalk.blueBright(emitter)}${"\u0020".repeat((27 - emitter.length) + 1)}: ${message}`;
    }

    public static error(message: any, emitter: string): string {
        return `${chalk.green(new Date().toLocaleDateString().replaceAll("/", "-"))} ${chalk.green(new Date().toLocaleTimeString().replace("am", "AM").replace("pm", "PM"))}  ${chalk.red("ERROR")}   --- [main] ${chalk.blueBright(emitter)}${"\u0020".repeat((27 - emitter.length) + 1)}: ${message}`;
    }
}