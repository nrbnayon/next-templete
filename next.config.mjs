/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.10.56:3000/:path*",
      },
    ];
  },
  experimental: {
    turbo: {
      rules: {
        jsx: [],
      },
    },
  },
};

export default nextConfig;
