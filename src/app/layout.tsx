import { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import Appbar from "./components/Appbar";
import SignInPanel from "./components/signInPanel";
import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://retroia.com"
  ),
  title: {
    default: "Retroia - Emlak ve Gayrimenkul",
    template: "%s | Retroia",
  },
  description:
    "Türkiye genelinde satılık ve kiralık emlak ilanları, gayrimenkul yatırım fırsatları.",
  keywords: [
    "emlak",
    "gayrimenkul",
    "satılık",
    "kiralık",
    "ev",
    "daire",
    "villa",
    "arsa",
  ],
  authors: [{ name: "Retroia" }],
  creator: "Retroia",
  publisher: "Retroia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Retroia",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    // Add more icon sizes if needed
    // apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#172B4D"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#172B4D" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta property="og:locale" content="tr_TR" />
        <link
          rel="alternate"
          href="https://emlak.retroia.com"
          hrefLang="tr-TR"
        />
      </head>
      <body className={raleway.className}>
        <Providers>
          <Appbar>{/* <SignInPanel /> */}</Appbar>
          {children}
          <ToastContainer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
