import Papa from "papaparse";
import { promises as fs } from "fs";
import bcrypt from "bcryptjs";

import { db } from "./mysql";
import { users } from "./schema";

type UserCsvType = {
  name: string;
  username: string;
  password: string;
};

async function main() {
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

  await db.insert(users).values(allUsers).execute();

  console.log(`✅ Seeding users done: ${allUsers.length} rows.`);
  console.timeEnd("Seeding time");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
