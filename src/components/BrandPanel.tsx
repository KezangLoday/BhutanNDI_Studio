import { PasskeyScene, SecureSignInScene } from "./illustrations";
import "./BrandPanel.css";

export type BrandScene = "sign-in" | "passkey";

interface BrandPanelProps {
  scene?: BrandScene;
  eyebrow?: string;
  title?: string;
  lead?: string;
}

export function BrandPanel({
  scene = "sign-in",
  eyebrow = "— Bhutan NDI",
  title = "Your identity, verified once.",
  lead = "NGOTAG Studio is where issuers manage credentials on the Bhutan National Digital Identity network.",
}: BrandPanelProps) {
  return (
    <div className="ndi-brand-panel">
      <div className="ndi-brand-panel__grid" aria-hidden="true" />
      <div className="ndi-brand-panel__glow" aria-hidden="true" />

      <div className="ndi-brand-panel__content">
        <div className="ndi-brand-panel__scene">
          {scene === "passkey" ? <PasskeyScene /> : <SecureSignInScene />}
        </div>

        <span className="ndi-eyebrow">{eyebrow}</span>
        <h1 className="ndi-brand-panel__title">{title}</h1>
        <p className="ndi-brand-panel__lead">{lead}</p>

        <div className="ndi-brand-panel__chips">
          <span className="ndi-brand-chip">Verified credentials</span>
          <span className="ndi-brand-chip">End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
