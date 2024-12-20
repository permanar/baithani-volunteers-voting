import { eq } from "drizzle-orm";

import { db } from "../mysql";
import { ROLES, roles, RolesInsert } from "../schema";

export async function seedRoles() {
  console.log(`\n🌱 Seeding: roles...`);
  console.time("⏱ Seeding Time");

  const allRoles: RolesInsert[] = [
    {
      name: ROLES.ADMIN,
      description: "Admin role",
    },
    {
      name: ROLES.USER,
      description: "User role",
    },
  ];

  let count = 0;
  for (const role of allRoles) {
    const existed = await db.query.roles.findFirst({
      where: eq(roles.name, role.name),
    });

    if (!existed) {
      await db.insert(roles).values(role);
      count += 1;
    }
  }

  console.log(`✅ Seeding roles done: ${count} rows.`);
  console.timeEnd("⏱ Seeding Time");

  console.log("────────────────────────────────────────\n");
}
