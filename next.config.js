const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
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
    reactStrictMode: false  , //이거 스트릭트모드 온 오프 
    swcMinify: true,
    webpack5: true,
    compiler: {
      styledComponents: true,
    },
    webpack: (config) => {
      config.resolve.fallback = { fs: false };

      return config;
    },
  };

  const defaultConfig = {};
  return withPlugins(
    [
      [withBundleAnalyzer],
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
