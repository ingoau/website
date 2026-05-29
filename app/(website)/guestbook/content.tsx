"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut, Pencil } from "lucide-react";
import { StripedSeparator } from "@/components/striped-separator";
import { Entries } from "./entries";

export default function Page() {
  // const session = authClient.useSession();
  // const [authLoading, setAuthLoading] = useState(false);
  // const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [nameChangeDialogOpen, setNameChangeDialogOpen] = useState(false);
  // const [nameChangeDialogLoading, setNameChangeDialogLoading] = useState(false);
  // const [inputtedName, setInputtedName] = useState("");

  // async function handleNameChange() {
  //   if (inputtedName !== session.data?.user.name) {
  //     if (inputtedName.length === 0) {
  //       toast.error("Name cannot be empty");
  //       return;
  //     }
  //     setNameChangeDialogLoading(true);
  //     const { error } = await authClient.updateUser({ name: inputtedName });
  //     setNameChangeDialogLoading(false);
  //     if (error) {
  //       toast.error(error.message);
  //       return;
  //     }
  //   }
  //   setNameChangeDialogOpen(false);
  //   toast.success("Name updated");
  // }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-52 border-b border-dashed">
        <div className="p-2 bg-card border-b w-full text-center border-dashed">
          Posting is disabled since this is an archived copy of this website
        </div>
        <textarea
          className="w-full h-full resize-none p-4 outline-0"
          placeholder="Your message here"
        />
        <div className="border-t border-dashed w-full flex sm:flex-row flex-col">
          <div className="flex flex-row sm:border-0 border-b border-dashed">
            <div className="border-r border-dashed px-4 py-2 sm:w-auto w-full">
              Posting as <span className="text-primary">you</span>
            </div>
            <Button
              variant="ghost"
              className="aspect-square h-full flex items-center justify-center cursor-pointer sm:border-r border-dashed duration-200 ease-out hover:bg-card active:brightness-75 bg-background"
            >
              <Pencil className="size-4" />
            </Button>
          </div>
          <div className="flex flex-row sm:border-0 border-b border-dashed">
            <div
              className={cn(
                "border-r border-dashed px-4 py-2 sm:w-auto w-full",
              )}
            >
              {/*{session.data?.user.email}*/}
              iwill@hackthisclub.com
            </div>
            <Button
              variant="ghost"
              className="aspect-square h-full flex items-center justify-center cursor-pointer sm:border-r border-dashed duration-200 ease-out hover:bg-card active:brightness-75 bg-background"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
          <div className="hidden sm:block grow bg-striped-gradient bg-size-[80px_80px]"></div>
          <Button
            disabled={true}
            variant="ghost"
            className="px-8 py-2 sm:h-full flex items-center justify-center cursor-pointer sm:border-l border-dashed duration-200 ease-out hover:bg-card active:brightness-75 bg-background border-0"
          >
            Post
          </Button>
        </div>
        {/*<Authenticated>
          <textarea
            disabled={loading}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-full resize-none p-4 outline-0"
            placeholder="Your message here"
          />
          <div className="border-t border-dashed w-full flex sm:flex-row flex-col">
            <div className="flex flex-row sm:border-0 border-b border-dashed">
              <div className="border-r border-dashed px-4 py-2 sm:w-auto w-full">
                Posting as{" "}
                <span className="text-primary">{session.data?.user.name}</span>
              </div>
              <Dialog
                open={nameChangeDialogOpen}
                onOpenChange={(open) => {
                  setNameChangeDialogOpen(open);
                  if (open) {
                    setInputtedName(session.data?.user.name || "");
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    disabled={loading}
                    variant="ghost"
                    className="aspect-square h-full flex items-center justify-center cursor-pointer sm:border-r border-dashed duration-200 ease-out hover:bg-card active:brightness-75 bg-background"
                  >
                    <Pencil className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 gap-0">
                  <DialogHeader className="p-4 border-b border-dashed">
                    <DialogTitle>Change Name</DialogTitle>
                  </DialogHeader>
                  <Input
                    className="bg-transparent! border-0 z-10"
                    value={inputtedName}
                    onChange={(e) => setInputtedName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleNameChange();
                      }
                    }}
                  />
                  <DialogFooter className="grid grid-cols-2 gap-0 border-t border-dashed">
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        className="border-r border-dashed h-full p-2 duration-200 ease-out hover:bg-card active:brightness-75 cursor-pointer"
                        disabled={nameChangeDialogLoading}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      className="border-r border-dashed h-full p-2 duration-200 ease-out active:brightness-75 cursor-pointer"
                      onClick={handleNameChange}
                      disabled={nameChangeDialogLoading}
                    >
                      {nameChangeDialogLoading && <Spinner />}
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-row sm:border-0 border-b border-dashed">
              <div
                className={cn(
                  "border-r border-dashed px-4 py-2 sm:w-auto w-full",
                  session.data?.user.role === "admin" && "text-red-400",
                )}
              >
                {session.data?.user.email}
              </div>
              <Button
                disabled={loading}
                variant="ghost"
                className="aspect-square h-full flex items-center justify-center cursor-pointer sm:border-r border-dashed duration-200 ease-out hover:bg-card active:brightness-75 bg-background"
                onClick={() => {
                  setLoading(true);
                  toast.promise(authClient.signOut(), {
                    loading: "Signing out...",
                    success: "Signed out",
                    error: "Failed to sign out",
                    finally: () => setLoading(false),
                  });
                }}
              >
                <LogOut className="size-4" />
              </Button>
            </div>
            <div className="hidden sm:block grow bg-striped-gradient bg-size-[80px_80px]"></div>
            <Button
              disabled={loading || message.length === 0}
              variant="ghost"
              className="px-8 py-2 sm:h-full flex items-center justify-center cursor-pointer sm:border-l border-dashed duration-200 ease-out hover:bg-card active:brightness-75 bg-background border-0"
              onClick={async () => {
                setLoading(true);
                toast.promise(post({ message }), {
                  loading: "Posting...",
                  success: () => {
                    setMessage("");
                    return "Posted!";
                  },
                  error: "Failed to post",
                  finally: () => {
                    setLoading(false);
                  },
                });
              }}
            >
              Post
            </Button>
          </div>
        </Authenticated>
        <Unauthenticated>
          <div className="flex flex-col justify-center w-full h-full bg-striped-gradient bg-size-[80px_80px]">
            <h2 className="text-xl ml-6 p-2 h-full border-l border-dashed flex items-end">
              Log in to post to the guestbook
            </h2>
            <Carousel
              className="w-full border-y border-dashed"
              opts={{ skipSnaps: true }}
              plugins={[WheelGesturesPlugin()]}
            >
              <CarouselContent className="px-10">
                {AUTH_PROVIDERS.map((provider) => (
                  <CarouselItem
                    key={provider.id}
                    className="basis-auto pl-0 border-r first:border-l border-dashed"
                  >
                    <SignInButton
                      key={provider.id}
                      provider={provider}
                      setAuthLoading={setAuthLoading}
                      disabled={authLoading}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="h-full border-l border-dashed ml-6"></div>
          </div>
        </Unauthenticated>
        <AuthLoading>
          <Spinner />
        </AuthLoading>*/}
      </div>

      <StripedSeparator className="border-x-0" />

      <Entries />
    </>
  );
}

// function SignInButton({
//   provider,
//   setAuthLoading,
//   disabled,
// }: {
//   provider: (typeof AUTH_PROVIDERS)[number];
//   setAuthLoading: (loading: boolean) => void;
//   disabled?: boolean;
// }) {
//   const [loading, setLoading] = useState(false);
//   const pathname = usePathname();

//   return (
//     <Button
//       variant="ghost"
//       className="cursor-pointer px-4 py-2 duration-200 ease-out hover:bg-card active:brightness-75 bg-background"
//       key={provider.id}
//       onClick={async () => {
//         setLoading(true);
//         setAuthLoading(true);
//         toast.promise(
//           new Promise((resolve, reject) => {
//             if (provider.type == "social") {
//               authClient.signIn
//                 .social({
//                   provider: provider.id,
//                   callbackURL: pathname,
//                 })
//                 .then((result) =>
//                   result.error ? reject(result.error) : resolve(null),
//                 );
//             } else {
//               authClient.signIn
//                 .oauth2({
//                   providerId: provider.id,
//                   callbackURL: pathname,
//                 })
//                 .then((result) =>
//                   result.error ? reject(result.error) : resolve(null),
//                 );
//             }
//           }),
//           {
//             loading: "Signing in...",
//             success: "Redirecting...",
//             error: (error) => `Failed to sign in: ${error.message}`,
//           },
//         );
//       }}
//       disabled={loading || disabled}
//     >
//       <Spinner
//         className={cn(
//           "duration-200 absolute opacity-0",
//           loading && "opacity-100",
//         )}
//       />
//       <provider.icon
//         className={cn("duration-200 opacity-100", loading && "opacity-0")}
//       />
//       <span className={cn("duration-200 opacity-100", loading && "opacity-0")}>
//         {provider.label}
//       </span>
//     </Button>
//   );
// }
