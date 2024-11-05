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

type Props = {};

export const HomeVotingCountdown = (props: Props) => {
  const {} = props;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
        <MainButton>Lihat Hasil Pemilihan</MainButton>
      </div>
    </div>
  );
};
