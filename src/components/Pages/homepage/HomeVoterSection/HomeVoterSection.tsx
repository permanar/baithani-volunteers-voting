/**
 * @file src/components/Pages/homepage/HomeVoterSection/HomeVoterSection.tsx
 *
 * @date 03-11-24 - 20:37:36
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";

import { IconBgGradient, IconMenuHalfBurger, IconSearch } from "@/components/Partials/Icons";
import { InputText } from "@/components/Partials/Input";
import { VolunteerResponse } from "@/types";
import { VoteCard } from "../HomeHeroSection/components";

type Props = {
  data: VolunteerResponse;
};

export const HomeVoterSection = (props: Props) => {
  const { data: users } = props;

  const { data } = users;

  return (
    <div className="relative flex flex-col gap-5 mt-16 px-6">
      <div className="absolute -top-96 left-0 -z-10">
        <IconBgGradient />
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Bidang Pelayanan</h2>

          <div className="cursor-pointer group">
            <IconMenuHalfBurger svg={{ className: "group-hover:opacity-70" }} />
          </div>
        </div>

        <div className="w-full">
          <InputText
            placeholder="Pencarian"
            // @ts-expect-error weird
            prefix={
              <div className="cursor-pointer">
                <IconSearch />
              </div>
            }
            prefixClassName="bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 row-start-2 items-start">
        {data && data.length > 0
          ? data.map((user) => <VoteCard key={`vote-card-${user.id}-${user.username}`} data={user} />)
          : null}
      </div>
    </div>
  );
};
