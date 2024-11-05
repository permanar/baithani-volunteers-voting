/**
 * @file src/app/api/v1/volunteer-categories/route.tsx
 *
 * @date 05-11-24 - 23:59:53
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { db } from "@/db/mysql2";
import { withAuth } from "@/lib/api";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, session) => {
  try {
    const volunteerCategories = await db.query.volunteerCategories.findMany();

    return NextResponse.json(
      {
        message: "Successfully fetched volunteer categories.",
        success: true,
        data: volunteerCategories,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const err = error as Error;

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
});
