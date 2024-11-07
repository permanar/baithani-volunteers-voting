import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { checkSession } from "@/lib/auth";
import { ApiClient } from "@/common/api";
import { PaginationParams, VolunteerCategoryResponse, VolunteerResponse } from "@/types";
import { HeaderBar } from "@/components/Views/HeaderBar";
import { Footer } from "@/components/Views/Footer";
import { HomeHeroSection, HomeVoterSection, HomeVotingCountdown } from "@/components/Pages/homepage";

export default async function Home() {
  const { isAuthenticated } = await checkSession();

  if (!isAuthenticated) return redirect("/login");

  const getVolunteers = async () => {
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

  const getVolunteerCategories = async () => {
    const data = await ApiClient<VolunteerCategoryResponse>("/api/v1/volunteer-categories", {
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });

    return data;
  };

  const users = await getVolunteers();
  const volunteerCategories = await getVolunteerCategories();

  return (
    <div className="relative container p-0.5 mx-auto">
      <HeaderBar />

      <HomeHeroSection />
      <HomeVotingCountdown />
      <HomeVoterSection volunteers={users} volunteerCategories={volunteerCategories} />

      <Footer />
    </div>
  );
}
