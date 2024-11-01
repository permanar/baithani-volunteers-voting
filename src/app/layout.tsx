import type { Metadata } from "next";

import { cn } from "@/common/styles";
import { mergeFontsVariable } from "@/common/utils";
import { IconBgStar, IconBgStar2 } from "@/components/Partials/Icons";

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
      <body className={cn(...mergeFontsVariable, "font-urbanist antialiased`")}>
        <div className="absolute top-64 -left-80 w-[638px]">
          <IconBgStar svg={{ className: "w-full h-full" }} />
        </div>
        <div className="absolute -top-72 -right-64 w-[600px] h-[961px]">
          <IconBgStar2 svg={{ className: "w-full h-full" }} />
        </div>

        <main>{children}</main>
      </body>
    </html>
  );
}
