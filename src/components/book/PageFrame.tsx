import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Standard printed page: running head, text block and folio. Verso/recto styling comes from the
 * `data-side` attribute the book puts on each face (`group/face`).
 */
export default function PageFrame({
  folio,
  running,
  children,
  className,
  tint,
  opener = false,
}: {
  folio?: number;
  /** running head shown on right-hand pages (left-hand pages show the author) */
  running?: string;
  children: ReactNode;
  className?: string;
  /** the chapter's pastel colour: a faint wash on every page, a stronger one on chapter openers */
  tint?: string;
  opener?: boolean;
}) {
  return (
    <div className="absolute inset-0 flex flex-col px-[8.5cqw] pb-[9cqw] pt-[6.5cqw] font-book text-ink">
      {tint && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: opener
              ? `linear-gradient(180deg, ${tint} 0%, ${tint} 42%, transparent 78%)`
              : `linear-gradient(180deg, ${tint} 0%, transparent 22%)`,
            opacity: opener ? 0.9 : 0.7,
          }}
        />
      )}
      {running && (
        <header className="relative flex items-center justify-between border-b border-line pb-[2.2cqw] t-cap text-dim">
          <span className="hidden group-data-[side=left]/face:inline">Mit Ramavat</span>
          <span className="hidden group-data-[side=left]/face:inline">Portfolio · MMXXVI</span>
          <span className="group-data-[side=left]/face:hidden">{running}</span>
          <span className="group-data-[side=left]/face:hidden">AI / ML Engineer</span>
        </header>
      )}
      <div className={cn("relative flex min-h-0 flex-1 flex-col", running && "pt-[5.5cqw]", className)}>{children}</div>
      {folio !== undefined && (
        <p className="absolute bottom-[4.6cqw] right-[8.5cqw] font-serif text-[calc(2.6cqw*var(--k,1))] italic text-muted group-data-[side=left]/face:left-[8.5cqw] group-data-[side=left]/face:right-auto">
          {folio}
        </p>
      )}
    </div>
  );
}

/** Large chapter opener: roman numeral, rule and title. */
export function ChapterHead({ numeral, title, kicker }: { numeral: string; title: string; kicker?: string }) {
  return (
    <div>
      <p className="t-cap text-accent">{kicker ?? "Chapter"}</p>
      <div className="mt-[2cqw] flex items-end gap-[3cqw]">
        <span className="font-serif t-h1 italic text-accent">{numeral}.</span>
        <span className="mb-[2.4cqw] h-px flex-1 bg-line-strong" />
      </div>
      <h2 className="mt-[2.5cqw] font-serif t-h2 tracking-[-0.02em]">{title}</h2>
    </div>
  );
}

/** Figure caption in the classic "Fig. n —" style. */
export function Caption({ n, children }: { n: number; children: ReactNode }) {
  return (
    <p className="mt-[2cqw] t-sm italic text-muted">
      <span className="not-italic t-cap text-dim">Fig. {n} — </span>
      {children}
    </p>
  );
}
