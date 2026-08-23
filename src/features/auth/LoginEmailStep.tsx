"use client";

import { useState } from "react";

import { StepHeader } from "@/components/layout/AuthShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

interface LoginEmailStepProps {
  initialEmail?: string;
  onNext: (email: string) => void;
  onCreateAccount: () => void;
}

export function LoginEmailStep({ initialEmail = "", onNext, onCreateAccount }: LoginEmailStepProps) {
  const [email, setEmail] = useState(initialEmail);

  return (
    <>
      <StepHeader title="Login" subtitle="Enter your email to login" />

      <form
        className="relative z-[4] flex flex-col gap-[18px]"
        onSubmit={(event) => {
          event.preventDefault();
          onNext(email);
        }}
      >
        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>Your email</span>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-[14px] text-faint">
              <Icon name="mail" size={16} strokeWidth={1.8} />
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@company.bt"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`${FIELD_CLASS} h-12 pl-[42px]`}
            />
          </div>
        </label>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <button type="button" onClick={onCreateAccount} className="ndi-plainlink text-sm text-accent">
            Create an account
          </button>
          <GradientButton type="submit" disabled={!email.trim()}>
            Next
            <Icon name="arrowRight" size={16} strokeWidth={1.9} className="ndi-sendnudge" />
          </GradientButton>
        </div>
      </form>
    </>
  );
}
