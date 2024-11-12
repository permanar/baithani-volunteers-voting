import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";

import { Toaster } from "react-hot-toast";

import { cn } from "@/common/styles";
import { mergeFontsVariable } from "@/common/utils";
import { AppProviders } from "@/contexts/AppProviders";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#CC7EAC",
};

export const metadata: Metadata = {
  title: "Baithani Volunteers Day Voting",
  description: "Voting app for the volunteers of GPT Baithani.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Baithani Volunteers Day Voting",
    description: "Voting app for the volunteers of GPT Baithani.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1290,
        height: 675,
        type: "image/jpg",
        alt: "Volunteers Day Voting",
      },
    ],
  },
  icons: [
    {
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  manifest: "/site.webmanifest",
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
