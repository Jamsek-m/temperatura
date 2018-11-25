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

    public static getExtrems(datumQuery: string): Promise<any> {
        const sql = `SELECT MAX(zun_temp) AS max_zun_temp, MIN(zun_temp) AS min_zun_temp, MAX(not_temp) AS max_not_temp, `+
            `MIN(not_temp) AS min_not_temp FROM zapis WHERE datum > ?`;
        return new Promise<any>((resolve, reject) => {
            DBConnection.getConnection().query(sql, [datumQuery], (error: Error, rows: any[]) => {
                if (error) {
                    return reject(error);
                }
                resolve(rows[0]);
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
