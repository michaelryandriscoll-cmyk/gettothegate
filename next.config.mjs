/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  allowedDevOrigins: ['192.168.1.178'],
  trailingSlash: true,
}

export default nextConfig