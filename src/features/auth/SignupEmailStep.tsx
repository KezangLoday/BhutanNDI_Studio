"use client";

import { useState } from "react";

import { GradientButton } from "@/components/ui/GradientButton";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

import { AuthCardHeader, AuthError, AuthFooterLink } from "./AuthCard";

interface SignupEmailStepProps {
  initialEmail?: string;
  onContinue: (email: string) => void;
  onLogin: () => void;
}

/** Step one of two: the address the account will belong to. */
export function SignupEmailStep({
  initialEmail = "",
  onContinue,
  onLogin,
}: SignupEmailStepProps) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return setError("Enter a valid email address.");
    setError("");
    /* A held moment before the next card. Nothing is checked here, but a
       submit that resolves instantly reads as though it did not happen. */
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      onContinue(email.trim());
    }, 500);
  };

  return (
    <>
      <AuthCardHeader
        title="Create an account"
        subtitle="Start with the address you will sign in with"
        steps={[1, 2]}
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

        <GradientButton type="submit" block disabled={busy} className="mt-1">
          {busy ? "Processing…" : "Continue with email"}
          {busy ? null : <Icon name="arrowRight" size={16} strokeWidth={2} />}
        </GradientButton>
      </form>

      <AuthFooterLink prompt="Already have an account?" action="Sign in" onClick={onLogin} />
    </>
  );
}
