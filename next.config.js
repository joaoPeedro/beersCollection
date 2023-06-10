/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.punkapi.com", "cloudflare-ipfs.com"],
  },
  env: {
    BEERS_GATEWAY: process.env.BEERS_GATEWAY,
    COMMENTS_GATEWAY: process.env.COMMENTS_GATEWAY,
  },
};

module.exports = nextConfig;
