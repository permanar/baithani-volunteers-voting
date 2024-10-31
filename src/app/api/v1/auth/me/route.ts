import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { db, users } from "@/db/mysql2";
import { UserTokenJwtPayload } from "@/types";
import { withAuth } from "@/lib/api";

export const GET = withAuth(async (req: NextRequest, session) => {
  try {
    const userJwt = jwt.verify(session.value, process.env.AUTH_SECRET) as UserTokenJwtPayload;
    const userId = userJwt.id;

    const rows = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        password: false,
      },
    });

    if (!rows) {
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
        data: rows,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;

    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
});
