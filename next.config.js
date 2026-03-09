/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce JS bundle size — removes prop-types in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Faster page loads
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.clerk.dev" },
    ],
  },
};

module.exports = nextConfig;
