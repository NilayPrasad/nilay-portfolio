import type { Metadata } from "next";
import { Fragment_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const mono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nnp.design"),
  title: {
    default: `${site.fullName} · ${site.role}`,
    template: `%s · ${site.initials}`,
  },
  description: site.statement,
  openGraph: {
    title: `${site.fullName} · ${site.role}`,
    description: site.statement,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <head>
        {/* Switzer is the display + text face across the whole site. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll />
        {/* Keyboard users land on the nav first; this skips the chrome. */}
        <a
          href="#main"
          className="t-meta sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-black"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
