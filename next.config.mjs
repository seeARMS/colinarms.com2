/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'chat.cma.xyz',
          },
        ],
        permanent: false,
        destination: 'https://calendly.com/colinarms/:path*',
      },
    ]
  },
}

export default nextConfig
