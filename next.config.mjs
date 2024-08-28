/** @type {import('next').NextConfig} */
import WithPWA from 'next-pwa';
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/cleanway-next/**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
};

const WithPwa = WithPWA({
  dest: "public", 
  disable: process.env.NODE_ENV === "development", 
  register: true, 
  skipWaiting: true, 
});
export default WithPwa(nextConfig);