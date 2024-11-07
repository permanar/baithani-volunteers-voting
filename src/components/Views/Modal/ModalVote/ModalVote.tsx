/**
 * @file src/components/Views/Modal/ModalVotingResult.tsx
 *
 * @date 06-11-24 - 21:06:43
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";

import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { IconCloseCross } from "@/components/Partials/Icons";
import { Volunteer, VoteResponse } from "@/types";
import { MainButton } from "@/components/Partials/Button";
import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "@/common/api";
import toast from "react-hot-toast";
import { VOTING } from "@/common/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  data: Volunteer;
};

export const ModalVote = (props: Props) => {
  const {
    isOpen,
    onClose,

    data,
  } = props;

  const voteMutation = useMutation({
    mutationKey: ["vote", data.username, data.id],
    mutationFn: async () => {
      if (new Date(VOTING.END_DATE) < new Date()) {
        throw new Error("Maaf, sesi pemungutan suara sudah berakhir. Semoga lain kali bisa ikut lagi. 😢");
      }

      return await ApiClient<VoteResponse>("/api/v1/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voted: data.id }),
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("🎉 Suara kamu sudah tercatat! Terima kasih sudah berpartisipasi! 😊", {
          duration: 5000,
        });

        setTimeout(() => {
          onClose();
        }, 500);
      }
    },
    onError: (data) => {
      toast.error(`🚨 ${data.message}` || "Maaf, terjadi kesalahan. Silahkan coba lagi nanti. 😢", {
        duration: 10000,
      });
    },
  });

  const handleSubmit = () => {
    voteMutation.mutate();
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
          <DialogTitle className="font-bold">
            <span className="text-xl font-bold text-purple">Konfirmasi Pilihan Anda</span>
          </DialogTitle>

          <button className="w-4 h-4" onClick={onClose}>
            <IconCloseCross svg={{ className: "w-full h-full" }} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Description>
            Apakah anda yakin ingin memberikan suara kepada{" "}
            <span className="font-semibold capitalize">{data.full_name}</span>?
          </Description>

          <Description>Vote ini tidak dapat diubah kembali.</Description>
        </div>

        <div className="flex justify-end gap-2.5">
          <MainButton variant="text" onClick={onClose}>
            Batal
          </MainButton>
          <MainButton onClick={handleSubmit} loading={voteMutation.isPending}>
            Vote
          </MainButton>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
