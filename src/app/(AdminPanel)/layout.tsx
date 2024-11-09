import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { muiTheme } from "@/lib/mui";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider options={{ key: "css" }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />

        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
