import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Footer, Header } from "@/components/SiteChrome";
import { getCopy } from "@/lib/content";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const copy = getCopy();

export const metadata: Metadata = {
  title: {
    default: copy.meta.title,
    template: "%s — Captain0",
  },
  description: copy.meta.description,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${sourceSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-casa font-sans text-casa-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-casa-ink focus:px-3 focus:py-2 focus:text-casa"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
