/**
 * @file src/app/not-found.tsx
 *
 * @date 09-11-24 - 00:49:56
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MainButton } from "@/components/Partials/Button";

export const metadata: Metadata = {
  title: "404 Not Found | GPT Baithani Voting",
  description: "Sorry, page not found!",
};

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center gap-5 min-h-screen mx-auto p-5">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <Image className="" src="/illustration-404.svg" alt="404 Not Found" width={320} height={320} />

        <div className="max-w-lg flex flex-col gap-5">
          <h1 className="text-3xl font-black text-black">Sorry, page not found!</h1>

          <span className="text-base text-black/65">
            Sorry, we couldn’t find the page you’re looking for. <br />
            Perhaps you’ve mistyped the URL? Be sure to check your spelling.
          </span>

          <Link href="/">
            <MainButton variant="primaryOutlined">Go Back to Home</MainButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
