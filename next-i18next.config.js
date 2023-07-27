const path = require("path");

module.exports = {
  i18n: {
    locales: ["id", "id", "en", "ph", "pk"],
    localePath: path.resolve("./public/locales"),
    defaultLocale: "id",
    localeDetection: false,
    domains: [
      {
        domain: "suratsakit.sehatcepat.com",
        defaultLocale: "id",
      },
      {
        domain: "sickleave.sehatcepat.com",
        defaultLocale: "en",
      },
      {
        domain: "medicalcertificate.pagalingkaagad.com",
        defaultLocale: "ph",
      },
      {
        domain: "sickleave.getwellsoon.mobi",
        defaultLocale: "pk",
      },
    ],
  },
};
