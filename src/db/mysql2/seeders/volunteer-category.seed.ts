import { eq } from "drizzle-orm";

import { db } from "../mysql";
import { volunteerCategories, VolunteerCategoriesInsert } from "../schema";

export async function seedVolunteerCategories() {
  console.log(`\n🌱 Seeding: volunteer categories...`);
  console.time("⏱ Seeding Time");

  const allVolunteerCategories: VolunteerCategoriesInsert[] = [
    { name: "Usher" },
    { name: "Tamborine & Flag" },
    { name: "Serafim" },
    { name: "PC Dancer" },
    { name: "PIC" },
    { name: "Praise and Worship" },
    { name: "Faithful" },
    { name: "Multimedia - Medsos" },
    { name: "Baithani Kids & Teens Choir" },
    { name: "Paduan Suara Solideo" },
    { name: "Perjamuan Kudus" },
    { name: "Sekolah Minggu" },
    { name: "BSJ" },
    { name: "Next Gen" },
    { name: "Werdha" },
    { name: "Mambang" },
    { name: "Diakonia" },
    { name: "KKJ" },
    { name: "Misi" },
    { name: "Yayasan Margi Rahayu" },
    { name: "Penatua" },
  ];

  let count = 0;
  for (const data of allVolunteerCategories) {
    const existed = await db.query.volunteerCategories.findFirst({
      where: eq(volunteerCategories.name, data.name),
    });

    if (!existed) {
      await db.insert(volunteerCategories).values(data);
      count += 1;
    }
  }

  console.log(`✅ Seeding volunteer categories done: ${count} rows.`);
  console.timeEnd("⏱ Seeding Time");

  console.log("────────────────────────────────────────\n");
}
