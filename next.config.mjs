const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  images: {
    domains: ['fastly.picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        port: '',
      },
    ],
  },
};

export default nextConfig;
