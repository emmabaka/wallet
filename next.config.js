// /** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },

  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
};

module.exports = nextConfig;
