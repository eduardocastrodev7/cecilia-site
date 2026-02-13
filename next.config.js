/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/plataforma",
        destination: "/#produtos",
        permanent: true,
      },
    ];
  },
  transpilePackages: [],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.cloud.google.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
