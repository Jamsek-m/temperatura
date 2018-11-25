import {GraphHeader, GraphOptions} from "../services/graph.service";
import {ScreenUtil} from "../utils/screen.util";

export const chartsConfig: ChartsConfig = {
    vlaga: {
        elementId: "graf-vlaga",
        options: {
            height: 300,
            width: ScreenUtil.getCalculatedGraphWidth(),
            vAxis: {
                minValue: 20,
                maxValue: 100
            },
            hAxis: {
                format: "dd.MM.yy HH:mm"
            },
            legend: {
                position: "none"
            }
        },
        headers: [
            new GraphHeader("datetime", "X"),
            new GraphHeader("number", "Vlaga")
        ]
    },
    temperatura: {
        elementId: "graf-temperatura",
        options: {
            height: 300,
            width: ScreenUtil.getCalculatedGraphWidth(),
            legend: {
                position: "none"
            },
            hAxis: {
                format: "dd.MM.yy HH:mm"
            }
        },
        headers: [
            new GraphHeader("datetime", "X"),
            new GraphHeader("number", "Zunanja temperatura"),
            new GraphHeader("number", "Notranja temperatura")
        ]
    },
    tlak: {
        elementId: "graf-tlak",
        options: {
            height: 300,
            width: ScreenUtil.getCalculatedGraphWidth(),
            vAxis: {
                minValue: 980,
                maxValue: 1040
            },
            hAxis: {
                format: "dd.MM.yy HH:mm"
            },
            legend: {
                position: "none"
            }
        },
        headers: [
            new GraphHeader("datetime", "X"),
            new GraphHeader("number", "Tlak")
        ]
    }
};

export interface ChartsConfig {
    [key: string]: ChartConfig;
}

export interface ChartConfig {
    elementId: string;
    options: GraphOptions;
    headers: GraphHeader[];
}
