import { Dataset } from "./Dataset";
import {Chart} from "../charts/Chart";

export class FavChart {
    public id : number;
    public chartType : string;
    public labels : string[];
    public datasets : Dataset[];

    constructor (id: number, chart : Chart)
    {
        this.id = id;
        this.chartType = chart.chartType;
        this.labels = chart.labels;
        this.datasets = chart.datasets;
    }
}