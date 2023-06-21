import { FavouritesInputDto } from "../dtos/charts/FavouritesInputDto";
import { FavChart } from "../dtos/charts/FavChart";
import { pool } from "../db";

export class FavouritesDAO {
  public static async insertFavourite(
    id: number,
    content: string
  ): Promise<number> {
    const query =
      "INSERT INTO favourites(user_id, query) VALUES($1, $2) RETURNING id;";

    try {
      const result = await pool.query(query, [id, content]);
      return result.rows[0].id;
    } catch (error) {
      console.error("Error inserting favorite:", error);
      throw error;
    }
  }

  public static async getFavourites(id: number): Promise<FavChart[]> {
    const query = "SELECT id, query FROM favourites WHERE user_id = $1";

    try {
      const { rows } = await pool.query(query, [id]);
      const favorites: FavChart[] = rows.map(
        (row: any) => new FavChart(row.id, JSON.parse(row.query))
      );
      return favorites;
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      throw error;
    }
  }

  public static async deleteFavourite(
    userId: number,
    chartId: number
  ): Promise<string> {
    const query = "DELETE FROM favourites WHERE user_id = $1 AND id = $2";

    try {
      const res = await pool.query(query, [userId, chartId]);

      return "succes!";
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      throw error;
    }
  }
}
