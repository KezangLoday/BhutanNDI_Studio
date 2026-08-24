"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icons";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";

/**
 * The theme switch in the top bar.
 *
 * The server cannot know which theme the visitor stored, so the button renders
 * its dark-theme face on both sides of hydration and corrects itself in an
 * effect. Reading localStorage during render would mismatch the server's HTML;
 * the page itself is already correct by then, because the pre-paint script in
 * the document head set data-theme before anything drew.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="ndi-navrow inline-flex h-10 w-10 items-center justify-center rounded-[10px]"
      data-active="0"
    >
      <Icon name={theme === "dark" ? "moon" : "sun"} size={17} strokeWidth={1.7} />
    </button>
  );
}
