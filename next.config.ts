import type { NextConfig } from "next";
import path from "node:path";

// Lets every *.module.scss write `@use "abstracts" as tokens;` from anywhere.
const sassLoadPath = path.join(process.cwd(), "src/styles");

// Club logos/covers are served by the backend (Django media). next/image only
// optimises hosts it has been told about, so allow the API's own origin.
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL) : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: apiUrl
      ? [
          {
            protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
            hostname: apiUrl.hostname,
            port: apiUrl.port,
            pathname: "/media/**",
          },
        ]
      : [],
  },
  sassOptions: {
    // `loadPaths` is the modern Dart Sass API key (what Next 16's Turbopack
    // build reads — without it every stylesheet fails to resolve "abstracts");
    // `includePaths` is the legacy key, kept for the webpack/legacy path.
    loadPaths: [sassLoadPath],
    includePaths: [sassLoadPath],
  },
};

export default nextConfig;
