import { Suspense } from "react";
import type { Metadata } from "next";
import { Poppins, Merriweather } from "next/font/google";
import { AppProvider } from "@/components/providers/AppProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { SITE } from "@/lib/constants";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.brand }],
  publisher: SITE.brand,
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`,
        secureUrl: `${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`,
        width: 1024,
        height: 576,
        type: "image/jpeg",
        alt: "Keesara.city — మీ ఇల్లు మీ ఇష్టం",
      },
      {
        url: `${SITE.url}/og-image.jpg`,
        secureUrl: `${SITE.url}/og-image.jpg`,
        width: 1024,
        height: 576,
        type: "image/jpeg",
        alt: "Keesara.city",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [`${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${merriweather.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta property="og:image" content={`${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`} />
        <meta property="og:image:secure_url" content={`${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="576" />
        <meta property="og:image:alt" content="Keesara.city — మీ ఇల్లు మీ ఇష్టం" />
        <meta name="twitter:image" content={`${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full w-full overflow-x-hidden flex flex-col antialiased">
        <AppProvider>
          <Header />
          <main className="flex-1 w-full overflow-x-hidden">{children}</main>
          <Footer />
          <Suspense fallback={null}>
            <MobileNav />
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}