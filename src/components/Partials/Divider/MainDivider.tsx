/**
 * @file src/components/Partials/Divider/MainDivider.tsx
 *
 * @date 02-11-24 - 23:38:45
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { cn } from "@/common/styles";

type Props = {
  className?: string;
  type?: "horizontal" | "vertical";
};

export const MainDivider = (props: Props) => {
  const { className, type = "horizontal" } = props;

  return (
    <div
      className={cn(
        "w-full h-[1px] bg-black/10",
        type === "horizontal" && "w-full h-[1px]",
        type === "vertical" && "w-[1px] h-full",

        className
      )}
    />
  );
};
