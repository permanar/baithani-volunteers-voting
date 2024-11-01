import { NextResponse } from "next/server";

import { withAuth } from "@/lib/api";

export const POST = withAuth(async () => {
  try {
    const response = NextResponse.json(
      {
        message: "Logged out successfully",
      },
      {
        status: 200,
      }
    );

    response.cookies.set("session", "", {
      httpOnly: true,
      maxAge: 0,
    });

    return response;
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
