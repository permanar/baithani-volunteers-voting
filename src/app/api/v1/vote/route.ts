/**
 * @file src/app/api/v1/vote/route.ts
 *
 * @date 06-11-24 - 17:14:57
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import { db, users, voters } from "@/db/mysql2";
import { withAuth } from "@/lib/api";
import { UserTokenJwtPayload } from "@/types";

export const POST = withAuth(async (req, session) => {
  const request = await req.json();
  const { voted } = request;

  // voted has to be number
  if (typeof voted !== "number") {
    return NextResponse.json(
      {
        message: "Voted ID has to be a number.",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const userJwt = jwt.verify(session.value, process.env.AUTH_SECRET) as UserTokenJwtPayload;

    // check if user has voted before
    const hasVoted = await db.query.voters.findFirst({
      where: eq(voters.user_id, BigInt(userJwt.id)),
    });

    if (hasVoted) {
      return NextResponse.json(
        {
          message: "You have already voted.",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    // check if voted ID exists
    const votedExists = await db.query.users.findFirst({
      where: eq(users.id, voted),
    });

    if (!votedExists) {
      return NextResponse.json(
        {
          message: "Voted ID does not exist.",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    // insert vote
    await db
      .insert(voters)
      .values({
        user_id: BigInt(userJwt.id),
        voted: BigInt(voted),
      })
      .execute();

    return NextResponse.json(
      {
        message: "Successfully voted.",
        success: true,
        data: {
          user_id: userJwt.id,
          voted,
        },
      },
      {
        status: 201,
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
