import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const path = require("path");

export default defineConfig({
  // root: "src",
  build: {
    // Relative to the root
    outDir: "../dist",
  },
  plugins: [
    react({
      include: "**/*.{jsx, tsx}",
      babel: {
        plugins: ["babel-plugin-styled-components"],
      },
    }),
    svgr(),
    createHtmlPlugin({
      inject: {
        data: {
          title:
            process.env.NODE_ENV === "production"
              ? "Simple Todo-list"
              : `Simple Todo-list [${process.env.NODE_ENV.toUpperCase()}]`,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  publicDir: "../public",
});
