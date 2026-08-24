/**
 * Drawn line scenes for the auth rail: one mint hue, 1.7px strokes,
 * geometric, no raster clipart. Each viewBox is cropped tight to its own
 * artwork. Animation classes live in ndi-effects.css.
 */

const STROKE = "var(--accent)";
const STROKE_DIM = "var(--ndi-mint-40)";
const FILL_GLASS = "var(--ndi-mint-08)";

function ScanlineDef() {
  return (
    <defs>
      <linearGradient id="ndiScanline" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="var(--ndi-mint)" stopOpacity="0" />
        <stop offset="50%" stopColor="var(--ndi-mint-bright)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="var(--ndi-mint)" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

/** Sign-in: a credential panel with an identity field and a verified seal. */
export function SecureSignInScene() {
  return (
    <svg
      viewBox="34 30 354 242"
      fill="none"
      className="ndi-scene block h-auto w-full"
      role="img"
      aria-label="A credential panel with an identity record and a verified seal"
    >
      <ScanlineDef />

      <rect x="86" y="42" width="266" height="176" rx="14" stroke={STROKE_DIM} strokeWidth="1.7" />

      <rect
        x="52"
        y="74"
        width="266"
        height="176"
        rx="14"
        fill={FILL_GLASS}
        stroke={STROKE}
        strokeWidth="1.7"
      />
      <path d="M52 108h266" stroke={STROKE} strokeWidth="1.7" />
      <circle cx="72" cy="91" r="3.4" stroke={STROKE} strokeWidth="1.4" />
      <circle cx="86" cy="91" r="3.4" stroke={STROKE} strokeWidth="1.4" />
      <circle cx="100" cy="91" r="3.4" stroke={STROKE} strokeWidth="1.4" />

      <rect x="76" y="130" width="56" height="66" rx="8" stroke={STROKE} strokeWidth="1.7" />
      <circle cx="104" cy="152" r="11" stroke={STROKE} strokeWidth="1.7" />
      <path d="M85 190a19 19 0 0 1 38 0" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />

      <path d="M150 138h140" stroke={STROKE_DIM} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M150 158h104" stroke={STROKE_DIM} strokeWidth="1.7" strokeLinecap="round" />

      <rect x="150" y="176" width="140" height="26" rx="7" stroke={STROKE} strokeWidth="1.7" />
      <rect
        className="ndi-scene__scan"
        x="156"
        y="188"
        width="60"
        height="2"
        rx="1"
        fill="url(#ndiScanline)"
      />

      <rect
        x="76"
        y="212"
        width="82"
        height="24"
        rx="7"
        fill="var(--ndi-mint-12)"
        stroke={STROKE}
        strokeWidth="1.7"
      />
      <path
        d="M104 224h26M124 219l5 5-5 5"
        stroke={STROKE}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g className="ndi-scene__seal">
        <circle cx="322" cy="228" r="34" fill="var(--scene-knockout)" stroke={STROKE} strokeWidth="1.7" />
        <path
          d="M322 204c-6 3-10.5 4.2-10.5 4.2v14c0 8.4 4.5 13 10.5 15.6 6-2.6 10.5-7.2 10.5-15.6v-14S328 207 322 204Z"
          stroke={STROKE}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M317 222.5l3.6 3.6 7-7.4"
          stroke="var(--ndi-mint-bright)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <circle cx="46" cy="60" r="4" stroke={STROKE_DIM} strokeWidth="1.7" />
      <circle cx="376" cy="96" r="4" stroke={STROKE_DIM} strokeWidth="1.7" />
      <path
        d="M46 60h34M376 96h-30"
        stroke={STROKE_DIM}
        strokeWidth="1.7"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Passkey: a device frame holding a fingerprint, with key and sync nodes. */
export function PasskeyScene() {
  return (
    <svg
      viewBox="26 36 366 248"
      fill="none"
      className="ndi-scene block h-auto w-full"
      role="img"
      aria-label="A device scanning a fingerprint, linked to a key and a sync node"
    >
      <ScanlineDef />

      <rect
        x="118"
        y="44"
        width="184"
        height="232"
        rx="22"
        fill={FILL_GLASS}
        stroke={STROKE}
        strokeWidth="1.7"
      />
      <path d="M186 60h48" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />

      <g className="ndi-scene__print">
        <path d="M166 176a44 44 0 0 1 88 0v8" stroke={STROKE_DIM} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M166 176v10" stroke={STROKE_DIM} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M177 176a33 33 0 0 1 66 0v16" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M177 176v16" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M188 176a22 22 0 0 1 44 0v24" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M188 176v24" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M199 176a11 11 0 0 1 22 0v30" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M199 176v30" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M210 165v41" stroke="var(--ndi-mint-bright)" strokeWidth="1.7" strokeLinecap="round" />
      </g>

      <rect
        className="ndi-scene__scan-wide"
        x="154"
        y="170"
        width="112"
        height="2"
        rx="1"
        fill="url(#ndiScanline)"
      />

      <rect x="150" y="220" width="120" height="30" rx="9" stroke={STROKE} strokeWidth="1.7" />
      <circle cx="170" cy="235" r="7" stroke="var(--ndi-mint-bright)" strokeWidth="1.7" />
      <path
        d="M167 235l2.6 2.6 4.4-5"
        stroke="var(--ndi-mint-bright)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M188 235h58" stroke={STROKE_DIM} strokeWidth="1.7" strokeLinecap="round" />

      <g className="ndi-scene__seal">
        <circle cx="62" cy="120" r="28" fill="var(--scene-knockout)" stroke={STROKE} strokeWidth="1.7" />
        <circle cx="56" cy="114" r="7" stroke={STROKE} strokeWidth="1.7" />
        <path d="M61 119l14 14M69 127l5 5M75 121l5 5" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
      </g>

      <g className="ndi-scene__seal">
        <circle cx="356" cy="200" r="28" fill="var(--scene-knockout)" stroke={STROKE} strokeWidth="1.7" />
        <path
          d="M344 205a7 7 0 0 1 1.4-13.8 10 10 0 0 1 19 2.4 6 6 0 0 1-1.4 11.4h-19Z"
          stroke={STROKE}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </g>

      <path
        d="M90 120h28M328 200h-26"
        stroke={STROKE_DIM}
        strokeWidth="1.7"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Password: a lock badge over a masked entry field, on a stack of documents. */
export function PasswordScene() {
  return (
    <svg
      viewBox="26 30 366 250"
      fill="none"
      className="ndi-scene block h-auto w-full"
      role="img"
      aria-label="A password prompt guarding a stack of records"
    >
      <ScanlineDef />

      {/* Records behind */}
      <rect x="46" y="44" width="150" height="106" rx="10" stroke={STROKE_DIM} strokeWidth="1.7" />
      <path d="M64 70h58M64 88h44M64 106h52" stroke={STROKE_DIM} strokeWidth="1.7" strokeLinecap="round" />

      <rect x="228" y="60" width="150" height="106" rx="10" stroke={STROKE_DIM} strokeWidth="1.7" />
      <path d="M246 86h58M246 104h44M246 122h52" stroke={STROKE_DIM} strokeWidth="1.7" strokeLinecap="round" />

      {/* The prompt */}
      <rect
        x="104"
        y="112"
        width="216"
        height="140"
        rx="14"
        fill={FILL_GLASS}
        stroke={STROKE}
        strokeWidth="1.7"
      />

      <g className="ndi-scene__seal">
        <circle cx="212" cy="146" r="26" fill="var(--scene-knockout)" stroke={STROKE} strokeWidth="1.7" />
        <rect x="202" y="143" width="20" height="14" rx="5" stroke={STROKE} strokeWidth="1.7" />
        <path d="M206 143v-3.6a6 6 0 0 1 12 0v3.6" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M212 149v3" stroke="var(--ndi-mint-bright)" strokeWidth="1.7" strokeLinecap="round" />
      </g>

      {/* Masked entry */}
      <rect x="132" y="192" width="160" height="30" rx="8" stroke={STROKE} strokeWidth="1.7" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={150 + i * 18}
          cy={207}
          r="3.4"
          fill="var(--ndi-mint)"
          fillOpacity={i < 4 ? 0.85 : 0.2}
        />
      ))}
      <rect
        className="ndi-scene__scan"
        x="138"
        y="228"
        width="60"
        height="2"
        rx="1"
        fill="url(#ndiScanline)"
      />

      {/* Trace nodes */}
      <circle cx="40" cy="188" r="4" stroke={STROKE_DIM} strokeWidth="1.7" />
      <circle cx="384" cy="204" r="4" stroke={STROKE_DIM} strokeWidth="1.7" />
      <path
        d="M40 188h60M384 204h-58"
        stroke={STROKE_DIM}
        strokeWidth="1.7"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
    </svg>
  );
}
