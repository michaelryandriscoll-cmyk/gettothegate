/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  allowedDevOrigins: ['192.168.1.178'],
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/parking/spectrum-center-charlotte',
        destination: '/parking/spectrum-center',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
