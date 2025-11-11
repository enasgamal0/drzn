import Vue from "vue";

// Start:: Importing 3rd Party Libraries
// ========= Vue Meta
import VueMeta from "vue-meta";
Vue.use(VueMeta);

// ========= Vue Multiselect
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
Vue.component("multiselect", Multiselect);

// ========= IziToast
import iziToast from "izitoast";
import "@/assets/css/iziToast.min.css";
Vue.use(iziToast);
Vue.prototype.$iziToast = iziToast;

// ========= Aos
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

// ========= Vue Chat Scroll
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

// ========= Vue Social Sharing
import VueSocialSharing from "vue-social-sharing";
Vue.use(VueSocialSharing);

// ========= Vue Particles
import VueParticles from "vue-particles";
Vue.use(VueParticles);

// ========= Vue Apex Charts
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

// ========= Vue Editor
import { VueEditor } from "vue2-editor";
Vue.use(VueEditor);
Vue.component("vue-editor", VueEditor);
// End:: Importing 3rd Party Libraries
