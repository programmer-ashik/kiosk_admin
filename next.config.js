/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '103.107.184.80',
          port: '3000',
          pathname: '/uploads/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  
  