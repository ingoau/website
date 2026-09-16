import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "n6kwawc1",
    dataset: "production",
  },
  typegen: {
    enabled: true,
    path: "src/**/*.{ts,tsx,astro}",
  },
  schemaExtraction: {
    enabled: true,
  },
});
