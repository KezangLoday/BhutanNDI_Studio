export type AuthStep =
  | "login-email"
  | "login-method"
  | "login-password"
  | "signup-name"
  | "signup-method";

export type AuthMethod = "password" | "passkey";
