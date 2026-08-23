"use client";

import "./Toast.css";

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  return (
    <div className="ndi-toast" role="status">
      <span className="ndi-toast__dot" aria-hidden="true" />
      <p className="ndi-toast__text">{message}</p>
      <button className="ndi-toast__close" onClick={onDismiss} aria-label="Dismiss notification">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
