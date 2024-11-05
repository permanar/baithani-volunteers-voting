/**
 * @file src/components/Pages/homepage/HomeVotingCountdown/HomeVotingCountdown.tsx
 *
 * @date 03-11-24 - 20:30:29
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import React, { useEffect, useState } from "react";

import { intervalToDuration } from "date-fns";

import { MainButton } from "@/components/Partials/Button";
import { VOTING } from "@/common/constants";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IconCloseCross } from "@/components/Partials/Icons";

type Props = {};

export const HomeVotingCountdown = (props: Props) => {
  const {} = props;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getTimeLeft = (endDate: string) => {
      const duration = intervalToDuration({
        start: new Date(),
        end: new Date(endDate),
      });

      return {
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
      };
    };

    // if voting is still ongoing, update the time left every second
    let interval: NodeJS.Timeout;
    if (new Date(VOTING.END_DATE) > new Date()) {
      interval = setInterval(() => {
        setTimeLeft(getTimeLeft(VOTING.END_DATE));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col gap-8 mt-16 px-6">
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-xl lg:text-4xl font-semibold">Peluncuran Pemilihan Suara</h2>
        <span className="text-2xs lg:text-lg font-medium text-black/65">
          Nantikan peluncuran pemilihan suara dan berikan suaramu
        </span>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-11 h-11 rounded p-3 bg-purple/50">
            <span className="text-center text-lg font-bold text-white-900"> {timeLeft.days} </span>
          </div>
          <span className="text-center text-xs text-black/65">hari</span>
        </div>
        <span className="-mt-5 text-xl font-semibold">:</span>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-11 h-11 rounded p-3 bg-purple/50">
            <span className="text-center text-lg font-bold text-white-900"> {timeLeft.hours} </span>
          </div>
          <span className="text-center text-xs text-black/65">jam</span>
        </div>
        <span className="-mt-5 text-xl font-semibold">:</span>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-11 h-11 rounded p-3 bg-purple/50">
            <span className="text-center text-lg font-bold text-white-900"> {timeLeft.minutes} </span>
          </div>
          <span className="text-center text-xs text-black/65">menit</span>
        </div>
        <span className="-mt-5 text-xl font-semibold">:</span>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-11 h-11 rounded p-3 bg-purple/50">
            <span className="text-center text-lg font-bold text-white-900"> {timeLeft.seconds} </span>
          </div>
          <span className="text-center text-xs text-black/65">detik</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <MainButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Lihat Hasil Pemilihan
        </MainButton>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center p-4 transition duration-200 ease-out data-[closed]:opacity-0 bg-black/30"
      >
        <DialogPanel className="w-full max-w-lg space-y-4 px-5 py-4 rounded bg-white">
          <div className="flex items-center justify-between gap-2.5">
            <DialogTitle className="font-bold max-w-56">
              <span className="text-xl font-bold text-purple">Pemenang</span>{" "}
              <span className="text-xl font-bold">Dengan</span> <span className="text-xl font-bold">Suara</span>{" "}
              <span className="text-xl font-bold text-purple">Terbanyak</span>
            </DialogTitle>

            <button
              className="w-4 h-4"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <IconCloseCross svg={{ className: "w-full h-full" }} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-between p-2.5 font-semibold text-gray-700">
                <span className="w-1/6">No</span>
                <span className="w-2/6">Nama</span>
                <span className="text-right w-3/6">Perhitungan Suara</span>
              </div>

              <div className="flex items-center justify-between gap-1 w-full rounded p-2.5 mb-2.5 border border-black/25 bg-white">
                <div className="w-1/6">
                  <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                    1
                  </div>
                </div>
                <div className="w-3/6 text-2xs whitespace-nowrap overflow-hidden text-ellipsis">Tyas Mardyasmara</div>
                <div className="text-right w-2/6">
                  <div className="flex items-center justify-end gap-1">
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      R
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      A
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      Z
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      Z
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      Z
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      9+
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 w-full rounded p-2.5 mb-2.5 border border-black/25 bg-white">
                <div className="w-1/6">
                  <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                    2
                  </div>
                </div>
                <div className="w-3/6 text-2xs whitespace-nowrap overflow-hidden text-ellipsis">Koko Pratama Pudja</div>
                <div className="text-right w-2/6">
                  <div className="flex items-center justify-end gap-1">
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      L
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      N
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      B
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      C
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      T
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 text-2xs font-semibold rounded-full bg-gray-300">
                      29+
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};
