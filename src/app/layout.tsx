import type { Metadata } from "next";
import { DM_Mono, Host_Grotesk, Inter } from "next/font/google";

import { Atmosphere } from "@/components/layout/Atmosphere";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
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
  title: "NDI Studio — Bhutan NDI",
  description:
    "Issue and verify credentials on the Bhutan National Digital Identity network.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${hostGrotesk.variable} ${inter.variable} ${dmMono.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Blocking on purpose: it sets data-theme before the first paint, so
            a light-theme visitor never sees the dark ground flash first. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {/* isolate creates the stacking context the atmosphere layers sit behind */}
        <div className="relative isolate min-h-screen">
          <Atmosphere />
          {/* overflow-x-clip, not hidden: hidden would create a scroll container
              and break sticky positioning. */}
          <div className="relative z-[1] overflow-x-clip">{children}</div>
        </div>
      </body>
    </html>
  );
}
