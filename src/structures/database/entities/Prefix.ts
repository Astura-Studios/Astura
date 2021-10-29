import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "PrefixEntity" })  
export default class PrefixEntity {
    @PrimaryKey()
    id!: number;

    @Property({ length: 18 })
    guildID!: string;

    @Property()
    prefix!: string;
}