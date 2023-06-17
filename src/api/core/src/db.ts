import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: "amazondb.postgres.database.azure.com",
  port: 5432,
  user: "postgres",
  password: "VladimirSami1234",
  database: "web",
  ssl: true,
});
