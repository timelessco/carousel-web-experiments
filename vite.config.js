import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: "/index.html",
  },
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
