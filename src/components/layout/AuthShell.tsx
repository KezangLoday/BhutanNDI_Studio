import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";

import { AuthHeader } from "./AuthHeader";

interface AuthShellProps {
  children: ReactNode;
  /** The left rail's headline; one emphasised phrase, per the design system. */
  title: ReactNode;
  lead: string;
  scene: ReactNode;
}

/**
 * Page shell: the fixed header pill, a two-column body that collapses to one
 * below 901px (the website's tablet→desktop breakpoint), and the footer rule.
 * Max width and gutters follow the website's PageSection.
 */
export function AuthShell({ children, title, lead, scene }: AuthShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AuthHeader />

      <main className="mx-auto flex w-full max-w-[1200px] flex-1 items-center px-5 pt-[104px] pb-16 min-[641px]:px-8 min-[901px]:pt-[136px]">
        <div className="grid w-full items-center gap-12 min-[901px]:grid-cols-[1.05fr_1fr] min-[901px]:gap-20">
          {/* Left rail — hidden on phones, where the form is the whole job. */}
          <section className="hidden min-[901px]:block">
            <div className="mb-10 max-w-[440px]">{scene}</div>
            <Eyebrow>— Bhutan NDI</Eyebrow>
            <h1 className="mt-4 max-w-[460px] font-display text-[clamp(30px,3.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em] text-strong [text-wrap:balance]">
              {title}
            </h1>
            <p className="mt-5 max-w-[440px] text-[17px] leading-[1.62] text-muted [text-wrap:pretty]">
              {lead}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Verified credentials", "End-to-end encrypted"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-grid bg-[rgba(12,17,27,0.5)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
                >
                  <Icon name="check" size={12} strokeWidth={2.4} />
                  {label}
                </span>
              ))}
            </div>
          </section>

          {/* Right — the form panel. */}
          <section className="w-full justify-self-center min-[901px]:justify-self-end">
            <div
              data-cta-form="1"
              className="relative mx-auto w-full max-w-[440px] rounded-[16px] border border-grid p-5 min-[561px]:p-7 min-[901px]:rounded-[20px] min-[901px]:p-8"
            >
              {children}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-subtle px-5 py-4 text-xs text-faint min-[641px]:px-8">
        <div className="mx-auto max-w-[1200px]">
          © 2019 – 2026 Bhutan NDI · All rights reserved.
        </div>
      </footer>
    </div>
  );
}

interface StepHeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

/** Back control, title, subtitle — the header of each step inside the panel. */
export function StepHeader({ title, subtitle, onBack }: StepHeaderProps) {
  return (
    <div className="relative z-[4] mb-7 flex items-start gap-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="ndi-backbtn mt-0.5 inline-flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-xl border border-grid bg-white/[0.02] text-accent"
        >
          <Icon name="arrowLeft" size={18} strokeWidth={2} />
        </button>
      ) : null}
      <div className="min-w-0">
        <h2 className="font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-strong">
          {title}
        </h2>
        <p className="mt-1 text-[14.5px] leading-[1.5] text-muted">{subtitle}</p>
      </div>
    </div>
  );
}
