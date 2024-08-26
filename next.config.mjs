/** @type {import('next').NextConfig} */
import WithPWA from 'next-pwa';
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com']
      },
      compiler: {
        removeConsole: process.env.NODE_ENV !== "development",
      },
};

const WithPwa = WithPWA({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});
export default WithPwa(nextConfig);