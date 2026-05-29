import Link from "@/components/custom-link";
import NextLink from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiSignal } from "react-icons/si";
import { MENU_ITEMS, OTHER_PAGES } from "@/lib/constants";
import Image from "next/image";
import { Button as WinButton } from "@react95/core";
import "@react95/core/themes/win95.css";
import Webrings from "./webrings";

export function Footer() {
  return (
    <div className="flex flex-col grow">
      <div className="w-full px-4 grow min-h-10 flex flex-col">
        <div className="bg-background max-w-4xl mx-auto w-full flex grow bg-striped-gradient bg-size-[80px_80px] bg-fixed border-x border-dashed h-full"></div>
      </div>
      <div className="w-full px-4">
        <div className="max-w-4xl w-full mx-auto text-sm border-l border-dashed flex flex-col sm:flex-row sm:border-b border-t bg-background">
          <div className="flex flex-col border-r border-dashed col-span-3">
            <NextLink
              href="/"
              className="flex text-xl p-4 border-b border-dashed active:font-normal font-extrabold font-mono duration-200 ease-out hover:bg-card active:brightness-75"
            >
              Ingo Wolf
            </NextLink>
            <div className="flex flex-row">
              <NextLink
                href="mailto:me@ingo.au"
                target="_blank"
                className="border-r border-b  border-dashed p-4 aspect-square w-fit flex justify-center items-center duration-200 ease-out hover:bg-card active:brightness-75"
              >
                <span className="sr-only">Email</span>
                <Mail className="size-4" />
              </NextLink>
              <NextLink
                href="https://github.com/ingoau"
                target="_blank"
                className="border-r border-b  border-dashed p-4 aspect-square w-fit flex justify-center items-center duration-200 ease-out hover:bg-card active:brightness-75"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="size-4" />
              </NextLink>
              <NextLink
                href="https://signal.me/#eu/aON_wvkns7bfeU-UAj_09B1Yym8WVC2QIWWV8rIhYZzPc2xGLUtBeLWMc9LJoWNB"
                target="_blank"
                className="border-r border-b  border-dashed p-4 aspect-square w-fit flex justify-center items-center duration-200 ease-out hover:bg-card active:brightness-75"
              >
                <span className="sr-only">Signal</span>
                <SiSignal className="size-4" />
              </NextLink>
              <NextLink
                href="/contact"
                className="border-r border-b  border-dashed p-4 aspect-square w-fit flex justify-center items-center duration-200 ease-out hover:bg-card active:brightness-75"
              >
                <span className="sr-only">Contact</span>
                <ArrowRight className="size-4" />
              </NextLink>
              <div className="border-b border-dashed grow bg-striped-gradient bg-size-[80px_80px] bg-fixed min-w-20"></div>
            </div>
            <div className="hidden sm:block h-full bg-striped-gradient bg-size-[80px_80px] bg-fixed min-h-10"></div>
          </div>
          <div className="hidden sm:block bg-striped-gradient bg-size-[80px_80px] bg-fixed border-r border-dashed grow"></div>
          <div className="flex flex-col min-w-64">
            <div className="border-r border-b border-dashed bg-background p-2 font-mono text-lg">
              Pages
            </div>
            <div className="flex-col grid grid-cols-2 h-fit">
              {[...MENU_ITEMS, ...OTHER_PAGES].map((item) => (
                <NextLink
                  key={item.url}
                  href={item.url}
                  className="w-full p-2 border-b border-r border-dashed duration-200 ease-out hover:bg-card active:brightness-75"
                >
                  {item.label}
                </NextLink>
              ))}
              {([...MENU_ITEMS, ...OTHER_PAGES].length - 1) % 2 === 0 && (
                <div className="border-r border-b bg-card border-dashed"></div>
              )}
            </div>
            <div className="hidden sm:block h-full bg-striped-gradient bg-size-[80px_80px] bg-fixed min-h-10 border-r border-dashed"></div>
          </div>
        </div>
        <div className="max-w-4xl w-full mx-auto flex border-x border-dashed items-end bg-striped-gradient bg-size-[80px_80px] bg-fixed sm:flex-row flex-col-reverse pt-10 gap-10 sm:pt-0 bg-background">
          <div className="px-4 py-2 sm:border-r border-dashed flex items-center justify-center w-full sm:w-fit border-t bg-background">
            <span className="font-mono">
              This website is{" "}
              <Link href="https://github.com/ingoau/website" target="_blank">
                open source
              </Link>
            </span>
          </div>
          <div className="grow hidden md:block"></div>
          <Webrings />
        </div>
      </div>

      <div className="w-full px-4">
        <div className="max-w-4xl w-full mx-auto border-x border-t border-dashed p-4 bg-background text-black font-win">
          <div
            className="p-2 gap-2 w-fit mx-auto"
            style={{
              boxShadow:
                "0.5px 0.5px 0 0.5px black, inset 1px 1px #C2C6CA, inset -1px -1px #85898d, inset 2px 2px white",
              background: "#c2c6ca",
            }}
          >
            <div className="flex flex-row pb-2">
              <span className="text-lg">88x31 Buttons</span>
              <div className="grow" />
              <Link href="/buttons/ingo.png" download>
                <WinButton>Download My Button</WinButton>
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-fit">
              {[
                {
                  src: "/buttons/convex.gif",
                  alt: "Convex",
                  href: "https://convex.dev",
                },
                {
                  src: "/buttons/ctp.webp",
                  alt: "Catppuccin",
                  href: "https://catppuccin.com",
                },
                {
                  src: "/buttons/github.png",
                  alt: "GitHub",
                  href: "https://github.com",
                },
                {
                  src: "/buttons/hackclub.gif",
                  alt: "Hack Club",
                  href: "https://hackclub.com",
                },
                {
                  src: "/buttons/next.gif",
                  alt: "Next.js",
                  href: "https://nextjs.org",
                },
                {
                  src: "/buttons/home-assistant.gif",
                  alt: "Home Assistant",
                  href: "https://home-assistant.io",
                },
                {
                  src: "/buttons/macosmade.gif",
                  alt: "Made with macos",
                  href: "https://en.wikipedia.org/wiki/MacOS",
                },
                {
                  src: "/buttons/neovim.gif",
                  alt: "Neovim",
                  href: "https://neovim.io",
                },
                {
                  src: "/buttons/codingcorner.png",
                  alt: "Coding Corner",
                  href: "https://codingcorner.dev",
                },
                {
                  src: "/buttons/slitro.png",
                  alt: "Slitro Studio",
                  href: "https://site.slitrostudio.me/",
                },
                {
                  src: "/buttons/ultrafastparrot.gif",
                  alt: "Ultrafastparrot Cult",
                  href: "https://ultrafastparrot.net",
                },
                {
                  src: "/buttons/notoverkill.gif",
                  alt: "Notoverkill",
                  href: "https://notoverkill.com",
                },
              ].map((button) => (
                <WinButton key={button.alt} className="p-0!" tabIndex={-1}>
                  <Link key={button.alt} href={button.href} target="_blank">
                    <Image
                      loading="lazy"
                      src={button.src}
                      alt={button.alt}
                      className="w-[88px] h-[31px]"
                      width={88}
                      height={31}
                    />
                  </Link>
                </WinButton>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-dashed w-full px-4">
        <div className="max-w-4xl w-full mx-auto border-x border-dashed h-4"></div>
      </div>
    </div>
  );
}
