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
  title: {
    default: `${SITE.name} — local journal & directory`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${merriweather.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
        </AppProvider>
      </body>
    </html>
  );
}
