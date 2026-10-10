import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import PageFrame, { Caption, ChapterHead } from "./PageFrame";
import PageLink from "./PageLink";
import ContactForm from "./ContactForm";
import type { BookChapter, BookPage } from "./Book";
import ProjectCover from "@/components/ProjectCover";
import { profile } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { experience } from "@/data/experience";
import { timeline } from "@/data/timeline";
import { skillGroups } from "@/data/skills";

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

const RUN = {
  preface: "I · Preface",
  work: "II · Selected Work",
  experience: "III · Experience",
  toolkit: "IV · Toolkit",
  contact: "V · Correspondence",
};

/** each chapter has its own pastel, so the book reads as a set of light colour combinations */
const TINT = {
  preface: "var(--blush)",
  work: "var(--sky)",
  experience: "var(--mint)",
  toolkit: "var(--butter)",
  contact: "var(--lilac)",
};

/** folio (page number) of every page, in book order */
const F = {
  contents: 3,
  preface: 4,
  about: 5,
  capabilities: 6,
  workOpener: 7,
  workIndex: 8,
  firstCase: 9,
  more: 15,
  experience: 16,
  journey: 17,
  toolkit: 18,
  contact: 19,
  letter: 20,
  colophon: 21,
};

/* ------------------------------------------------------------------ covers */

const COVER_INK = "#26301f";
const COVER_SOFT = "rgb(52 70 44 / 0.75)";

function FrontCover() {
  return (
    <div className="absolute inset-0 cloth-texture font-book" style={{ color: COVER_INK }}>
      {/* spine hinge */}
      <div className="absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-[rgb(52_70_44/0.2)] via-[rgb(255_255_255/0.3)] to-transparent" />
      <div className="absolute inset-[6%] border border-[rgb(52_70_44/0.35)]">
        <div className="absolute inset-[1.6cqw] border border-[rgb(52_70_44/0.18)]" />
      </div>
      {/* pastel colour bands */}
      <div className="absolute inset-x-[6%] top-[6%] flex h-[1.4cqw]">
        {["var(--blush)", "var(--sky)", "var(--mint)", "var(--butter)", "var(--lilac)"].map((c) => (
          <span key={c} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      <div className="absolute inset-[11%] flex flex-col items-center justify-between text-center">
        <p className="t-cap" style={{ color: COVER_SOFT }}>
          Vol. I — MMXXVI Edition
        </p>

        <div className="flex flex-col items-center">
          <span className="flex h-[13cqw] w-[13cqw] items-center justify-center rounded-full border border-[rgb(52_70_44/0.4)] bg-paper/50 font-serif text-[6.5cqw] italic shadow-[inset_0_1px_2px_rgb(52_70_44/0.2)]">
            M
          </span>
          <p className="mt-[6cqw] font-serif text-[14cqw] leading-[0.86] tracking-[-0.03em] [text-shadow:0_1px_0_rgb(255_255_255/0.7)]">
            Mit
            <br />
            Ramavat
          </p>
          <span className="mt-[5cqw] h-px w-[16cqw] bg-[rgb(52_70_44/0.35)]" />
          <p className="mt-[4cqw] font-serif text-[4.4cqw] italic" style={{ color: COVER_SOFT }}>
            Machines that see, listen &amp; decide
          </p>
        </div>

        <div className="flex flex-col items-center gap-[2cqw]">
          <span className="bg-accent px-[3.5cqw] py-[1.4cqw] font-mono text-[1.9cqw] uppercase tracking-[0.2em] text-paper shadow-[0_1px_2px_rgb(90_30_15/0.3)]">
            AI / ML Engineer
          </span>
          <p className="t-cap" style={{ color: COVER_SOFT }}>
            Ahmedabad · India
          </p>
        </div>
      </div>
    </div>
  );
}

function BackCover() {
  return (
    <div className="absolute inset-0 cloth-texture font-book" style={{ color: COVER_INK }}>
      <div className="absolute inset-y-0 right-0 w-[6%] bg-gradient-to-l from-[rgb(52_70_44/0.2)] via-[rgb(255_255_255/0.3)] to-transparent" />
      <div className="absolute inset-[11%] flex flex-col justify-between">
        <div>
          <p className="t-cap" style={{ color: COVER_SOFT }}>
            About the author
          </p>
          <p className="mt-[4cqw] font-serif text-[5.2cqw] leading-[1.15]">
            &ldquo;Mit builds AI that leaves the notebook — voice agents that operate real machines, models validated
            honestly, and products people enjoy using.&rdquo;
          </p>
          <p className="mt-[5cqw] t-body" style={{ color: COVER_SOFT }}>
            {profile.currently}. Open to AI/ML engineering roles, internships and collaborations.
          </p>
        </div>

        <div className="space-y-[5cqw]">
          <div className="flex flex-wrap gap-[2cqw]">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-ink px-[4cqw] py-[1.8cqw] font-sans t-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Write to me
            </a>
            <PageLink
              to="cover"
              className="rounded-full border border-[rgb(52_70_44/0.4)] bg-paper/40 px-[4cqw] py-[1.8cqw] font-sans t-sm transition-colors hover:bg-paper/80"
            >
              Read again ↺
            </PageLink>
          </div>
          <div className="flex items-end justify-between gap-[4cqw]">
            <div className="bg-paper p-[2cqw] shadow-[0_1px_2px_rgb(52_70_44/0.2)]">
              <Barcode />
              <p className="mt-[1cqw] text-center font-mono text-[1.6cqw] tracking-[0.2em]">978-MIT-2026-AI</p>
            </div>
            <p className="t-cap text-right" style={{ color: COVER_SOFT }}>
              mit-ramavat-portfolio
              <br />
              .vercel.app
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1];
  return (
    <div aria-hidden className="flex h-[9cqw] items-stretch gap-[0.45cqw]">
      {bars.map((w, i) => (
        <span key={i} style={{ width: `${w * 0.42}cqw`, background: COVER_INK }} />
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- front matter */

function Endpaper({ front }: { front?: boolean }) {
  return (
    <div className="absolute inset-0 endpaper font-book">
      {front && (
        <div className="absolute inset-x-[14%] top-1/2 -translate-y-1/2 border border-line-strong bg-paper/95 p-[6cqw] text-center shadow-[0_1px_3px_rgb(90_65_30/0.12)]">
          <p className="t-cap text-accent">Ex Libris</p>
          <p className="mt-[3cqw] font-serif text-[5.4cqw] italic leading-[1.1]">
            This book belongs to whoever is curious enough to open it.
          </p>
          <div className="mx-auto mt-[4cqw] h-px w-[12cqw] bg-line-strong" />
          <p className="mt-[4cqw] t-cap text-dim">How to read</p>
          <ul className="mt-[2cqw] space-y-[1cqw] t-sm text-muted">
            <li>Scroll, or use the ← → keys</li>
            <li>Grab a page corner and pull it over</li>
            <li>Jump anywhere from the contents</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function TitlePage() {
  return (
    <div className="absolute inset-0 flex flex-col font-book">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[55%]"
        style={{ background: "linear-gradient(180deg, var(--sky) 0%, transparent 100%)", opacity: 0.8 }}
      />
      <div className="relative px-[9cqw] pt-[10cqw] text-center">
        <p className="t-cap text-dim">A portfolio</p>
        <h2 className="mt-[3cqw] font-serif t-h1 tracking-[-0.03em]">Mit Ramavat</h2>
        <p className="mt-[3cqw] font-serif t-lead italic text-muted">
          builds machines that <span className="text-accent">see, listen &amp; decide.</span>
        </p>
      </div>
      <div className="relative mx-auto mt-[3cqw] w-[78%] flex-1">
        <Image
          src="/mit-suit.webp"
          alt="Mit Ramavat in a black suit"
          fill
          sizes="(max-width: 900px) 80vw, 30vw"
          className="object-contain object-bottom [filter:saturate(0.92)_contrast(1.03)]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-paper to-transparent" />
      </div>
      <div className="relative flex items-center justify-between border-t border-line px-[9cqw] py-[3.5cqw] t-cap text-dim">
        <span>Ahmedabad</span>
        <span className="font-serif text-[3cqw] normal-case italic tracking-normal text-accent">❦</span>
        <span>MMXXVI</span>
      </div>
    </div>
  );
}

function Contents() {
  const entries: {
    n: string;
    title: string;
    to: string;
    page: number;
    tint: string;
    sub?: { title: string; to: string; page: number }[];
  }[] = [
    { n: "I", title: "Preface", to: "preface", page: F.preface, tint: TINT.preface },
    {
      n: "II",
      title: "Selected Work",
      to: "work-opener",
      page: F.workOpener,
      tint: TINT.work,
      sub: [
        ...featured.map((p, i) => ({ title: p.title, to: `${p.slug}-fig`, page: F.firstCase + i * 2 })),
        { title: "Earlier work", to: "more", page: F.more },
      ],
    },
    { n: "III", title: "Experience", to: "experience", page: F.experience, tint: TINT.experience },
    { n: "IV", title: "Toolkit", to: "stack", page: F.toolkit, tint: TINT.toolkit },
    { n: "V", title: "Correspondence", to: "contact", page: F.contact, tint: TINT.contact },
  ];
  return (
    <PageFrame folio={F.contents} running="Contents">
      <h2 className="font-serif t-h2 tracking-[-0.02em]">Contents</h2>
      <p className="mt-[2cqw] t-sm italic text-muted">Every entry turns straight to its page.</p>
      <ol className="mt-[5.5cqw] space-y-[3cqw]">
        {entries.map((e) => (
          <li key={e.n}>
            <PageLink to={e.to} className="group flex w-full items-baseline gap-[2cqw] text-left">
              <span
                className="flex h-[6cqw] w-[6cqw] shrink-0 items-center justify-center self-center rounded-full font-serif t-sm italic text-accent"
                style={{ background: e.tint }}
              >
                {e.n}
              </span>
              <span className="font-serif t-lead transition-colors group-hover:text-accent">{e.title}</span>
              <span className="mb-[0.6cqw] flex-1 border-b border-dotted border-line-strong" />
              <span className="font-serif t-lead italic text-muted">{e.page}</span>
            </PageLink>
            {e.sub && (
              <ul className="mt-[1.4cqw] space-y-[1cqw] pl-[8cqw]">
                {e.sub.map((s) => (
                  <li key={s.to}>
                    <PageLink to={s.to} className="group flex w-full items-baseline gap-[2cqw] text-left">
                      <span className="t-body text-muted transition-colors group-hover:text-ink">{s.title}</span>
                      <span className="mb-[0.5cqw] flex-1 border-b border-dotted border-line" />
                      <span className="t-sm italic text-dim">{s.page}</span>
                    </PageLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </PageFrame>
  );
}

/* ------------------------------------------------------------- I · Preface */

function Preface() {
  return (
    <PageFrame folio={F.preface} running={RUN.preface} tint={TINT.preface} opener>
      <ChapterHead numeral="I" title="Preface" />
      <p className="mt-[6cqw] t-lead text-ink first-letter:float-left first-letter:mr-[1.6cqw] first-letter:mt-[0.6cqw] first-letter:font-serif first-letter:text-[13cqw] first-letter:leading-[0.8] first-letter:text-accent">
        {profile.intro}
      </p>
      <p className="mt-[3.5cqw] t-body text-muted">{profile.manifesto}</p>
      <div className="mt-auto flex items-end justify-between pt-[4cqw]">
        <p className="font-serif text-[6cqw] italic text-accent">— Mit</p>
        <p className="t-cap text-right text-dim">
          Currently
          <br />
          <span className="text-ink">Intern @ Spectrics Solution</span>
        </p>
      </div>
    </PageFrame>
  );
}

function AboutPage() {
  return (
    <PageFrame folio={F.about} running={RUN.preface} tint={TINT.preface}>
      <div className="grid grid-cols-[38%_1fr] gap-[4.5cqw]">
        <figure>
          <div className="relative aspect-[3/4] overflow-hidden border border-line bg-paper-2 p-[1cqw] shadow-[0_1px_3px_rgb(90_65_30/0.12)]">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/mit-portrait.webp"
                alt="Portrait of Mit Ramavat"
                fill
                sizes="(max-width: 900px) 40vw, 15vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
          </div>
          <Caption n={1}>The author.</Caption>
        </figure>

        <div>
          <p className="t-cap text-accent">Particulars</p>
          <dl className="mt-[2cqw] space-y-[1.6cqw]">
            {[
              ["Name", profile.name],
              ["Role", profile.role],
              ["Based in", profile.location],
              ["Now", "Intern @ Spectrics Solution"],
              ["Speaks", profile.languages.join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-line pb-[1.2cqw]">
                <dt className="t-cap text-dim">{k}</dt>
                <dd className="mt-[0.4cqw] t-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <dl className="mt-[4.5cqw] grid grid-cols-3 border-y border-line">
        {profile.stats.map((s) => (
          <div key={s.label} className="border-r border-line py-[2.6cqw] pr-[2cqw] last:border-r-0 [&:not(:first-child)]:pl-[3cqw]">
            <dt className="font-serif text-[8.5cqw] leading-none tracking-[-0.03em]">
              {String(s.value).padStart(2, "0")}
              <span className="text-accent">{s.suffix}</span>
            </dt>
            <dd className="mt-[1.4cqw] t-cap text-dim">{s.label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-[4.5cqw] grid grid-cols-2 gap-[5cqw]">
        <div>
          <p className="t-cap text-dim">Education</p>
          <p className="mt-[1.2cqw] t-sm">{profile.education}</p>
        </div>
        <div>
          <p className="t-cap text-dim">Certified</p>
          <ul className="mt-[1.2cqw] t-sm">
            {profile.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="mt-auto flex flex-wrap gap-[1.5cqw] pt-[3cqw]">
        {profile.traits.map((t) => (
          <li key={t} className="rounded-full border border-line-strong bg-paper/70 px-[2.4cqw] py-[0.8cqw] t-cap text-muted">
            {t}
          </li>
        ))}
      </ul>
    </PageFrame>
  );
}

const capabilities = [
  {
    verb: "Sense.",
    title: "Perception",
    body: "Computer vision and speech — object detection from live video, wake-word models trained on one voice, speech-to-text.",
    tools: "OpenCV · TensorFlow · PyTorch · STT/TTS",
  },
  {
    verb: "Understand.",
    title: "Language & agents",
    body: "LLM systems that reason and act — tool-calling agents that operate desktops and browsers, and ask before anything irreversible.",
    tools: "Gemini · Groq · Tool calling · Playwright",
  },
  {
    verb: "Decide.",
    title: "Prediction",
    body: "Machine learning that holds up out of sample — walk-forward validation, cost-aware labels, forecasting and optimization.",
    tools: "Scikit-learn · XGBoost · Pandas · PuLP",
  },
];

function Capabilities() {
  return (
    <PageFrame folio={F.capabilities} running={RUN.preface} tint={TINT.preface}>
      <p className="t-cap text-accent">What I do</p>
      <h3 className="mt-[2cqw] font-serif t-h2 tracking-[-0.02em]">
        Sense, understand, <span className="italic text-accent">decide.</span>
      </h3>
      <ol className="mt-[5cqw] flex-1 divide-y divide-line border-y border-line">
        {capabilities.map((c, i) => (
          <li key={c.verb} className="grid grid-cols-[7cqw_1fr] gap-[2cqw] py-[3.2cqw]">
            <span className="font-serif t-lead italic text-dim">0{i + 1}</span>
            <div>
              <p className="flex items-baseline justify-between gap-[2cqw]">
                <span className="font-serif t-h3">{c.verb}</span>
                <span className="t-cap text-dim">{c.title}</span>
              </p>
              <p className="mt-[1.4cqw] t-sm text-muted">{c.body}</p>
              <p className="mt-[1.4cqw] t-cap text-ink/70">{c.tools}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageFrame>
  );
}

/* -------------------------------------------------------- II · Selected work */

function WorkOpener() {
  return (
    <PageFrame folio={F.workOpener} running={RUN.work} tint={TINT.work} opener>
      <ChapterHead numeral="II" title="Selected Work" />
      <p className="mt-[8cqw] font-serif text-[10cqw] leading-[0.95] tracking-[-0.03em]">
        Systems
        <br />
        <span className="italic text-accent">that ship.</span>
      </p>
      <p className="mt-[6cqw] t-body text-muted">
        Three flagship builds, each taken from first idea to a working system: an autonomous voice agent, an ML trading
        research platform and a fintech education product. Each one gets a spread — the figure on the left, the story on
        the right.
      </p>
      <p className="mt-auto t-cap text-dim">Turn the page →</p>
    </PageFrame>
  );
}

function WorkIndex() {
  return (
    <PageFrame folio={F.workIndex} running={RUN.work} tint={TINT.work}>
      <p className="t-cap text-accent">Index of works</p>
      <ol className="mt-[4cqw] divide-y divide-line border-y border-line">
        {featured.map((p, i) => (
          <li key={p.slug}>
            <PageLink
              to={`${p.slug}-fig`}
              className="group grid w-full grid-cols-[9cqw_1fr_auto] items-baseline gap-[2cqw] py-[3.6cqw] text-left"
            >
              <span className="font-serif text-[7cqw] italic leading-none text-accent">{i + 1}</span>
              <span>
                <span className="block font-serif t-h3 transition-colors group-hover:text-accent">{p.title}</span>
                <span className="mt-[1.2cqw] block t-cap text-dim">{p.category}</span>
                <span className="mt-[1.2cqw] block t-sm text-muted">{p.description}</span>
              </span>
              <span className="font-serif t-lead italic text-muted">{F.firstCase + i * 2}</span>
            </PageLink>
          </li>
        ))}
      </ol>
      <PageLink to="more" className="group mt-auto flex w-full items-baseline justify-between pt-[3cqw] text-left">
        <span className="t-body text-muted transition-colors group-hover:text-ink">
          Plus earlier work in forecasting &amp; optimization
        </span>
        <span className="font-serif t-lead italic text-muted">{F.more}</span>
      </PageLink>
    </PageFrame>
  );
}

function ProjectFigure({ project, n, folio }: { project: Project; n: number; folio: number }) {
  return (
    <PageFrame folio={folio} running={RUN.work} tint={TINT.work}>
      <div className="flex items-baseline justify-between">
        <p className="t-cap text-accent">Case {String(n).padStart(2, "0")}</p>
        <p className="t-cap text-dim">{project.year}</p>
      </div>
      <figure className="mt-[3cqw]">
        <div className="relative aspect-[4/3.1] overflow-hidden border border-line bg-paper-2 shadow-[0_1px_3px_rgb(90_65_30/0.12)]">
          <ProjectCover project={project} sizes="(max-width: 900px) 80vw, 30vw" />
        </div>
        <Caption n={n + 1}>
          {project.title}
          {project.category && <> — {project.category.toLowerCase()}</>}.
        </Caption>
      </figure>
      {project.metrics && (
        <dl className="mt-[4cqw] grid grid-cols-2 border-t border-line">
          {project.metrics.map((m) => (
            <div key={m.label} className="border-b border-line py-[2.4cqw] odd:border-r odd:pr-[3cqw] even:pl-[3cqw]">
              <dt className="t-cap text-dim">{m.label}</dt>
              <dd className="mt-[1cqw] font-serif t-lead">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </PageFrame>
  );
}

function ProjectStory({ project, folio }: { project: Project; folio: number }) {
  return (
    <PageFrame folio={folio} running={RUN.work} tint={TINT.work}>
      <p className="t-cap text-dim">
        {project.role} · {project.status}
      </p>
      <h3 className="mt-[2cqw] font-serif t-h2 tracking-[-0.02em]">{project.title}</h3>
      <p className="mt-[3.5cqw] t-lead">{project.description}</p>
      {project.note && (
        <p className="mt-[2.5cqw] border-l-2 border-accent pl-[2.5cqw] t-sm italic text-muted">{project.note}</p>
      )}
      <p className="mt-[4cqw] t-cap text-accent">What it does</p>
      <ul className="mt-[1.8cqw] space-y-[1.4cqw]">
        {project.features.slice(0, 4).map((f) => (
          <li key={f} className="flex gap-[2cqw] t-body text-ink/85">
            <span className="mt-[0.2em] font-serif italic text-accent">—</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <p className="mt-[3.5cqw] t-cap leading-[1.9] text-muted">{project.tech.slice(0, 8).join(" · ")}</p>
      <div className="mt-auto flex flex-wrap gap-[2cqw] pt-[3cqw]">
        <Link
          href={`/projects/${project.slug}`}
          className="group inline-flex items-center gap-[1.4cqw] rounded-full bg-ink px-[4cqw] py-[1.8cqw] font-sans t-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Full case study <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[1.4cqw] rounded-full border border-line-strong bg-paper/70 px-[4cqw] py-[1.8cqw] font-sans t-sm transition-colors hover:border-ink"
          >
            <FaGithub /> Source
          </a>
        )}
      </div>
    </PageFrame>
  );
}

function MoreProjects() {
  return (
    <PageFrame folio={F.more} running={RUN.work} tint={TINT.work}>
      <p className="t-cap text-accent">Earlier work</p>
      <h3 className="mt-[2cqw] font-serif t-h2 tracking-[-0.02em]">Also on the shelf</h3>
      <ul className="mt-[5cqw] divide-y divide-line border-y border-line">
        {more.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="group grid grid-cols-[26cqw_1fr] items-center gap-[4cqw] py-[3.2cqw]">
              <span className="relative block aspect-[16/11] overflow-hidden border border-line bg-paper-2">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover object-top [filter:saturate(0.9)] transition duration-500 group-hover:[filter:none]"
                />
              </span>
              <span>
                <span className="block t-cap text-dim">
                  {p.category} · {p.year}
                </span>
                <span className="mt-[1cqw] block font-serif t-h3 transition-colors group-hover:text-accent">
                  {p.title} <span className="text-[0.7em]">↗</span>
                </span>
                <span className="mt-[1cqw] block t-sm text-muted">{p.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageFrame>
  );
}

/* ---------------------------------------------------------- III · Experience */

function ExperiencePage() {
  const e = experience[0];
  return (
    <PageFrame folio={F.experience} running={RUN.experience} tint={TINT.experience} opener>
      <ChapterHead numeral="III" title="Experience" />
      <div className="mt-[5cqw] flex items-baseline justify-between border-b border-line pb-[2cqw]">
        <p className="t-cap text-accent">{e.duration}</p>
        <p className="t-cap text-dim">{e.location}</p>
      </div>
      <h3 className="mt-[3.5cqw] font-serif t-h3">{e.role}</h3>
      <p className="mt-[1cqw] font-serif t-lead italic text-accent">{e.company}</p>
      <p className="mt-[3cqw] t-body text-muted">{e.description}</p>
      <ul className="mt-[3cqw] space-y-[1.2cqw]">
        {e.highlights.map((h) => (
          <li key={h} className="flex gap-[2cqw] t-body">
            <span className="font-serif italic text-accent">—</span>
            {h}
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-[3cqw] t-cap leading-[1.9] text-muted">{e.technologies.join(" · ")}</p>
    </PageFrame>
  );
}

function JourneyPage() {
  return (
    <PageFrame folio={F.journey} running={RUN.experience} tint={TINT.experience}>
      <p className="t-cap text-accent">The journey so far</p>
      <ol className="relative mt-[5cqw] flex-1 space-y-[3.6cqw] pl-[7cqw]">
        <span
          aria-hidden
          className="absolute bottom-[1cqw] left-[1.6cqw] top-[1cqw] w-px bg-gradient-to-b from-accent via-line-strong to-transparent"
        />
        {timeline.map((t) => (
          <li key={t.year} className="relative">
            <span className="absolute -left-[7cqw] top-[0.9cqw] h-[3.2cqw] w-[3.2cqw] rounded-full border border-accent bg-mint" />
            <p className="font-serif t-body italic text-accent">{t.year}</p>
            <p className="mt-[0.6cqw] font-serif t-lead">{t.title}</p>
            <p className="mt-[0.8cqw] t-sm text-muted">{t.description}</p>
          </li>
        ))}
      </ol>
    </PageFrame>
  );
}

/* --------------------------------------------------------------- IV · Toolkit */

function ToolkitPage() {
  return (
    <PageFrame folio={F.toolkit} running={RUN.toolkit} tint={TINT.toolkit} opener>
      <ChapterHead numeral="IV" title="Toolkit" />
      <dl className="mt-[5cqw] divide-y divide-line border-y border-line">
        {skillGroups.map((g) => (
          <div key={g.id} className="grid grid-cols-[30cqw_1fr] gap-[3cqw] py-[2.4cqw]">
            <dt>
              <span className="block font-serif t-lead">{g.title}</span>
              <span className="mt-[0.6cqw] block t-cap text-dim">{g.index}</span>
            </dt>
            <dd className="flex flex-wrap items-center gap-x-[2.4cqw] gap-y-[1cqw] t-sm text-ink/85">
              {g.skills.map((s) => {
                const Icon = s.icon;
                return (
                  <span key={s.name} className="inline-flex items-center gap-[1cqw]">
                    {Icon && <Icon className="text-muted" aria-hidden />}
                    {s.name}
                  </span>
                );
              })}
            </dd>
          </div>
        ))}
      </dl>
    </PageFrame>
  );
}

/* ------------------------------------------------------- V · Correspondence */

function CorrespondencePage() {
  return (
    <PageFrame folio={F.contact} running={RUN.contact} tint={TINT.contact} opener>
      <ChapterHead numeral="V" title="Correspondence" />
      <p className="mt-[5cqw] font-serif text-[7.6cqw] leading-[1] tracking-[-0.02em]">
        Let&apos;s build something <span className="italic text-accent">intelligent.</span>
      </p>
      <div className="mt-[4.5cqw] divide-y divide-line border-y border-line">
        {[
          { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
          { k: "Phone", v: profile.phone, href: profile.phoneHref },
        ].map((row) => (
          <a key={row.k} href={row.href} className="group flex items-center justify-between py-[2.4cqw]">
            <span>
              <span className="block t-cap text-dim">{row.k}</span>
              <span className="mt-[0.4cqw] block font-serif t-lead">{row.v}</span>
            </span>
            <span className="flex h-[6.5cqw] w-[6.5cqw] items-center justify-center rounded-full border border-line-strong bg-paper/70 t-sm transition-all group-hover:-rotate-45 group-hover:bg-ink group-hover:text-paper">
              →
            </span>
          </a>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-2 gap-[4cqw] pt-[3.5cqw]">
        <div>
          <p className="t-cap text-dim">Elsewhere</p>
          <ul className="mt-[1.2cqw] space-y-[0.5cqw] t-body">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                Resume ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="t-cap text-dim">Based in</p>
          <p className="mt-[1.2cqw] t-body">{profile.location}</p>
          <p className="mt-[0.5cqw] t-cap text-dim">{profile.coordinates}</p>
        </div>
      </div>
    </PageFrame>
  );
}

function LetterPage() {
  return (
    <PageFrame folio={F.letter} running={RUN.contact} tint={TINT.contact}>
      <div className="flex items-baseline justify-between">
        <p className="t-cap text-accent">A letter to Mit</p>
        <p className="font-serif t-sm italic text-dim">Ahmedabad, India</p>
      </div>
      <p className="mt-[2cqw] t-sm text-muted">Write it here — it lands straight in my inbox.</p>
      <div className="mt-[4cqw] flex min-h-0 flex-1 flex-col">
        <ContactForm />
      </div>
    </PageFrame>
  );
}

function Colophon() {
  return (
    <PageFrame folio={F.colophon}>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex gap-[1.5cqw]">
          {Object.values(TINT).map((c) => (
            <span key={c} className="h-[3cqw] w-[3cqw] rounded-full border border-line" style={{ background: c }} />
          ))}
        </div>
        <p className="mt-[6cqw] font-serif text-[8cqw] italic text-accent">❦</p>
        <p className="mt-[3cqw] font-serif t-h2 italic">Fin.</p>
        <p className="mt-[3cqw] t-body text-muted">Thank you for reading.</p>
        <div className="mt-[9cqw] w-[72%] border-t border-line pt-[4cqw]">
          <p className="t-cap text-dim">Colophon</p>
          <p className="mt-[2cqw] t-sm text-muted">
            Set in Instrument Serif and Newsreader. Bound with Next.js, React and Framer Motion; every page curls along
            a real fold. Designed and engineered by Mit Ramavat in Ahmedabad, MMXXVI.
          </p>
        </div>
      </div>
    </PageFrame>
  );
}

/* ------------------------------------------------------------------ assembly */

const page = (id: string, node: ReactNode, spreadOnly = false): BookPage => ({ id, node, spreadOnly });

export function buildBook(): { pages: BookPage[]; chapters: BookChapter[] } {
  const pages: BookPage[] = [
    page("cover", <FrontCover />),
    page("endpaper-front", <Endpaper front />, true),
    page("title", <TitlePage />),
    page("contents", <Contents />),
    page("preface", <Preface />),
    page("about-page", <AboutPage />),
    page("capabilities", <Capabilities />),
    page("work-opener", <WorkOpener />),
    page("work-index", <WorkIndex />),
    ...featured.flatMap((p, i) => [
      page(`${p.slug}-fig`, <ProjectFigure project={p} n={i + 1} folio={F.firstCase + i * 2} />),
      page(`${p.slug}-story`, <ProjectStory project={p} folio={F.firstCase + 1 + i * 2} />),
    ]),
    page("more", <MoreProjects />),
    page("experience", <ExperiencePage />),
    page("journey", <JourneyPage />),
    page("stack", <ToolkitPage />),
    page("contact", <CorrespondencePage />),
    page("letter", <LetterPage />),
    page("colophon", <Colophon />),
    page("endpaper-back", <Endpaper />, true),
    page("back-cover", <BackCover />),
  ];

  const chapters: BookChapter[] = [
    { id: "about", label: "Preface", numeral: "I", pageId: "preface", tint: TINT.preface },
    { id: "work", label: "Work", numeral: "II", pageId: "work-opener", tint: TINT.work },
    { id: "experience", label: "Experience", numeral: "III", pageId: "experience", tint: TINT.experience },
    { id: "stack", label: "Toolkit", numeral: "IV", pageId: "stack", tint: TINT.toolkit },
    { id: "contact", label: "Contact", numeral: "V", pageId: "contact", tint: TINT.contact },
  ];

  return { pages, chapters };
}
