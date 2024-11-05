import { NextRequest, NextResponse } from "next/server";

import { eq, getTableColumns, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db, Roles, roles, userRoles, users } from "@/db/mysql2";
import { UserTokenJwtPayload } from "@/types";

export const POST = async (req: NextRequest) => {
  try {
    const request = await req.json();
    const { username, password } = request;

    if (!username || !password) {
      return NextResponse.json(
        {
          message: "Username and password are required.",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    // it intentionally assigned inside an array to get the first element
    const [user] = await db
      .select({
        ...getTableColumns(users),
        roles: sql<Pick<Roles, "id" | "name" | "description">[]>`JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', ${roles.id},
            'name', ${roles.name},
            'description', ${roles.description}
          )
        )`,
      })
      .from(users)
      .where(eq(users.username, username))
      .leftJoin(userRoles, eq(userRoles.user_id, users.id))
      .leftJoin(roles, eq(roles.id, userRoles.role_id))
      .groupBy(users.id)
      .execute();

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

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        {
          message: "Invalid password.",
          success: false,
        },
        { status: 401 }
      );
    }

    try {
      const session = req.cookies.get("session");

      if (session) {
        jwt.verify(session.value, process.env.AUTH_SECRET);

        return NextResponse.json(
          {
            message: "You are already logged in.",
            success: false,
          },
          { status: 400 }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      // do nothing
    }

    const expiresIn = Number(process.env.AUTH_MAX_AGE) || Number(1 * 60 * 60 * 1000); // or 1 hour
    const jwtPayload: UserTokenJwtPayload = {
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      role: user.roles.map((role) => role.name).join(","),
    };

    const accessToken = jwt.sign(jwtPayload, process.env.AUTH_SECRET, {
      expiresIn: String(expiresIn), // so it would be in milliseconds if passed as a string
    });

    const response = NextResponse.json(
      {
        message: "Logged in successfully.",
        success: true,
        data: {
          access_token: String(accessToken),
        },
      },
      {
        status: 200,
      }
    );

    response.cookies.set("session", String(accessToken), {
      httpOnly: true,
      expires: new Date(Date.now() + expiresIn),
    });

    return response;
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
};
