"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDao = void 0;
const db_1 = require("../db");
class UsersDao {
    static async getById(id) {
        const query = "SELECT * from users WHERE id = $1";
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0];
    }
    static async updateLastTimeActive(id) {
        const query = "UPDATE users SET last_time_active = $1 WHERE id = $2";
        await db_1.pool.query(query, [new Date(), id]);
    }
    static async getFromPage(pageNumber, pageSize) {
        const query = "SELECT * FROM users ORDER BY last_time_active OFFSET $1 LIMIT $2";
        const result = await db_1.pool.query(query, [
            pageNumber * pageSize,
            pageSize,
        ]);
        return result.rows;
    }
    static async count() {
        const query = "SELECT COUNT(*) FROM users";
        const result = await db_1.pool.query(query);
        return parseInt(result.rows[0].count);
    }
}
exports.UsersDao = UsersDao;
