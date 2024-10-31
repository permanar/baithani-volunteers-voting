import { NextRequest, NextResponse } from "next/server";

import { asc, eq, getTableColumns, min, sql } from "drizzle-orm";

import { db, users, volunteerCategories, volunteers } from "@/db/mysql2";
import { withAuth } from "@/lib/api";
import { withPagination, queryWithCount } from "@/lib/pagination";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";

    const { password, created_at, updated_at, ...userColumns } = getTableColumns(users);

    const qb = db
      .select({
        ...userColumns,
        volunteer_categories: sql`JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', ${volunteerCategories.name}
          )
        )`,
      })
      .from(volunteers)
      .innerJoin(users, eq(users.id, volunteers.user_id))
      .innerJoin(volunteerCategories, eq(volunteerCategories.id, volunteers.volunteer_category_id))
      .groupBy(users.id)
      .orderBy(asc(users.id))
      .$dynamic();

    const findVolunteers = withPagination(qb, {
      page: Number(page),
      pageSize: Number(pageSize),
    });

    const [rows, total] = await queryWithCount(findVolunteers);

    const response = NextResponse.json(
      {
        message: "Successfully fetched volunteers",
        success: true,
        data: rows,
        meta: {
          pagination: {
            page: Number(page),
            total_pages: Math.ceil(total / Number(pageSize)),
            pageSize: Number(pageSize),
            total,
          },
        },
      },
      {
        status: 200,
      }
    );

    return response;
  } catch (error: unknown) {
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
