import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export const withAuth = (handler: (req: NextRequest, session: RequestCookie) => Promise<NextResponse>) => {
  return async (req: NextRequest) => {
    const session = req.cookies.get("session");

    if (!session?.value) {
      return NextResponse.json({
        message: "User is not authenticated",
        success: false,
      });
    }

    return handler(req, session);
  };
};
