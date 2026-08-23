"use client";

import { StepHeader } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { LockIcon, PasskeyIcon } from "@/components/icons";
import type { AuthMethod } from "./authTypes";
import "./auth.css";

interface SignupMethodStepProps {
  onSelect: (method: AuthMethod) => void;
  onLogin: () => void;
  onBack: () => void;
}

export function SignupMethodStep({ onSelect, onLogin, onBack }: SignupMethodStepProps) {
  return (
    <>
      <StepHeader title="Create account" subtitle="Please choose your authentication method" onBack={onBack} />

      <div className="ndi-auth-form">
        <p className="ndi-method-intro">With Passkey you don&rsquo;t need to remember complex passwords</p>

        <div className="ndi-method-faq">
          <div className="ndi-method-faq__item">
            <h3 className="ndi-method-faq__q">What are passkeys?</h3>
            <p className="ndi-method-faq__a">
              Passkeys are encrypted digital keys you create using fingerprint, face, or screen lock.
            </p>
          </div>
          <div className="ndi-method-faq__item">
            <h3 className="ndi-method-faq__q">Where are passkeys saved?</h3>
            <p className="ndi-method-faq__a">
              Passkeys are saved to your password manager, so you can sign in on other devices.
            </p>
          </div>
        </div>

        <div className="ndi-method-buttons">
          <Button variant="outline" fullWidth icon={<LockIcon />} iconPosition="left" onClick={() => onSelect("password")}>
            Password
          </Button>
          <Button fullWidth icon={<PasskeyIcon />} iconPosition="left" onClick={() => onSelect("passkey")}>
            Passkey
          </Button>
        </div>

        <button type="button" className="ndi-auth-link ndi-auth-link--centered" onClick={onLogin}>
          Login here
        </button>
      </div>
    </>
  );
}
