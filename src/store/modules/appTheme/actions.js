export default {
  // START:: SET APP THEME
  setAppTheme(context, payload) {
    localStorage.setItem("drzn_admin_dashboard_theme", payload);
    context.commit("setAppTheme", payload);
  },
  // END:: SET APP THEME

  // START:: HANDEL DEFAULT APP THEME
  handelAppDefaultTheme(context) {
    if (!context.getters.getAppTheme) {
      context.dispatch("setAppTheme", "light_theme");
      document.querySelector("body").classList.add("light_theme");
    } else {
      document.querySelector("body").classList.add(context.getters.getAppTheme);
    }
  },
  // END:: HANDEL DEFAULT APP THEME

  // START:: HANDLING APP THEME CHANGE
  changeAppTheme(context) {
    if (context.getters.getAppTheme == "light_theme") {
      context.dispatch("setAppTheme", "dark_theme");
      document.querySelector("body").classList.add("dark_theme");
      document.querySelector("body").classList.remove("light_theme");
    } else {
      context.dispatch("setAppTheme", "light_theme");
      document.querySelector("body").classList.add("light_theme");
      document.querySelector("body").classList.remove("dark_theme");
    }
  },
  // END:: HANDLING APP THEME CHANGE
};
