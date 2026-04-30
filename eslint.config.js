import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";

export default defineConfig([
  ...eslintPluginAstro.configs.all,
  globalIgnores(["dist", "node_modules", ".astro"]),
]);
