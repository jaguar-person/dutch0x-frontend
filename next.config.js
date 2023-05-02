/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'ipfs.loopring.io'],
  },
};

module.exports = nextConfig;
