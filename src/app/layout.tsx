import type { Metadata } from "next";
import { DM_Mono, Inter } from "next/font/google";
import "@/styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NGOTAG Studio",
  description:
    "NGOTAG Studio — issue and verify credentials on the Bhutan National Digital Identity network.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
