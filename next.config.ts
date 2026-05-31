import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { 
        source: "/blog", 
        destination: "/times", 
        permanent: true 
      },
      {
        source: '/times',
        has: [
          {
            type: 'host',
            value: 'shilingiapp.vercel.app',
          },
        ],
        destination: 'https://shilingitimes.vercel.app',
        permanent: false,
      },
      {
        source: '/times/:path*',
        has: [
          {
            type: 'host',
            value: 'shilingiapp.vercel.app',
          },
        ],
        destination: 'https://shilingitimes.vercel.app/:path*',
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'shilingitimes.vercel.app',
          },
        ],
        destination: '/times',
      },
      {
        source: '/:path((?!_next/static|_next/image|favicon.ico|api).*)',
        has: [
          {
            type: 'host',
            value: 'shilingitimes.vercel.app',
          },
        ],
        destination: '/times/:path*',
      },
    ];
  },
};

export default nextConfig;