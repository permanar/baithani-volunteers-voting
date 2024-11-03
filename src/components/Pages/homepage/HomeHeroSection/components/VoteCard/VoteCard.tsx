/**
 * @file src/components/Views/VoteCard/VoteCard.tsx
 *
 * @date 04-11-24 - 00:56:31
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";

import { Volunteer } from "@/types";
import { MainButton } from "@/components/Partials/Button";

type Props = {
  data: Volunteer;
};

export const VoteCard = (props: Props) => {
  const { data } = props;

  return (
    <div className="flex items-center justify-between gap-1.5 w-full rounded p-2.5 border border-purple/25">
      <div className="flex flex-col gap-1.5 overflow-hidden">
        <span className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis" title={data.full_name}>
          {data.full_name}
        </span>

        <div className="flex gap-2 overflow-auto">
          {data.volunteer_categories.map((category, idx) => (
            <span
              key={`${category.name}-${idx}`}
              className="shrink-0 rounded-full text-xs px-2 py-0.5 bg-purple/10 text-purple"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <div className="shrink-0">
        <MainButton variant="text" className="p-0">
          Vote Sekarang
        </MainButton>
      </div>
    </div>
  );
};