import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
              "frame-src 'self' https://em.realscout.com https://www.realscout.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
