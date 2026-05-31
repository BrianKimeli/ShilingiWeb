import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { 
        source: "/blog", 
        destination: "/times", 
        permanent: true 
      },
      // ONLY redirect to the new domain if the request is coming from the old app domain
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
      // When landing on the blog domain, silently mask the root to show /times content
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
      // Handle deeper blog paths (e.g., shilingitimes.vercel.app/post-1) without breaking assets
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