/**
 * @file src/app/api/v1/votes/summary/route.ts
 *
 * @date 06-11-24 - 17:52:58
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { NextResponse } from "next/server";

import { asc, count, desc, eq, isNull, max, min, sql } from "drizzle-orm";

import { withRoles } from "@/lib/api";
import { db, ROLES, Users, users, volunteerCategories, VolunteerCategories, volunteers, voters } from "@/db/mysql2";

const MAX_VOTED_BY = 4;

export const GET = withRoles([ROLES.ADMIN], async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const topVotedLimit = searchParams.get("top_voted_limit") || 5;

    if (isNaN(Number(topVotedLimit))) {
      return NextResponse.json(
        {
          message: "Limit has to be a number.",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

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
      .orderBy(desc(count().as("total_votes")), asc(users.full_name))
      .limit(Number(topVotedLimit));

    const totalVoters = await db
      .select({
        total_voters: count().as("total_voters"),
      })
      .from(users)
      .execute();

    const totalVotes = await db
      .select({
        total_votes: count().as("total_votes"),
      })
      .from(voters)
      .execute();

    const pendingVotes = await db
      .select({
        pending_votes: count().as("pending_votes"),
      })
      .from(users)
      .leftJoin(voters, eq(users.id, voters.user_id))
      .where(isNull(voters.id))
      .execute();

    const categoryVotesSummary = await db
      .select({
        category_name: volunteerCategories.name,
        total_volunteers: count().as("total_volunteers"),
        total_voted: sql<number>`COUNT(${voters.user_id})`.as("total_voted"),
        pending_votes: sql<number>`COUNT(${users.id}) - COUNT(${voters.user_id})`.as("pending_votes"),
      })
      .from(volunteerCategories)
      .leftJoin(volunteers, eq(volunteers.volunteer_category_id, volunteerCategories.id))
      .leftJoin(users, eq(users.id, volunteers.user_id))
      .leftJoin(voters, eq(voters.user_id, users.id))
      .groupBy(volunteerCategories.id)
      .orderBy(volunteerCategories.name)
      .execute();

    return NextResponse.json(
      {
        message: "Successfully fetched votes summary.",
        success: true,
        data: {
          total_voters: totalVoters[0]?.total_voters || 0,
          total_votes: totalVotes[0]?.total_votes || 0,
          pending_votes: pendingVotes[0]?.pending_votes || 0,

          category_votes_summary: categoryVotesSummary.map((category) => ({
            ...category,
            total_voted: category.total_voted || 0,
            pending_votes: category.pending_votes || 0,
          })),

          top_voted_summary: votesSummary.map((vote) => ({
            ...vote,
            volunteer_categories: vote.volunteer_categories.split(",").map((category) => ({
              name: category,
            })),
            voted_by: vote.voted_by.reverse().splice(0, MAX_VOTED_BY),
          })),
        },
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
