/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  images: {
    domains: ['fastly.picsum.photos'],
  },
};

export default nextConfig;
