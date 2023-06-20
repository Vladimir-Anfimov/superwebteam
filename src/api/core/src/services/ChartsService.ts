import { ChartsInput } from "../dtos/charts/ChartsInput";
import { Chart } from "../dtos/charts/Chart";
import { Dataset } from "../dtos/charts/Dataset";
import { UnemploymentDAO } from "../daos/unemploymentDAO";
import { getFieldValue } from "../entities/unemployment";
import { IUnemployment } from "../entities/unemployment";
import { BadRequestException } from "../exceptions/BadRequestException";

export class ChartsService {
  public static async getChart(input: ChartsInput): Promise<Chart[]> {
    console.log(input);
    if (input.counties.length == 0) {
      throw new BadRequestException("No counties given");
    }
    if (input.criteria.length == 0) {
      throw new BadRequestException("No criterias given");
    }

    if (input.counties.length == 1) {
      if (input.criteria.length > 1) {
        if (input.startDate != input.endDate) {
          return this.getCharts1(
            input.counties[0],
            input.startDate,
            input.endDate,
            input.criteria
          );
        } else {
          return this.getCharts5(
            input.counties[0],
            input.endDate,
            input.criteria
          );
        }
      } else {
        if (input.startDate != input.endDate) {
          return this.getCharts2(
            input.counties[0],
            input.startDate,
            input.endDate,
            input.criteria[0]
          );
        } else {
          throw new BadRequestException("Can't be represented as a chart");
        }
      }
    } else {
      if (input.criteria.length == 1) {
        if (input.startDate != input.endDate) {
          return this.getCharts3(
            input.counties,
            input.startDate,
            input.endDate,
            input.criteria[0]
          );
        } else {
          return this.getCharts4(
            input.counties,
            input.endDate,
            input.criteria[0]
          );
        }
      } else {
        console.log("not good");
      }
    }

    return [];
  }

  public static async getCharts1(
    id_county: number,
    startDate: Date,
    endDate: Date,
    criteria: string[]
  ): Promise<Chart[]> {
    //un judet, mai multe luni, mai multe criterii

    let result: IUnemployment[] = await UnemploymentDAO.getByCountyDateCriteria(
      id_county,
      startDate,
      endDate
    );

    let labels: string[] = Array.from(
      new Set(
        result.map((x) => {
          let res: string =
            new Date(x.period).getMonth() +
            1 +
            " " +
            new Date(x.period).getFullYear();
          return res;
        })
      )
    );

    let datasets: Dataset[] = new Array();

    let pieLabels: string[] = criteria;
    let pieDataset: number[] = new Array();

    for (let c of criteria) {
      let values: number[] = result.map((x) => getFieldValue(x, c));

      pieDataset.push(
        Math.round(values.reduce((a, b) => a + b) / values.length)
      );

      datasets.push(new Dataset(c, values));
    }

    return [
      new Chart("pie", pieLabels, [
        new Dataset(result[0].county_name, pieDataset),
      ]),
      new Chart("bar", labels, datasets),
      new Chart("line", labels, datasets),
    ];
  }

  public static async getCharts2(
    id_county: number,
    startDate: Date,
    endDate: Date,
    criteria: string
  ): Promise<Chart[]> {
    //un judet, mai multe luni, un singur criteriu

    let result: IUnemployment[] = await UnemploymentDAO.getByCountyDateCriteria(
      id_county,
      startDate,
      endDate
    );

    let labels: string[] = Array.from(
      new Set(
        result.map((x) => {
          let res: string =
            new Date(x.period).getMonth() +
            1 +
            " " +
            new Date(x.period).getFullYear();
          return res;
        })
      )
    );

    let dataset: Dataset = new Dataset(
      result[0].county_name,
      result.map((x) => getFieldValue(x, criteria))
    );

    return [
      new Chart("pie", labels, [dataset]),
      new Chart("bar", labels, [dataset]),
      new Chart("line", labels, [dataset]),
    ];
  }

  public static async getCharts3(
    counties: number[],
    startDate: Date,
    endDate: Date,
    criteria: string
  ): Promise<Chart[]> {
    //mai multe judete, mai multe luni, un criteriu

    let datasets: Dataset[] = new Array();

    let labels: string[] = new Array();

    let piechartLabels: string[] = new Array();

    let pieDataset: number[] = new Array();

    for (let id_county of counties) {
      let result: IUnemployment[] =
        await UnemploymentDAO.getByCountyDateCriteria(
          id_county,
          startDate,
          endDate
        );

      labels = Array.from(
        new Set(
          result.map((x) => {
            let res: string =
              new Date(x.period).getMonth() +
              1 +
              " " +
              new Date(x.period).getFullYear();
            return res;
          })
        )
      );

      datasets.push(
        new Dataset(
          result[0].county_name,
          result.map((x) => getFieldValue(x, criteria))
        )
      );

      piechartLabels.push(result[0].county_name);

      let values: number[] = result.map((x) => getFieldValue(x, criteria));

      pieDataset.push(
        Math.round(values.reduce((a, b) => a + b) / values.length)
      );
    }

    return [
      new Chart("pie", piechartLabels, [
        new Dataset("Media pe luni", pieDataset),
      ]),
      new Chart("bar", labels, datasets),
      new Chart("line", labels, datasets),
    ];
  }

  public static async getCharts4(
    counties: number[],
    date: Date,
    criteria: string
  ): Promise<Chart[]> {
    //mai multe judete, o luna, un criteriu

    let datasets: number[] = new Array();

    let labels: string[] = new Array();

    let piechartLabels: string[] = new Array();

    let pieDataset: number[] = new Array();

    for (let id_county of counties) {
      let result: IUnemployment[] =
        await UnemploymentDAO.getByCountyDateCriteria(id_county, date, date);

      labels.push(result[0].county_name);

      datasets.push(getFieldValue(result[0], criteria));
    }

    return [
      new Chart("pie", labels, [new Dataset(criteria, datasets)]),
      new Chart("bar", labels, [new Dataset(criteria, datasets)]),
    ];
  }

  public static async getCharts5(
    id_county: number,
    date: Date,
    criteria: string[]
  ): Promise<Chart[]> {
    // un judet, o luna, mai multe criterii

    let result: IUnemployment[] = await UnemploymentDAO.getByCountyDateCriteria(
      id_county,
      date,
      date
    );

    let labels: string[] = Array.from(
      new Set(
        result.map((x) => {
          let res: string =
            new Date(x.period).getMonth() +
            1 +
            " " +
            new Date(x.period).getFullYear();
          return res;
        })
      )
    );

    let datasets: Dataset[] = new Array();

    let pieLabels: string[] = criteria;
    let pieDataset: number[] = new Array();

    for (let c of criteria) {
      let values: number[] = result.map((x) => getFieldValue(x, c));

      pieDataset.push(
        Math.round(values.reduce((a, b) => a + b) / values.length)
      );

      datasets.push(new Dataset(c, values));
    }

    return [
      new Chart("pie", pieLabels, [
        new Dataset(result[0].county_name, pieDataset),
      ]),
      new Chart("bar", labels, datasets),
    ];
  }
}
