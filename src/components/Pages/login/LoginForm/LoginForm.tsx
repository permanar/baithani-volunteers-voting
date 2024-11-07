/**
 * @file src/components/Pages/login/LoginForm/LoginForm.tsx
 *
 * @date 03-11-24 - 00:11:37
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { cn } from "@/common/styles";
import { ApiClient } from "@/common/api";
import { MainButton } from "@/components/Partials/Button";
import { InputText } from "@/components/Partials/Input";
import { IconEyeOff, IconEyeOn } from "@/components/Partials/Icons";
import { LoginResponse } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

type Props = {};

export const LoginForm = (props: Props) => {
  const {} = props;
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { username: string; password: string }) => {
      return await ApiClient<LoginResponse>("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsAuthenticated(true);
        toast.success("Berhasil masuk! Menuju halaman utama...");

        router.push("/");
      }
    },
    onError: () => {
      toast.error("Gagal masuk! Silakan coba lagi.");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate({
      username,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-7">
          <InputText
            label="Username"
            inputParentClassName="mt-2.5"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username anda"
            autoComplete="off"
          />

          <InputText
            label="Password"
            inputParentClassName="mt-2.5"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password anda"
            autoComplete="off"
            suffix={
              <div className="cursor-pointer" onClick={toggleShowPassword}>
                {showPassword ? <IconEyeOn /> : <IconEyeOff />}
              </div>
            }
            suffixClassName="bg-transparent"
          />
        </div>

        <div
          className={cn("invisible min-h-6", {
            visible: loginMutation.isError && loginMutation.error.message,
          })}
        >
          <span className="text-xs text-red-500">{loginMutation.isError && loginMutation.error.message}</span>
        </div>

        <div>
          <MainButton type="submit" fullWidth loading={loginMutation.isPending}>
            Login
          </MainButton>
        </div>
      </div>
    </form>
  );
};
