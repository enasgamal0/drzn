// START:: IMPORTING I18N
import i18n from "../../../plugins/i18n";
// END:: IMPORTING I18N

export default {
  // START:: SET APP LOCALE
  setAppLocale(context, payload) {
    localStorage.setItem("drzn_admin_dashboard_language", payload);
    context.commit("setAppLocale", payload);
  },
  // END:: SET APP LOCALE

  // START:: HANDEL DEFAULT APP LANGUAGE
  handelAppDefaultLanguage(context) {
    if (!context.getters.getAppLocale) {
      context.dispatch("setAppLocale", "ar");
      i18n.locale = "ar";
      document.querySelector("body").setAttribute("dir", "rtl");
    } else {
      i18n.locale = context.getters.getAppLocale;
      if (context.getters.getAppLocale == "en") {
        document.querySelector("body").setAttribute("dir", "ltr");
      } else {
        document.querySelector("body").setAttribute("dir", "rtl");
      }
    }
  },
  // END:: HANDEL DEFAULT APP LANGUAGE

  // START:: HANDLING APP LANGUAGE CHANGE
  changeAppLanguage(context, payload) {
    if (payload == "en") {
      context.dispatch("setAppLocale", "en");
      i18n.locale = context.getters.getAppLocale;
      document.querySelector("body").setAttribute("dir", "ltr");
      location.reload();
    } else if (payload == "ar") {
      context.dispatch("setAppLocale", "ar");
      i18n.locale = context.getters.getAppLocale;
      document.querySelector("body").setAttribute("dir", "rtl");
      location.reload();
    }
  },
  // END:: HANDLING APP LANGUAGE CHANGE
};
