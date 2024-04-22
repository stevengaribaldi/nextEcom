/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'nextecom-production.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'www.yehfedra.com', 
      },
    ],
  },
};

export default nextConfig;
