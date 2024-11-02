/**
 * @file src/components/Partials/LoadingSpinner/LoadingSpinner.tsx
 *
 * @date 02-11-24 - 23:38:51
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React, { FC, HTMLAttributes } from "react";

import { IconCircularProgress } from "../Icons";
import { cn } from "@/common/styles";

type Props = {
  parentProps?: HTMLAttributes<HTMLDivElement>;
  iconProps?: HTMLAttributes<SVGSVGElement>;
};

export const LoadingSpinner: FC<Props> = (props) => {
  const { parentProps = {}, iconProps = {} } = props;

  const { className: parentClassName, ...oarentPropsRest } = parentProps;
  const { className: iconClassName, ...iconPropsRest } = iconProps;

  return (
    <div className={cn("flex items-center justify-center", parentClassName)} {...oarentPropsRest}>
      <IconCircularProgress
        svg={{
          className: iconClassName,
          ...iconPropsRest,
        }}
      />
    </div>
  );
};
