"use client";

import { StepHeader } from "@/components/layout/AuthShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { Icon } from "@/components/ui/icons";

import type { AuthMethod } from "./authTypes";

interface SignupMethodStepProps {
  onSelect: (method: AuthMethod) => void;
  onLogin: () => void;
  onBack: () => void;
}

/** The mono label + hairline rule the website uses to head a run of fields. */
function FieldGroup({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--border-subtle)]" />
    </div>
  );
}

export function SignupMethodStep({ onSelect, onLogin, onBack }: SignupMethodStepProps) {
  return (
    <>
      <StepHeader
        title="Create account"
        subtitle="Please choose your authentication method"
        onBack={onBack}
      />

      <div className="relative z-[4] flex flex-col gap-6">
        <p className="m-0 text-[14.5px] leading-[1.6] text-body">
          With a <span className="ndi-wave-text ndi-wave-tight font-semibold">passkey</span> you
          don&rsquo;t need to remember complex passwords.
        </p>

        <div className="flex flex-col gap-4">
          <FieldGroup label="How passkeys work" />
          <div className="flex flex-col gap-4">
            {[
              {
                q: "What are passkeys?",
                a: "Encrypted digital keys you create with your fingerprint, face, or screen lock.",
              },
              {
                q: "Where are passkeys saved?",
                a: "To your password manager, so you can sign in on your other devices.",
              },
            ].map((item) => (
              <div key={item.q} className="flex gap-3">
                <span className="mt-0.5 flex-none text-accent">
                  <Icon name="shieldCheck" size={16} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="m-0 font-display text-[14.5px] font-semibold leading-[1.35] tracking-[-0.01em] text-strong">
                    {item.q}
                  </h3>
                  <p className="m-0 mt-1 text-[13px] leading-[1.55] text-muted">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <GradientButton block onClick={() => onSelect("passkey")}>
            <Icon name="fingerprint" size={17} strokeWidth={1.9} />
            Create with passkey
          </GradientButton>
          <HairlineButton block onClick={() => onSelect("password")}>
            <Icon name="lockRounded" size={17} strokeWidth={1.8} />
            Use a password
          </HairlineButton>
        </div>

        <button
          type="button"
          onClick={onLogin}
          className="ndi-plainlink self-center text-sm text-accent"
        >
          Login here
        </button>
      </div>
    </>
  );
}
