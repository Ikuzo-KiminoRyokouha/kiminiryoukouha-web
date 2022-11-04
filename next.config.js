const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = async (phase) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "icons.iconarchive.com",
        },
      ],
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
            register: true,
            skipWaiting: true,
          },
        },
      ],
    ],
    nextConfig
  )(phase, { defaultConfig });
  // return withPlugins([], nextConfig)(phase, { undefined }); // also works
};
