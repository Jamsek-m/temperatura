import {ZapisService} from "./services/zapis.service";
import {AjaxResponse} from "./utils/ajax.util";
import {ZapisModel} from "./models/zapis.model";
import {Graph, GraphService} from "./services/graph.service";
import {chartsConfig} from "./configs/charts.config";

GraphService.initializeGoogleCharts();

ZapisService.getAll(30).then(
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
