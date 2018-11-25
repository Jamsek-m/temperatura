
export class EnvVarUtil {

    public static getMandatoryEnvVar(varName: string): string {
        if (process.env[varName]) {
            return process.env[varName];
        }
        throw new MissingEnvVarException(varName);
    }

    public static getOptionalEnvVar(varName: string, defaultValue: any): any {
        if (process.env[varName]) {
            return process.env[varName];
        }
        return defaultValue;
    }
}

class MissingEnvVarException extends Error {
    constructor(key: string) {
        super(`Missing environment variable with key: ${key}`);
    }
}
