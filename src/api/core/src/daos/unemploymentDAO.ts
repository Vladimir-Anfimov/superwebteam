import { pool } from "../db";
import { IUnemployment } from "../entities/unemployment";

export class UnemploymentDAO {
  public static async getAllUnemploymentData(): Promise<IUnemployment[]> {
    const query =
      "SELECT u.*, c.name county_name FROM unemployment u JOIN counties c ON u.id_county = c.id";
    const result = await pool.query(query);
    return result.rows;
  }
}
