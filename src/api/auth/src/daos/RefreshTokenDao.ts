import { pool } from "../db";
import { RefreshToken } from "../entities/RefreshToken";

export class RefreshTokenDao {
  public static async add({
    id_user,
    value,
    expires_at,
  }: RefreshToken): Promise<RefreshToken> {
    const query =
      "INSERT INTO refresh_tokens (id_user, value, expires_at) VALUES ($1, $2, $3) RETURNING *";

    const result = await pool.query(query, [id_user, value, expires_at]);

    return result.rows[0];
  }

  public static async getByValue(value: string): Promise<RefreshToken> {
    const query =
      "SELECT * from refresh_tokens WHERE value = $1 AND expires_at > NOW()";

    const result = await pool.query<RefreshToken>(query, [value]);
    return result.rows[0];
  }
}
