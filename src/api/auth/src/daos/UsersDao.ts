import { pool } from "../db";
import { User } from "../entities/User";

export class UsersDao {
  public static async getUserByEmail(email: string): Promise<User> {
    const query = "SELECT * from users WHERE email = $1";

    const result = await pool.query<User>(query, [email]);
    return result.rows[0];
  }

  public static async add(user: User): Promise<User> {
    const query =
      "INSERT INTO users (email, hashed_password, last_time_active, created_at) VALUES ($1, $2, $3, $4) RETURNING *";

    const result = await pool.query<User>(query, [
      user.email,
      user.hashed_password,
      user.last_time_active,
      user.created_at,
    ]);

    return result.rows[0];
  }

  public static async updateEmail(id: number, email: string): Promise<User> {
    const query = "UPDATE users SET email = $1 WHERE id = $2 RETURNING *";

    const result = await pool.query<User>(query, [email, id]);

    return result.rows[0];
  }

  public static async updatePassword(id: number, hashedPassword: string) {
    const query = "UPDATE users SET hashed_password = $1 WHERE id = $2";

    await pool.query<User>(query, [hashedPassword, id]);
  }

  public static async getById(id: number): Promise<User> {
    const query = "SELECT * from users WHERE id = $1";

    const result = await pool.query<User>(query, [id]);

    return result.rows[0];
  }

  public static async updateLastTimeActive(id: number) {
    const query = "UPDATE users SET last_time_active = $1 WHERE id = $2";

    await pool.query(query, [new Date(), id]);
  }
}
