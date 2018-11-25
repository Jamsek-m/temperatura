import {DBConnection} from "./db.connection";
import {ZapisEntity} from "../entities/zapis.entity";
import {SqlBuilderUtil} from "../utils/sql-builder.util";

export class ZapisRepository {

    public static getAll(datumQuery: string): Promise<ZapisEntity[]> {
        const sql = "SELECT * FROM zapis WHERE datum > ? ORDER BY datum ASC";
        return new Promise((resolve, reject) => {
            DBConnection.getConnection().query(sql, [datumQuery], (error: Error, rows: ZapisEntity[]) => {
                if (error) {
                    return reject(error);
                }
                resolve(rows);
            });
        });
    }

    public static save(zapisEntity: ZapisEntity): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const sql: string = SqlBuilderUtil.buildInsertSQLFromObject(zapisEntity, "zapis");
            DBConnection.getConnection().query(sql, (error: Error, rows: any[]) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }
}
