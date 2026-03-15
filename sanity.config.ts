// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "website",
  title: "Website",
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [
      /* your content types here*/
    ],
  },
});
