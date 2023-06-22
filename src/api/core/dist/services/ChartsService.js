"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartsService = void 0;
const Chart_1 = require("../dtos/charts/Chart");
const Dataset_1 = require("../dtos/charts/Dataset");
const unemploymentDAO_1 = require("../daos/unemploymentDAO");
const unemployment_1 = require("../entities/unemployment");
const BadRequestException_1 = require("../exceptions/BadRequestException");
class ChartsService {
    static async getChart(input) {
        console.log(input);
        if (input.counties.length == 0) {
            throw new BadRequestException_1.BadRequestException("No counties given");
        }
        if (input.criteria.length == 0) {
            throw new BadRequestException_1.BadRequestException("No criterias given");
        }
        if (input.counties.length == 1) {
            if (input.criteria.length > 1) {
                if (input.startDate != input.endDate) {
                    return this.getCharts1(input.counties[0], input.startDate, input.endDate, input.criteria);
                }
                else {
                    return this.getCharts5(input.counties[0], input.endDate, input.criteria);
                }
            }
            else {
                if (input.startDate != input.endDate) {
                    return this.getCharts2(input.counties[0], input.startDate, input.endDate, input.criteria[0]);
                }
                else {
                    throw new BadRequestException_1.BadRequestException("Can't be represented as a chart");
                }
            }
        }
        else {
            if (input.criteria.length == 1) {
                if (input.startDate != input.endDate) {
                    return this.getCharts3(input.counties, input.startDate, input.endDate, input.criteria[0]);
                }
                else {
                    return this.getCharts4(input.counties, input.endDate, input.criteria[0]);
                }
            }
            else {
                console.log("not good");
            }
        }
        return [];
    }
    static async getCharts1(id_county, startDate, endDate, criteria) {
        //un judet, mai multe luni, mai multe criterii
        let result = await unemploymentDAO_1.UnemploymentDAO.getByCountyDateCriteria(id_county, startDate, endDate);
        let labels = Array.from(new Set(result.map((x) => {
            let res = new Date(x.period).getMonth() +
                1 +
                " " +
                new Date(x.period).getFullYear();
            return res;
        })));
        let datasets = new Array();
        let pieLabels = criteria;
        let pieDataset = new Array();
        for (let c of criteria) {
            let values = result.map((x) => (0, unemployment_1.getFieldValue)(x, c));
            pieDataset.push(Math.round(values.reduce((a, b) => a + b) / values.length));
            datasets.push(new Dataset_1.Dataset(c, values));
        }
        return [
            new Chart_1.Chart("pie", pieLabels, [
                new Dataset_1.Dataset(result[0].county_name, pieDataset),
            ]),
            new Chart_1.Chart("bar", labels, datasets),
            new Chart_1.Chart("line", labels, datasets),
        ];
    }
    static async getCharts2(id_county, startDate, endDate, criteria) {
        //un judet, mai multe luni, un singur criteriu
        let result = await unemploymentDAO_1.UnemploymentDAO.getByCountyDateCriteria(id_county, startDate, endDate);
        let labels = Array.from(new Set(result.map((x) => {
            let res = new Date(x.period).getMonth() +
                1 +
                " " +
                new Date(x.period).getFullYear();
            return res;
        })));
        let dataset = new Dataset_1.Dataset(result[0].county_name, result.map((x) => (0, unemployment_1.getFieldValue)(x, criteria)));
        return [
            new Chart_1.Chart("pie", labels, [dataset]),
            new Chart_1.Chart("bar", labels, [dataset]),
            new Chart_1.Chart("line", labels, [dataset]),
        ];
    }
    static async getCharts3(counties, startDate, endDate, criteria) {
        //mai multe judete, mai multe luni, un criteriu
        let datasets = new Array();
        let labels = new Array();
        let piechartLabels = new Array();
        let pieDataset = new Array();
        for (let id_county of counties) {
            let result = await unemploymentDAO_1.UnemploymentDAO.getByCountyDateCriteria(id_county, startDate, endDate);
            labels = Array.from(new Set(result.map((x) => {
                let res = new Date(x.period).getMonth() +
                    1 +
                    " " +
                    new Date(x.period).getFullYear();
                return res;
            })));
            datasets.push(new Dataset_1.Dataset(result[0].county_name, result.map((x) => (0, unemployment_1.getFieldValue)(x, criteria))));
            piechartLabels.push(result[0].county_name);
            let values = result.map((x) => (0, unemployment_1.getFieldValue)(x, criteria));
            pieDataset.push(Math.round(values.reduce((a, b) => a + b) / values.length));
        }
        return [
            new Chart_1.Chart("pie", piechartLabels, [
                new Dataset_1.Dataset("Media pe luni", pieDataset),
            ]),
            new Chart_1.Chart("bar", labels, datasets),
            new Chart_1.Chart("line", labels, datasets),
        ];
    }
    static async getCharts4(counties, date, criteria) {
        //mai multe judete, o luna, un criteriu
        let datasets = new Array();
        let labels = new Array();
        let piechartLabels = new Array();
        let pieDataset = new Array();
        for (let id_county of counties) {
            let result = await unemploymentDAO_1.UnemploymentDAO.getByCountyDateCriteria(id_county, date, date);
            labels.push(result[0].county_name);
            datasets.push((0, unemployment_1.getFieldValue)(result[0], criteria));
        }
        return [
            new Chart_1.Chart("pie", labels, [new Dataset_1.Dataset(criteria, datasets)]),
            new Chart_1.Chart("bar", labels, [new Dataset_1.Dataset(criteria, datasets)]),
        ];
    }
    static async getCharts5(id_county, date, criteria) {
        // un judet, o luna, mai multe criterii
        let result = await unemploymentDAO_1.UnemploymentDAO.getByCountyDateCriteria(id_county, date, date);
        let labels = Array.from(new Set(result.map((x) => {
            let res = new Date(x.period).getMonth() +
                1 +
                " " +
                new Date(x.period).getFullYear();
            return res;
        })));
        let datasets = new Array();
        let pieLabels = criteria;
        let pieDataset = new Array();
        for (let c of criteria) {
            let values = result.map((x) => (0, unemployment_1.getFieldValue)(x, c));
            pieDataset.push(Math.round(values.reduce((a, b) => a + b) / values.length));
            datasets.push(new Dataset_1.Dataset(c, values));
        }
        return [
            new Chart_1.Chart("pie", pieLabels, [
                new Dataset_1.Dataset(result[0].county_name, pieDataset),
            ]),
            new Chart_1.Chart("bar", labels, datasets),
        ];
    }
}
exports.ChartsService = ChartsService;
