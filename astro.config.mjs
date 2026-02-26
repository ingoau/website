// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: {
    prefetchAll: true,
  },

  integrations: [react()],

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
