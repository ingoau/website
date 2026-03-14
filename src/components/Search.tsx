import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Calculator,
  Calendar,
  ChevronRight,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { isMenuOpen } from "@/lib/state";
import { useStore } from "@nanostores/react";
import { NAVBAR_ITEMS, OTHER_PAGES } from "@/lib/constants";
import { useCommandState } from "cmdk";
import { useEffect, useState } from "react";
import { prefetch } from "astro:prefetch";

export default function Search() {
  const $isMenuOpen = useStore(isMenuOpen);
  const pages = [...NAVBAR_ITEMS, ...OTHER_PAGES];

  useEffect(() => {
    if ($isMenuOpen) {
      NAVBAR_ITEMS.forEach((page) =>
        prefetch(page.url, { eagerness: "immediate" }),
      );
      OTHER_PAGES.forEach((page) =>
        prefetch(page.url, { eagerness: "moderate" }),
      );
    }
  }, [$isMenuOpen]);

  return (
    <CommandDialog open={$isMenuOpen} onOpenChange={isMenuOpen.set}>
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.url}
              data-url={page.url}
              onSelect={() => {
                location.href = page.url;
              }}
            >
              <ChevronRight />
              <span>{page.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
