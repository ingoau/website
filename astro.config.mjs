// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import sanity from "@sanity/astro";
import Icons from "unplugin-icons/vite";
import sitemap from "@astrojs/sitemap";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || "",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: "https://ingo.au",
  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: "astro",
      }),
    ],
  },

  prefetch: {
    prefetchAll: true,
  },

  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${PUBLIC_SANITY_PROJECT_ID}/production/**`,
      },
    ],
  },

  integrations: [
    react(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      studioBasePath: "/admin",
      useCdn: false,
    }),
    sitemap(),
  ],

  compressHTML: true,

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

  adapter: cloudflare({ imageService: "compile" }),
});
