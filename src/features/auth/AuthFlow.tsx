"use client";

import { useState, type ReactNode } from "react";

import { AuthShell } from "@/components/layout/AuthShell";
import { Icon } from "@/components/ui/icons";
import { PasskeyScene, SecureSignInScene } from "@/components/ui/scenes";

import { LoginEmailStep } from "./LoginEmailStep";
import { LoginMethodStep } from "./LoginMethodStep";
import { SignupMethodStep } from "./SignupMethodStep";
import { SignupNameStep } from "./SignupNameStep";
import type { AuthMethod, AuthStep } from "./authTypes";

const RAIL: Record<AuthStep, { scene: ReactNode; title: ReactNode; lead: string }> = {
  "login-email": {
    scene: <SecureSignInScene />,
    title: (
      <>
        Your identity, <span className="ndi-wave-text">verified once</span>.
      </>
    ),
    lead: "NGOTAG Studio is where issuers manage credentials on the Bhutan National Digital Identity network.",
  },
  "login-method": {
    scene: <PasskeyScene />,
    title: (
      <>
        Sign in <span className="ndi-wave-text">without a password</span>.
      </>
    ),
    lead: "A passkey binds your session to this device with your fingerprint, face, or screen lock — nothing to remember, nothing to phish.",
  },
  "signup-name": {
    scene: <SecureSignInScene />,
    title: (
      <>
        Set up your <span className="ndi-wave-text">issuer account</span>.
      </>
    ),
    lead: "Your name identifies you to the organisations you issue and verify credentials for.",
  },
  "signup-method": {
    scene: <PasskeyScene />,
    title: (
      <>
        Choose how you <span className="ndi-wave-text">sign in</span>.
      </>
    ),
    lead: "Passkeys are the recommended method — encrypted, phishing-resistant, and portable across your devices.",
  },
};

export function AuthFlow() {
  const [step, setStep] = useState<AuthStep>("login-email");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const chooseMethod = (method: AuthMethod) => {
    setNotice(
      method === "passkey"
        ? "Passkey selected — this is a design build, so no credential was created."
        : "Password selected — this is a design build, so nothing was submitted.",
    );
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
            setNotice(null);
            setStep("login-method");
          }}
          onCreateAccount={() => {
            setNotice(null);
            setStep("signup-name");
          }}
        />
      ) : null}

      {step === "login-method" ? (
        <LoginMethodStep
          email={email}
          onSelect={chooseMethod}
          onCreateAccount={() => {
            setNotice(null);
            setStep("signup-name");
          }}
          onBack={() => {
            setNotice(null);
            setStep("login-email");
          }}
        />
      ) : null}

      {step === "signup-name" ? (
        <SignupNameStep
          onContinue={() => {
            setNotice(null);
            setStep("signup-method");
          }}
          onLogin={() => {
            setNotice(null);
            setStep("login-email");
          }}
          onBack={() => {
            setNotice(null);
            setStep("login-email");
          }}
        />
      ) : null}

      {step === "signup-method" ? (
        <SignupMethodStep
          onSelect={(method) => {
            chooseMethod(method);
            setNotice("Congratulations — your NGOTAG account is registered. Sign in to continue.");
            setStep("login-email");
          }}
          onLogin={() => {
            setNotice(null);
            setStep("login-email");
          }}
          onBack={() => {
            setNotice(null);
            setStep("signup-name");
          }}
        />
      ) : null}
    </AuthShell>
  );
}
