// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import sanity from "@sanity/astro";

const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || "",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: {
    prefetchAll: true,
  },

  integrations: [
    react(),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      studioBasePath: "/admin",
    }),
  ],

  compressHTML: true,

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Geist Mono",
        cssVariable: "--font-geist-mono",
        weights: ["100 900"],
      },
      {
        provider: fontProviders.google(),
        name: "Outfit",
        cssVariable: "--font-outfit",
        weights: ["100 900"],
      },
    ],
  },

  adapter: cloudflare({ imageService: "compile" }),
});
