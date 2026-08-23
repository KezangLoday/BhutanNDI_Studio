import Image from "next/image";

/**
 * The floating glass pill from the website's SiteHeader, reduced to what an
 * auth screen needs: the NDI mark, the product wordmark, no nav.
 */
export function AuthHeader() {
  return (
    <header className="fixed left-1/2 top-4 z-[60] flex h-16 w-[calc(100%-28px)] max-w-[1136px] -translate-x-1/2 items-center py-2.5 pl-[18px] pr-3 min-[901px]:top-6 min-[901px]:w-[calc(100%-64px)] min-[901px]:pl-[26px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl border border-white/[0.08]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)), rgba(18,24,37,0.80)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 34px -12px rgba(0,0,0,0.5)",
        }}
      />

      <div className="relative z-[1] flex items-center gap-3">
        <Image
          src="/media/logos/ndi-mark.png"
          alt="Bhutan NDI"
          width={400}
          height={363}
          sizes="34px"
          priority
          className="block h-[34px] w-auto"
        />
        <span
          aria-hidden="true"
          className="h-5 w-px bg-[var(--border-subtle)]"
        />
        <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-strong">
          NGOTAG Studio
        </span>
      </div>
    </header>
  );
}
