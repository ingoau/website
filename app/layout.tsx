import type { Metadata } from "next";
import { Geist_Mono, Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Search from "@/components/search";
import ErrorParamHandler from "@/components/error-param-handler";
import { Suspense } from "react";
import localFont from "next/font/local";
import Script from "next/script";

const jost = Jost({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--geist-mono",
});

const winFont = localFont({
  src: "./W95FA.otf",
  variable: "--font-win",
});

export const metadata: Metadata = {
  title: { default: "Ingo's Site", template: "%s | Ingo's Site" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://pagering.gideon.sh/embed.js" defer />
      <body
        className={`${jost.className} ${geistMono.variable} ${winFont.variable} antialiased`}
      >
        <ThemeProvider attribute="class" forcedTheme="dark">
          {children}
          <Toaster position="top-right" offset={{ top: 16, right: 16 }} />
          <Search />
          <Suspense>
            <ErrorParamHandler />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
