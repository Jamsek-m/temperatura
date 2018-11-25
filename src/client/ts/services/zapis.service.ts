import {AjaxResponse, AjaxUtil} from "../utils/ajax.util";

export class ZapisService {

    public static getAll(minutes: number): Promise<AjaxResponse> {
        return new Promise((resolve, reject) => {
            const ajaxUtil = new AjaxUtil("GET", `/api/v1/meritve?minutes=${minutes}`)
                .addOnSuccess((e: Event) => {
                    const response: AjaxResponse = <AjaxResponse>ajaxUtil["request"];
                    resolve(response);
                })
                .addOnError((err) => {
                    reject(err);
                });
            ajaxUtil.send();
        });
    }

    public static getExtremes(minutes: number): Promise<AjaxResponse> {
        return new Promise<AjaxResponse>((resolve, reject) => {
            const ajaxUtil = new AjaxUtil("GET", `/api/v1/meritve/extremes?minutes=${minutes}`)
                .addOnSuccess((e: Event) => {
                    const response: AjaxResponse = <AjaxResponse>ajaxUtil["request"];
                    resolve(response);
                })
                .addOnError((err) => {
                    reject(err);
                });
            ajaxUtil.send();
        });
    }
}
