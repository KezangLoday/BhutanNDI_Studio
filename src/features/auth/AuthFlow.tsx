"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import type { BrandScene } from "@/components/BrandPanel";
import { Toast } from "@/components/Toast";
import { LoginEmailStep } from "./LoginEmailStep";
import { LoginMethodStep } from "./LoginMethodStep";
import { SignupMethodStep } from "./SignupMethodStep";
import { SignupNameStep } from "./SignupNameStep";
import type { AuthMethod, AuthStep } from "./authTypes";

const BRAND_COPY: Record<AuthStep, { scene: BrandScene; title: string; lead: string }> = {
  "login-email": {
    scene: "sign-in",
    title: "Your identity, verified once.",
    lead: "NGOTAG Studio is where issuers manage credentials on the Bhutan National Digital Identity network.",
  },
  "login-method": {
    scene: "passkey",
    title: "Sign in the way that suits you.",
    lead: "A passkey binds your session to this device with your fingerprint, face, or screen lock — no password to remember.",
  },
  "signup-name": {
    scene: "sign-in",
    title: "Set up your issuer account.",
    lead: "Your name identifies you to the organisations you issue and verify credentials for.",
  },
  "signup-method": {
    scene: "passkey",
    title: "Choose how you sign in.",
    lead: "Passkeys are the recommended method — encrypted, phishing-resistant, and portable across your devices.",
  },
};

export function AuthFlow() {
  const [step, setStep] = useState<AuthStep>("login-email");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const handleMethodSelect = (method: AuthMethod) => {
    setToast(`${method === "passkey" ? "Passkey" : "Password"} authentication selected.`);
  };

  const brand = BRAND_COPY[step];

  return (
    <AuthLayout brandScene={brand.scene} brandTitle={brand.title} brandLead={brand.lead}>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}

      {step === "login-email" && (
        <LoginEmailStep
          initialEmail={email}
          onNext={(value) => {
            setEmail(value);
            setStep("login-method");
          }}
          onCreateAccount={() => setStep("signup-name")}
        />
      )}

      {step === "login-method" && (
        <LoginMethodStep
          email={email}
          onSelect={handleMethodSelect}
          onCreateAccount={() => setStep("signup-name")}
          onBack={() => setStep("login-email")}
        />
      )}

      {step === "signup-name" && (
        <SignupNameStep
          onContinue={() => setStep("signup-method")}
          onLogin={() => setStep("login-email")}
          onBack={() => setStep("login-email")}
        />
      )}

      {step === "signup-method" && (
        <SignupMethodStep
          onSelect={(method) => {
            handleMethodSelect(method);
            setToast("Congratulations! You have successfully registered on NGOTAG.");
            setStep("login-email");
          }}
          onLogin={() => setStep("login-email")}
          onBack={() => setStep("signup-name")}
        />
      )}
    </AuthLayout>
  );
}
