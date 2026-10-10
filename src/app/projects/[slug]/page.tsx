import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import ProjectCover from "@/components/ProjectCover";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/motion/SmoothScroll";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const findIndex = (slug?: string) =>
  projects.findIndex((p) => p.slug.toLowerCase() === slug?.toLowerCase());

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[findIndex(slug)];

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mit-ramavat-portfolio.vercel.app";

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Mit Ramavat`,
      description: project.description,
      url: `${siteUrl}/projects/${project.slug}`,
      siteName: "Mit Ramavat Portfolio",
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Mit Ramavat`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = findIndex(slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.duration },
    { label: "Status", value: project.status },
    { label: "Year", value: project.year },
  ].filter((m) => m.value);

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main id="main" className="paper-texture pt-24 sm:pt-32">
        <div className="container-x">
          <Reveal>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 label-mono text-muted transition-colors hover:text-ink"
            >
              <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span>
              Back to the book
            </Link>
          </Reveal>

          <header className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Reveal>
                <p className="label-mono text-iridescent">
                  {String(currentIndex + 1).padStart(2, "0")} — {project.category}
                </p>
              </Reveal>
              <h1 className="mt-5 text-[clamp(2.8rem,8vw,8rem)] font-serif font-normal leading-[0.9] tracking-[-0.03em]">
                {project.title}
              </h1>
            </div>
            <Reveal delay={0.3} className="md:col-span-4">
              <p className="text-[15px] leading-relaxed text-muted">{project.description}</p>
            </Reveal>
          </header>

          <Reveal delay={0.2} className="mt-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line bg-surface sm:aspect-[16/8]">
              <ProjectCover project={project} priority sizes="100vw" />
            </div>
          </Reveal>

          <Reveal>
            <dl className="mt-6 grid grid-cols-2 border-y border-line md:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label} className="border-line py-6 pr-4 [&:not(:last-child)]:md:border-r md:px-6 md:first:pl-0">
                  <dt className="label-mono text-dim">{m.label}</dt>
                  <dd className="mt-2 text-lg font-medium tracking-tight">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* overview */}
          <section className="grid gap-10 py-24 md:grid-cols-12 sm:py-32">
            <Reveal className="md:col-span-4">
              <p className="label-mono text-muted">(01) Overview</p>
            </Reveal>
            <Reveal className="md:col-span-8">
              <p className="text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium leading-[1.3] tracking-[-0.02em] text-ink/90">
                {project.longDescription}
              </p>
            </Reveal>
          </section>

          {/* metrics */}
          {project.metrics && (
            <section className="grid gap-10 border-t border-line py-24 md:grid-cols-12 sm:py-32">
              <Reveal className="md:col-span-4">
                <p className="label-mono text-muted">(02) By the numbers</p>
              </Reveal>
              <div className="md:col-span-8">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-line bg-line">
                  {project.metrics.map((m, i) => (
                    <Reveal key={m.label} delay={i * 0.08} className="bg-paper p-6 sm:p-8">
                      <p className="text-3xl font-medium tracking-[-0.04em] sm:text-5xl">{m.value}</p>
                      <p className="mt-3 label-mono text-muted">{m.label}</p>
                    </Reveal>
                  ))}
                </div>
                {project.note && (
                  <Reveal>
                    <p className="mt-5 flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm" />
                      {project.note}
                    </p>
                  </Reveal>
                )}
              </div>
            </section>
          )}

          {/* features */}
          <section className="grid gap-10 border-t border-line py-24 md:grid-cols-12 sm:py-32">
            <Reveal className="md:col-span-4">
              <p className="label-mono text-muted">({project.metrics ? "03" : "02"}) What it does</p>
            </Reveal>
            <ol className="md:col-span-8">
              {project.features.map((f, i) => (
                <li key={f} className="border-b border-line first:border-t">
                  <Reveal className="flex items-baseline gap-6 py-5">
                    <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg tracking-tight text-ink/90 sm:text-xl">{f}</span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          {/* challenge & learning */}
          <section className="grid gap-6 border-t border-line py-24 md:grid-cols-2 sm:py-32">
            {[
              { k: "The hard part", v: project.challenge },
              { k: "What I learned", v: project.learning },
            ].map((b, i) => (
              <Reveal key={b.k} delay={i * 0.1}>
                <article className="h-full rounded-[24px] border border-line bg-surface p-6 sm:p-10">
                  <p className="label-mono text-iridescent">{b.k}</p>
                  <p className="mt-6 text-[15px] leading-relaxed text-muted sm:text-base">{b.v}</p>
                </article>
              </Reveal>
            ))}
          </section>

          {/* stack + links */}
          <section className="grid gap-10 border-t border-line py-16 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="label-mono text-muted">Built with</p>
            </Reveal>
            <Reveal className="flex flex-col gap-10 md:col-span-8">
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="rounded-full border border-line px-4 py-2 font-mono text-xs text-ink/80">
                    {t}
                  </li>
                ))}
              </ul>
              {(project.github || project.demo) && (
                <div className="flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper"
                    >
                      <FaGithub /> View source
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          </section>
        </div>

        {/* next project */}
        <Link
          href={`/projects/${nextProject.slug}`}
         
          className="group relative mt-10 block overflow-hidden border-t border-line"
        >
          <div className="container-x flex flex-col gap-4 py-20 sm:py-28">
            <p className="label-mono text-muted">Next project</p>
            <p className="text-[clamp(2.6rem,8vw,8rem)] font-medium leading-[0.9] tracking-[-0.055em] transition-transform duration-700 ease-out-expo group-hover:translate-x-4">
              {nextProject.title}
              <span className="ml-4 inline-block font-serif italic font-normal text-iridescent transition-transform duration-700 group-hover:translate-x-3">
                →
              </span>
            </p>
          </div>
          <div className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-surface transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
        </Link>
      </main>
      <Footer />
    </>
  );
}
