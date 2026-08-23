import Image from "next/image";

/**
 * The Studio's header: a full-width bar attached to the top edge, separated by
 * a hairline — the original Studio chrome, re-skinned in the NDI palette rather
 * than replaced by the website's floating pill. An app shell reads as a
 * workspace when its chrome is anchored; the pill belongs to a marketing page.
 */
export function AuthHeader() {
  return (
    <header className="sticky top-0 z-[60] border-b border-subtle bg-[rgba(12,17,27,0.72)] backdrop-blur-[20px] backdrop-saturate-[140%]">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-3 px-5 min-[641px]:px-8">
        <Image
          src="/media/logos/ndi-mark-mint.png"
          alt="Bhutan NDI"
          width={2496}
          height={2436}
          sizes="34px"
          priority
          className="block h-[34px] w-auto"
        />
        <span aria-hidden="true" className="h-5 w-px bg-[var(--border-subtle)]" />
        <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-strong">
          NGOTAG Studio
        </span>
      </div>
    </header>
  );
}
