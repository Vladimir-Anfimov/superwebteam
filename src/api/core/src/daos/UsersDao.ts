import { pool } from "../db";
import { User } from "../entities/User";

export class UsersDao {
  public static async getById(id: number): Promise<User> {
    const query = "SELECT * from users WHERE id = $1";
    const result = await pool.query<User>(query, [id]);

    return result.rows[0];
  }

  public static async updateLastTimeActive(id: number) {
    const query = "UPDATE users SET last_time_active = $1 WHERE id = $2";

    await pool.query(query, [new Date(), id]);
  }

  public static async getFromPage(
    pageNumber: number,
    pageSize: number
  ): Promise<User[]> {
    const query =
      "SELECT * FROM users ORDER BY last_time_active OFFSET $1 LIMIT $2";
    const result = await pool.query<User>(query, [
      pageNumber * pageSize,
      pageSize,
    ]);

    return result.rows;
  }

  public static async count(): Promise<number> {
    const query = "SELECT COUNT(*) FROM users";
    const result = await pool.query<{ count: string }>(query);

    return parseInt(result.rows[0].count);
  }
}
