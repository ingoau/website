"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const errors: Record<string, { title: string; description: string }> = {
  banned: {
    title: "You have been banned",
    description: "Skill issue",
  },
  account_already_linked_to_different_user: {
    title: "Account Already Linked",
    description: "This account is already linked to a different user.",
  },
};

export default function ErrorParamHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorParam = searchParams.get("error");
  const errorData = errorParam ? errors[errorParam] : null;

  return (
    <>
      {errorParam}
      <Dialog
        open={!!errorData}
        onOpenChange={(open) => !open && router.push("/")}
      >
        {errorData && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{errorData.title}</DialogTitle>
              <DialogDescription>{errorData.description}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
