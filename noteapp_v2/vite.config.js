import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    exclude: [
      "node_modules/**",
      "dist/**",
      "index.js",
      "models/**",
      "controllers/**",
      "tests/**",
      "utils/**",
    ],
    setupFiles: "./src/setupTests.js",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
    fs: {
      allow: [".."],
    },
  },
});
