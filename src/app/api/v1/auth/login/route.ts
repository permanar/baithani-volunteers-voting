import { NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db, users } from "@/db/mysql2";
import { UserTokenJwtPayload } from "@/types";

export const POST = async (req: NextRequest) => {
  try {
    const request = await req.json();
    const { username, password } = request;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        {
          status: 400,
        }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        {
          status: 404,
        }
      );
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json({ error: "Invalid Credentials." }, { status: 401 });
    }

    // if user still has an active session, throw an error and tell them they are already logged in
    try {
      const session = req.cookies.get("session");

      if (session) {
        jwt.verify(session.value, process.env.AUTH_SECRET);

        return NextResponse.json(
          {
            message: "You are already logged in.",
          },
          { status: 400 }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      // do nothing
    }

    const expiresIn = Number(process.env.AUTH_MAX_AGE) || 1 * 60 * 60 * 1000; // or 1 hour
    const jwtPayload: UserTokenJwtPayload = {
      id: user.id,
      full_name: user.full_name,
      username: user.username,
    };

    const accessToken = jwt.sign(jwtPayload, process.env.AUTH_SECRET, {
      expiresIn: String(expiresIn), // so it would be in milliseconds if passed as a string
    });

    const response = NextResponse.json(
      {
        message: "Logged in successfully.",
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
      },
      { status: 500 }
    );
  }
};
