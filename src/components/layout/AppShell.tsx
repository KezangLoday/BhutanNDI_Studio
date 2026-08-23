"use client";

import { useState, type ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppShellProps {
  children: ReactNode;
}

/**
 * The signed-in chrome: a fixed top bar, a sidebar that becomes a drawer below
 * 901px (the website's tablet→desktop breakpoint), and the scrolling content
 * column beside it.
 */
export function AppShell({ children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-dvh">
      <TopBar navOpen={navOpen} onToggleNav={() => setNavOpen((o) => !o)} />
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      {/* The sidebar is fixed, so the content column is inset rather than
          laid out beside it. */}
      <div className="pt-16 min-[901px]:pl-[248px]">
        <main className="mx-auto w-full max-w-[1200px] px-4 py-6 min-[641px]:px-6 min-[901px]:px-8 min-[901px]:py-8">
          {children}
        </main>
        <footer className="border-t border-subtle px-4 py-4 text-xs text-faint min-[641px]:px-6 min-[901px]:px-8">
          <div className="mx-auto max-w-[1200px]">
            © 2019 – 2026 Bhutan NDI · All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
