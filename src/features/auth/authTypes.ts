/**
 * Two flows, three cards. Passkeys were removed from the product, which took
 * the "how do you want to sign in" step out of both.
 */
export type AuthStep = "login" | "signup-email" | "signup-details";
