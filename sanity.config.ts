// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { codeInput } from "@sanity/code-input";
import { schema } from "./sanity/schema";

export default defineConfig({
  name: "ingo.au",
  title: "ingo.au",
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool(), media(), codeInput()],
  schema,
});
