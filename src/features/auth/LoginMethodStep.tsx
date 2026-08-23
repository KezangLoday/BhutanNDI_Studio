import { StepHeader } from "../../components/AuthLayout";
import { Button } from "../../components/Button";
import { LockIcon, MailIcon, PasskeyIcon } from "../../components/icons";
import type { AuthMethod } from "./authTypes";
import "./auth.css";

interface LoginMethodStepProps {
  email: string;
  onSelect: (method: AuthMethod) => void;
  onCreateAccount: () => void;
  onBack: () => void;
}

export function LoginMethodStep({ email, onSelect, onCreateAccount, onBack }: LoginMethodStepProps) {
  return (
    <>
      <StepHeader title="Login" subtitle="Choose authentication method to Login" onBack={onBack} />

      <div className="ndi-auth-form">
        <span className="ndi-identity-pill">
          <MailIcon />
          {email}
        </span>

        <p className="ndi-method-headline">
          With Passkey you don&rsquo;t need to remember complex passwords
        </p>

        <div className="ndi-method-buttons">
          <Button variant="outline" fullWidth icon={<LockIcon />} iconPosition="left" onClick={() => onSelect("password")}>
            Password
          </Button>
          <Button fullWidth icon={<PasskeyIcon />} iconPosition="left" onClick={() => onSelect("passkey")}>
            Passkey
          </Button>
        </div>

        <button type="button" className="ndi-auth-link ndi-auth-link--centered" onClick={onCreateAccount}>
          Create an account
        </button>
      </div>
    </>
  );
}
