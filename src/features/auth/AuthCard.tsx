import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icons";

/**
 * The head of a signed-out card: a centred title, and for signup the two dots
 * that say how far in you are.
 *
 * Centred rather than left-aligned like the in-app page headers, because these
 * cards are the only thing on the screen — there is no column of content for a
 * flush-left title to line up with.
 */
export function AuthCardHeader({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle?: string;
  /** [current, total], 1-based. Omitted for a single-step card. */
  steps?: [number, number];
}) {
  return (
    <header className="relative z-[4] mb-6 flex flex-col items-center gap-3 text-center">
      <div>
        <h1 className="m-0 font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-strong">
          {title}
        </h1>
        {subtitle ? (
          <p className="m-0 mt-1.5 text-[14px] leading-[1.5] text-muted">{subtitle}</p>
        ) : null}
      </div>

      {steps ? <AuthSteps current={steps[0]} total={steps[1]} /> : null}
    </header>
  );
}

function AuthSteps({ current, total }: { current: number; total: number }) {
  return (
    <ol
      className="m-0 flex list-none items-center gap-2 p-0"
      aria-label={`Step ${current} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const done = n < current;
        const on = n === current;
        return (
          <li key={n} className="flex items-center gap-2">
            <span
              aria-current={on ? "step" : undefined}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px]"
              style={{
                borderColor: done || on ? "transparent" : "var(--border-grid)",
                background: done || on ? "var(--grad-mint)" : "rgb(var(--tint) / 0.04)",
                color: done || on ? "var(--text-on-mint)" : "var(--text-faint)",
              }}
            >
              {done ? <Icon name="check" size={13} strokeWidth={2.6} /> : n}
            </span>
            {n < total ? (
              <span
                aria-hidden="true"
                className="h-px w-5"
                style={{ background: "var(--border-subtle)" }}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/** The one line under a card: the way out to the other flow. */
export function AuthFooterLink({
  prompt,
  action,
  onClick,
}: {
  prompt: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <p className="relative z-[4] m-0 mt-5 text-center text-[13.5px] text-muted">
      {prompt}{" "}
      <button type="button" onClick={onClick} className="ndi-plainlink font-medium text-accent">
        {action}
      </button>
    </p>
  );
}

/** Inline error, as the sample shows it: a bar above the field it concerns. */
export function AuthError({ message, onDismiss }: { message: ReactNode; onDismiss: () => void }) {
  return (
    <p
      role="alert"
      className="relative z-[4] m-0 flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[13px] leading-[1.5]"
      style={{
        borderColor: "var(--text-danger)",
        background: "rgb(var(--tint) / 0.03)",
        color: "var(--text-danger)",
      }}
    >
      <Icon name="shieldAlert" size={15} strokeWidth={2} className="mt-px flex-none" />
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="ndi-plainlink -mr-1 flex-none"
      >
        <Icon name="close" size={14} strokeWidth={2} />
      </button>
    </p>
  );
}
