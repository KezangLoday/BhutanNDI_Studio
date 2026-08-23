/**
 * The page ground. Ported from the website's Atmosphere: the fixed
 * --grad-depth base plus the ambient mint/teal edge pools that alternate
 * down the viewport.
 */
export function Atmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "var(--grad-depth)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 62% 13% at -4% 1%, rgba(90,201,148,0.15) 0%, rgba(90,201,148,0.055) 36%, transparent 74%)",
            "radial-gradient(ellipse 58% 12% at 104% 15%, rgba(18,65,67,0.4) 0%, rgba(18,65,67,0.13) 38%, transparent 76%)",
            "radial-gradient(ellipse 60% 12% at -6% 36%, rgba(90,201,148,0.1) 0%, rgba(90,201,148,0.04) 36%, transparent 74%)",
            "radial-gradient(ellipse 58% 11% at 106% 56%, rgba(18,65,67,0.32) 0%, rgba(18,65,67,0.11) 38%, transparent 76%)",
            "radial-gradient(ellipse 60% 12% at -4% 76%, rgba(90,201,148,0.09) 0%, rgba(90,201,148,0.035) 36%, transparent 74%)",
            "radial-gradient(ellipse 58% 11% at 104% 95%, rgba(18,65,67,0.28) 0%, rgba(18,65,67,0.09) 38%, transparent 76%)",
          ].join(", "),
        }}
      />
    </>
  );
}
