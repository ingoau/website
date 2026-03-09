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

export default function Search() {
  const $isMenuOpen = useStore(isMenuOpen);

  const pages = [...NAVBAR_ITEMS, ...OTHER_PAGES];

  return (
    <CommandDialog
      open={$isMenuOpen}
      onOpenChange={isMenuOpen.set}
      className="max-w-sm rounded-lg border"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
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
