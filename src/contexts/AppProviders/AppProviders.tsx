/**
 * @file src/contexts/AppProviders/AppProviders.tsx
 *
 * @date 03-11-24 - 00:31:48
 * @author Richie Permana <richie.permana@gmail.com>
 */

"use client";

import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export const AppProviders = (props: Props) => {
  const { children } = props;

  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
