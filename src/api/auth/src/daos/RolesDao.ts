import { pool } from "../db";

export class RolesDao {
  public static async getRolesByUserId(id: number): Promise<string[]> {
    const query = `SELECT r.name from roles r INNER JOIN
        users_to_roles ur ON ur.id_role = r.id WHERE ur.id_user = $1`;

    const result = await pool.query(query, [id]);
    const roles = result.rows.map((r) => r.name);

    // console.log("My result: " + roles);

    return roles;
  }

  public static async addUserRole(id_user: number): Promise<void> {
    const query = `INSERT INTO users_to_roles (id_user, id_role) VALUES ($1, $2)`;
    const USER_ROLE_ID = 1;

    await pool.query(query, [id_user, USER_ROLE_ID]);
  }
}
