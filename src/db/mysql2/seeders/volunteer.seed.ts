import Papa from "papaparse";
import { promises as fs } from "fs";
import { and, eq } from "drizzle-orm";

import { db } from "../mysql";
import { users, volunteerCategories, volunteers } from "../schema";

type VolunteerCsvType = {
  category: string;
  username: string;
};

export async function seedVolunteers() {
  console.log(`\n🌱 Seeding: volunteers...`);
  console.time("⏱ Seeding Time");

  const data = await fs.readFile("./csv/volunteers-table.csv", "utf-8");
  const parsedCsv = Papa.parse<VolunteerCsvType>(data, {
    header: true,
  });

  let count = 0;
  for (const data of parsedCsv.data) {
    // check if user exist by the username
    const user = await db.query.users.findFirst({
      where: eq(users.username, data.username),
    });

    if (user) {
      // check if existing volunteer category by the name
      const category = await db.query.volunteerCategories.findFirst({
        where: eq(volunteerCategories.name, data.category),
      });

      // if both user and category exist, insert a new volunteer record
      if (category) {
        const userId = BigInt(user.id);
        const categoryId = BigInt(category.id);

        // before inserting, check if the volunteer record already exists
        const volunteer = await db.query.volunteers.findFirst({
          where: and(eq(volunteers.user_id, userId), eq(volunteers.volunteer_category_id, categoryId)),
        });

        // if finally no volunteer record found, then insert a new one
        if (!volunteer) {
          await db.insert(volunteers).values({
            user_id: userId,
            volunteer_category_id: categoryId,
          });

          count += 1;
        }
      }
    }
  }

  console.log(`✅ Seeding volunteers done: ${count} rows.`);
  console.timeEnd("⏱ Seeding Time");

  console.log("────────────────────────────────────────");
}
