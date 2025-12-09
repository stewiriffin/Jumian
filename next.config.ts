import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', // UploadThing CDN if you decide to use it
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Lorem Picsum for placeholder images
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // IAN placeholder images
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-hot-toast'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Production URL
  ...(process.env.NEXTAUTH_URL && {
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
  }),
};

export default nextConfig;
