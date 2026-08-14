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
const description =
  "Nicolás Espin — creative full-stack developer y fundador de Synttek. Córdoba, Argentina. Sistemas controlados, experiencias vivas.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Saltar al contenido
        </a>
        <Loader />
        <FinePointerCursor />
        <PageTransition>
          <DesktopSmoothScroll>
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </DesktopSmoothScroll>
        </PageTransition>
      </body>
    </html>
  );
}
