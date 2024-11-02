import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

import { LoginForm } from "@/components/Pages/login/LoginForm";
import { checkSession } from "@/lib/auth";

const LoginPage = async () => {
  const { isAuthenticated } = await checkSession();

  if (isAuthenticated) return redirect("/");

  return (
    <div className="flex flex-col px-8 pt-20 pb-10 max-w-[550px] mx-auto">
      <div className="flex flex-col items-center gap-1 text-center mb-10">
        <div className="flex items-center gap-5 mb-7">
          <div className="w-14">
            <Image className="w-full h-auto" src="/logo.png" alt="Baithani logo" width={75} height={75} priority />
          </div>
        </div>

        <h2 className="text-xl font-semibold">Login Form</h2>
        <span className="text-xs">
          Selamat datang, silakan masuk ke dalam akun anda <br /> untuk melanjutkan.
        </span>
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
