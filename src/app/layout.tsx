import type { Metadata } from "next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProviders>
        <body className={cn(...mergeFontsVariable, "font-urbanist antialiased`")}>
          <div className="absolute top-auto md:top-64 bottom-0 md:bottom-auto -left-52 md:-left-80 w-[468px] md:w-[638px] -z-10">
            <IconBgStar svg={{ className: "w-full h-full" }} />
          </div>
          <div className="absolute top-0 md:-top-72 -right-64 w-[600px] h-[310px] md:h-[961px] -z-10">
            <IconBgStar2 svg={{ className: "w-full h-full" }} />
          </div>

          <main>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                className: "text-sm",
              }}
            />

            {children}
          </main>
        </body>
      </AppProviders>
    </html>
  );
}
