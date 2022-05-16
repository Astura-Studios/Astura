import { TimestampStylesString } from "@discordjs/builders";
import { Snowflake } from "discord-api-types/v9";
export declare class Format {
    static bold(text: string): `**${string}**`;
    static italic(text: string): `_${string}_`;
    static strikeThrough(text: string): `~~${string}~~`;
    static underscore(text: string): `__${string}__`;
    static spoiler(text: string): `||${string}||`;
    static quote(text: string): `> ${string}`;
    static blockQuote(text: string): `>>> ${string}`;
    static hyperlink(content: string, url: string): `[${string}](${string})`;
    static hideLinkEmbed(url: string): `<${string}>`;
    static inlineCode(text: string): `\`${string}\``;
    static codeBlock(text: string): `\`\`\`\n${string}\`\`\``;
    static languageCodeBlock(text: string, language: string): `\`\`\`${string}\n${string}\`\`\``;
    static timestamp(date: Date, style?: TimestampStylesString | undefined): `<t:${bigint}:${TimestampStylesString}>`;
    static userMention(id: Snowflake): `<@${Snowflake}>`;
    static memberNicknameMention(id: Snowflake): `<@!${Snowflake}>`;
    static channelMention(id: Snowflake): `<#${Snowflake}>`;
    static roleMention(id: Snowflake): `<@&${Snowflake}>`;
}
//# sourceMappingURL=Format.d.ts.map