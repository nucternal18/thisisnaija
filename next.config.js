const withPWA = require("next-pwa");
/**
 * @type {import('next').NextConfig}
 **/
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  eslint: {
    dirs: ["pages", "lib", "context", "components", "config"],
  },
});
