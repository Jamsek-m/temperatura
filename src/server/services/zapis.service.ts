import {Zapis} from "../dto/zapis.dto";
import {ZapisRepository} from "../repositories/zapis.repository";
import {ZapisEntity} from "../entities/zapis.entity";
import {ZapisMapper} from "../mappers/zapis.mapper";
import {DateUtil} from "../utils/date.util";
import {ExtremeObject, Extremes} from "../dto/extremes.dto";

export class ZapisService {

    public static getAll(lastNMinutes: string): Promise<Zapis[]> {
        const minutes = lastNMinutes ? parseInt(lastNMinutes, 10) : 60;
        const datumQuery = new Date();
        datumQuery.setMinutes(datumQuery.getMinutes() - minutes);

        return new Promise<Zapis[]>((resolve, reject) => {
            ZapisRepository.getAll(DateUtil.toString(datumQuery))
                .then((zapisEntities: ZapisEntity[]) => {
                    resolve(zapisEntities.map(zapisEntity => ZapisMapper.toZapis(zapisEntity)));
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }

    public static getExtrems(lastNMinutes: string): Promise<Extremes> {
        const minutes = lastNMinutes ? parseInt(lastNMinutes, 10) : 60;
        const datumQuery = new Date();
        datumQuery.setMinutes(datumQuery.getMinutes() - minutes);

        return new Promise<Extremes>((resolve, reject) => {
            ZapisRepository.getExtrems(DateUtil.toString(datumQuery))
                .then((extremesRaw: any) => {
                    const extrem = new Extremes();
                    extrem.notranjaTemperatura = new ExtremeObject(extremesRaw["max_not_temp"], extremesRaw["min_not_temp"]);
                    extrem.zunanjaTemperatura = new ExtremeObject(extremesRaw["max_zun_temp"], extremesRaw["min_zun_temp"]);
                    resolve(extrem);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }

    /**
     * validates received dto
     * @param {any} body
     * @returns {boolean} true if all fields are present, false otherwise
     */
    public static validateZapis(body: any): boolean {
        return body["datum"] && body["zuntp"] && body["nottp"] && body["tlak"] && body["vlaga"];
    }

    public static saveZapis(zapis: Zapis): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            ZapisRepository.save(ZapisMapper.toZapisEntity(zapis)).then(
                () => {
                    resolve();
                },
                (error: Error) => {
                    reject(error);
                }
            );
        });
    }

}
