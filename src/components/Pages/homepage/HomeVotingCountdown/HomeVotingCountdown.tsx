/**
 * @file src/components/Pages/homepage/HomeVotingCountdown/HomeVotingCountdown.tsx
 *
 * @date 03-11-24 - 20:30:29
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { MainButton } from "@/components/Partials/Button";
import React from "react";

type Props = {};

export const HomeVotingCountdown = (props: Props) => {
  const {} = props;

  return (
    <div className="relative flex flex-col gap-8 mt-16 px-6">
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-xl lg:text-4xl font-semibold">Peluncuran Pemilihan Suara</h2>
        <span className="text-2xs lg:text-lg font-medium text-black/25">
          Nantikan peluncuran pemilihan suara dan berikan suaramu
        </span>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-11 h-11 rounded p-3 bg-purple/50">
            <span className="text-center text-lg font-bold text-white-900">10</span>
          </div>
          <span className="text-center text-xs text-black/65">hari</span>
        </div>
        <span className="-mt-5 text-xl font-semibold">:</span>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-11 h-11 rounded p-3 bg-purple/50">
            <span className="text-center text-lg font-bold text-white-900">05</span>
          </div>
          <span className="text-center text-xs text-black/65">jam</span>
        </div>
        <span className="-mt-5 text-xl font-semibold">:</span>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-11 h-11 rounded p-3 bg-purple/50">
            <span className="text-center text-lg font-bold text-white-900">22</span>
          </div>
          <span className="text-center text-xs text-black/65">menit</span>
        </div>
        <span className="-mt-5 text-xl font-semibold">:</span>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-11 h-11 rounded p-3 bg-purple/50">
            <span className="text-center text-lg font-bold text-white-900">18</span>
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
