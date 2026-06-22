import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Menu from "@/components/menu";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ingo's Site",
    default: "Ingo's Site",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div
            vaul-drawer-wrapper=""
            className="flex flex-row w-full bg-background min-h-screen"
          >
            <Menu />
            <div className="w-full">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>
        <Script src="https://archive.ingo.au/switcher.js" defer />
      </body>
    </html>
  );
}
