import { eq, sql } from "drizzle-orm";

import { db } from "../mysql";
import { roles, userRoles, users } from "../schema";

export async function seedUserRoles() {
  console.log(`🌱 Seeding: user roles...`);
  console.time("Seeding time");

  let count = 0;
  const usersTb = await db.select().from(users);

  for (const user of usersTb) {
    // check if the user already has a role assigned
    const existed = await db.query.userRoles.findFirst({
      where: sql`${userRoles.user_id} = ${user.id}`,
    });

    if (!existed) {
      const rolesTb = await db.query.roles.findFirst({
        where: eq(roles.name, "user"),
      });

      if (rolesTb) {
        // assign a default `user` role to the user
        await db.insert(userRoles).values({
          user_id: BigInt(user.id),
          role_id: BigInt(rolesTb.id),
        });
        count += 1;
      }
    }
  }

  console.log(`✅ Seeding user roles done: ${count} rows.`);
  console.timeEnd("Seeding time");
}
