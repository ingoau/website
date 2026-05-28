import Header from "@/components/header";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

import { Metadata } from "next";
import Page from "./content";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Say hello :)",
};

export default async function PageWrapper() {
  return (
    <div className="max-w-4xl w-full mx-auto border-x border-dashed">
      <Header>Guestbook</Header>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-96 border-b border-dashed bg-card">
            <Spinner />
          </div>
        }
      >
        <Page />
      </Suspense>
    </div>
  );
}
