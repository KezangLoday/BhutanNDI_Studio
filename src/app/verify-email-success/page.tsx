import { OutcomeView } from "@/features/marketplace/OutcomeView";

export const metadata = { title: "Email verified — NDI Studio" };

export default function VerifyEmailSuccessPage() {
  return (
    <OutcomeView
      tone="success"
      icon="userCheck"
      title="Your email is verified"
      lead="Thanks — that is the account confirmed. Sign in and set up an organization to start issuing."
      primary={{ label: "Sign in", href: "/sign-in" }}
      secondary={{ label: "Create an account", href: "/sign-up" }}
    />
  );
}
