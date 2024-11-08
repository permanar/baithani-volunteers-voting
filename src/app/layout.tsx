import type { Metadata } from "next";
import { cookies } from "next/headers";

import { Toaster } from "react-hot-toast";

import { cn } from "@/common/styles";
import { mergeFontsVariable } from "@/common/utils";
import { IconBgStar, IconBgStar2 } from "@/components/Partials/Icons";
import { AppProviders } from "@/contexts/AppProviders";

import "./globals.css";

export const metadata: Metadata = {
  title: "Baithani Volunteers Day Voting",
  description: "Voting app for the volunteers of GPT Baithani.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("session");

  const appProvidersProps = {
    isAuthenticated,
  };

  return (
    <html lang="en">
      <AppProviders {...appProvidersProps}>
        <body
          className={cn(
            ...mergeFontsVariable,
            "relative min-h-[100vh] text-sm font-urbanist scroll-smooth antialiased bg-white"
          )}
        >
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              className: "text-sm",
            }}
          />

          <main className="overflow-hidden">{children}</main>
        </body>
      </AppProviders>
    </html>
  );
}
