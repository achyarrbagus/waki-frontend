const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  i18n: i18n,
  trailingSlash: true,
  env: {
    URL_API: process.env.URL_API,
    URL_NEXT: process.env.URL_NEXT,
    SENDBIRD_APP_ID: process.env.SENDBIRD_APP_ID,
    SENDBIRD_API_TOKEN: process.env.SENDBIRD_API_TOKEN,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["api.sehatcepat.com"],
  },
};
