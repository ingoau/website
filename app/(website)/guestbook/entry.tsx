"use client";

import { FormattedDateTime } from "@/components/formatted-date";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { Check, Gavel, Trash, Undo, Verified } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function Entry({
  entry,
}: {
  entry: FunctionReturnType<typeof api.guestbook.get>[number];
}) {
  const user = undefined;
  return (
    <div
      className={cn(
        "p-4 border-b border-dashed relative",
        entry.status == "pending"
          ? "bg-striped-gradient bg-size-[80px_80px] opacity-75"
          : "",
      )}
      key={entry.id}
    >
      {entry.status == "pending" && (
        <div className="text-sm text-neutral-400">Pending Approval</div>
      )}
      <div className="text-primary text-xl flex flex-row gap-2 items-center">
        {entry.name}{" "}
        {entry.verified ? <Verified className="size-5" /> : null}{" "}
      </div>
      <div className="text-sm">
        <FormattedDateTime
          date={new Date(entry.creationTime).toISOString()}
          format="DATETIME"
        />
      </div>
      <div className="text-lg">{entry.message}</div>
      {/*<div className="flex flex-row absolute top-0 right-0">
        {user?.role == "admin" && (
          <>
            <Dialog>
              <DialogTrigger haptic={true} asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Ban</span>
                  <Gavel />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 gap-0">
                <DialogHeader className="p-4 border-b border-dashed">
                  <DialogTitle>Ban User</DialogTitle>
                </DialogHeader>
                <DialogFooter className="grid grid-cols-2 gap-0">
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      className="border-r border-dashed h-full p-2 duration-200 ease-out hover:bg-card active:brightness-75 cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="border-r border-dashed h-full p-2 duration-200 ease-out active:brightness-75 cursor-pointer"
                      onClick={() => {
                        toast.promise(
                          new Promise(async (resolve, reject) => {
                            const response = await authClient.admin.banUser({
                              userId: entry.userId,
                            });
                            if (response.error) {
                              reject(response.error.message);
                            }
                            resolve(true);
                          }),
                          {
                            loading: "Banning user...",
                            success: "User banned",
                            error: (error) => `Failed to ban user: ${error}`,
                          },
                        );
                      }}
                    >
                      Ban
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast.promise(setStatus({ id: entry.id, status: "pending" }), {
                  loading: "Updating status...",
                  success: "Status updated",
                  error: "Failed to update status",
                });
              }}
            >
              <span className="sr-only">Reset to pending</span>
              <Undo />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast.promise(setStatus({ id: entry.id, status: "approved" }), {
                  loading: "Updating status...",
                  success: "Status updated",
                  error: "Failed to update status",
                });
              }}
            >
              <span className="sr-only">Approve</span>
              <Check />
            </Button>
          </>
        )}
        {(user?._id == entry.userId || user?.role == "admin") && (
          <Dialog>
            <DialogTrigger haptic={true} asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Delete</span>
                <Trash />
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 gap-0">
              <DialogHeader className="p-4 border-b border-dashed">
                <DialogTitle>Delete this post?</DialogTitle>
              </DialogHeader>
              <DialogFooter className="grid grid-cols-2 gap-0">
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    className="border-r border-dashed h-full p-2 duration-200 ease-out hover:bg-card active:brightness-75 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    className="border-r border-dashed h-full p-2 duration-200 ease-out active:brightness-75 cursor-pointer"
                    onClick={() => {
                      toast.promise(deleteEntry({ id: entry.id }), {
                        loading: "Deleting...",
                        success: "Post deleted!",
                        error: "Failed to delete post",
                      });
                    }}
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>*/}
    </div>
  );
}
