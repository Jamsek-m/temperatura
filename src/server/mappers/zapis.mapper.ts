import {ZapisEntity} from "../entities/zapis.entity";
import {Zapis} from "../dto/zapis.dto";
import {DateUtil} from "../utils/date.util";

export class ZapisMapper {

    public static toZapis(zapisEntity: ZapisEntity): Zapis {
        const zapis = new Zapis();
        zapis.id = zapisEntity.id;
        zapis.datum = new Date(zapisEntity.datum);
        zapis.nottp = zapisEntity.not_temp;
        zapis.zuntp = zapisEntity.zun_temp;
        zapis.tlak = zapisEntity.tlak;
        zapis.vlaga = zapisEntity.vlaga;
        return zapis;
    }

    public static toZapisEntity(zapis: Zapis): ZapisEntity {
        const zapisEntity = new ZapisEntity();
        zapisEntity.id = zapis.id;
        zapisEntity.vlaga = zapis.vlaga;
        zapisEntity.tlak = zapis.tlak;
        zapisEntity.zun_temp = zapis.zuntp;
        zapisEntity.not_temp = zapis.nottp;
        zapisEntity.datum = DateUtil.toString(zapis.datum);
        return zapisEntity;
    }

    public static bodyToZapis(body: any): Zapis {
        const zapis = new Zapis();
        zapis.datum = new Date(body["datum"]);
        zapis.nottp = parseFloat(body["nottp"]);
        zapis.zuntp = parseFloat(body["zuntp"]);
        zapis.tlak = parseFloat(body["tlak"]);
        zapis.vlaga = parseFloat(body["vlaga"]);
        return zapis;
    }

}
