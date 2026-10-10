/**
 * Paper-curl geometry for one leaf, in right-hand-page coordinates: origin at the top of the spine,
 * x to the right (0 … pw), y down (0 … ph).
 *
 * The leaf is described by where its outer corner currently is (P). The original corner C0 is
 * (pw, 0) or (pw, ph). The fold is the perpendicular bisector of C0–P: everything on the corner's
 * side of it is lifted and reflected across the fold, showing the back of the paper.
 */

export type Pt = { x: number; y: number };

export type Curl =
  | { state: "right" }
  | { state: "left"; pw: number }
  | {
      state: "turning";
      /** part of the front that still lies flat */
      stay: Pt[];
      /** part of the front that has lifted off (front coords) */
      lifted: Pt[];
      /** CSS matrix placing the back of the paper onto the flap */
      matrix: [number, number, number, number, number, number];
      /** lifted region expressed in the back face's own coordinates */
      backClip: Pt[];
      /** fold line point + unit normal pointing into the lifted side (front coords) */
      mid: Pt;
      n: Pt;
      /** 0 → flat, 1 → page standing upright: drives shadow strength */
      amount: number;
    };

const dot = (a: Pt, b: Pt) => a.x * b.x + a.y * b.y;

/** Keep the corner where real paper can reach while still bound at the spine. */
export function constrain(p: Pt, cornerY: number, pw: number, ph: number): Pt {
  let q = { ...p };
  const anchors: [Pt, number][] = [
    [{ x: 0, y: cornerY }, pw],
    [{ x: 0, y: ph - cornerY }, Math.hypot(pw, ph)],
  ];
  for (let pass = 0; pass < 2; pass++) {
    for (const [s, r] of anchors) {
      const dx = q.x - s.x;
      const dy = q.y - s.y;
      const d = Math.hypot(dx, dy);
      if (d > r) q = { x: s.x + (dx * r) / d, y: s.y + (dy * r) / d };
    }
  }
  return q;
}

/** Sutherland–Hodgman against a single half-plane: keeps points where f(p) >= 0. */
function clipHalf(poly: Pt[], f: (p: Pt) => number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const fa = f(a);
    const fb = f(b);
    if (fa >= 0) out.push(a);
    if (fa >= 0 !== fb >= 0) {
      const t = fa / (fa - fb);
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return out;
}

/**
 * u, v: corner position normalised to the page (u = x / pw in -1 … 1, v = y / ph).
 * c: which corner is held, 0 = top, 1 = bottom.
 */
export function computeCurl(u: number, v: number, c: number, pw: number, ph: number): Curl {
  if (u >= 0.9995) return { state: "right" };
  if (u <= -0.9995) return { state: "left", pw };

  const cy = c * ph;
  const C0 = { x: pw, y: cy };
  const P = constrain({ x: u * pw, y: v * ph }, cy, pw, ph);
  const dx = C0.x - P.x;
  const dy = C0.y - P.y;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return { state: "right" };

  const n = { x: dx / len, y: dy / len };
  const mid = { x: (C0.x + P.x) / 2, y: (C0.y + P.y) / 2 };
  const side = (q: Pt) => (q.x - mid.x) * n.x + (q.y - mid.y) * n.y;

  const rect: Pt[] = [
    { x: 0, y: 0 },
    { x: pw, y: 0 },
    { x: pw, y: ph },
    { x: 0, y: ph },
  ];
  const stay = clipHalf(rect, (q) => -side(q));
  const lifted = clipHalf(rect, side);

  // reflection across the fold: R(q) = A q + b
  const A11 = 1 - 2 * n.x * n.x;
  const A12 = -2 * n.x * n.y;
  const A22 = 1 - 2 * n.y * n.y;
  const k = 2 * dot(mid, n);
  const bx = k * n.x;
  const by = k * n.y;
  // back face point (x', y') sits on the paper at (pw - x', y'); place it with T = R ∘ mirror
  const matrix: [number, number, number, number, number, number] = [-A11, -A12, A12, A22, A11 * pw + bx, A12 * pw + by];

  const backClip = lifted.map((q) => ({ x: pw - q.x, y: q.y }));
  const travel = (1 - u) / 2;
  const amount = Math.sin(Math.PI * Math.min(1, Math.max(0, travel)));

  return { state: "turning", stay, lifted, matrix, backClip, mid, n, amount };
}

export const polygon = (pts: Pt[]) =>
  pts.length < 3 ? "polygon(0 0, 0 0, 0 0)" : `polygon(${pts.map((p) => `${p.x.toFixed(2)}px ${p.y.toFixed(2)}px`).join(", ")})`;

/**
 * A CSS linear-gradient running along `dir`, with stops given as pixel offsets from the line through
 * `origin` (perpendicular to `dir`), for a box of size w × h.
 */
export function gradientFrom(
  origin: Pt,
  dir: Pt,
  w: number,
  h: number,
  stops: [string, number][]
): string {
  const theta = Math.atan2(dir.x, -dir.y);
  const lg = Math.abs(w * Math.sin(theta)) + Math.abs(h * Math.cos(theta));
  const base = lg / 2 + (origin.x - w / 2) * dir.x + (origin.y - h / 2) * dir.y;
  const s = stops.map(([color, off]) => `${color} ${(base + off).toFixed(1)}px`).join(", ");
  return `linear-gradient(${((theta * 180) / Math.PI).toFixed(2)}deg, ${s})`;
}
