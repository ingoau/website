"use client";

import clsx from "clsx";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  NestedDrawer,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import {
  LogOut,
  MenuIcon,
  MoreVertical,
  Pen,
  Settings,
  Trash,
} from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";

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
    (pathname.startsWith("/blog/") && !pathname.startsWith("/blog/tag")) ||
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
            {/*{me && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ease: "easeOut" }}
                className="absolute bottom-0 w-full left-0 p-2 border-t border-dashed"
              >
                <User />
              </motion.div>
            )}*/}
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
              {/*{me && (
                <div className="border border-dashed rounded p-2 ">
                  <User setMobileMenuOpen={setMobileMenuOpen} />
                </div>
              )}*/}
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

// function User({
//   setMobileMenuOpen,
// }: {
//   setMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const me = undefined;
//   const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
//   const [deleteAccountDrawerOpen, setDeleteAccountDrawerOpen] = useState(false);
//   const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
//   const { signOut } = useAuthActions();

//   return (
//     <div className="flex w-full items-center gap-2">
//       {me?.role == "write" && <Pen className="size-4" />}
//       <div className="flex flex-col grow">
//         <span>{me?.name}</span>
//         <span>{me?.email}</span>
//       </div>
//       <NestedDrawer
//         open={accountDrawerOpen}
//         onOpenChange={setAccountDrawerOpen}
//         shouldScaleBackground
//       >
//         <DrawerTrigger
//           className={buttonVariants({ variant: "ghost", size: "icon" })}
//         >
//           <MoreVertical />
//         </DrawerTrigger>
//         <DrawerContent>
//           <DrawerTitle className="flex flex-row gap-2 p-2 items-center w-full max-w-lg mx-auto">
//             <Avatar>
//               <AvatarImage src={me?.img} />
//               <AvatarFallback>{me?.name?.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div className="flex flex-col">
//               <p>{me?.name}</p>
//               <p className="text-foreground/75 text-xs">{me?.email}</p>
//             </div>
//           </DrawerTitle>
//           <div className="mx-auto w-full max-w-lg p-2 flex flex-col gap-2">
//             <NestedDrawer
//               open={profileDrawerOpen}
//               onOpenChange={setProfileDrawerOpen}
//               shouldScaleBackground
//             >
//               <DrawerTrigger className={buttonVariants({ variant: "default" })}>
//                 <Pen />
//                 Edit profile
//               </DrawerTrigger>
//               <DrawerContent>
//                 <DrawerHeader>
//                   <DrawerTitle>Edit Profile</DrawerTitle>
//                 </DrawerHeader>
//                 Not implemented
//               </DrawerContent>
//             </NestedDrawer>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setAccountDrawerOpen(false);
//                 if (setMobileMenuOpen) {
//                   setMobileMenuOpen(false);
//                 }
//                 toast.promise(signOut, {
//                   loading: "Logging out...",
//                   success: "Logged out!",
//                   error: "Failed to log out",
//                 });
//               }}
//             >
//               <LogOut />
//               Logout
//             </Button>
//             <NestedDrawer
//               open={deleteAccountDrawerOpen}
//               onOpenChange={setDeleteAccountDrawerOpen}
//               shouldScaleBackground
//             >
//               <DrawerTrigger
//                 className={buttonVariants({ variant: "destructive" })}
//               >
//                 <Trash />
//                 Delete account
//               </DrawerTrigger>
//               <DrawerContent>
//                 <DrawerHeader>
//                   <DrawerTitle>Delete Account</DrawerTitle>
//                 </DrawerHeader>
//                 Not implemented
//               </DrawerContent>
//             </NestedDrawer>
//           </div>
//         </DrawerContent>
//       </NestedDrawer>
//     </div>
//   );
// }
