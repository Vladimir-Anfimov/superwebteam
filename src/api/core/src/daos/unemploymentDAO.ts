import { pool } from "../db";
import { IUnemployment } from "../entities/unemployment";

export class UnemploymentDAO {
  public static async getAllUnemploymentData(): Promise<IUnemployment[]> {
    const query =
      "SELECT u.*, c.name county_name FROM unemployment u JOIN counties c ON u.id_county = c.id";
    const result = await pool.query(query);
    return result.rows;
  }

  public static async getByCountyYearNumber(
    id_county: number,
    year: number,
    month: number
  ): Promise<IUnemployment[]> {
    const query = `SELECT * FROM unemployment where id_county = ${id_county} and extract(year from period) = ${year} and extract(month from period) = ${month}`;

    const result = await pool.query(query);

    return result.rows;
  }

  public static async getByCountyDateCriteria(
    id_county: number,
    startDate : Date,
    endDate : Date
  ): Promise<IUnemployment[]> {
    const query = "SELECT u.*, c.name as county_name FROM unemployment u join counties c on c.id = u.id_county where u.id_county = $1 and u.period between $2 and $3 ORDER BY u.period";

    const result = await pool.query(query, [id_county, startDate , endDate]);

    return result.rows;
  }
}
