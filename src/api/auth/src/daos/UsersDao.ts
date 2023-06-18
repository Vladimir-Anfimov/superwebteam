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
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *";

    const result = await pool.query<User>(query, [
      user.email,
      user.hashed_password,
    ]);

    return result.rows[0];
  }
}
