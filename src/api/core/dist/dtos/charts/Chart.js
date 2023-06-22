"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
class Chart {
    constructor(type, labels, datasets) {
        this.chartType = type;
        this.labels = labels;
        this.datasets = datasets;
    }
}
exports.Chart = Chart;
