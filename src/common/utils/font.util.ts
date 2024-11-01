import { Urbanist } from "next/font/google";

const fontUrbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const mergeFontsVariable = [fontUrbanist.variable];
