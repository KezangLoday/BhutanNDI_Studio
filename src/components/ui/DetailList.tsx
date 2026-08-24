import type { ReactNode } from "react";

export interface DetailItem {
  label: string;
  value: ReactNode;
  /** DIDs, key material and schema ids — long, and worth reading exactly. */
  mono?: boolean;
}

/**
 * The label/value grid every detail page uses.
 *
 * A description list rather than a table: these are properties of one thing,
 * not rows of comparable things, and a dl keeps that distinction for anyone
 * reading the page with a screen reader. The label column is fixed on wide
 * screens so values line up down the page, and stacks below 641px where a
 * two-column split would leave neither side enough room.
 */
export function DetailList({ items }: { items: DetailItem[] }) {
  return (
    <dl className="relative z-[4] m-0 flex flex-col">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`grid gap-1 py-3.5 min-[641px]:grid-cols-[200px_1fr] min-[641px]:gap-6 ${
            i > 0 ? "border-t border-subtle" : ""
          }`}
        >
          <dt className="text-[13px] leading-[1.5] text-faint">{item.label}</dt>
          <dd
            className={`m-0 break-words text-[14px] leading-[1.6] text-body ${
              item.mono ? "font-mono text-[12.5px]" : ""
            }`}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
