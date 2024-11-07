/**
 * @file src/components/Views/Modal/ModalVotingResult.tsx
 *
 * @date 06-11-24 - 21:06:43
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { IconCloseCross } from "@/components/Partials/Icons";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/common/api";
import { VotesSummaryResponse } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalVotingResult = (props: Props) => {
  const { isOpen, onClose } = props;

  const { data } = useQuery({
    queryKey: ["voting-result"],
    queryFn: async () => {
      const response = await ApiClient<VotesSummaryResponse>("/api/v1/votes/summary");

      return response.data;
    },
    enabled: !!isOpen,
    refetchInterval: 30000,
  });

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center p-4 transition duration-200 ease-out data-[closed]:opacity-0 z-1000 bg-black/30"
    >
      <DialogPanel className="w-full max-w-lg space-y-4 px-5 py-4 rounded bg-white">
        <div className="flex items-center justify-between gap-2.5">
          <DialogTitle className="font-bold max-w-56 lg:max-w-72">
            <span className="text-xl lg:text-3xl font-bold text-purple">Pemenang</span>{" "}
            <span className="text-xl lg:text-3xl font-bold">Dengan</span>{" "}
            <span className="text-xl lg:text-3xl font-bold">Suara</span>{" "}
            <span className="text-xl lg:text-3xl font-bold text-purple">Terbanyak</span>
          </DialogTitle>

          <button className="w-4 h-4 lg:w-6 lg:h-6" onClick={onClose}>
            <IconCloseCross svg={{ className: "w-full h-full" }} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between p-2.5 font-semibold text-base">
              <span className="w-1/12">No</span>
              <span className="w-4/12">Nama</span>
              <span className="text-right w-5/12">Perhitungan Suara</span>
              <span className="text-right w-2/12">Total</span>
            </div>

            {data && data.length > 0
              ? data.map((item, idx) => (
                  <div
                    key={`voting-result-${item.id}-${idx}`}
                    className="flex items-center justify-between gap-1 w-full rounded p-2.5 mb-2.5 border border-black/25 bg-white"
                  >
                    <div className="w-1/12">
                      <div className="flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 text-2xs lg:text-sm font-semibold rounded-full bg-gray-300">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="w-5/12 text-2xs lg:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null}
                      <span title={item.voted_name}>{item.voted_name}</span>
                    </div>

                    <div className="text-right w-4/12">
                      <div className="flex items-center justify-end gap-1">
                        {item.voted_by.map((votedBy, idx) => (
                          <div
                            key={`voting-result-category-${item.id}-${idx}`}
                            className="flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 uppercase text-2xs lg:text-sm font-semibold rounded-full bg-gray-300"
                          >
                            {votedBy.name}
                          </div>
                        ))}

                        {item.total_votes > item.voted_by.length ? (
                          <div className="flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 text-2xs lg:text-sm font-semibold rounded-full bg-gray-300">
                            {item.total_votes - item.voted_by.length}+
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="text-right w-2/12">
                      <span className="shrink-0 ml-1 px-2.5 py-0.5 text-2xs lg:text-sm font-semibold rounded-full bg-purple/25 text-purple">
                        {formatNumber(item.total_votes)}
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
