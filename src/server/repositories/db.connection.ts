import * as mysql from "mysql";
import {EnvVarUtil} from "../utils/env-var.util";
import {Pool} from "mysql";

export class DBConnection {

    private static connection: Pool;

    public static initializeDatabase() {
        const configuration: DatabaseConfiguration = this.getDatabaseConfiguration();
        this.connection = mysql.createPool(configuration);
        this.connection.getConnection(DBConnection.onConnection);
    }

    public static getConnection(): Pool {
        return DBConnection.connection;
    }

    private static onConnection(error: Error) {
        if (error) {
            console.error("Error when connecting to database!");
            console.error(error);
        }
    }

    private static getDatabaseConfiguration(): DatabaseConfiguration {
        const config = new DatabaseConfiguration();
        config.user = EnvVarUtil.getMandatoryEnvVar("DB_USER");
        config.password = EnvVarUtil.getMandatoryEnvVar("DB_PASSWORD");
        config.connectionLimit = EnvVarUtil.getOptionalEnvVar("DB_CONNECTION_LIMIT", 5);
        config.host = EnvVarUtil.getMandatoryEnvVar("DB_HOST");
        config.database = EnvVarUtil.getMandatoryEnvVar("DB_NAME");
        return config;
    }
}

class DatabaseConfiguration {
    public host: string;
    public user: string;
    public password: string;
    public database: string;
    public connectionLimit: number;
}

