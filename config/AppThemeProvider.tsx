"use client";

import { responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { useColorMode } from "../stores/colorModeStore";
import { useMemo } from "react";

const roboto = Roboto({
  weight: ["100", "300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const AppThemeProvider = ({
  children,
}: {} & React.PropsWithChildren) => {
  const { mode } = useColorMode();

  const theme = useMemo(() => {
    let createdTheme = createTheme({
      palette: {
        mode: mode,
        primary: {
          main: "#164863",
        },
        secondary: {
          main: "#427D9D",
        },
        // primary: {
        //   main: "#495E57", // Hauptfarbe für primäre UI-Elemente
        // },
        // secondary: {
        //   main: "#F4CE14", // Sekundärfarbe für Akzente und Call-to-Actions
        // },
      },
    });
    return responsiveFontSizes(createdTheme, { factor: 0.5 });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
