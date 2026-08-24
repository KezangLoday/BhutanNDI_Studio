"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { AuthShell } from "@/components/layout/AuthShell";
import { Icon } from "@/components/ui/icons";
import { PasskeyScene, PasswordScene, SecureSignInScene } from "@/components/ui/scenes";

import { LoginEmailStep } from "./LoginEmailStep";
import { LoginMethodStep } from "./LoginMethodStep";
import { LoginPasswordStep } from "./LoginPasswordStep";
import { SignupMethodStep } from "./SignupMethodStep";
import { SignupNameStep } from "./SignupNameStep";
import { SignupPasswordStep } from "./SignupPasswordStep";
import type { AuthMethod, AuthStep } from "./authTypes";

const RAIL: Record<AuthStep, { scene: ReactNode; title: ReactNode; lead: string }> = {
  "login-email": {
    scene: <SecureSignInScene />,
    title: (
      <>
        Your identity, <span className="ndi-wave-text">verified once</span>
      </>
    ),
    lead: "NDI Studio is where issuers manage credentials on the Bhutan National Digital Identity network.",
  },
  "login-method": {
    scene: <PasskeyScene />,
    title: (
      <>
        Sign in <span className="ndi-wave-text">without a password</span>
      </>
    ),
    lead: "A passkey binds your session to this device with your fingerprint, face, or screen lock — nothing to remember, nothing to phish.",
  },
  "login-password": {
    scene: <PasswordScene />,
    title: (
      <>
        Welcome back to <span className="ndi-wave-text">NDI Studio</span>
      </>
    ),
    lead: "Enter your password to reach your organizations, schemas and credential definitions.",
  },
  "signup-name": {
    scene: <SecureSignInScene />,
    title: (
      <>
        Set up your <span className="ndi-wave-text">issuer account</span>
      </>
    ),
    lead: "Your name identifies you to the organisations you issue and verify credentials for.",
  },
  "signup-method": {
    scene: <PasskeyScene />,
    title: (
      <>
        Choose how you <span className="ndi-wave-text">sign in</span>
      </>
    ),
    lead: "Passkeys are the recommended method — encrypted, phishing-resistant, and portable across your devices.",
  },
  "signup-password": {
    scene: <PasswordScene />,
    title: (
      <>
        Set a password you <span className="ndi-wave-text">won&rsquo;t reuse</span>
      </>
    ),
    lead: "It guards every credential you issue, so give it length over cleverness — a passphrase beats a short password with symbols in it.",
  },
};

const registeredNotice =
  "Congratulations — your NDI Studio account is registered. Sign in to continue.";

/**
 * The signed-out flow. /sign-in and /sign-up mount it at their own step, so
 * each has a real URL to link to; / still opens on login, as before.
 */
export function AuthFlow({ start = "login-email" }: { start?: AuthStep } = {}) {
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

  const chooseLoginMethod = (method: AuthMethod) => {
    if (method === "password") {
      go("login-password");
      return;
    }
    // No WebAuthn ceremony in a design build, so the passkey path lands where
    // a successful one would.
    router.push("/dashboard");
  };

  const rail = RAIL[step];

  return (
    <AuthShell scene={rail.scene} title={rail.title} lead={rail.lead}>
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

      {step === "login-email" ? (
        <LoginEmailStep
          initialEmail={email}
          onNext={(value) => {
            setEmail(value);
            go("login-method");
          }}
          onCreateAccount={(value) => {
            setEmail(value);
            go("signup-name");
          }}
        />
      ) : null}

      {step === "login-method" ? (
        <LoginMethodStep
          email={email}
          onSelect={chooseLoginMethod}
          onCreateAccount={() => go("signup-name")}
          onBack={() => go("login-email")}
        />
      ) : null}

      {step === "login-password" ? (
        <LoginPasswordStep
          email={email}
          onSubmit={() => router.push("/dashboard")}
          onForgotPassword={() => router.push("/reset-password")}
          onCreateAccount={() => go("signup-name")}
          onBack={() => go("login-method")}
        />
      ) : null}

      {step === "signup-name" ? (
        <SignupNameStep
          onContinue={() => go("signup-method")}
          onLogin={() => go("login-email")}
          onBack={() => go("login-email")}
        />
      ) : null}

      {step === "signup-method" ? (
        <SignupMethodStep
          onSelect={(method) => {
            /* A password has to be set before the account exists; a passkey is
               created by the ceremony itself, so that path completes here. */
            if (method === "password") {
              go("signup-password");
              return;
            }
            setStep("login-email");
            setNotice(registeredNotice);
          }}
          onLogin={() => go("login-email")}
          onBack={() => go("signup-name")}
        />
      ) : null}

      {step === "signup-password" ? (
        <SignupPasswordStep
          email={email}
          onSubmit={() => {
            setStep("login-email");
            setNotice(registeredNotice);
          }}
          onBack={() => go("signup-method")}
        />
      ) : null}
    </AuthShell>
  );
}
