"use client";

import { FIELD_CLASS } from "./formStyles";
import { Icon } from "./icons";

interface SearchFieldProps {
  placeholder?: string;
  label?: string;
  className?: string;
}

/**
 * The design system's search field: a 16px icon at left:16px and the input
 * padded pl-11 to clear it.
 */
export function SearchField({
  placeholder = "Search",
  label = "Search",
  className = "",
}: SearchFieldProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <span className="pointer-events-none absolute left-4 text-faint">
        <Icon name="search" size={16} strokeWidth={1.8} />
      </span>
      <input type="search" aria-label={label} placeholder={placeholder} className={`${FIELD_CLASS} h-11 pl-11`} />
    </div>
  );
}
