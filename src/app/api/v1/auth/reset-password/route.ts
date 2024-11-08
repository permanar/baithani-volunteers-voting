/**
 * @file src/app/api/v1/auth/reset-password/route.ts
 *
 * @date 03-11-24 - 17:29:34
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db, ROLES, users } from "@/db/mysql2";
import { withRoles } from "@/lib/api";

export const POST = withRoles([ROLES.ADMIN], async (req) => {
  try {
    const request = await req.json();
    const { user_id, new_password } = request;

    if (!user_id || !new_password) {
      return NextResponse.json(
        {
          message: "User ID and new password are required.",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, user_id),
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, user_id));

    return NextResponse.json(
      {
        message: "Password successfully changed.",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    const err = error as Error;

    return NextResponse.json(
      {
        message: err.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
});
