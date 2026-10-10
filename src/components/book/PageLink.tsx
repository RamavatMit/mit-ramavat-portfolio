"use client";

import type { ReactNode } from "react";
import { useBook } from "./context";

/** Turns the book to another page (used by the table of contents and cross-references). */
export default function PageLink({
  to,
  children,
  className,
  label,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const book = useBook();
  return (
    <button type="button" onClick={() => book?.goTo(to)} className={className} aria-label={label}>
      {children}
    </button>
  );
}
