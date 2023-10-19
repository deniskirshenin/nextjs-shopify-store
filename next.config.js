/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.shopify.com", "tailwindui.com"]
    },
    reactStrictMode: true,
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
