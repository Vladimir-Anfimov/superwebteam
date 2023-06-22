import { pool } from "../db";

export class RolesDao {
  public static async getRolesByUserId(id: number): Promise<string[]> {
    const query = `SELECT r.name from roles r INNER JOIN
        users_to_roles ur ON ur.id_role = r.id WHERE ur.id_user = $1`;

    const result = await pool.query(query, [id]);
    const roles = result.rows.map((r) => r.name);

    return roles;
  }
}
