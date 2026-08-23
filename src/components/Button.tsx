import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  icon,
  iconPosition = "right",
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = ["ndi-btn", `ndi-btn--${variant}`, fullWidth ? "ndi-btn--full" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {icon && iconPosition === "left" && <span className="ndi-btn__icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="ndi-btn__icon">{icon}</span>}
      {variant === "primary" && <span className="ndi-btn__sweep" aria-hidden="true" />}
    </button>
  );
}
