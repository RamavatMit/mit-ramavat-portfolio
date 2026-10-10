"use client";

import {
  AnimatePresence,
  animate,
  motion,
  motionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { BookContext, PageVisibleContext } from "./context";
import { computeCurl, constrain, gradientFrom, polygon } from "./curl";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export type BookPage = {
  id: string;
  node: ReactNode;
  /** endpapers and other pages that only make sense in a two-page spread */
  spreadOnly?: boolean;
};

export type BookChapter = {
  id: string;
  label: string;
  numeral: string;
  pageId: string;
  /** soft background tint for the chapter tab */
  tint?: string;
};

type Leaf = { front: BookPage; back: BookPage | null };

/** Per-leaf state: where the leaf's outer corner is, normalised to the page, and which corner is held. */
type LeafMotion = { u: MotionValue<number>; v: MotionValue<number>; c: MotionValue<number> };

const SPREAD_QUERY = "(min-width: 900px) and (min-aspect-ratio: 1/1)";
const TURN_EASE = [0.55, 0.05, 0.3, 1] as const;
const TURN_DURATION = 1.05;
/** how far the corner rises during an automatic turn, as a share of page height */
const LIFT = 0.17;
const NO_FLIP = "a,button,input,textarea,select,label,[data-no-flip]";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const atRest = (u: number) => u >= 0.9995 || u <= -0.9995;

function subscribeSpread(cb: () => void) {
  const m = window.matchMedia(SPREAD_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

/** true = two-page spread, false = single page, null = not yet known (server / hydration). */
function useSpreadMode() {
  return useSyncExternalStore<boolean | null>(
    subscribeSpread,
    () => window.matchMedia(SPREAD_QUERY).matches,
    () => null
  );
}

export default function Book({ pages, chapters }: { pages: BookPage[]; chapters: BookChapter[] }) {
  const spreadMode = useSpreadMode();
  const ready = spreadMode !== null;
  const spread = spreadMode ?? true;
  const reduce = useReducedMotion() ?? false;

  const shown = useMemo(() => (spread ? pages : pages.filter((p) => !p.spreadOnly)), [pages, spread]);
  const leaves = useMemo<Leaf[]>(() => {
    if (!spread) return shown.map((p) => ({ front: p, back: null }));
    const out: Leaf[] = [];
    for (let i = 0; i < shown.length; i += 2) out.push({ front: shown[i], back: shown[i + 1] ?? null });
    return out;
  }, [shown, spread]);
  const L = leaves.length;
  /** furthest the reader can turn: past the back cover in a spread, onto the last page when single */
  const MAX = spread ? L : L - 1;

  const motions = useMemo<LeafMotion[]>(
    () => leaves.map(() => ({ u: motionValue(1), v: motionValue(1), c: motionValue(1) })),
    [leaves]
  );
  const restU = useMemo(() => motionValue(1), []);

  // page size in px, for the curl geometry
  const bookRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ pw: 0, ph: 0 });
  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      setSize({ pw: spread ? w / 2 : w, ph: h });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [spread]);

  // number of leaves lying on the left-hand side
  const [turned, setTurned] = useState(0);
  const turnedRef = useRef(0);
  const focusIdRef = useRef<string | null>(null);
  const [range, setRange] = useState<[number, number] | null>(null);

  const focusIndex = useCallback(
    (t: number) => (spread ? (2 * t < shown.length ? 2 * t : 2 * t - 1) : t),
    [spread, shown.length]
  );

  const commit = useCallback(
    (t: number) => {
      turnedRef.current = t;
      focusIdRef.current = shown[focusIndex(t)]?.id ?? null;
      setTurned(t);
    },
    [shown, focusIndex]
  );

  const indexOfPage = useCallback(
    (pageId: string) => {
      const i = shown.findIndex((p) => p.id === pageId);
      if (i >= 0) return i;
      const gi = pages.findIndex((p) => p.id === pageId);
      const j = shown.findIndex((p) => pages.indexOf(p) > gi);
      return j < 0 ? shown.length - 1 : j;
    },
    [shown, pages]
  );

  const turnedFor = useCallback(
    (pageIndex: number) => clamp(spread ? Math.ceil(pageIndex / 2) : pageIndex, 0, MAX),
    [spread, MAX]
  );

  // (Re)build leaf positions whenever the layout changes; on first run honour the URL hash.
  const initialised = useRef(false);
  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;
      const ch = chapters.find((c) => `#${c.id}` === window.location.hash);
      if (ch) focusIdRef.current = ch.pageId;
    }
    const t = focusIdRef.current ? turnedFor(indexOfPage(focusIdRef.current)) : 0;
    motions.forEach((m, i) => {
      m.u.set(i < t ? -1 : 1);
      m.v.set(1);
      m.c.set(1);
    });
    commit(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when the leaf set itself changes
  }, [motions]);

  /** Turn one leaf all the way over: the bottom corner lifts, sweeps across in an arc and lays down. */
  const flip = useCallback(
    (i: number, toLeft: boolean, duration = TURN_DURATION, delay = 0) => {
      const m = motions[i];
      if (!m) return Promise.resolve();
      if (atRest(m.u.get())) m.c.set(1);
      const cy = m.c.get();
      const lift = cy === 1 ? cy - LIFT : cy + LIFT;
      const d = reduce ? 0 : duration;
      const dl = reduce ? 0 : delay;
      const run = animate(m.u, toLeft ? -1 : 1, { duration: d, delay: dl, ease: TURN_EASE });
      animate(m.v, [m.v.get(), lift, cy], { duration: d, delay: dl, ease: "easeInOut", times: [0, 0.5, 1] });
      return new Promise<void>((resolve) => run.then(() => resolve()));
    },
    [motions, reduce]
  );

  /** the leaf whose corner is curled up by a hover, so it can always be laid flat again */
  const peeked = useRef<{ i: number; flatU: number } | null>(null);
  const releasePeek = useCallback(
    (except = -1) => {
      const pk = peeked.current;
      peeked.current = null;
      if (!pk || pk.i === except) return;
      const m = motions[pk.i];
      if (!m) return;
      const ease = [0.22, 1, 0.36, 1] as const;
      animate(m.u, pk.flatU, { duration: 0.35, ease });
      animate(m.v, 1, { duration: 0.35, ease });
    },
    [motions]
  );

  const next = useCallback(() => {
    const t = turnedRef.current;
    if (t >= MAX) return;
    releasePeek(t);
    commit(t + 1);
    flip(t, true);
  }, [MAX, commit, flip, releasePeek]);

  const prev = useCallback(() => {
    const t = turnedRef.current;
    if (t <= 0) return;
    releasePeek(t - 1);
    commit(t - 1);
    flip(t - 1, false);
  }, [commit, flip, releasePeek]);

  /** Jump several leaves at once: the pages riffle over in a quick cascade. */
  const goToTurned = useCallback(
    (target: number) => {
      const t = turnedRef.current;
      target = clamp(target, 0, MAX);
      if (target === t) return;
      const n = Math.abs(target - t);
      if (n === 1) return target > t ? next() : prev();
      releasePeek();
      const duration = Math.max(0.6, 1 - n * 0.04);
      const stagger = Math.min(0.11, 0.8 / n);
      setRange([Math.min(t, target), Math.max(t, target)]);
      commit(target);
      const runs: Promise<void>[] = [];
      if (target > t) for (let k = t; k < target; k++) runs.push(flip(k, true, duration, (k - t) * stagger));
      else for (let k = t - 1; k >= target; k--) runs.push(flip(k, false, duration, (t - 1 - k) * stagger));
      Promise.all(runs).then(() => setRange(null));
    },
    [MAX, commit, flip, next, prev, releasePeek]
  );

  const goTo = useCallback(
    (pageId: string) => goToTurned(turnedFor(indexOfPage(pageId))),
    [goToTurned, turnedFor, indexOfPage]
  );

  const api = useMemo(() => ({ goTo, next, prev }), [goTo, next, prev]);

  // ---------- current chapter, hash sync ----------
  const fIndex = focusIndex(turned);
  const currentChapter = useMemo(() => {
    let found: BookChapter | null = null;
    for (const c of chapters) if (indexOfPage(c.pageId) <= fIndex) found = c;
    return turned === 0 ? null : found;
  }, [chapters, indexOfPage, fIndex, turned]);

  useEffect(() => {
    if (!ready) return;
    const hash = currentChapter ? `#${currentChapter.id}` : "";
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash || window.location.pathname);
    }
  }, [currentChapter, ready]);

  useEffect(() => {
    const onHash = () => {
      const ch = chapters.find((c) => `#${c.id}` === window.location.hash);
      if (ch) goTo(ch.pageId);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [chapters, goTo]);

  // ---------- keyboard + scroll ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToTurned(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToTurned(MAX);
      }
    };

    // One page per scroll gesture: a mouse-wheel notch or a trackpad swipe turns exactly one page,
    // and the trackpad's momentum tail is swallowed instead of flicking through the whole book.
    let acc = 0;
    let lockUntil = 0;
    let lastMag = 0;
    let lastTime = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest("textarea")) return;
      e.preventDefault();
      const now = performance.now();
      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const delta = e.deltaMode === 1 ? raw * 33 : e.deltaMode === 2 ? raw * 400 : raw;
      const mag = Math.abs(delta);
      // a trackpad's inertia tail arrives as a fast stream of shrinking deltas: ignore it, but let a
      // fresh push (or every notch of a mouse wheel) through as soon as the turn has started
      const momentum = now - lastTime < 60 && mag < lastMag * 0.96;
      lastMag = mag;
      lastTime = now;
      if (now < lockUntil || momentum) return;
      acc += delta;
      clearTimeout(idle);
      idle = setTimeout(() => (acc = 0), 180);
      if (Math.abs(acc) >= 24) {
        if (acc > 0) next();
        else prev();
        acc = 0;
        lockUntil = now + 340;
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      clearTimeout(idle);
    };
  }, [next, prev, goToTurned, MAX]);

  // ---------- drag the paper ----------
  const drag = useRef<{
    id: number;
    sx: number;
    sy: number;
    half: "l" | "r";
    pw: number;
    ph: number;
    corner: number;
    leaf: number;
    dir: 1 | -1;
    baseU: number;
    active: boolean;
  } | null>(null);
  /** set when a gesture became a drag, so the click that follows it is ignored */
  const dragged = useRef(false);
  const tapCorner = (go: () => void) => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    go();
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !bookRef.current) return;
    const el = e.target as HTMLElement;
    // the page corners are buttons, but they are also the natural place to grab a page
    if (el.closest(NO_FLIP) && !el.closest("[data-corner]")) return;
    dragged.current = false;
    const box = bookRef.current.getBoundingClientRect();
    const pw = spread ? box.width / 2 : box.width;
    drag.current = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      half: e.clientX > box.left + box.width / 2 ? "r" : "l",
      pw,
      ph: box.height,
      corner: e.clientY - box.top < box.height / 2 ? 0 : 1,
      leaf: -1,
      dir: 1,
      baseU: 1,
      active: false,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.sx;
    if (!d.active) {
      if (Math.abs(dx) < 6) return;
      const t = turnedRef.current;
      const dir: 1 | -1 = spread ? (d.half === "r" ? 1 : -1) : dx < 0 ? 1 : -1;
      if ((dir === 1 && (dx > 0 || t >= MAX)) || (dir === -1 && (dx < 0 || t <= 0))) {
        drag.current = null;
        return;
      }
      d.dir = dir;
      d.leaf = dir === 1 ? t : t - 1;
      d.active = true;
      dragged.current = true;
      releasePeek(d.leaf);
      const m = motions[d.leaf];
      m.u.stop();
      m.v.stop();
      m.c.set(d.corner);
      d.baseU = dir === 1 ? Math.max(m.u.get(), 0.85) : Math.min(m.u.get(), -0.85);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const m = motions[d.leaf];
    const gain = spread ? 1 : 1.4;
    const rawU = d.baseU + (dx / d.pw) * gain;
    const rawV = d.corner + (e.clientY - d.sy) / d.ph;
    const p = constrain({ x: rawU * d.pw, y: rawV * d.ph }, d.corner * d.ph, d.pw, d.ph);
    m.u.set(clamp(p.x / d.pw, -0.999, 0.999));
    m.v.set(p.y / d.ph);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.active || d.id !== e.pointerId) return;
    const m = motions[d.leaf];
    const u = m.u.get();
    const travel = d.dir === 1 ? (1 - u) / 2 : (u + 1) / 2;
    const complete = travel > 0.18;
    const toLeft = d.dir === 1 ? complete : !complete;
    const remaining = toLeft ? (u + 1) / 2 : (1 - u) / 2;
    const duration = reduce ? 0 : 0.3 + 0.6 * remaining;
    if (complete) commit(d.dir === 1 ? d.leaf + 1 : d.leaf);
    animate(m.u, toLeft ? -1 : 1, { duration, ease: [0.22, 1, 0.36, 1] });
    animate(m.v, m.c.get(), { duration, ease: [0.22, 1, 0.36, 1] });
  };

  // ---------- dog-ear: hovering a corner lifts it ----------
  const peek = (side: "r" | "l", on: boolean) => {
    if (drag.current?.active || reduce) return;
    if (!on) return releasePeek();
    const t = turnedRef.current;
    const i = side === "r" ? t : t - 1;
    const m = motions[i];
    if (!m) return;
    const flatU = side === "r" ? 1 : -1;
    // only lift a page that is lying perfectly flat (never one that is mid-turn)
    if (Math.abs(m.u.get() - flatU) > 0.001) return;
    releasePeek();
    peeked.current = { i, flatU };
    const ease = [0.22, 1, 0.36, 1] as const;
    m.c.set(1);
    animate(m.u, side === "r" ? 0.86 : -0.86, { duration: 0.5, ease });
    animate(m.v, 0.9, { duration: 0.5, ease });
  };

  // ---------- closed-book tilt ----------
  const closed = turned === 0 || (spread && turned === MAX);
  const tiltX = useSpring(0, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 });
  useEffect(() => {
    if (!closed || reduce || !window.matchMedia("(pointer: fine)").matches) {
      tiltX.set(0);
      tiltY.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      tiltY.set(((e.clientX / window.innerWidth) * 2 - 1) * 7);
      tiltX.set(-((e.clientY / window.innerHeight) * 2 - 1) * 5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [closed, reduce, tiltX, tiltY]);

  // the closed book sits centred; it glides into place as the cover opens / the back closes
  const firstU = motions[0]?.u ?? restU;
  const lastU = motions[L - 1]?.u ?? restU;
  const bookX = useMotionValue("0%");
  const leftBase = useMotionValue(0);
  const rightBase = useMotionValue(1);
  useEffect(() => {
    const update = () => {
      const a = (1 - firstU.get()) / 2;
      const b = (1 - lastU.get()) / 2;
      bookX.set(spread ? `${-25 * (1 - a) + 25 * b}%` : "0%");
      leftBase.set(clamp((a - 0.4) / 0.2, 0, 1));
      rightBase.set(1 - clamp((b - 0.4) / 0.2, 0, 1));
    };
    update();
    const offA = firstU.on("change", update);
    const offB = lastU.on("change", update);
    return () => {
      offA();
      offB();
    };
  }, [firstU, lastU, spread, bookX, leftBase, rightBase]);

  // ---------- render ----------
  // single-page mode: turned pages leave the book entirely, so only keep the ones in motion
  const lo = spread ? Math.min(turned, range?.[0] ?? turned) - 2 : turned;
  const hi = Math.max(turned, range?.[1] ?? turned) + 1;
  const folio = (i: number) => (i < 0 ? null : pages.indexOf(shown[i]));
  const leftFolio = spread ? folio(2 * turned - 1) : null;
  const rightFolio = spread ? (2 * turned < shown.length ? folio(2 * turned) : null) : folio(turned);
  const lastFolio = pages.length - 1;
  const pageLabel =
    turned === 0
      ? "Cover"
      : spread && turned === MAX
        ? "Back cover"
        : spread && leftFolio !== null && rightFolio !== null
          ? `pp. ${leftFolio}–${rightFolio}`
          : `p. ${rightFolio ?? leftFolio}`;

  return (
    <BookContext.Provider value={api}>
      <div className="book-root relative flex h-svh flex-col overflow-hidden bg-bg text-ink">
        {/* soft desk light and a few colour washes */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgb(255_255_255/0.85),transparent_72%)]" />
          <div className="absolute -left-[10%] -top-[20%] h-[60%] w-[45%] rounded-full bg-[#f6dcd2]/60 blur-[90px]" />
          <div className="absolute -bottom-[25%] -right-[8%] h-[60%] w-[45%] rounded-full bg-[#d9e6f2]/70 blur-[90px]" />
          <div className="absolute -bottom-[30%] left-[20%] h-[45%] w-[35%] rounded-full bg-[#e2ecd9]/60 blur-[90px]" />
        </div>

        {/* top bar */}
        <header className="relative z-20 flex h-16 shrink-0 items-center justify-between px-4 sm:px-8">
          <button
            type="button"
            onClick={() => goToTurned(0)}
            className="group flex items-center gap-3"
            aria-label="Back to the cover"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-paper font-serif text-sm italic transition-colors group-hover:bg-ink group-hover:text-paper">
              M
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
          </button>

          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentChapter?.id ?? "cover"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="label-mono text-muted"
              >
                {currentChapter ? `Chapter ${currentChapter.numeral} — ${currentChapter.label}` : "A portfolio in five chapters"}
              </motion.p>
            </AnimatePresence>
          </div>

          <nav className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo("contents")}
              className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Contents
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-line-strong bg-paper/80 px-4 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              Resume
            </a>
          </nav>
        </header>

        {/* stage */}
        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
          <button
            type="button"
            onClick={prev}
            disabled={turned === 0}
            aria-label="Previous page"
            className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper/80 text-lg backdrop-blur transition-all hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-0 lg:left-8 min-[900px]:flex"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            disabled={turned === MAX}
            aria-label="Next page"
            className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper/80 text-lg backdrop-blur transition-all hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-0 lg:right-8 min-[900px]:flex"
          >
            →
          </button>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative [perspective:1800px]"
          >
            <motion.div style={{ rotateX: tiltX, rotateY: tiltY }}>
              <motion.div
                ref={bookRef}
                role="region"
                aria-roledescription="book"
                aria-label={`${profile.name} — portfolio`}
                style={{ x: bookX }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className={cn(
                  "relative touch-none select-none [&_input]:select-text [&_textarea]:select-text",
                  spread ? "h-[var(--ph)] w-[calc(var(--pw)*2)]" : "h-[var(--ph)] w-[var(--pw)]"
                )}
              >
                {/* book block: shadows + page-stack edges */}
                {spread ? (
                  <>
                    <motion.div style={{ opacity: leftBase }} className="absolute inset-y-0 left-0 w-1/2">
                      <StackEdges side="l" count={Math.min(5, turned)} />
                    </motion.div>
                    <motion.div style={{ opacity: rightBase }} className="absolute inset-y-0 right-0 w-1/2">
                      <StackEdges side="r" count={Math.min(5, L - turned)} />
                    </motion.div>
                    {/* bookmark ribbon peeking out under the spine */}
                    <motion.div
                      aria-hidden
                      style={{ opacity: leftBase }}
                      className="absolute -bottom-9 left-[calc(50%+18px)] h-14 w-3 bg-accent [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0">
                    <StackEdges side="r" count={Math.min(4, MAX - turned)} />
                  </div>
                )}

                {leaves.map((leaf, i) => (
                  <LeafView
                    key={`${spread ? "s" : "p"}-${leaf.front.id}`}
                    index={i}
                    total={L}
                    leaf={leaf}
                    spread={spread}
                    motion={motions[i]}
                    size={size}
                    near={i >= lo && i <= hi}
                    frontUp={i === turned}
                    backUp={spread && i === turned - 1}
                  />
                ))}

                {/* corner hot-spots: hover to lift the page, click or drag to turn */}
                {turned < MAX && (
                  <button
                    type="button"
                    aria-label="Turn to the next page"
                    data-corner
                    onClick={() => tapCorner(next)}
                    onPointerEnter={() => peek("r", true)}
                    onPointerLeave={() => peek("r", false)}
                    className="group absolute bottom-0 right-0 z-[3000] h-[calc(var(--pw)*0.075)] w-[calc(var(--pw)*0.075)] cursor-grab active:cursor-grabbing"
                  />
                )}
                {spread && turned > 0 && (
                  <button
                    type="button"
                    aria-label="Turn to the previous page"
                    data-corner
                    onClick={() => tapCorner(prev)}
                    onPointerEnter={() => peek("l", true)}
                    onPointerLeave={() => peek("l", false)}
                    className="group absolute bottom-0 left-0 z-[3000] h-[calc(var(--pw)*0.075)] w-[calc(var(--pw)*0.075)] cursor-grab active:cursor-grabbing"
                  />
                )}
              </motion.div>
            </motion.div>

            {/* open hint under the closed cover */}
            <AnimatePresence>
              {ready && turned === 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 1.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="pointer-events-none absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap label-mono text-muted"
                >
                  Scroll, press → or drag the corner to open
                  <span className="inline-block animate-nudge">→</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* bottom bar */}
        <footer className="relative z-20 shrink-0">
          <div className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-8">
            <button
              type="button"
              onClick={prev}
              disabled={turned === 0}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-paper/80 transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 min-[900px]:hidden"
              aria-label="Previous page"
            >
              ←
            </button>

            <ol className="hidden items-center gap-1.5 md:flex">
              {chapters.map((c) => {
                const active = currentChapter?.id === c.id;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => goTo(c.pageId)}
                      className={cn(
                        "flex items-baseline gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300",
                        active
                          ? "border-line-strong text-ink shadow-[0_1px_2px_rgb(90_65_30/0.12)]"
                          : "border-transparent text-muted hover:text-ink"
                      )}
                      style={{ backgroundColor: active ? c.tint : undefined }}
                    >
                      <span className="font-serif italic text-accent">{c.numeral}</span>
                      {c.label}
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="flex flex-1 items-center gap-4 md:max-w-xs md:flex-none">
              <span className="label-mono whitespace-nowrap text-muted" aria-hidden>
                {pageLabel}
                <span className="text-dim"> / {lastFolio}</span>
              </span>
              <span className="relative h-px flex-1 bg-line-strong">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-accent"
                  animate={{ width: `${(turned / MAX) * 100}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </div>

            <button
              type="button"
              onClick={next}
              disabled={turned === MAX}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-paper/80 transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 min-[900px]:hidden"
              aria-label="Next page"
            >
              →
            </button>
          </div>
        </footer>

        <p className="sr-only" aria-live="polite">
          {pageLabel}
          {currentChapter ? ` — ${currentChapter.label}` : ""}
        </p>
      </div>
    </BookContext.Provider>
  );
}

function StackEdges({ side, count }: { side: "l" | "r"; count: number }) {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: count }).map((_, k) => (
        <div
          key={k}
          aria-hidden
          className="absolute inset-y-0 w-full rounded-[2px] border border-[rgb(120_100_70/0.14)] bg-[#f6f1e7]"
          style={{
            [side === "r" ? "left" : "right"]: 0,
            transform: `translate(${(side === "r" ? 1 : -1) * (k + 1) * 2}px, ${(k + 1) * 1.5}px)`,
            zIndex: -k - 1,
          }}
        />
      ))}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 rounded-[2px] shadow-[0_40px_70px_-25px_rgb(90_70_40/0.35),0_14px_24px_-12px_rgb(90_70_40/0.2)]"
      />
    </div>
  );
}

/**
 * One sheet of paper. Its front is clipped to the part still lying flat; its back is reflected
 * across the fold onto the lifting flap. All geometry is written straight to the DOM every frame.
 */
function LeafView({
  index,
  total,
  leaf,
  spread,
  motion: m,
  size,
  near,
  frontUp,
  backUp,
}: {
  index: number;
  total: number;
  leaf: Leaf;
  spread: boolean;
  motion: LeafMotion;
  size: { pw: number; ph: number };
  near: boolean;
  frontUp: boolean;
  backUp: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backWrapRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const curlRef = useRef<HTMLDivElement>(null);

  const [moving, setMoving] = useState(false);
  useMotionValueEvent(m.u, "change", (u) => {
    const mv = !atRest(u);
    setMoving((was) => (was === mv ? was : mv));
  });

  useEffect(() => {
    const { pw, ph } = size;
    const apply = () => {
      const root = rootRef.current;
      const reveal = revealRef.current;
      const front = frontRef.current;
      const wrap = backWrapRef.current;
      const back = backRef.current;
      const curl = curlRef.current;
      if (!root || !reveal || !front || !wrap || !back || !curl) return;

      const u = m.u.get();
      // right-hand leaves stack lowest-index on top, left-hand highest-index on top; a moving
      // leaf floats above every resting one
      root.style.zIndex = String((atRest(u) ? 0 : 1000) + (u > 0 ? total - index : index));

      if (!pw || !ph) return;
      const g = computeCurl(u, m.v.get(), m.c.get(), pw, ph);

      if (g.state === "right") {
        front.style.visibility = "visible";
        front.style.clipPath = "none";
        wrap.style.visibility = "hidden";
        wrap.style.filter = "none";
        reveal.style.visibility = "hidden";
        return;
      }
      if (g.state === "left") {
        front.style.visibility = "hidden";
        wrap.style.visibility = "visible";
        wrap.style.transform = `translateX(${-pw}px)`;
        wrap.style.filter = "none";
        back.style.clipPath = "none";
        curl.style.opacity = "0";
        reveal.style.visibility = "hidden";
        return;
      }

      const { stay, lifted, matrix, backClip, mid, n, amount } = g;
      front.style.visibility = "visible";
      front.style.clipPath = polygon(stay);

      wrap.style.visibility = "visible";
      wrap.style.transform = `matrix(${matrix.map((x) => x.toFixed(4)).join(",")})`;
      const blur = 6 + 18 * amount;
      wrap.style.filter = `drop-shadow(0 0 ${blur.toFixed(1)}px rgba(70,50,20,${(0.28 * amount + 0.06).toFixed(3)}))`;
      back.style.clipPath = polygon(backClip);

      // light catching the curl of the flap: dark crease, bright roll, soft falloff
      const midB = { x: pw - mid.x, y: mid.y };
      const nB = { x: -n.x, y: n.y };
      curl.style.opacity = String(0.35 + 0.65 * amount);
      curl.style.backgroundImage = gradientFrom(midB, nB, pw, ph, [
        ["rgba(70,50,20,0.28)", 0],
        ["rgba(255,255,255,0.0)", pw * 0.02],
        ["rgba(255,255,255,0.45)", pw * 0.07],
        ["rgba(255,255,255,0.0)", pw * 0.2],
        ["rgba(70,50,20,0.08)", pw * 0.45],
        ["rgba(70,50,20,0.0)", pw * 0.9],
      ]);

      // shadow cast onto the page being revealed underneath
      reveal.style.visibility = "visible";
      reveal.style.clipPath = polygon(lifted);
      reveal.style.backgroundImage = gradientFrom(mid, n, pw, ph, [
        [`rgba(70,50,20,${(0.42 * amount + 0.08).toFixed(3)})`, 0],
        ["rgba(70,50,20,0.10)", pw * 0.12],
        ["rgba(70,50,20,0)", pw * 0.4],
      ]);
    };

    apply();
    const offs = [m.u.on("change", apply), m.v.on("change", apply), m.c.on("change", apply)];
    return () => offs.forEach((off) => off());
  }, [m, size, index, total]);

  const visible = near || moving;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute top-0 h-full"
      style={{
        left: spread ? "50%" : 0,
        width: spread ? "50%" : "100%",
        // display, not visibility: the faces below set their own visibility every frame
        display: visible ? undefined : "none",
      }}
    >
      <div ref={revealRef} aria-hidden className="pointer-events-none absolute inset-0" style={{ visibility: "hidden" }} />
      <div ref={frontRef} className="pointer-events-auto absolute inset-0">
        <Face page={leaf.front} side="right" up={frontUp} />
      </div>
      <div ref={backWrapRef} className="pointer-events-auto absolute inset-0" style={{ transformOrigin: "0 0", visibility: "hidden" }}>
        <div ref={backRef} className="absolute inset-0">
          <Face page={leaf.back} side="left" up={backUp} />
          <div ref={curlRef} aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: 0 }} />
        </div>
      </div>
    </div>
  );
}

function Face({ page, side, up }: { page: BookPage | null; side: "left" | "right"; up: boolean }) {
  return (
    <div
      data-side={side}
      inert={!up}
      className="group/face @container absolute inset-0 overflow-hidden rounded-[2px] paper-texture"
    >
      <PageVisibleContext.Provider value={up}>{page?.node ?? <BlankVerso />}</PageVisibleContext.Provider>
      {/* gutter: the page curving into the spine */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 w-[10%]",
          side === "right"
            ? "left-0 bg-gradient-to-r from-[rgb(90_65_30/0.14)] via-[rgb(90_65_30/0.035)] to-transparent"
            : "right-0 bg-gradient-to-l from-[rgb(90_65_30/0.14)] via-[rgb(90_65_30/0.035)] to-transparent"
        )}
      />
    </div>
  );
}

function BlankVerso() {
  return <div aria-hidden className="absolute inset-0 paper-texture" />;
}
