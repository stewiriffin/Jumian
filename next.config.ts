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
    ],
  },
};

export default nextConfig;
