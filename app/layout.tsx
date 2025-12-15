import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingWaitlistButton } from "@/components/features/waitlist/FloatingWaitlistButton";
import { HeroCarouselProvider } from "@/contexts/HeroCarouselContext";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <HeroCarouselProvider>
            <div className="relative flex flex-col min-h-screen overflow-x-hidden">
              <Navbar />
              <main className="flex-grow w-full">
                {children}
              </main>
              <Footer />
              <FloatingWaitlistButton />
            </div>
          </HeroCarouselProvider>
        </Providers>
      </body>
    </html>
  );
}
