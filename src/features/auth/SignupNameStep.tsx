import { useState } from "react";
import { StepHeader } from "../../components/AuthLayout";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { ArrowRightIcon } from "../../components/icons";
import "./auth.css";

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
        className="ndi-auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue(firstName, lastName);
        }}
      >
        <TextField
          label="First name"
          required
          name="firstName"
          autoComplete="given-name"
          placeholder="Kezang"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          label="Last name"
          required
          name="lastName"
          autoComplete="family-name"
          placeholder="Loday"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <div className="ndi-auth-actions">
          <button type="button" className="ndi-auth-link" onClick={onLogin}>
            Login here
          </button>
          <Button type="submit" icon={<ArrowRightIcon />} disabled={!firstName.trim() || !lastName.trim()}>
            Continue
          </Button>
        </div>
      </form>
    </>
  );
}
