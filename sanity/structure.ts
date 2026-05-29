import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("ingo.au")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("projectTag").title("Project Tags"),
      S.divider(),
      S.documentTypeListItem("photo").title("Photos"),
      S.divider(),
      S.documentTypeListItem("redirect").title("Redirects"),
    ]);
