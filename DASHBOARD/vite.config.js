/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },

  //để rút ngắn đường dẫn khi import file:
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
