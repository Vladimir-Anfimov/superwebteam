"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnemploymentDAO = void 0;
const db_1 = require("../db");
class UnemploymentDAO {
    static async getAllUnemploymentData() {
        const query = "SELECT u.*, c.name county_name FROM unemployment u JOIN counties c ON u.id_county = c.id";
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    static async getByCountyYearNumber(id_county, year, month) {
        const query = `SELECT * FROM unemployment where id_county = ${id_county} and extract(year from period) = ${year} and extract(month from period) = ${month}`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    static async getByCountyDateCriteria(id_county, startDate, endDate) {
        const query = "SELECT u.*, c.name as county_name FROM unemployment u join counties c on c.id = u.id_county where u.id_county = $1 and u.period between $2 and $3 ORDER BY u.period";
        const result = await db_1.pool.query(query, [id_county, startDate, endDate]);
        return result.rows;
    }
}
exports.UnemploymentDAO = UnemploymentDAO;
