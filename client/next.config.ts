import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.lottusse.com',
      },
    ],
  },
  // Redirects all others routes to /product
  async redirects() {
    return [
      {
        source: '/((?!product).*)',
        destination: '/product',
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;
