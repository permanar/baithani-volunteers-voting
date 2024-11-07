/**
 * @file src/app/api/v1/votes/summary/route.ts
 *
 * @date 06-11-24 - 17:52:58
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { NextResponse } from "next/server";

import { count, desc, eq, max, min, sql } from "drizzle-orm";

import { withAuth } from "@/lib/api";
import { db, Users, users, volunteerCategories, VolunteerCategories, volunteers, voters } from "@/db/mysql2";

const MAX_VOTED_BY = 4;

export const GET = withAuth(async () => {
  try {
    const votesSummary = await db
      .select({
        id: min(voters.id),
        voted_name: users.full_name,
        volunteer_categories: sql<VolunteerCategories["name"]>`(
          SELECT GROUP_CONCAT(DISTINCT ${volunteerCategories.name})
            FROM ${volunteerCategories}
            JOIN ${volunteers} ON ${volunteers.volunteer_category_id} = ${volunteerCategories.id}
            WHERE ${volunteers.user_id} = ${users.id}
        )`,
        voted_by: sql<Pick<Users, "full_name">[]>`JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', SUBSTRING(voter_user.full_name, 1, 1)
          )
        )`,
        total_votes: count().as("total_votes"),
        created_at: min(voters.created_at),
        updated_at: max(voters.updated_at),
      })
      .from(voters)
      .leftJoin(users, eq(users.id, voters.voted))
      .leftJoin(sql<Users>`users as voter_user`, eq(sql`voter_user.id`, voters.user_id))
      .groupBy(voters.voted, users.id)
      .orderBy(desc(count().as("total_votes")))
      .limit(MAX_VOTED_BY);

    return NextResponse.json(
      {
        message: "Successfully fetched votes summary.",
        success: true,
        data: votesSummary.map((vote) => ({
          ...vote,
          volunteer_categories: vote.volunteer_categories.split(",").map((category) => ({
            name: category,
          })),
          voted_by: vote.voted_by.reverse().splice(0, MAX_VOTED_BY),
        })),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const err = error as Error;

    return NextResponse.json(
      {
        message: err.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
});
