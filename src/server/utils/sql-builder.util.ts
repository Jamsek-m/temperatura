import {DateUtil} from "./date.util";

export class SqlBuilderUtil {

    /**
     * Builds SQL string from given object based on its not null values and its types
     * @param {any} obj Object that is to be persisted
     * @param {string} tableName Name of table to persist data into
     * @returns {string} returns built SQL string
     */
    public static buildInsertSQLFromObject(obj: any, tableName: string): string {
        const fieldNames: string[] = Object.keys(obj);
        const propertyMap: Map<string, PropertyMapValue> = new Map();
        // build property map with metadata
        fieldNames.forEach((fieldName: string) => {
            const type = typeof obj[fieldName];
            // if type is object (like Date), then provide custom stringifier
            const customStringifier: Function = type === "object" ? SqlBuilderUtil.loadCustomStringifier(fieldName, obj[fieldName]) : null;
            propertyMap.set(fieldName, new PropertyMapValue(type, customStringifier));
        });
        // build field name part of sql
        const fieldNamesSql = fieldNames.filter((key: string) => {return propertyMap.get(key).type !== "undefined";}).join(", ");
        // build values part of sql
        const valuesSql: string = fieldNames
            .filter((key: string) => {return propertyMap.get(key).type !== "undefined";})
            .map((key: string, index: number) => {
            if (propertyMap.get(key).type === "string") {
                return `'${obj[key]}'`;
            } else if (propertyMap.get(key).type === "number") {
                return `${obj[key]}`;
            } else if (propertyMap.get(key).type === "boolean") {
                return `${obj[key]}`;
            } else if (propertyMap.get(key).type === "object") {
                return `${propertyMap.get(key).stringifier()}`;
            }
        }).join(", ");

        return `INSERT INTO ${tableName}(${fieldNamesSql}) VALUES (${valuesSql})`;
    }

    private static loadCustomStringifier(key: string, value: any): Function {
        if (key === "datum") {
            return () => `'${DateUtil.toString(new Date(value))}'`;
        }
        return null;
    }

}

class PropertyMapValue {
    type: string;
    stringifier: Function;

    constructor(type: string, stringifier: Function) {
        this.type = type;
        this.stringifier = stringifier;
    }
}
