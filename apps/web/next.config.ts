import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: "/:all*(ttf|otf|woff|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=63072000, immutable" }],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
      {
        source: "/:all*(mp4|webm|mov)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
      {
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
};

// Remark/rehype plugins are configured in mdx-components.tsx instead of here
// because Next.js 16 Turbopack cannot serialize function references in loader options.
const withMDX = createMDX({});

export default withMDX(nextConfig);
