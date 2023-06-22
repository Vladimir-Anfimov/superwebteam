"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesDao = void 0;
const db_1 = require("../db");
class RolesDao {
    static async getRolesByUserId(id) {
        const query = `SELECT r.name from roles r INNER JOIN
        users_to_roles ur ON ur.id_role = r.id WHERE ur.id_user = $1`;
        const result = await db_1.pool.query(query, [id]);
        const roles = result.rows.map((r) => r.name);
        return roles;
    }
}
exports.RolesDao = RolesDao;
