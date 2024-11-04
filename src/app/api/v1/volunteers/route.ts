import { NextRequest, NextResponse } from "next/server";

import { and, asc, eq, getTableColumns, like, or, sql } from "drizzle-orm";

import { db, users, VolunteerCategories, volunteerCategories, volunteers } from "@/db/mysql2";
import { withAuth } from "@/lib/api";
import { withPagination, queryWithCount } from "@/lib/pagination";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("category_id") || "";
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";

    const { password, created_at, updated_at, ...userColumns } = getTableColumns(users);

    const qb = db
      .select({
        ...userColumns,
        volunteer_categories: sql<Pick<VolunteerCategories, "name">[]>`JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', ${volunteerCategories.name}
          )
        )`,
      })
      .from(volunteers)
      .innerJoin(users, eq(users.id, volunteers.user_id))
      .innerJoin(volunteerCategories, eq(volunteerCategories.id, volunteers.volunteer_category_id))
      .where(
        and(
          search ? like(users.full_name, `%${search}%`) : undefined,
          categoryId ? eq(volunteers.volunteer_category_id, BigInt(categoryId)) : undefined
        )
      )
      .groupBy(users.id)
      .orderBy(asc(users.full_name))
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
            page_size: Number(pageSize),
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
