/**
 * @file src/contexts/AuthProvider/AuthProvider.tsx
 *
 * @date 07-11-24 - 23:46:46
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

import { ApiClient } from "@/common/api";
import { BaseAPIResponse, Profile } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;

  isAuthenticated: boolean;
};

interface AuthContextType {
  user: Profile | undefined;

  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;

  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<Props> = (props) => {
  const { children, isAuthenticated: isLoggedIn } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  const { data: user, isLoading } = useQuery<Profile | undefined, string>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await ApiClient<BaseAPIResponse<Profile>>("/api/v1/auth/me");

      return response.data;
    },
    enabled: !!isAuthenticated,
    refetchOnWindowFocus: false,
  });

  const isAdmin = useMemo(() => {
    return (user?.roles && user.roles.filter((role) => role.name.includes("admin")).length > 0) || false;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,

        isAuthenticated,
        isAdmin,
        isLoading,

        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
