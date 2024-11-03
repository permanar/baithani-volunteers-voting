/**
 * @file src/components/Partials/Input/InputText/InputText.tsx
 *
 * @date 02-11-24 - 23:55:01
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";

import { cn } from "@/common/styles";
import { Input } from "@headlessui/react";

type Props = {
  label?: string;
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;

  labelClassName?: string;
  inputParentClassName?: string;
  prefixClassName?: string;
  suffixClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputText = (props: Props) => {
  const {
    label,
    prefix,
    suffix,
    type = "text",

    className,
    labelClassName,
    inputParentClassName,
    prefixClassName,
    suffixClassName,
    ...rest
  } = props;

  return (
    <label className="flex flex-col">
      {label && <span className={cn("text-xs text-gray-600", labelClassName)}>{label}</span>}

      <div
        className={cn(
          "flex items-center w-full relative rounded-xl overflow-hidden border border-black-900/10",
          prefix && "pl-3.5",
          suffix && "pr-3.5",

          inputParentClassName
        )}
      >
        {prefix && (
          <div
            className={cn(
              "flex items-center h-[0.01em] whitespace-nowrap mr-2",

              prefixClassName
            )}
          >
            <span className="text-xs">{prefix}</span>
          </div>
        )}

        <Input
          type={type}
          className={cn(
            "block w-full py-1.5 px-3 text-xs/6",
            "text-black dark:text-white bg-transparent",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            "placeholder-gray-300 dark:placeholder-gray-500",

            prefix && "pl-0",
            suffix && "pr-0",

            className
          )}
          {...rest}
        />

        {suffix && (
          <div
            className={cn(
              "flex items-center h-[0.01em] whitespace-nowrap ml-2",

              suffixClassName
            )}
          >
            <span className="text-xs">{suffix}</span>
          </div>
        )}
      </div>
    </label>
  );
};
