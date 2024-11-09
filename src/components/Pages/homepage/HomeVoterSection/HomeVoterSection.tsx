/**
 * @file src/components/Pages/homepage/HomeVoterSection/HomeVoterSection.tsx
 *
 * @date 03-11-24 - 20:37:36
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import React, { useEffect } from "react";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { IconBgGradient, IconCloseCross, IconMenuHalfBurger, IconSearch } from "@/components/Partials/Icons";
import { InputText } from "@/components/Partials/Input";
import { VolunteerCategoryResponse, VolunteerResponse } from "@/types";
import { VoteCard } from "../HomeHeroSection/components";
import { LoadingSpinner } from "@/components/Partials/LoadingSpinner";
import { useHomeVoterSection } from "./hooks";
import { cn } from "@/common/styles";
import { MainButton } from "@/components/Partials/Button";
import { ModalVote } from "@/components/Views/Modal";

type Props = {
  volunteers: VolunteerResponse;
  volunteerCategories: VolunteerCategoryResponse;
};

export const HomeVoterSection = (props: Props) => {
  const { volunteers: volunteersData, volunteerCategories } = props;
  const { data: usersData } = volunteersData;

  const {
    search,
    volunteerCategory,

    volunteers,

    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isRefetchError,

    setSearch,
    setVolunteerCategory,

    lastElementRef,
    resetVolunteerCategory,
  } = useHomeVoterSection({ usersData });

  return (
    <div id="home-voter-section" className="relative flex flex-col gap-5 mt-16 px-6">
      <div className="absolute -top-96 left-0 -z-10">
        <IconBgGradient />
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Bidang Pelayanan</h2>

          <Menu>
            <MenuButton className="group" aria-label="Pilih Kategori">
              <IconMenuHalfBurger svg={{ className: "group-hover:opacity-70" }} />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className={cn(
                "mt-1 rounded border border-purple/20",
                "origin-top-right transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
              )}
            >
              <div
                className={cn(
                  "flex flex-col gap-4 w-44 h-auto max-h-80 p-4 overflow-auto text-gray bg-white ",
                  "shadow-md shadow-purple/30"
                )}
              >
                <MenuItem>
                  <button
                    className={cn("text-left text-2xs font-medium", {
                      "text-xs font-bold text-purple": volunteerCategory.id === 0,
                    })}
                    onClick={resetVolunteerCategory}
                  >
                    All
                  </button>
                </MenuItem>

                {volunteerCategories.data && volunteerCategories.data.length > 0
                  ? volunteerCategories.data.map((category, idx) => (
                      <MenuItem key={`volunteer-category-${category.id}-${idx}`}>
                        <button
                          className={cn("text-left text-2xs font-medium", {
                            "text-xs font-bold text-purple": volunteerCategory.id === category.id,
                          })}
                          onClick={() => {
                            setVolunteerCategory(category);
                          }}
                        >
                          {category.name}
                        </button>
                      </MenuItem>
                    ))
                  : null}
              </div>
            </MenuItems>
          </Menu>
        </div>

        <div className="w-full">
          <InputText
            autoComplete="off"
            placeholder="Pencarian"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // @ts-expect-error weird
            prefix={
              <div className="flex items-center justify-center gap-1.5">
                <div className="shrink-0 w-3.5 h-3.5">
                  <IconSearch svg={{ className: "w-full h-full" }} />
                </div>

                {volunteerCategory.id !== 0 && (
                  <span className="flex items-center justify-center gap-1 shrink-0 rounded-full text-xs leading-none font-medium px-2.5 py-1 bg-purple/10 text-purple">
                    {volunteerCategory.name}

                    <button className="shrink-0 w-3.5 h-3.5" onClick={resetVolunteerCategory}>
                      <IconCloseCross svg={{ className: "w-full h-full" }} />
                    </button>
                  </span>
                )}
              </div>
            }
            prefixClassName="bg-transparent"
            suffix={
              search && (
                <button onClick={() => setSearch("")}>
                  <div className="w-3 h-3">
                    <IconCloseCross svg={{ className: "w-full h-full" }} />
                  </div>
                </button>
              )
            }
          />
        </div>
      </div>

      <div className="relative flex flex-col gap-8 row-start-2 items-start">
        {isFetching && !isFetchingNextPage && (
          <div className="absolute size-full pt-24 mx-auto bg-purple/5 z-40">
            <LoadingSpinner />
          </div>
        )}

        {(isError || isRefetchError) && (
          <div className="flex flex-col items-center justify-center w-full h-52">
            <span className="text-center text-black/65">Oops! Terjadi kesalahan saat mengambil data 😿</span>

            <MainButton onClick={() => window.location.reload()} className="mt-4">
              Refresh Halaman
            </MainButton>
          </div>
        )}

        {!isError && volunteers && volunteers.length > 0
          ? volunteers.map((user) => (
              <div key={`vote-card-${user.id}-${user.username}`} ref={lastElementRef} className="w-full">
                <VoteCard data={user} />
              </div>
            ))
          : null}
      </div>

      {isFetchingNextPage && (
        <div className="mx-auto">
          <LoadingSpinner />
        </div>
      )}

      {!hasNextPage && volunteers && volunteers.length === 0 && (
        <div className="flex items-center justify-center max-h-52 mx-auto">
          <span className="text-center text-black/65">
            Oops! Tidak ada data dengan nama <span className="font-semibold">&quot;{search}&quot;</span> yang ditemukan
            😿
          </span>
        </div>
      )}
    </div>
  );
};
