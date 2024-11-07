import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { eq, getTableColumns, sql } from "drizzle-orm";

import { db, Roles, roles, userRoles, users } from "@/db/mysql2";
import { UserTokenJwtPayload } from "@/types";
import { withAuth } from "@/lib/api";

export const GET = withAuth(async (req: NextRequest, session) => {
  try {
    const userJwt = jwt.verify(session.value, process.env.AUTH_SECRET) as UserTokenJwtPayload;
    const userId = userJwt.id;

    const { password, ...userColumns } = getTableColumns(users);

    const rows = await db
      .select({
        ...userColumns,
        roles: sql<Pick<Roles, "id" | "name" | "description">[]>`JSON_ARRAYAGG(
          JSON_OBJECT( 
            'id', ${roles.id},
            'name', ${roles.name},
            'description', ${roles.description}
          )
        )`,
      })
      .from(users)
      .where(eq(users.id, userId))
      .leftJoin(userRoles, eq(userRoles.user_id, users.id))
      .leftJoin(roles, eq(roles.id, userRoles.role_id))
      .groupBy(users.id)
      .limit(1);

    if (!rows.length) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully fetched user data",
        success: true,
        data: rows[0],
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;

    return NextResponse.json(
      {
        message: err.message,
        success: false,
      },
      { status: 500 }
    );
  }
});
