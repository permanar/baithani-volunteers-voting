import dotenv from "dotenv";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "./schema";

declare global {
  /* eslint no-var: off */
  var _db:
    | (MySql2Database<typeof schema> & {
        $client: mysql.Pool;
      })
    | undefined;
}

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
});

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db =
  globalThis._db ||
  drizzle(poolConnection, {
    mode: "default",
    schema,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

export { db };
