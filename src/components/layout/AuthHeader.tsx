/**
 * The Studio's header: a full-width bar attached to the top edge, separated by
 * a hairline — the original Studio chrome, re-skinned in the NDI palette rather
 * than replaced by the website's floating pill. An app shell reads as a
 * workspace when its chrome is anchored; the pill belongs to a marketing page.
 *
 * The logo is the horizontal NDI Studio lockup, which already carries the
 * product name, so the bar sets no wordmark of its own beside it. A single
 * baseline suits a 64px bar better than the stacked lockup, whose two lines
 * had to shrink to fit and turned mushy at this size.
 */
export function AuthHeader() {
  return (
    <header className="sticky top-0 z-[60] border-b border-subtle bg-[rgba(12,17,27,0.72)] backdrop-blur-[20px] backdrop-saturate-[140%]">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center px-5 min-[641px]:px-8">
        {/* A plain img, not next/image: the asset is a static SVG, which Next
            passes through unoptimised anyway. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/logos/ndi-studio-horizontal.svg"
          alt="NDI Studio"
          width={10718}
          height={1941}
          className="block h-8 w-auto min-[641px]:h-9"
        />
      </div>
    </header>
  );
}
