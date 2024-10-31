import Papa from "papaparse";
import { promises as fs } from "fs";
import bcrypt from "bcryptjs";

import { db } from "../mysql";
import { users } from "../schema";
import { eq } from "drizzle-orm";

type UserCsvType = {
  name: string;
  username: string;
  password: string;
};

export async function seedUsers() {
  console.log(`🌱 Seeding: users...`);
  console.time("Seeding time");

  const data = await fs.readFile("./csv/pelayan-no-duplicate.csv", "utf-8");
  const usersCsv = Papa.parse<UserCsvType>(data, {
    header: true,
  });

  const allUsers = usersCsv.data.map((user) => {
    const full_name = user.name;
    const username = user.username;
    const password = bcrypt.hashSync(user.password, 10);

    return {
      full_name,
      username,
      password,
    };
  });

  let count = 0;
  for (const user of allUsers) {
    const existed = await db.query.users.findFirst({
      where: eq(users.username, user.username),
    });

    if (!existed) {
      await db.insert(users).values(user);
      count += 1;
    }
  }

  console.log(`✅ Seeding users done: ${count} rows.`);
  console.timeEnd("Seeding time");
}
