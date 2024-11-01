import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { checkSession } from "@/lib/auth";
import { ApiClient } from "@/common/api";
import { VolunteerResponse } from "@/types";

export default async function Home() {
  const getUsers = async () => {
    const data = await ApiClient<VolunteerResponse>("/api/v1/volunteers", {
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });

    return data;
  };


  // if (!session) return redirect("/api/auth/signin");
  const { data } = await getUsers();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-5">
          <div className="w-16">
            <Image
              className="dark:invert w-full h-auto"
              src="/logo.png"
              alt="Baithani logo"
              width={75}
              height={75}
              priority
            />
          </div>
          <span className="text-2xl font-black text-black">GPT Baithani</span>
        </div>

        {data && data.length > 0
          ? data.map((user) => (
              <div key={user.id} className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-black/[.05] dark:bg-white/[.06] rounded-full flex items-center justify-center">
                  {user.full_name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user.full_name}</h3>

                  <div className="flex gap-2">
                    {user.volunteer_categories.map((category, idx) => (
                      <span
                        key={`${category.name}-${idx}`}
                        className="rounded-full bg-black/[.05] dark:bg-white/[.06] text-xs px-2 py-0.5"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          : null}
      </main>
    </div>
  );
}
