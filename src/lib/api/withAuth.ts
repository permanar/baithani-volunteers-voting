import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export const withAuth = (handler: (req: NextRequest, session: RequestCookie) => Promise<NextResponse>) => {
  return async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const session = req.cookies.get("session");

    if (!session?.value) {
      return NextResponse.json({
        message: "User is not authenticated",
        success: false,
      });
    }

    try {
      jwt.verify(session.value, process.env.AUTH_SECRET);
    } catch (err) {
      const error = err as Error;

      const response = NextResponse.json({
        message: "User session is invalid",
        reason: error.message,
        success: false,
      });

      response.cookies.set("session", "", {
        httpOnly: true,
        maxAge: 0,
      });

      return response;
    }

    return handler(req, session);
  };
};
