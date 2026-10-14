import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans, Manrope } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { siteConfig } from "@/config/site";
import { themeStyle } from "@/config/theme";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const motionBoot = `(function(){try{var k="sfera-motion";var s=localStorage.getItem(k);var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var on=s==="on"?true:s==="off"?false:!r;document.documentElement.setAttribute("data-motion",on?"on":"off");}catch(e){document.documentElement.setAttribute("data-motion","on");}})();`;

export const metadata: Metadata = {
  metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  applicationName: siteConfig.companyName,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.studio.name }],
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    locale: siteConfig.seo.locale,
    type: "website",
    siteName: siteConfig.companyName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    description: siteConfig.seo.description,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(siteConfig.siteUrl ? { url: siteConfig.siteUrl } : {}),
  };

  return (
    <html
      lang="mn"
      suppressHydrationWarning
      className={`${manrope.variable} ${plex.variable} ${plexMono.variable}`}
      style={themeStyle()}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
