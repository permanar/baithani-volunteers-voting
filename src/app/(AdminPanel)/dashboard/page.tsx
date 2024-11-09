/**
 * @file src/app/(AdminPanel)/dashboard/page.tsx
 *
 * @date 08-11-24 - 14:26:58
 * @author Richie Permana <richie.permana@gmail.com>
 */

import React from "react";
import { redirect } from "next/navigation";

import { checkSession } from "@/lib/auth";
import { Box, Button, Stack } from "@mui/material";
import { SideNav } from "@/components/Views/(Dashboard)/SideNav";

export default async function DashboardPage() {
  const { isAuthenticated, isAdmin } = await checkSession();

  if (!isAuthenticated || !isAdmin) return redirect("/login");

  return (
    <Box
      sx={{
        bgcolor: "#000",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minHeight: "100%",
      }}
    >
      <SideNav />
      DashboardPage
      <Stack>
        <Button variant="contained" color="primary">
          Primary
        </Button>

        <Button variant="contained" color="secondary">
          Secondary
        </Button>
      </Stack>
    </Box>
  );
}
