import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import Hotkeys from "@/lib/hotkeys";
import EasterEgg from "@/components/easter-egg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="w-full px-4">
          <main className="max-w-4xl mx-auto w-full bg-background">
            {children}
          </main>
        </div>
        <Footer />
        <div className="w-full h-full bg-striped-gradient bg-size-[80px_80px] bg-fixed fixed top-0 left-0 -z-50 opacity-25"></div>
      </div>
      <Hotkeys />
      <EasterEgg />
    </>
  );
}
