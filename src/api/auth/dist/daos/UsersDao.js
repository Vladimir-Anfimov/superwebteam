"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDao = void 0;
const db_1 = require("../db");
class UsersDao {
    static async getUserByEmail(email) {
        const query = "SELECT * from users WHERE email = $1";
        const result = await db_1.pool.query(query, [email]);
        return result.rows[0];
    }
    static async add(user) {
        const query = "INSERT INTO users (email, hashed_password, last_time_active, created_at) VALUES ($1, $2, $3, $4) RETURNING *";
        const result = await db_1.pool.query(query, [
            user.email,
            user.hashed_password,
            user.last_time_active,
            user.created_at,
        ]);
        return result.rows[0];
    }
    static async updateEmail(id, email) {
        const query = "UPDATE users SET email = $1 WHERE id = $2 RETURNING *";
        const result = await db_1.pool.query(query, [email, id]);
        return result.rows[0];
    }
    static async updatePassword(id, hashedPassword) {
        const query = "UPDATE users SET hashed_password = $1 WHERE id = $2";
        await db_1.pool.query(query, [hashedPassword, id]);
    }
    static async getById(id) {
        const query = "SELECT * from users WHERE id = $1";
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0];
    }
    static async updateLastTimeActive(id) {
        const query = "UPDATE users SET last_time_active = $1 WHERE id = $2";
        await db_1.pool.query(query, [new Date(), id]);
    }
}
exports.UsersDao = UsersDao;
