import {ChartConfig} from "../configs/charts.config";

export class GraphService {

    public static initializeGoogleCharts(): void {
        (<any>window).google.charts.load("current", {
            packages: ["corechart", "line"]
        });
    }

    public static drawGraph(grapf: Graph) {
        (<any>window).google.charts.setOnLoadCallback(grapf.drawChart);
    }

}

export class Graph {

    private graphType: string;
    private element: HTMLElement;
    private data: any[];
    private options: GraphOptions;
    private headers: GraphHeader[];

    constructor(graphType: string, data: any[], config: ChartConfig) {
        this.graphType = graphType;
        this.element = document.getElementById(config.elementId);
        this.data = data;
        this.headers = config.headers;
        this.options = config.options;
        this.drawChart = this.drawChart.bind(this);
    }

    drawChart() {
        const data = new (<any>window).google.visualization.DataTable();
        this.headers.forEach((header: GraphHeader) => {
            data.addColumn(header.type, header.title);
        });
        data.addRows(this.data);

        const graph = new (<any>window).google.visualization[this.graphType](this.element);
        graph.draw(data, this.options);
    }

}

export class GraphHeader {
    public type: string;
    public title: string;

    constructor(type: string, title: string) {
        this.title = title;
        this.type = type;
    }
}

export interface GraphOptions {
    vAxis?: GraphAxisOptions;
    hAxis?: GraphAxisOptions;
    height?: number;
    width?: number,
    legend?: {
        position?: string
    };
}

export interface GraphAxisOptions {
    minValue?: number;
    maxValue?: number;
    title?: string;
    format?: string;
}
