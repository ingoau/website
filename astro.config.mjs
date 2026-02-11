// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

import sanity from "@sanity/astro";

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
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      useCdn: false,
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
        name: "Jost",
        cssVariable: "--font-jost",
        weights: ["100 900"],
      },
    ],
  },

  adapter: cloudflare(),
});
