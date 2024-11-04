/**
 * @file src/components/Views/Footer/Footer.tsx
 *
 * @date 04-11-24 - 01:37:01
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";
import Link from "next/link";

import { MainDivider } from "@/components/Partials/Divider";
import { IconYoutube } from "@/components/Partials/Icons";
import { IconFacebook } from "@/components/Partials/Icons/IconsSocialMedia/IconFacebook";
import { IconInstagram } from "@/components/Partials/Icons/IconsSocialMedia/IconInstagram";

type Props = {};

export const Footer = (props: Props) => {
  const {} = props;

  return (
    <div className="relative flex flex-col gap-2.5 mt-16 px-6 pb-8">
      <MainDivider className="mb-2" />

      <span className="text-xs font-semibold">© 2024 GPT Baithani. All Rights Reserved.</span>

      <div className="flex items-center gap-2.5">
        <Link href="https://www.youtube.com/@GPTBaithani" target="_blank" className="group">
          <IconYoutube path={{ className: "group-hover:fill-purple" }} />
        </Link>
        <Link href="https://www.instagram.com/gptbaithani" target="_blank" className="group">
          <IconInstagram path={{ className: "group-hover:fill-purple" }} />
        </Link>
        <Link href="https://www.facebook.com/baithani" target="_blank" className="group">
          <IconFacebook path={{ className: "group-hover:fill-purple" }} />
        </Link>
      </div>

      <div className="ml-auto">
        <span className="text-2xs">
          Made with <span className="text-red-500">❤</span> by{" "}
          <Link href="https://www.instagram.com/multimediabaithani" target="_blank" className="underline">
            Multimedia Baithani.
          </Link>
        </span>
      </div>
    </div>
  );
};
