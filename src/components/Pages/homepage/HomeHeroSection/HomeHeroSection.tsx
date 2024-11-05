/**
 * @file src/components/Pages/homepage/HomeHeroSection/HomeHeroSection.tsx
 *
 * @date 03-11-24 - 18:43:45
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import { MainButton } from "@/components/Partials/Button";
import { IconArrow, IconChart, IconStar } from "@/components/Partials/Icons";
import React from "react";

type Props = {};

export const HomeHeroSection = (props: Props) => {
  const {} = props;

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 mt-16 px-6">
      <div className="block lg:hidden absolute -top-4 left-7">
        <IconStar />
      </div>
      <div className="block lg:hidden absolute -top-1 right-9">
        <IconStar />
      </div>
      <div className="block lg:hidden absolute bottom-3 left-12">
        <IconStar />
      </div>
      <div className="block lg:hidden absolute bottom-8 right-7">
        <IconStar />
      </div>

      <div className="flex items-center gap-1.5 lg:gap-3.5 px-2.5 lg:px-5 py-1 lg:py-2 rounded-full border border-purple/20 bg-purple/20">
        <div className="flex shrink-0 items-center justify-center w-5 h-5 lg:w-7 lg:h-7 rounded-full bg-purple">
          <IconChart svg={{ className: "lg:w-3 lg:h-3" }} />
        </div>
        <span className="text-2xs lg:text-base font-semibold text-purple">
          Suaramu, Apresiasi Terbaik untuk Mereka!
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-1.5 text-center lg:max-w-[720px]">
        <h1 className="text-xl lg:text-5xl/tight tracking-wide font-black">Pemilihan Pelayan Favorit 2024</h1>
        <span className="text-2xs lg:text-lg tracking-[0.01em] font-medium text-black/65">
          Ayo berikan suaramu dan apresiasi pelayan yang telah berdedikasi di gereja kita
        </span>
      </div>

      <div className="mt-2.5">
        <MainButton
          className="gap-2 px-5 py-2 text-2xs lg:text-base"
          onClick={() => {
            const homeVoterSection = document.getElementById("home-voter-section");

            if (homeVoterSection) {
              window.scrollTo({ top: homeVoterSection.offsetTop - 24, behavior: "smooth" });
            }
          }}
        >
          Pilih Sekarang <IconArrow />
        </MainButton>
      </div>
    </div>
  );
};
