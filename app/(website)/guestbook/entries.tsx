"use client";

import Entry from "./entry";

export function Entries() {
  return (
    <>
      <Entry
        entry={{
          id: "1",
          message: "Here is a guestbook message for demonstration purposes",
          name: "Ingo",
          creationTime: 1779944724000,
          status: "approved",
          userId: "e",
          verified: true,
        }}
      />
      {/*{entries &&
        entries?.map((entry) => <Entry entry={entry} key={entry.id} />)}*/}
    </>
  );
}
