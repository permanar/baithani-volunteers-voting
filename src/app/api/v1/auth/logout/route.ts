import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json({
      status: 200,
      json: {
        message: "Logged out successfully",
      },
    });

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
};
