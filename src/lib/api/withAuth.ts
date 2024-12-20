import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export const withAuth = (handler: (req: NextRequest, session: RequestCookie) => Promise<NextResponse>) => {
  return async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const session = req.cookies.get("session");

    if (!session?.value) {
      return NextResponse.json(
        {
          message: "User is not authenticated",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    try {
      jwt.verify(session.value, process.env.AUTH_SECRET);
    } catch (err) {
      const error = err as Error;

      const response = NextResponse.json(
        {
          message: "User session is invalid. Please re-login.",
          cause: error.message,
          success: false,
        },
        {
          status: 401,
        }
      );

      response.cookies.set("session", "", {
        httpOnly: true,
        maxAge: 0,
      });

      return response;
    }

    return handler(req, session);
  };
};
