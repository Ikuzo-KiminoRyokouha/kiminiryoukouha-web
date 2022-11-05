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
