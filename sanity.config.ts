// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "ingo.au",
  title: "ingo.au",
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [
      /* your content types here*/
    ],
  },
});
