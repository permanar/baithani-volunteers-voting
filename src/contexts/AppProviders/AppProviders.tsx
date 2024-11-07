/**
 * @file src/contexts/AppProviders/AppProviders.tsx
 *
 * @date 03-11-24 - 00:31:48
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import React, { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../AuthContext";

type Props = {
  children: React.ReactNode;

  isAuthenticated: boolean;
};

export const AppProviders = (props: Props) => {
  const { children, isAuthenticated } = props;

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const addMaximumScaleToMetaViewport = () => {
      const el = document.querySelector("meta[name=viewport]");

      if (el !== null) {
        let content = el.getAttribute("content") || "";
        const re = /maximum\-scale=[0-9\.]+/g;

        if (re.test(content)) {
          content = content.replace(re, "maximum-scale=1.0");
        } else {
          content = [content, "maximum-scale=1.0"].join(", ");
        }

        el.setAttribute("content", content);
      }
    };

    const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

    // @ts-expect-error typescript doesn't recognize MSStream
    // check if it is an iPad, iPhone or iPod
    const checkIsIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (checkIsIOS()) {
      disableIosTextFieldZoom();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isAuthenticated={isAuthenticated}>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
