export type AuthStep =
  | "login-email"
  | "login-method"
  | "login-password"
  | "signup-name"
  | "signup-method"
  | "signup-password";

export type AuthMethod = "password" | "passkey";
