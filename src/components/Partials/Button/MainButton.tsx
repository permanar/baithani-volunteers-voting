/**
 * @file src/components/Partials/Button/MainButton.tsx
 *
 * @date 02-11-24 - 23:49:13
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { ButtonHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/common/styles";
import { LoadingSpinner } from "../LoadingSpinner";

export const buttonVariants = cva(
  [
    "flex items-center justify-center min-w-[65px] px-4 py-2.5 rounded-4xl focus:outline-none focus:ring-2 font-semibold",
    "transition-colors duration-300 ease-in-out",
    "disabled:bg-[#e2e2e3] dark:disabled:bg-black-350 disabled:text-white disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary:
          "text-white bg-purple hover:bg-purple/70 active:bg-purple/80 focus:ring-purple/50 focus:ring-opacity-50",

        // outlined
        primaryOutlined:
          "text-purple border border-purple hover:bg-purple/10 active:bg-purple/20 focus:ring-purple/50 focus:ring-opacity-50",
        disabledOutlined: "text-gray border border-gray cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type Props = {
  fullWidth?: boolean;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const MainButton = (props: Props) => {
  const {
    children,

    fullWidth,
    loading = false,

    variant = "primary",
    className = "",
    ...rest
  } = props;

  return (
    <button
      type="submit"
      className={cn(
        buttonVariants({ variant }),
        {
          "w-full": fullWidth,
          "cursor-not-allowed select-none": loading,
        },
        className
      )}
      disabled={loading}
      {...rest}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};
