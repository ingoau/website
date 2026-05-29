"use client";

import clsx from "clsx";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

const menuItems = [
  { url: "/", label: "Home" },
  { url: "/projects", label: "Projects" },
  { url: "/blog", label: "Blog" },
  { url: "/contact", label: "Contact" },
];

export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const hideSidebar =
    pathname.startsWith("/projects/") ||
    pathname.startsWith("/blog/") ||
    pathname == "/";
  if (!pathname.startsWith("/studio")) {
    return (
      <>
        <motion.div
          initial={{
            x: -500,
            position: hideSidebar ? "fixed" : "sticky",
          }}
          animate={
            hideSidebar
              ? {
                  filter: "brightness(0.5)",
                  x: -300,
                  position: "fixed",
                  boxShadow: "0 0 100px rgba(0, 0, 0, 0.5)",
                }
              : { x: 0 }
          }
          whileHover={{
            x: 0,
            filter: "brightness(1)",
          }}
          transition={{ ease: [0.165, 0.84, 0.44, 1.0] }}
          className="h-screen sticky top-0 left-0 justify-center flex-col gap-4 border-r border-dashed hidden lg:flex overflow-hidden min-w-fit bg-background z-30"
        >
          <AnimatePresence>
            {menuItems.map((item) => (
              <MenuItem
                key={item.url}
                url={item.url}
                label={item.label}
                className="mx-10"
                setMobileMenuOpen={setMobileMenuOpen}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <Drawer
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
          shouldScaleBackground
        >
          <DrawerContent>
            <DrawerTitle className="sr-only">Menu</DrawerTitle>
            <div className="flex flex-col gap-4 p-5 h-full justify-end">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.url}
                  url={item.url}
                  label={item.label}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
              ))}
            </div>
          </DrawerContent>
        </Drawer>

        <Button
          className="fixed bottom-3 left-3 text-2xl size-15 lg:hidden"
          size="icon"
          variant="outline"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
        </Button>
      </>
    );
  }
}

function MenuItem({
  url,
  label,
  setMobileMenuOpen,
  className = "",
}: {
  url: string;
  label: string;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={url}
      onClick={() => {
        setMobileMenuOpen(false);
      }}
    >
      <motion.span
        animate={{ color: pathname == url ? "var(--primary)" : "var(--muted)" }}
        className={clsx(
          "sm:text-7xl text-6xl text-muted flex-shrink-0 whitespace-nowrap",
          className,
        )}
      >
        {label}
      </motion.span>
    </Link>
  );
}
