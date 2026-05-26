import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? "/WEB" : "",
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;

