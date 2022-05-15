import { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, hyperlink, hideLinkEmbed, inlineCode, codeBlock, time, userMention, memberNicknameMention, channelMention, roleMention, TimestampStylesString } from "@discordjs/builders";
import { Snowflake } from "discord-api-types";

export class Format {
    public static bold(text: string): `**${string}**` {
        return bold(text);
    };

    public static italic(text: string): `_${string}_` {
        return italic(text);
    };

    public static strikeThrough(text: string): `~~${string}~~` {
        return strikethrough(text);
    };

    public static underscore(text: string): `__${string}__` {
        return underscore(text);
    };

    public static spoiler(text: string): `||${string}||` {
        return spoiler(text);
    };

    public static quote(text: string): `> ${string}` {
        return quote(text);
    };

    public static blockQuote(text: string): `>>> ${string}` {
        return blockQuote(text);
    };

    public static hyperlink(content: string, url: string): `[${string}](${string})` {
        return hyperlink(content, url);
    };

    public static hideLinkEmbed(url: string): `<${string}>` {
        return hideLinkEmbed(url);
    }

    public static inlineCode(text: string): `\`${string}\`` {
        return inlineCode(text);
    };

    public static codeBlock(text: string): `\`\`\`\n${string}\`\`\`` {
        return codeBlock(text);
    };

    public static languageCodeBlock(text: string, language: string): `\`\`\`${string}\n${string}\`\`\`` {
        return codeBlock(language, text);
    };

    public static timestamp(date: Date, style?: TimestampStylesString | undefined): `<t:${bigint}:${TimestampStylesString}>` {
        return time(date, style as TimestampStylesString);
    };

    public static userMention(id: Snowflake): `<@${Snowflake}>` {
        return userMention(id);
    };

    public static memberNicknameMention(id: Snowflake): `<@!${Snowflake}>` {
        return memberNicknameMention(id);
    };

    public static channelMention(id: Snowflake): `<#${Snowflake}>` {
        return channelMention(id);
    };

    public static roleMention(id: Snowflake): `<@&${Snowflake}>` {
        return roleMention(id);
    };
};