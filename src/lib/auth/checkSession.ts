"use server";

import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

import { ApiClient } from "@/common/api";
import { ProfileResponse } from "@/types";

export const checkSession = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  try {
    jwt.verify(session.value, process.env.AUTH_SECRET);

    const { data } = await ApiClient<ProfileResponse>("/api/v1/auth/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return {
      isAuthenticated: true,
      user: data,
    };
  } catch {
    return {
      isAuthenticated: false,
      user: null,
    };
  }
};
