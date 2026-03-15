// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || "",
  process.cwd(),
  "",
);

export default defineConfig({
  name: "website",
  title: "Website",
  projectId: PUBLIC_SANITY_PROJECT_ID!,
  dataset: PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [
      /* your content types here*/
    ],
  },
});
