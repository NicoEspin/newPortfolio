import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import LocaleProvider from "@/components/providers/LocaleProvider";
import { getServerMessages } from "@/lib/i18n-server";
import {
  DesktopSmoothScroll,
  FinePointerCursor,
} from "@/components/providers/ResponsiveRuntime";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: "400",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "NE. — Nicolás Espin, Creative Full-Stack Developer";

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getServerMessages();
  const description = messages.layout.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: messages.layout.ogLocale,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { locale } = await getServerMessages();

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body>
        <LocaleProvider initialLocale={locale}>
          <SkipLink />
          <Loader />
          <FinePointerCursor />
          <PageTransition>
            <DesktopSmoothScroll>
              <Nav />
              <main id="main">{children}</main>
              <Footer />
            </DesktopSmoothScroll>
          </PageTransition>
        </LocaleProvider>
      </body>
    </html>
  );
}
