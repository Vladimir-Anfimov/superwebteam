"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavChart = void 0;
class FavChart {
    constructor(id, chart) {
        this.id = id;
        this.chartType = chart.chartType;
        this.labels = chart.labels;
        this.datasets = chart.datasets;
    }
}
exports.FavChart = FavChart;
