import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Frontend-only: build to pure static HTML so any static host can serve it
  // and search engines index fully-rendered pages.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
