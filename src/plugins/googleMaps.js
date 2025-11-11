import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDzFaE_P__9PK_Sf-5X5yyHVgEJBL3eM1c",
    libraries: "places",
  },
});
