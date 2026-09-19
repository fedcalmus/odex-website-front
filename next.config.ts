import type { NextConfig } from "next";
import path from "node:path";

// Lets every *.module.scss write `@use "abstracts" as tokens;` from anywhere.
const sassLoadPath = path.join(process.cwd(), "src/styles");

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    // `loadPaths` is the modern Dart Sass API key (what Next 16's Turbopack
    // build reads — without it every stylesheet fails to resolve "abstracts");
    // `includePaths` is the legacy key, kept for the webpack/legacy path.
    loadPaths: [sassLoadPath],
    includePaths: [sassLoadPath],
  },
};

export default nextConfig;
