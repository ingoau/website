"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/lib/constants";
import { ArrowLeft, Menu, Search } from "lucide-react";
import { useUiState } from "@/lib/state";
import { useScroll, useSpring, useTransform } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function NavbarContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <>
      <div className={cn("w-full fixed top-0 z-20", className)}>
        <div className="w-full h-5 fixed top-0 left-[50%] -translate-x-1/2 px-4 max-w-4xl -z-10">
          <div className="w-full h-full bg-background"></div>
        </div>
        <div className="w-full px-4">
          <div className="max-w-4xl mx-auto w-full h-full">
            <div className="bg-background border-x border-dashed">
              <div className="h-4 bg-striped-gradient bg-size-[80px_80px] bg-fixed opacity-25"></div>
            </div>
          </div>
        </div>
        <div className="w-full border-y border-dashed px-4">
          <nav className="w-full max-w-4xl mx-auto border-x border-dashed flex flex-row bg-background">
            {children}
          </nav>
        </div>
      </div>
      <div className="h-[calc((var(--spacing)*20)-5px)] px-4">
        <div className="max-w-4xl w-full mx-auto border-x h-full border-dashed border-b bg-card bg-striped-gradient bg-size-[80px_80px] bg-fixed"></div>
      </div>
    </>
  );
}

export default function Navbar() {
  const setSearchOpen = useUiState((state) => state.setSearchOpen);

  return (
    <NavbarContainer>
      <MenuLink
        href="/"
        containerClassName="border-l-0 border-r"
        className="text-xl py-4! px-4! active:font-normal font-extrabold min-w-36 font-mono"
        animation={false}
      >
        Ingo Wolf
      </MenuLink>
      <div className="grow bg-striped-gradient bg-size-[80px_80px] bg-fixed"></div>
      <div className="hidden md:flex flex-row">
        {MENU_ITEMS.map((item) => (
          <MenuLink key={item.url} href={item.url}>
            {item.label}
          </MenuLink>
        ))}
      </div>
      <MenuLink
        className="px-6!"
        onClick={() => {
          setSearchOpen(true);
        }}
      >
        <span className="sr-only">Menu</span>
        <Menu className="size-4 md:hidden" />
        <Search className="size-4 md:block hidden" />
      </MenuLink>
    </NavbarContainer>
  );
}

export function PostNavbar({ title }: { title: string }) {
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 100,
    restDelta: 0.001,
    bounce: 0,
  });

  const navbarOpacity = useTransform(scrollY, [0, 49, 50], [0, 0, 1]);
  const navbarY = useTransform(scrollY, [0, 49, 50], [-100, -100, 0]);
  const animatedNavbarOpacity = useSpring(navbarOpacity, {
    stiffness: 1000,
    damping: 100,
    restDelta: 0.001,
    bounce: 0,
  });
  const animatedNavbarY = useSpring(navbarY, {
    stiffness: 1000,
    damping: 100,
    restDelta: 0.001,
    bounce: 0,
  });

  return (
    <div className="fixed top-[calc((var(--spacing)*4)+1px)] w-full h-fit z-20 left-0 overflow-hidden pointer-events-none px-4">
      <motion.div
        style={{
          opacity: animatedNavbarOpacity,
          y: animatedNavbarY,
        }}
        className="w-full max-w-4xl mx-auto border-x border-dashed flex flex-row bg-background z-50 relative pointer-events-auto"
      >
        <MenuLink
          href="/blog"
          className="px-6!"
          containerClassName="border-l-0"
          animation={false}
        >
          <span className="sr-only">Back</span>
          <ArrowLeft className="size-4" />
        </MenuLink>
        <div className="grow flex items-center min-h-full py-4 px-2 text-xl">
          <p className="line-clamp-1">{title}</p>
        </div>
        <MenuLink
          className="px-6!"
          containerClassName="border-l-0"
          onClick={() => {
            setSearchOpen(true);
          }}
        >
          <span className="sr-only">Menu</span>
          <Menu className="size-4" />
        </MenuLink>
        <motion.div
          className="top-0 left-0 absolute w-full h-full bg-popover -z-10 origin-left "
          style={{ scaleX }}
        ></motion.div>
      </motion.div>
    </div>
  );
}

function MenuLink({
  children,
  href,
  className,
  containerClassName,
  animation = true,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  containerClassName?: string;
  animation?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  const isActive =
    animation && (pathname === href || (pathname === "/index" && href === "/"));

  const linkClassName = clsx(
    "h-full px-8 py-4 w-fit flex justify-center items-center duration-200 ease-out",
    "hover:bg-card active:brightness-75",
    isActive && "text-primary",
    className,
  );

  return (
    <div className={clsx("border-l border-dashed", containerClassName)}>
      {href ? (
        <Link href={href} onClick={onClick} className={linkClassName}>
          {children}
        </Link>
      ) : (
        <button
          className={clsx("cursor-pointer", linkClassName)}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </div>
  );
}
