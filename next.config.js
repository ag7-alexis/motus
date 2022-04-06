const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    pwa: {
        dest: "public",
        swSrc: "src/service-worker/service-worker.js",
    },
    reactStrictMode: true,
});

module.exports = nextConfig;
