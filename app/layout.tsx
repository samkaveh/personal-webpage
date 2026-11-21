import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import SiteNav from "./components/site/SiteNav";
import SiteFooter from "./components/site/SiteFooter";
import Motion from "./components/site/Motion";
import { SITE_URL } from "./lib/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: "Sam Kaveh — Staff Software Engineer & AI Systems Architect",
    template: "%s — Sam Kaveh",
  },
  description:
    "Sam Kaveh, PhD — Staff Software Engineer building agentic AI systems, demand forecasting platforms and large-scale data infrastructure. Combining scientific rigor with end-to-end software ownership.",
  openGraph: {
    title: "Sam Kaveh — Staff Software Engineer & AI Systems Architect",
    description:
      "Staff Software Engineer specializing in applied ML/AI, agentic systems, and high-scale data platforms.",
    type: "website",
    siteName: "Sam Kaveh",
    url: "/",
  },
  twitter: {
    card: "summary",
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Sam Kaveh — Writing" }],
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sam Kaveh",
  honorificSuffix: "PhD",
  jobTitle: "Staff Software Engineer",
  url: `${SITE_URL}/`,
  sameAs: [
    "https://www.linkedin.com/in/sam-kaveh/",
    "https://github.com/samkaveh",
  ],
  knowsAbout: [
    "Agentic AI",
    "Machine learning",
    "Demand forecasting",
    "MLOps",
    "Distributed data systems",
    "Rust",
    "Python",
  ],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Hamburg" },
};

export const viewport = {
  themeColor: "#f4eee3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <Motion />
        <main id="main">{children}</main>
        <SiteFooter />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EV51J1SKL9" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EV51J1SKL9');
          `}
        </Script>
      </body>
    </html>
  );
}
