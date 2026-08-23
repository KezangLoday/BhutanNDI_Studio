"use client";

import { StepHeader } from "@/components/layout/AuthShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { Icon } from "@/components/ui/icons";

import type { AuthMethod } from "./authTypes";

interface LoginMethodStepProps {
  email: string;
  onSelect: (method: AuthMethod) => void;
  onCreateAccount: () => void;
  onBack: () => void;
}

export function LoginMethodStep({
  email,
  onSelect,
  onCreateAccount,
  onBack,
}: LoginMethodStepProps) {
  return (
    <>
      <StepHeader title="Login" subtitle="Choose authentication method to login" onBack={onBack} />

      <div className="relative z-[4] flex flex-col gap-6">
        <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-grid bg-[var(--ndi-mint-04)] px-4 py-2 text-[13.5px] text-body">
          <Icon name="mail" size={15} strokeWidth={1.8} className="text-accent" />
          {email}
        </span>

        <p className="m-0 text-[14.5px] leading-[1.6] text-body">
          With a <span className="ndi-wave-text ndi-wave-tight font-semibold">passkey</span> you
          don&rsquo;t need to remember complex passwords.
        </p>

        <div className="flex flex-col gap-2.5">
          <GradientButton block onClick={() => onSelect("passkey")}>
            <Icon name="fingerprint" size={17} strokeWidth={1.9} />
            Continue with passkey
          </GradientButton>
          <HairlineButton block onClick={() => onSelect("password")}>
            <Icon name="lockRounded" size={17} strokeWidth={1.8} />
            Use a password
          </HairlineButton>
        </div>

        <button
          type="button"
          onClick={onCreateAccount}
          className="ndi-plainlink self-center text-sm text-accent"
        >
          Create an account
        </button>
      </div>
    </>
  );
}
