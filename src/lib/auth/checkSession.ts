"use server";

import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

import { ApiClient } from "@/common/api";
import { Profile, ProfileResponse, UserTokenJwtPayload } from "@/types";

type CheckSessionResponse = {
  user?: Profile | null;

  isAdmin: boolean;
  isAuthenticated: boolean;
};

export const checkSession: () => Promise<CheckSessionResponse> = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) {
    return {
      user: null,

      isAdmin: false,
      isAuthenticated: false,
    };
  }

  try {
    const userJwt = jwt.verify(session.value, process.env.AUTH_SECRET) as UserTokenJwtPayload;
    const userRoles = userJwt.roles.split(",");
    const isAdmin = userRoles.includes("admin");

    const { data } = await ApiClient<ProfileResponse>("/api/v1/auth/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return {
      user: data,

      isAdmin,
      isAuthenticated: true,
    };
  } catch {
    return {
      user: null,

      isAdmin: false,
      isAuthenticated: false,
    };
  }
};
