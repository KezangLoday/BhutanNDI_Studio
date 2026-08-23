"use client";

import type { ReactNode } from "react";
import { BrandPanel } from "./BrandPanel";
import type { BrandScene } from "./BrandPanel";
import "./AuthLayout.css";

interface AuthLayoutProps {
  children: ReactNode;
  brandScene?: BrandScene;
  brandEyebrow?: string;
  brandTitle?: string;
  brandLead?: string;
}

export function AuthLayout({ children, brandScene, brandEyebrow, brandTitle, brandLead }: AuthLayoutProps) {
  return (
    <div className="ndi-auth-shell">
      <header className="ndi-auth-header">
        <div className="ndi-auth-header__brand">
          <span className="ndi-auth-header__logo" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2c-3 1.5-5 2-5 2v6c0 4.5 2 7 5 8 3-1 5-3.5 5-8V4s-2-.5-5-2Z"
                stroke="var(--ndi-mint)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="ndi-auth-header__wordmark">NGOTAG</span>
        </div>
      </header>

      <main className="ndi-auth-grid">
        <BrandPanel scene={brandScene} eyebrow={brandEyebrow} title={brandTitle} lead={brandLead} />
        <section className="ndi-auth-form-panel">
          <div className="ndi-auth-form-panel__inner">{children}</div>
        </section>
      </main>

      <footer className="ndi-auth-footer">
        © 2019 - 2026 Bhutan NDI · All rights reserved.
      </footer>
    </div>
  );
}

interface StepHeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export function StepHeader({ title, subtitle, onBack }: StepHeaderProps) {
  return (
    <div className="ndi-step-header">
      {onBack && (
        <button className="ndi-step-header__back" onClick={onBack} aria-label="Go back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <div className="ndi-step-header__text">
        <h2 className="ndi-step-header__title">{title}</h2>
        <p className="ndi-step-header__subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
