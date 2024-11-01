import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
});

export default defineConfig({
  schema: "./src/db/mysql2/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  out: "./drizzle-mysql2",
  verbose: true,
  strict: true,
});
