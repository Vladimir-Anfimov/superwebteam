"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenDao = void 0;
const db_1 = require("../db");
class RefreshTokenDao {
    static async add({ id_user, value, expires_at, }) {
        const query = "INSERT INTO refresh_tokens (id_user, value, expires_at) VALUES ($1, $2, $3) RETURNING *";
        const result = await db_1.pool.query(query, [id_user, value, expires_at]);
        return result.rows[0];
    }
    static async getByValue(value) {
        const query = "SELECT * from refresh_tokens WHERE value = $1 AND expires_at > NOW()";
        const result = await db_1.pool.query(query, [value]);
        return result.rows[0];
    }
}
exports.RefreshTokenDao = RefreshTokenDao;
