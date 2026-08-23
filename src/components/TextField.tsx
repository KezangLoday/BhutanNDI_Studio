import type { InputHTMLAttributes, ReactNode } from "react";
import "./TextField.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  icon?: ReactNode;
  helperText?: string;
}

export function TextField({ label, required, icon, helperText, id, ...rest }: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="ndi-field-group">
      <label htmlFor={fieldId} className="ndi-field-label">
        {label}
        {required && <span className="ndi-field-required"> *</span>}
      </label>
      <div className="ndi-field-wrap">
        {icon && <span className="ndi-field-icon">{icon}</span>}
        <input id={fieldId} className={`ndi-field ${icon ? "ndi-field--with-icon" : ""}`} {...rest} />
      </div>
      {helperText && <p className="ndi-field-helper">{helperText}</p>}
    </div>
  );
}
