import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

/* Self-hosted at build time — no external request, no layout shift. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const DESCRIPTION =
  "Portfolio of Sudeep Vishwakarma — Java Full Stack Developer building scalable applications with Java, J2EE, Spring Boot, Hibernate, MySQL and React.js.";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Java Full Stack Developer",
    "Software Developer",
    "Spring Boot",
    "Hibernate",
    "J2EE",
    "Servlets",
    "JSP",
    "MySQL",
    "React.js",
    "Portfolio",
    "Foodly",
    "AI Resume Optimizer",
  ],
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.title}`,
    description: DESCRIPTION,
    siteName: `${profile.name} Portfolio`,
    locale: "en_IN",
    images: [{ url: profile.photo, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: DESCRIPTION,
    images: [profile.photo],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F8FC" },
    { media: "(prefers-color-scheme: dark)", color: "#080B14" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

/** Schema.org Person markup so search engines can read the resume facts. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  image: profile.photo,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  description: profile.objective,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Government Engineering College, Challakere",
    },
  ],
  knowsAbout: [
    "Java",
    "J2EE",
    "Servlets",
    "JSP",
    "JDBC",
    "Hibernate",
    "Spring",
    "Spring Boot",
    "Spring MVC",
    "REST APIs",
    "MySQL",
    "React.js",
    "Object Oriented Programming",
  ],
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${mono.variable}`}
    >
      <head>
        {/*
          Runs before first paint so the correct theme class is already on
          <html>. Without this the page would flash light before a client
          effect could switch it to dark.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('sv:theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');}document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
