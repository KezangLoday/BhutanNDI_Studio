"use client";

import { useState } from "react";

import { StepHeader } from "@/components/layout/AuthShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

interface SignupNameStepProps {
  onContinue: (firstName: string, lastName: string) => void;
  onLogin: () => void;
  onBack: () => void;
}

export function SignupNameStep({ onContinue, onLogin, onBack }: SignupNameStepProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <>
      <StepHeader title="Create account" subtitle="Please enter your details" onBack={onBack} />

      <form
        className="relative z-[4] flex flex-col gap-[18px]"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue(firstName, lastName);
        }}
      >
        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>First name</span>
          <input
            name="firstName"
            required
            autoComplete="given-name"
            placeholder="Kezang"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className={`${FIELD_CLASS} h-12`}
          />
        </label>

        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>Last name</span>
          <input
            name="lastName"
            required
            autoComplete="family-name"
            placeholder="Loday"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className={`${FIELD_CLASS} h-12`}
          />
        </label>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <button type="button" onClick={onLogin} className="ndi-plainlink text-sm text-accent">
            Login here
          </button>
          <GradientButton type="submit" disabled={!firstName.trim() || !lastName.trim()}>
            Continue
            <Icon name="arrowRight" size={16} strokeWidth={1.9} className="ndi-sendnudge" />
          </GradientButton>
        </div>
      </form>
    </>
  );
}
