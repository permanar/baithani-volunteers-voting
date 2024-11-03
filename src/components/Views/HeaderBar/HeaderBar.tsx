/**
 * @file src/components/Views/HeaderBar/HeaderBar.tsx
 *
 * @date 03-11-24 - 18:44:25
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MainButton } from "@/components/Partials/Button";
import { IconAccount, IconArrow, IconMenuBurger } from "@/components/Partials/Icons";

type Props = {};

export const HeaderBar = (props: Props) => {
  const {} = props;

  return (
    <div className="flex items-center justify-between w-full px-6 py-3.5 lg:px-20 lg:py-5">
      <div className="flex items-center gap-2.5 md:gap-4">
        <div className="w-8 lg:w-12">
          <Image
            className="dark:invert w-full h-auto"
            src="/logo.png"
            alt="Baithani logo"
            width={75}
            height={75}
            priority
          />
        </div>
        <span className="text-base lg:text-2xl font-black text-black">GPT Baithani</span>
      </div>

      <div className="flex lg:hidden cursor-pointer group">
        <IconMenuBurger svg={{ className: "group-hover:opacity-70" }} />
      </div>

      <div className="hidden lg:flex items-center gap-10">
        <Link href="#!" className="text-xl font-semibold text-black/65">
          Beranda
        </Link>
        <Link href="#main" className="text-xl font-semibold text-black/65">
          Voting Sekarang
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-5">
        <MainButton className="gap-5 px-5 py-2 text-base">
          Pilih Sekarang <IconArrow />
        </MainButton>

        <MainButton variant="primaryOutlined" className="min-w-10 min-h-10 p-0">
          <IconAccount />
        </MainButton>
      </div>
    </div>
  );
};
