import "./globals.css";
import Providers from "@/components/Providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import CursorTrail from "@/components/CursorTrail";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mit-ramavat.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mit Ramavat | AI Engineer & Full Stack Developer",
    template: "%s | Mit Ramavat",
  },
  description:
    "AI Engineer, Machine Learning Engineer, and Full Stack Developer building intelligent applications, machine learning solutions, and modern web experiences using FastAPI, Next.js, and React.",
  keywords: [
    "Mit Ramavat",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
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
    title: "Mit Ramavat | AI Engineer & Full Stack Developer",
    description:
      "AI Engineer, Machine Learning Engineer, and Full Stack Developer building intelligent applications, machine learning solutions, and modern web experiences.",
    url: siteUrl,
    siteName: "Mit Ramavat Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Mit Ramavat - AI Engineer & Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mit Ramavat | AI Engineer & Full Stack Developer",
    description:
      "AI Engineer, Machine Learning Engineer, and Full Stack Developer building intelligent applications and modern web experiences.",
    images: ["/profile.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Mit Ramavat",
      jobTitle: "AI Engineer & Full Stack Developer",
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
      className={cn("font-sans", geist.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="overflow-x-hidden max-w-full">
        <Providers>{children}</Providers>
        <CursorTrail />
      </body>
    </html>
  );
}