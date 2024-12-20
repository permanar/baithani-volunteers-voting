import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

import { LoginForm } from "@/components/Pages/login";
import { checkSession } from "@/lib/auth";

const LoginPage = async () => {
  const { isAuthenticated } = await checkSession();

  if (isAuthenticated) return redirect("/");

  return (
    <div className="flex flex-col justify-center px-8 py-5 max-w-[550px] min-h-[100vh] mx-auto">
      <div className="flex flex-col items-center gap-1 text-center mb-10">
        <div className="flex items-center gap-5 mb-7">
          <div className="w-14">
            <Image className="w-full h-auto" src="/logo.png" alt="Baithani logo" width={75} height={75} priority />
          </div>
        </div>

        <h2 className="text-xl lg:text-2xl font-semibold">Login Form</h2>
        <span className="text-xs lg:text-sm">
          Selamat datang, silakan masuk ke dalam akun anda <br /> untuk melanjutkan.
        </span>
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
