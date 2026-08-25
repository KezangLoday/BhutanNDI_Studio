"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { AuthShell } from "@/components/layout/AuthShell";
import { PasswordScene, SecureSignInScene } from "@/components/ui/scenes";
import { Icon } from "@/components/ui/icons";

import { LoginStep } from "./LoginStep";
import { SignupDetailsStep } from "./SignupDetailsStep";
import { SignupEmailStep } from "./SignupEmailStep";
import type { AuthStep } from "./authTypes";

const RAIL: Record<AuthStep, { scene: ReactNode; title: ReactNode; lead: string }> = {
  login: {
    scene: <SecureSignInScene />,
    title: (
      <>
        Your identity, <span className="ndi-wave-text">verified once</span>
      </>
    ),
    lead: "NDI Studio is where organizations issue and verify credentials on the Bhutan National Digital Identity network.",
  },
  "signup-email": {
    scene: <SecureSignInScene />,
    title: (
      <>
        Set up your <span className="ndi-wave-text">Studio account</span>
      </>
    ),
    lead: "One account, whichever side you are on — issue credentials, ask for proofs, or both.",
  },
  "signup-details": {
    scene: <PasswordScene />,
    title: (
      <>
        Set a password you <span className="ndi-wave-text">won&rsquo;t reuse</span>
      </>
    ),
    lead: "It guards every credential you issue and every proof you request, so give it length over cleverness — a passphrase beats a short password with symbols in it.",
  },
};

const registeredNotice =
  "Congratulations — your NDI Studio account is registered. Sign in to continue.";

/**
 * The signed-out flow: sign in on one card, sign up across two.
 *
 * It used to run six cards, three of them serving passkeys — a method step in
 * each direction, and the split between address and credential that only made
 * sense because the method came between them. Passkeys are out of the product,
 * so the questions they asked are gone with them.
 *
 * /sign-in and /sign-up mount it at their own step, so each has a real URL to
 * link to; / still opens on sign-in.
 */
export function AuthFlow({ start = "login" }: { start?: AuthStep } = {}) {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>(start);
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  /** Every transition clears the notice — a stale success line on a new step
   *  reads as though it belongs to that step. */
  const go = (next: AuthStep) => {
    setNotice(null);
    setStep(next);
  };

  const rail = RAIL[step];

  return (
    <AuthShell
      scene={rail.scene}
      title={rail.title}
      lead={rail.lead}
      /* The plan someone is signing up under is worth saying before they sign
         up, not after — it sits above the card rather than inside it, because
         it is about the account rather than about this step. */
      banner={
        step !== "login" ? (
          <p className="m-0 flex items-start gap-2.5 text-[13px] leading-[1.55]">
            <Icon
              name="info"
              size={15}
              strokeWidth={2}
              className="mt-px flex-none"
              style={{ color: "var(--ndi-warning)" }}
            />
            <span className="text-body">
              You are registering on the{" "}
              <span className="font-semibold text-strong">Starter plan</span>, which is metered.
              You can upgrade from billing once your organization exists.
            </span>
          </p>
        ) : null
      }
    >
      {/* Status line, following the website's inline role="status" pattern
          rather than a floating toast — the site ships no toast component. */}
      {notice ? (
        <p
          role="status"
          aria-live="polite"
          className="relative z-[4] mb-5 flex items-start gap-2 rounded-xl border border-grid bg-[var(--ndi-mint-08)] px-3.5 py-3 text-[13px] leading-[1.5] text-accent"
        >
          <Icon name="check" size={14} strokeWidth={2.2} className="mt-px flex-none" />
          <span className="flex-1">{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss"
            className="ndi-plainlink -mr-1 flex-none text-faint"
          >
            <Icon name="close" size={14} strokeWidth={2} />
          </button>
        </p>
      ) : null}

      {step === "login" ? (
        <LoginStep
          initialEmail={email}
          onSubmit={(value) => {
            setEmail(value);
            router.push("/dashboard");
          }}
          onForgotPassword={() => router.push("/reset-password")}
          onCreateAccount={(value) => {
            setEmail(value);
            go("signup-email");
          }}
        />
      ) : null}

      {step === "signup-email" ? (
        <SignupEmailStep
          initialEmail={email}
          onContinue={(value) => {
            setEmail(value);
            go("signup-details");
          }}
          onLogin={() => go("login")}
        />
      ) : null}

      {step === "signup-details" ? (
        <SignupDetailsStep
          email={email}
          onSubmit={() => {
            setStep("login");
            setNotice(registeredNotice);
          }}
          onBack={() => go("signup-email")}
        />
      ) : null}
    </AuthShell>
  );
}
