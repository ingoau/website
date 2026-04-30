// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { codeInput } from "@sanity/code-input";
import { schema } from "./sanity/schema";

export default defineConfig({
  name: "ingo",
  title: "ingo.au",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [structureTool(), visionTool(), media(), codeInput()],
  schema,
});
