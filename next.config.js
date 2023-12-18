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
  async headers() {
    return [
      {
        // Permitir solicitações do IP específico para a rota /api/comments
        source: "/api/comments",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://93.176.86.249",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
      // Adicione outras configurações de cabeçalho conforme necessário
    ];
  },
};

module.exports = nextConfig;
