import { useState } from "react";
import { StepHeader } from "../../components/AuthLayout";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { ArrowRightIcon, MailIcon } from "../../components/icons";
import "./auth.css";

interface LoginEmailStepProps {
  initialEmail?: string;
  onNext: (email: string) => void;
  onCreateAccount: () => void;
  onBack?: () => void;
}

export function LoginEmailStep({ initialEmail = "", onNext, onCreateAccount, onBack }: LoginEmailStepProps) {
  const [email, setEmail] = useState(initialEmail);

  return (
    <>
      <StepHeader title="Login" subtitle="Enter your email to login" onBack={onBack} />

      <form
        className="ndi-auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          onNext(email);
        }}
      >
        <TextField
          label="Your Email"
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@company.com"
          icon={<MailIcon />}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className="ndi-auth-actions">
          <button type="button" className="ndi-auth-link" onClick={onCreateAccount}>
            Create an account
          </button>
          <Button type="submit" icon={<ArrowRightIcon />} disabled={!email.trim()}>
            Next
          </Button>
        </div>
      </form>
    </>
  );
}
