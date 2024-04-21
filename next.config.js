/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yehfedra.com',
      },
    ],
  },
};

module.exports = nextConfig;
