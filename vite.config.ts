/// <reference types="vitest" />
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Resolve @/ to the source root directory
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Use a fixed port
    port: 5173,
    strictPort: true,
  },
  test: {
    environment: "jsdom",
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)", "tests/**/*.?(c|m)[jt]s?(x)"],
    coverage: {
      provider: "v8",
      include: ["src/**"],
    },
    setupFiles: "./vitest-setup.ts",
  },
});
