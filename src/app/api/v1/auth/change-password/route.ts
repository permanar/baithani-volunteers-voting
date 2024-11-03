/**
 * @file src/app/api/v1/auth/change-password/route.ts
 *
 * @date 03-11-24 - 17:15:49
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import { withAuth } from "@/lib/api";
import { db, users } from "@/db/mysql2";
import { UserTokenJwtPayload } from "@/types";

export const POST = withAuth(async (req, session) => {
  try {
    const request = await req.json();
    const { old_password, new_password } = request;

    const userJwt = jwt.verify(session.value, process.env.AUTH_SECRET) as UserTokenJwtPayload;

    if (!old_password || !new_password) {
      return NextResponse.json(
        {
          message: "Old password and new password are required.",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userJwt.id),
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

    const valid = await bcrypt.compare(old_password, user.password);

    if (!valid) {
      return NextResponse.json(
        {
          message: "Invalid old password.",
          success: false,
        },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, userJwt.id));

    return NextResponse.json(
      {
        message: "Password has been successfully changed.",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    const error = err as Error;

    return NextResponse.json(
      {
        message: "Internal server error.",
        cause: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
});
