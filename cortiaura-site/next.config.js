/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    return [{ source: '/blog/hello-cortiaura', destination: '/about', permanent: true }];
  }
};

module.exports = nextConfig;
