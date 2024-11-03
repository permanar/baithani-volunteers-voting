/**
 * @file src/components/Pages/homepage/HomeVoterSection/HomeVoterSection.tsx
 *
 * @date 03-11-24 - 20:37:36
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";

import { IconMenuHalfBurger, IconSearch } from "@/components/Partials/Icons";
import { InputText } from "@/components/Partials/Input";
import { VolunteerResponse } from "@/types";

type Props = {
  data: VolunteerResponse;
};

export const HomeVoterSection = (props: Props) => {
  const { data: users } = props;

  const { data } = users;

  return (
    <div className="relative flex flex-col gap-5 mt-16 px-6">
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
          ? data.map((user) => (
              <div key={user.id} className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-black/[.05] dark:bg-white/[.06] rounded-full flex items-center justify-center">
                  {user.full_name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user.full_name}</h3>

                  <div className="flex flex-wrap gap-2">
                    {user.volunteer_categories.map((category, idx) => (
                      <span
                        key={`${category.name}-${idx}`}
                        className="rounded-full bg-black/[.05] dark:bg-white/[.06] text-xs px-2 py-0.5"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
