const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = async (phase) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      domains: ["tong.visitkorea.or.kr", "picsum.photos"],
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false };

      return config;
    },
  };

  const defaultConfig = {};
  return withPlugins(
    [
      [
        withPWA,
        {
          pwa: {
            dest: "public",
            /*             register: true,
            skipWaiting: true, */
            disable: process.env.NODE_ENV === "production" ? false : true,
          },
        },
      ],
    ],
    nextConfig
  )(phase, { defaultConfig });
  // return withPlugins([], nextConfig)(phase, { undefined }); // also works
};
