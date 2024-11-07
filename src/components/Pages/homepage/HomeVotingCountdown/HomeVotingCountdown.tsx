/**
 * @file src/components/Pages/homepage/HomeVotingCountdown/HomeVotingCountdown.tsx
 *
 * @date 03-11-24 - 20:30:29
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import React, { Fragment, useEffect, useState } from "react";

import { intervalToDuration } from "date-fns";

import { MainButton } from "@/components/Partials/Button";
import { VOTING } from "@/common/constants";
import { ModalVotingResult } from "@/components/Views/Modal";
import { useAuth } from "@/contexts/AuthContext";

type Props = {};

export const HomeVotingCountdown = (props: Props) => {
  const {} = props;

  const { isAdmin } = useAuth();

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
        const countdown = getTimeLeft(VOTING.END_DATE);

        // if the countdown is over, clear the interval
        if (Object.values(countdown).some((value) => value < 0)) {
          clearInterval(interval);
          return;
        }

        setTimeLeft(countdown);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col gap-8 mt-16 px-6">
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-xl lg:text-4xl font-bold">Jangan Lupa Voting!</h2>
        <span className="text-xs lg:text-lg font-medium text-black/65">
          Ayo, pastikan kamu sudah berikan suaramu sebelum waktu habis!
        </span>
      </div>

      <div className="flex items-center justify-center gap-4 lg:gap-12">
        <div className="flex flex-col gap-1 lg:gap-5">
          <div className="flex items-center justify-center w-11 h-11 lg:w-24 lg:h-24 rounded p-3 bg-purple/50">
            <span className="text-center text-lg lg:text-5xl font-bold text-white-900"> {timeLeft.days} </span>
          </div>
          <span className="text-center text-xs lg:text-base text-black/65">hari</span>
        </div>
        <span className="-mt-5 lg:-mt-12 text-xl lg:text-5xl font-semibold">:</span>

        <div className="flex flex-col gap-1 lg:gap-5">
          <div className="flex items-center justify-center w-11 h-11 lg:w-24 lg:h-24 rounded p-3 bg-purple/50">
            <span className="text-center text-lg lg:text-5xl font-bold text-white-900"> {timeLeft.hours} </span>
          </div>
          <span className="text-center text-xs lg:text-base text-black/65">jam</span>
        </div>
        <span className="-mt-5 lg:-mt-12 text-xl lg:text-5xl font-semibold">:</span>

        <div className="flex flex-col gap-1 lg:gap-5">
          <div className="flex items-center justify-center w-11 h-11 lg:w-24 lg:h-24 rounded p-3 bg-purple/50">
            <span className="text-center text-lg lg:text-5xl font-bold text-white-900"> {timeLeft.minutes} </span>
          </div>
          <span className="text-center text-xs lg:text-base text-black/65">menit</span>
        </div>
        <span className="-mt-5 lg:-mt-12 text-xl lg:text-5xl font-semibold">:</span>

        <div className="flex flex-col gap-1 lg:gap-5">
          <div className="flex items-center justify-center w-11 h-11 lg:w-24 lg:h-24 rounded p-3 bg-purple/50">
            <span className="text-center text-lg lg:text-5xl font-bold text-white-900"> {timeLeft.seconds} </span>
          </div>
          <span className="text-center text-xs lg:text-base text-black/65">detik</span>
        </div>
      </div>

      {isAdmin && (
        <Fragment>
          <div className="flex items-center justify-center gap-4">
            <MainButton
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Lihat Hasil Pemilihan
            </MainButton>
          </div>

          <ModalVotingResult isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </Fragment>
      )}
    </div>
  );
};
