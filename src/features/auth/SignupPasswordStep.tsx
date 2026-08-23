"use client";

import { useMemo, useState } from "react";

import { StepHeader } from "@/components/layout/AuthShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

interface SignupPasswordStepProps {
  email: string;
  onSubmit: (password: string) => void;
  onBack: () => void;
}

interface Rule {
  label: string;
  test: (value: string) => boolean;
}

const RULES: Rule[] = [
  { label: "At least 12 characters", test: (v) => v.length >= 12 },
  { label: "An uppercase and a lowercase letter", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: "A number", test: (v) => /\d/.test(v) },
  { label: "A symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export function SignupPasswordStep({ email, onSubmit, onBack }: SignupPasswordStepProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [revealed, setRevealed] = useState(false);
  /** Requirements only turn red once the field has been left, so typing the
   *  first character isn't met with four failures. */
  const [touched, setTouched] = useState(false);

  const results = useMemo(() => RULES.map((rule) => rule.test(password)), [password]);
  const allMet = results.every(Boolean);
  const mismatch = confirm.length > 0 && confirm !== password;
  const canSubmit = allMet && confirm === password;

  return (
    <>
      <StepHeader title="Create a password" subtitle="This is what you will sign in with" onBack={onBack} />

      <form
        className="relative z-[4] flex flex-col gap-[18px]"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit) onSubmit(password);
        }}
      >
        {email ? (
          <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-grid bg-[var(--ndi-mint-04)] px-4 py-2 text-[13.5px] text-body">
            <Icon name="mail" size={15} strokeWidth={1.8} className="text-accent" />
            {email}
          </span>
        ) : null}

        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>New password</span>
          <div className="relative flex items-center">
            <input
              name="newPassword"
              type={revealed ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Choose a strong password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched(true)}
              aria-describedby="password-rules"
              className={`${FIELD_CLASS} h-12 pr-12`}
            />
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

        {/* Requirements, checked live. Stating them up front beats rejecting a
            password after the fact. */}
        <ul id="password-rules" className="m-0 flex list-none flex-col gap-1.5 p-0">
          {RULES.map((rule, i) => {
            const met = results[i];
            const failed = touched && !met;
            return (
              <li
                key={rule.label}
                className="flex items-center gap-2 text-[12.5px] leading-[1.5]"
                style={{
                  color: met
                    ? "var(--text-accent)"
                    : failed
                      ? "#f0866b"
                      : "var(--text-faint)",
                }}
              >
                <Icon
                  name={met ? "check" : failed ? "close" : "chevronRight"}
                  size={13}
                  strokeWidth={2.2}
                  className="flex-none"
                />
                {rule.label}
              </li>
            );
          })}
        </ul>

        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>Confirm password</span>
          <input
            name="confirmPassword"
            type={revealed ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Type it again"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            aria-invalid={mismatch}
            className={`${FIELD_CLASS} h-12`}
            style={mismatch ? { borderColor: "#f0866b" } : undefined}
          />
          {mismatch ? (
            <p role="alert" className="m-0 flex items-center gap-2 text-[12.5px] text-[#f0866b]">
              <Icon name="shieldAlert" size={13} strokeWidth={2} className="flex-none" />
              Both passwords must match.
            </p>
          ) : null}
        </label>

        <GradientButton type="submit" block disabled={!canSubmit} className="mt-1">
          <Icon name="userCheck" size={16} strokeWidth={1.9} />
          Create account
        </GradientButton>
      </form>
    </>
  );
}
