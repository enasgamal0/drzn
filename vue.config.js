module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/admin-dashboard" : "/",

  pwa: {
    name: "drzn admin Dashboard",
    description: "",
    startUrl: "index.html",
    scope: ".",
    display: "standalone",
    orientation: "portrait-primary",
    lang: "ar-KSA",
    themeColor: "#F6A513",
    msTileColor: "#F6A513",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#F6A513",
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
            @import "~@/assets/sass/abstracts/_variables.scss";
            @import "~@/assets/sass/abstracts/_mixins.scss";
          `,
      },
    },
  },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: undefined,
      enableInSFC: undefined,
    },
  },
};
