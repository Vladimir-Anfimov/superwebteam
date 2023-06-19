import { Dataset } from "./Dataset";

export class Chart {
    public chartType : string;
    public labels : string[];
    public datasets : Dataset[];

    constructor (type : string, labels : string [], datasets : Dataset [])
    {
        this.chartType = type;
        this.labels = labels;
        this.datasets = datasets;
    }
}