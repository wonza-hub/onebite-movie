const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search.pstatic.net",
      },
    ],
  },
};

export default nextConfig;
