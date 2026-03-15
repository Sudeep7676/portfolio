import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudeep Vishwakarma | Full Stack Developer",
  description:
    "Portfolio of Sudeep Vishwakarma - Full Stack Developer, Java Developer & React Developer. Building modern web apps with Next.js, Spring Boot, and more.",
  keywords: [
    "Sudeep Vishwakarma",
    "Full Stack Developer",
    "React Developer",
    "Java Developer",
    "Next.js",
    "Spring Boot",
    "Portfolio",
  ],
  authors: [{ name: "Sudeep Vishwakarma" }],
  openGraph: {
    title: "Sudeep Vishwakarma | Full Stack Developer",
    description:
      "Portfolio of Sudeep Vishwakarma - Full Stack Developer specializing in React, Next.js, Java & Spring Boot.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
