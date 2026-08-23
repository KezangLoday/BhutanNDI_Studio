"use client";

import { useState } from "react";

import { StepHeader } from "@/components/layout/AuthShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

interface LoginPasswordStepProps {
  email: string;
  onSubmit: (password: string) => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  onBack: () => void;
}

export function LoginPasswordStep({
  email,
  onSubmit,
  onForgotPassword,
  onCreateAccount,
  onBack,
}: LoginPasswordStepProps) {
  const [password, setPassword] = useState("");
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <StepHeader title="Login" subtitle="Enter your password to login" onBack={onBack} />

      <form
        className="relative z-[4] flex flex-col gap-[18px]"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(password);
        }}
      >
        <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-grid bg-[var(--ndi-mint-04)] px-4 py-2 text-[13.5px] text-body">
          <Icon name="mail" size={15} strokeWidth={1.8} className="text-accent" />
          {email}
        </span>

        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>Your password</span>
          <div className="relative flex items-center">
            <input
              name="password"
              type={revealed ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${FIELD_CLASS} h-12 pr-12`}
            />
            {/* 44px hit area inside a 48px field, so the target is not the
                16px glyph. */}
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              aria-label={revealed ? "Hide password" : "Show password"}
              aria-pressed={revealed}
              className="ndi-plainlink absolute right-0.5 inline-flex h-11 w-11 items-center justify-center rounded-[9px] text-faint"
            >
              <Icon name={revealed ? "eyeOff" : "eye"} size={17} strokeWidth={1.8} />
            </button>
          </div>
        </label>

        <button
          type="button"
          onClick={onForgotPassword}
          className="ndi-plainlink -mt-1 self-end text-[13px] text-accent"
        >
          Forgot password?
        </button>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onCreateAccount}
            className="ndi-plainlink text-sm text-accent"
          >
            Create an account
          </button>
          <GradientButton type="submit" disabled={!password}>
            <Icon name="userCheck" size={16} strokeWidth={1.9} />
            Login
          </GradientButton>
        </div>
      </form>
    </>
  );
}
