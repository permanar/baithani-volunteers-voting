/**
 * @file src/components/Views/HeaderBar/HeaderBar.tsx
 *
 * @date 03-11-24 - 18:44:25
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { MainButton } from "@/components/Partials/Button";
import { IconAccount, IconArrow, IconLogout, IconMenuBurger } from "@/components/Partials/Icons";
import { cn } from "@/common/styles";
import { useAuth } from "@/contexts/AuthContext";
import { MainDivider } from "@/components/Partials/Divider";
import { ApiClient } from "@/common/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/Partials/LoadingSpinner";

type Props = {};

export const HeaderBar = (props: Props) => {
  const {} = props;
  const { user } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await ApiClient("/api/v1/auth/logout", {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast.success("Berhasil logout!\nAnda akan dialihkan ke halaman login...", {
        duration: 5000,
      });

      setTimeout(() => {
        setIsDrawerOpen(false);

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 1000);
    },
    onError: () => {
      toast.error("Gagal logout");
    },
  });

  return (
    <header className="flex items-center justify-between w-full px-6 py-3.5 lg:px-20 lg:py-5">
      {/* mobile drawer menu */}
      {/* overlay */}
      <div
        className={cn("fixed inset-0 transition-all duration-500 ease-in-out z-50 bg-black/25", {
          "opacity-0 pointer-events-none": !isDrawerOpen,
        })}
        onClick={() => {
          setIsDrawerOpen(false);
        }}
      />
      <div
        className={cn(
          "fixed right-0 top-0 w-2/3 h-full rounded-tl-3xl rounded-bl-3xl transition-all duration-500 ease-in-out z-100 bg-white-900",
          "flex flex-col justify-between gap-6 px-2 py-8",
          {
            "transform translate-x-[110%]": !isDrawerOpen,
          }
        )}
      >
        <div className="flex items-center gap-4 px-5">
          <div className="shrink-0 flex items-center justify-center w-7 h-7 uppercase text-base font-semibold rounded-full bg-gray-300">
            {user?.full_name?.charAt(0)}
          </div>

          <span className="text-base font-semibold">{user?.full_name}</span>
        </div>

        <div className="flex flex-col gap-5">
          <MainDivider />

          <button
            className="flex items-center gap-4 px-5 hover:opacity-70"
            onClick={() => {
              logoutMutation.mutate();
            }}
            disabled={logoutMutation.isPending}
          >
            <div>
              <IconLogout />
            </div>

            {logoutMutation.isPending ? (
              <div className="ml-3">
                <LoadingSpinner />
              </div>
            ) : (
              <span className="text-base font-semibold text-red-500">Logout</span>
            )}
          </button>
        </div>
      </div>

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

      <button
        className="flex lg:hidden cursor-pointer group"
        onClick={() => {
          setIsDrawerOpen((prev) => !prev);
        }}
      >
        <IconMenuBurger svg={{ className: "group-hover:opacity-70" }} />
      </button>

      <div className="hidden lg:flex items-center gap-10">
        <Link href="#!" className="text-lg font-semibold text-black/65">
          Beranda
        </Link>
        <Link href="#main" className="text-lg font-semibold text-black/65">
          Voting Sekarang
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-5">
        <MainButton
          className="gap-5 px-5 py-2 text-base"
          onClick={() => {
            const homeVoterSection = document.getElementById("home-voter-section");

            if (homeVoterSection) {
              window.scrollTo({ top: homeVoterSection.offsetTop - 24, behavior: "smooth" });
            }
          }}
        >
          Pilih Sekarang <IconArrow />
        </MainButton>

        <Menu>
          <MenuButton className="min-w-10 min-h-10 p-0" as={MainButton} variant="primaryOutlined">
            <IconAccount />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className={cn(
              "flex flex-col gap-6",
              "md:min-w-60 xl:min-w-80 mt-6 xl:mt-9 py-6 rounded-xl border border-purple/20 z-50",
              "origin-top-right transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            )}
          >
            <MenuItem>
              <div className="flex items-center gap-4 px-5">
                <div className="flex items-center justify-center md:w-5 md:h-5 xl:w-7 xl:h-7 uppercase text-2xs md:text-sm xl:text-base font-semibold rounded-full bg-gray-300">
                  {user?.full_name?.charAt(0)}
                </div>

                <span className="text-base font-semibold">{user?.full_name}</span>
              </div>
            </MenuItem>

            <MainDivider />

            <MenuItem>
              <button
                className="flex items-center gap-4 px-5 hover:opacity-70"
                onClick={() => {
                  logoutMutation.mutate();
                }}
                disabled={logoutMutation.isPending}
              >
                <div>
                  <IconLogout />
                </div>

                {logoutMutation.isPending ? (
                  <div className="ml-8">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <span className="text-base font-semibold text-red-500">Logout</span>
                )}
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};
