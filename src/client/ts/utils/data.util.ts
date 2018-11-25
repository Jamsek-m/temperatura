import {ZapisService} from "../services/zapis.service";
import {AjaxResponse} from "./ajax.util";
import {ZapisModel} from "../models/zapis.model";
import {Graph, GraphService} from "../services/graph.service";
import {chartsConfig} from "../configs/charts.config";
import {LOCAL_STORAGE_MINUTES_KEY} from "../configs/constants.config";
import {Extremes} from "../../../server/dto/extremes.dto";

export class DataUtil {

    public static getDataAndDrawGraphs() {
        const minutes = parseInt(localStorage.getItem(LOCAL_STORAGE_MINUTES_KEY), 10) || 30;
        ZapisService.getAll(minutes).then(
            (res: AjaxResponse) => {
                const zapis = new ZapisModel(JSON.parse(res.response));

                const graphVlaga = new Graph("LineChart", zapis.vlaga, chartsConfig.vlaga);
                GraphService.drawGraph(graphVlaga);

                const graphTemperatura = new Graph("LineChart", zapis.temperatura, chartsConfig.temperatura);
                GraphService.drawGraph(graphTemperatura);

                const graphTlak = new Graph("LineChart", zapis.tlak, chartsConfig.tlak);
                GraphService.drawGraph(graphTlak);
            },
            (err) => {
                console.error(err);
            }
        );
    }

    public static getExtremesAndDisplay() {
        const minutes = parseInt(localStorage.getItem(LOCAL_STORAGE_MINUTES_KEY), 10) || 30;
        ZapisService.getExtremes(minutes).then(
            (res: AjaxResponse) => {
                const extremes: Extremes = <Extremes>JSON.parse(res.response);
                DataUtil.setText(extremes.zunanjaTemperatura.max, "zun_max_temp");
                DataUtil.setText(extremes.zunanjaTemperatura.min, "zun_min_temp");
                DataUtil.setText(extremes.notranjaTemperatura.max, "not_max_temp");
                DataUtil.setText(extremes.notranjaTemperatura.max, "not_min_temp");
            },
            (err) => {
                console.error(err);
            }
        );
    }

    private static setText(text: string | number | boolean, elementId: string): void {
        const element = document.getElementById(elementId);
        element.innerHTML = "";
        element.appendChild(document.createTextNode(text.toString()));
    }

}
