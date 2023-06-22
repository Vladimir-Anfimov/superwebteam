"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesDAO = void 0;
const FavChart_1 = require("../dtos/charts/FavChart");
const db_1 = require("../db");
class FavouritesDAO {
    static async insertFavourite(id, content) {
        const query = "INSERT INTO favourites(user_id, query) VALUES($1, $2) RETURNING id;";
        try {
            const result = await db_1.pool.query(query, [id, content]);
            return result.rows[0].id;
        }
        catch (error) {
            console.error("Error inserting favorite:", error);
            throw error;
        }
    }
    static async getFavourites(id) {
        const query = "SELECT id, query FROM favourites WHERE user_id = $1";
        try {
            const { rows } = await db_1.pool.query(query, [id]);
            const favorites = rows.map((row) => new FavChart_1.FavChart(row.id, JSON.parse(row.query)));
            return favorites;
        }
        catch (error) {
            console.error("Error retrieving favorites:", error);
            throw error;
        }
    }
    static async deleteFavourite(userId, chartId) {
        const query = "DELETE FROM favourites WHERE user_id = $1 AND id = $2";
        try {
            const res = await db_1.pool.query(query, [userId, chartId]);
            return "succes!";
        }
        catch (error) {
            console.error("Error retrieving favorites:", error);
            throw error;
        }
    }
}
exports.FavouritesDAO = FavouritesDAO;
