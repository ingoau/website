"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { AUTH_PROVIDERS, MENU_ITEMS, OTHER_PAGES } from "@/lib/constants";
import { useUiState } from "@/lib/state";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { SanityDocument } from "sanity";
import {
  ArrowRight,
  Copy,
  LogOut,
  Mail,
  MessageCircle,
  Trash,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

interface PostWithSlug extends SanityDocument {
  slug?: {
    current: string;
  };
  body?: Array<{ children?: Array<{ text?: string }> }>;
}

interface SearchDialogProps {
  posts: PostWithSlug[];
}

export function SearchDialog({ posts }: SearchDialogProps) {
  const searchOpen = useUiState((state) => state.searchOpen);
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const router = useRouter();
  const session = authClient.useSession();
  const pathname = usePathname();
  const [linkedAccounts, setLinkedAccounts] = useState<string[]>([]);
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      const accounts = await authClient.listAccounts();
      if (accounts.data) {
        setLinkedAccounts(accounts.data.map((account) => account.providerId));
      }
    };
    if (session.data) {
      fetchLinkedAccounts();
    }
  }, [session]);

  const accountCommands = [
    ...(session.data?.user
      ? [
          {
            label: "Sign out",
            icon: <LogOut />,
            onSelect: async () => {
              setSearchOpen(false);
              toast.promise(authClient.signOut(), {
                loading: "Signing out...",
                success: "Signed out",
                error: "Failed to sign out",
              });
            },
          },
          {
            label:
              "Delete Account" +
              (deletingAccount ? " - PRESS AGAIN TO CONFIRM" : ""),
            icon: <Trash />,
            onSelect: async () => {
              if (deletingAccount) {
                toast.promise(authClient.deleteUser(), {
                  loading: "Deleting account...",
                  success: "Account deleted",
                  error: "Failed to delete account",
                });
              } else {
                setDeletingAccount(true);
              }
            },
          },
          ...AUTH_PROVIDERS.map((provider) => {
            const linked = linkedAccounts.includes(provider.id);
            return {
              label: `${linked ? "Unlink" : "Link"} ${provider.label}`,
              icon: <provider.icon />,
              onSelect: async () => {
                setSearchOpen(false);
                toast.promise(
                  new Promise((resolve, reject) => {
                    if (linked) {
                      authClient
                        .unlinkAccount({
                          providerId: provider.id,
                        })
                        .then((result) =>
                          result.error ? reject(result.error) : resolve(null),
                        );
                    } else if (provider.type == "social") {
                      authClient
                        .linkSocial({
                          provider: provider.id,
                          callbackURL: pathname,
                        })
                        .then((result) =>
                          result.error ? reject(result.error) : resolve(null),
                        );
                    } else {
                      authClient.oauth2
                        .link({
                          providerId: provider.id,
                          callbackURL: pathname,
                        })
                        .then((result) =>
                          result.error ? reject(result.error) : resolve(null),
                        );
                    }
                  }),
                  {
                    loading: `${linked ? "Unlinking" : "Linking"} account...`,
                    success: `${linked ? "Unlinked account" : "Redirecting..."}`,
                    error: (error) =>
                      `${linked ? "Failed to unlink" : "Failed to link"} account: ${error.message}`,
                  },
                );
              },
            };
          }),
        ]
      : AUTH_PROVIDERS.map((provider) => ({
          label: `Sign in with ${provider.label}`,
          icon: <provider.icon />,
          onSelect: async () => {
            setSearchOpen(false);
            toast.promise(
              new Promise((resolve, reject) => {
                if (provider.type == "social") {
                  authClient.signIn
                    .social({
                      provider: provider.id,
                      callbackURL: pathname,
                    })
                    .then((result) =>
                      result.error ? reject(result.error) : resolve(null),
                    );
                } else {
                  authClient.signIn
                    .oauth2({
                      providerId: provider.id,
                      callbackURL: pathname,
                    })
                    .then((result) =>
                      result.error ? reject(result.error) : resolve(null),
                    );
                }
              }),
              {
                loading: "Signing in...",
                success: "Redirecting...",
                error: (error) => `Failed to sign in: ${error.message}`,
              },
            );
          },
        }))),
  ];

  const commands = [
    {
      label: "Copy Email",
      icon: <Copy />,
      onSelect: () => {
        navigator.clipboard.writeText("me@ingo.au");
        setSearchOpen(false);
        toast.success("Copied");
      },
    },
    {
      label: "Email",
      icon: <Mail />,
      onSelect: () => {
        location.href = "mailto:me@ingo.au";
        setSearchOpen(false);
      },
    },
    {
      label: "Signal",
      icon: <MessageCircle />,
      onSelect: () => {
        window.open(
          "https://signal.me/#eu/aON_wvkns7bfeU-UAj_09B1Yym8WVC2QIWWV8rIhYZzPc2xGLUtBeLWMc9LJoWNB",
        );
        setSearchOpen(false);
      },
    },
  ];

  return (
    <CommandDialog
      className="top-4 sm:top-24 translate-y-0 bottom-auto"
      open={searchOpen}
      onOpenChange={setSearchOpen}
    >
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {[...MENU_ITEMS, ...OTHER_PAGES].map((item) => (
            <CommandItem
              className="cursor-pointer"
              key={item.url}
              onSelect={() => {
                router.push(item.url);
                setSearchOpen(false);
              }}
            >
              <ArrowRight />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Commands">
          {commands.map((command) => (
            <CommandItem key={command.label} onSelect={command.onSelect}>
              {command.icon}
              {command.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Account">
          {accountCommands.map((command) => (
            <CommandItem key={command.label} onSelect={command.onSelect}>
              {command.icon}
              {command.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Posts">
          {posts.map((post) => {
            const excerpt =
              post.body
                ?.map((b: { children?: Array<{ text?: string }> }) =>
                  (b.children || [])
                    .map((c: { text?: string }) => c.text || "")
                    .join(""),
                )
                .join(" ")
                .split("\n")[0] || "";

            return (
              <CommandItem
                className="cursor-pointer"
                key={post._id}
                onSelect={() => {
                  if (post.slug?.current) {
                    router.push(`/blog/${post.slug.current}`);
                    setSearchOpen(false);
                  }
                }}
              >
                <ArrowRight />
                <div className=" flex-col items-start gap-1">
                  <div className="font-medium">{post.title as string}</div>
                  {excerpt && (
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {excerpt}
                    </div>
                  )}
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
