import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
  },
  typegen: {
    enabled: true,
    path: "src/**/*.{ts,tsx,astro}",
  },
  schemaExtraction: {
    enabled: true,
  },
});
