import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Start:: Importing Modules
import AppLangModule from "./modules/appLang/index.js";
import AppThemeModule from "./modules/appTheme/index.js";
import AuthenticationModule from "./modules/authentication/index.js";
import NotificationsModule from "./modules/notifications/index.js";
import ApiGetsModule from "./modules/ApisGets/index";
import PermissionsModule from "./modules/permissions/index";
// End:: Importing Modules

export default new Vuex.Store({
  modules: {
    AppLangModule,
    AppThemeModule,
    AuthenticationModule,
    NotificationsModule,
    ApiGetsModule,
    PermissionsModule,
  },

  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
