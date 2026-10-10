import "./globals.css";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono, Newsreader } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  colorScheme: "light",
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mit-ramavat-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mit Ramavat | AI / ML Engineer",
    template: "%s | Mit Ramavat",
  },
  description:
    "Mit Ramavat is an AI/ML engineer building voice agents, machine learning systems and intelligent products — from data pipelines and models to production APIs and interfaces.",
  keywords: [
    "Mit Ramavat",
    "AI Engineer",
    "Machine Learning Engineer",
    "AI Agents",
    "LLM Engineer",
    "Python Developer",
    "FastAPI Developer",
    "Artificial Intelligence",
    "Machine Learning",
    "Next.js",
    "React",
    "Portfolio",
  ],
  authors: [
    {
      name: "Mit Ramavat",
    },
  ],
  creator: "Mit Ramavat",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Mit Ramavat | AI / ML Engineer",
    description:
      "AI/ML engineer building voice agents, machine learning systems and intelligent products.",
    url: siteUrl,
    siteName: "Mit Ramavat Portfolio",
    images: [
      {
        url: "/mit-office.webp",
        width: 1122,
        height: 1402,
        alt: "Mit Ramavat — AI / ML Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mit Ramavat | AI / ML Engineer",
    description:
      "AI/ML engineer building voice agents, machine learning systems and intelligent products.",
    images: ["/mit-office.webp"],
  },
  verification: {
    google: "bY62PxN7Mis0EezurpyY8xC46ZDBIN_D01Yq_sSe2SI",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Mit Ramavat",
      jobTitle: "AI / ML Engineer",
      description:
        "BCA Graduate specializing in Artificial Intelligence, Machine Learning, Deep Learning, FastAPI, Next.js and React.",
      url: siteUrl,
      sameAs: [
        "https://github.com/RamavatMit",
        "https://www.linkedin.com/in/mit-ramavat-937a30339/",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Python",
        "FastAPI",
        "Next.js",
        "React",
        "TypeScript",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Mit Ramavat Portfolio",
      description: "Official Developer Portfolio of Mit Ramavat",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(interTight.variable, instrumentSerif.variable, jetbrainsMono.variable, newsreader.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}