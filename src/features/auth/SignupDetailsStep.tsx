"use client";

import { useMemo, useState } from "react";

import { GradientButton } from "@/components/ui/GradientButton";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

import { AuthCardHeader, AuthError } from "./AuthCard";

interface SignupDetailsStepProps {
  email: string;
  onSubmit: () => void;
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

/**
 * Step two of two: who you are, and the password you will sign in with.
 *
 * Name and password share a card because neither is worth a screen of its own
 * once the method question is gone. The requirements stay neutral until the
 * field has been left, so typing the first character is not met with four
 * failures.
 */
export function SignupDetailsStep({ email, onSubmit, onBack }: SignupDetailsStepProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const results = useMemo(() => RULES.map((rule) => rule.test(password)), [password]);
  const allMet = results.every(Boolean);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return setError("Enter your name.");
    if (!allMet) {
      setTouched(true);
      return setError("Your password does not meet the requirements yet.");
    }
    setError("");
    onSubmit();
  };

  return (
    <>
      <AuthCardHeader
        title="Create an account"
        subtitle="Your name and a password"
        steps={[2, 2]}
      />

      <form
        noValidate
        /* The browser's own validation bubble would fire first and this card
           would never show its error bar. Ours says the same thing inside the
           card, where the rest of the feedback is. */
        className="relative z-[4] flex flex-col gap-[18px]"
        onSubmit={submit}
      >
        {error ? <AuthError message={error} onDismiss={() => setError("")} /> : null}

        {email ? (
          <span className="inline-flex items-center gap-2.5 self-center rounded-full border border-grid bg-[var(--ndi-mint-04)] px-4 py-2 text-[13px] text-body">
            <Icon name="mail" size={14} strokeWidth={1.8} className="text-accent" />
            {email}
            <button
              type="button"
              onClick={onBack}
              className="ndi-plainlink text-[12.5px] text-accent"
            >
              Change
            </button>
          </span>
        ) : null}

        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>Your name</span>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-[14px] text-faint">
              <Icon name="user" size={16} strokeWidth={1.8} />
            </span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Kezang Loday"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`${FIELD_CLASS} h-12 pl-[42px]`}
            />
          </div>
        </label>

        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>Password</span>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-[14px] text-faint">
              <Icon name="lock" size={16} strokeWidth={1.8} />
            </span>
            <input
              name="newPassword"
              type={revealed ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Choose a strong password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched(true)}
              className={`${FIELD_CLASS} h-12 pl-[42px] pr-[42px]`}
            />
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              aria-label={revealed ? "Hide password" : "Show password"}
              className="ndi-plainlink absolute right-[14px] text-faint"
            >
              <Icon name={revealed ? "eyeOff" : "eye"} size={16} strokeWidth={1.8} />
            </button>
          </div>
        </label>

        <ul className="m-0 flex list-none flex-col gap-1.5 p-0" aria-live="polite">
          {RULES.map((rule, i) => {
            const met = results[i];
            const failing = touched && !met;
            return (
              <li
                key={rule.label}
                className="flex items-center gap-2 text-[12.5px]"
                style={{
                  color: met
                    ? "var(--accent)"
                    : failing
                      ? "var(--text-danger)"
                      : "var(--text-faint)",
                }}
              >
                <Icon
                  name={met ? "check" : failing ? "close" : "info"}
                  size={13}
                  strokeWidth={2.2}
                  className="flex-none"
                />
                {rule.label}
              </li>
            );
          })}
        </ul>

        <GradientButton type="submit" block className="mt-1">
          Create account
          <Icon name="arrowRight" size={16} strokeWidth={2} />
        </GradientButton>
      </form>
    </>
  );
}
