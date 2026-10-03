import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Italiana } from "next/font/google";
import { ProjectProvider } from "@/components/ProjectProvider";
import { Footer, Header } from "@/components/SiteChrome";
import { getCopy } from "@/lib/content";
import "./globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-dm",
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
      className={`${italiana.variable} ${dmSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-paper font-sans text-ink">
        <ProjectProvider>
          <a href="#main" className="skip">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
        </ProjectProvider>
      </body>
    </html>
  );
}
