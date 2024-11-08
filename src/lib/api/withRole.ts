import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

import { UserTokenJwtPayload } from "@/types";
import { withAuth } from "./withAuth";

export const withRoles = (
  allowedRoles: string[],
  handler: (req: NextRequest, session: RequestCookie) => Promise<NextResponse>
) => {
  return withAuth(async (req: NextRequest, session: RequestCookie) => {
    try {
      const decodedToken = jwt.verify(session.value, process.env.AUTH_SECRET) as UserTokenJwtPayload;

      if (!decodedToken.roles) {
        const response = NextResponse.json(
          {
            message: "Invalid token structure or role missing. Please re-login.",
            success: false,
          },
          { status: 403 }
        );

        response.cookies.set("session", "", {
          httpOnly: true,
          maxAge: 0,
        });

        return response;
      }

      const userRoles = decodedToken.roles.split(",");
      if (!allowedRoles.some((role) => userRoles.includes(role))) {
        return NextResponse.json(
          {
            message: "Access denied: Insufficient permissions.",
            success: false,
          },
          { status: 403 }
        );
      }
    } catch (error) {
      const err = error as Error;

      return NextResponse.json(
        {
          message: err.message,
          success: false,
        },
        { status: 403 }
      );
    }

    return handler(req, session);
  });
};
