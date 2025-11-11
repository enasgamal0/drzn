import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// Start:: Importing Main Sass Styles File
import "./assets/sass/main.scss";
// End:: Importing Main Sass Styles File

// Start:: Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// End:: Importing Bootstrap

// Start:: Importing Plugins
import i18n from "./plugins/i18n";
import axios from "./plugins/axios";
import vuetify from "./plugins/vuetify";
import Antd from "./plugins/antDesign";
import "./plugins/googleMaps";
import "./plugins/formComponents";
import "./plugins/globalComponents";
import "./plugins/3rdPartyLibraries";

import firebase from "firebase/app";
import "firebase/firebase-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBUhjzUxO8OPPylra2BQb62dRSRavk_ovA",
  authDomain: "drzn-2025-c3816.firebaseapp.com",
  projectId: "drzn-2025-c3816",
  storageBucket: "drzn-2025-c3816.firebasestorage.app",
  messagingSenderId: "920754583159",
  appId: "1:920754583159:web:5abf8f1844f846e3edf872",
  measurementId: "G-9MSQFYDB88"
};

firebase.initializeApp(firebaseConfig);
// End:: Importing Plugins

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "9077e2ce86701f17f3b2",
  cluster: "eu",
  forceTLS: true,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  // authEndpoint: "https://backend.Tanfeez.com/broadcasting/auth", // Update with the correct auth endpoint
  // auth: {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem(
  //       "Tanfeez_admin_dashboard_user_token"
  //     )}`, // Use getItem() to retrieve the value
  //   },
  // },
});

// casl vue permissions
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

Vue.use(VueTelInput);

import ability from "./plugins/ability";
import { abilitiesPlugin } from "@casl/vue";
Vue.use(abilitiesPlugin, ability);

// casl vue permissions

// Start:: Set App Lang  & Theme
store.dispatch("AppLangModule/handelAppDefaultLanguage");
store.dispatch("AppThemeModule/handelAppDefaultTheme");
// End:: Set App Lang  & Theme
import * as Sentry from "@sentry/vue";

Sentry.init({
  Vue,
  dsn: "https://fbb0375d9c3dddd586aa67113cb8c02a@o4508131528343552.ingest.de.sentry.io/4508131535552592",
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

Vue.use(Antd);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
