import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Use this package as tracing root when a parent folder has another lockfile. */
  outputFileTracingRoot: __dirname,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://em.realscout.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://em.realscout.com https://www.realscout.com",
              "frame-src 'self' https://em.realscout.com https://www.realscout.com https://www.google.com https://maps.google.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
