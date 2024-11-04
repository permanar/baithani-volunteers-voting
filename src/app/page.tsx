import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { checkSession } from "@/lib/auth";
import { ApiClient } from "@/common/api";
import { PaginationParams, VolunteerResponse } from "@/types";
import { HeaderBar } from "@/components/Views/HeaderBar";
import { Footer } from "@/components/Views/Footer";
import { HomeHeroSection, HomeVoterSection, HomeVotingCountdown } from "@/components/Pages/homepage";

export default async function Home() {
  const { isAuthenticated } = await checkSession();

  const getUsers = async () => {
    const data = await ApiClient<VolunteerResponse, PaginationParams>("/api/v1/volunteers", {
      headers: {
        Cookie: (await cookies()).toString(),
      },
      params: {
        page: 1,
        page_size: 10,
      },
    });

    return data;
  };

  if (!isAuthenticated) return redirect("/login");

  const users = await getUsers();

  return (
    <div className="relative p-0.5">
      <HeaderBar />

      <HomeHeroSection />
      <HomeVotingCountdown />
      <HomeVoterSection data={users} />

      <Footer />
    </div>
  );
}
