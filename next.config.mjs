/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
