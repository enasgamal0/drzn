import Vue from "vue";

// Start::Global Components Inputs
import ImageModal from "@/components/modals/ImageModal.vue";
import DescriptionModal from "@/components/modals/DescriptionModal.vue";
// End::Global Components Inputs

Vue.component("image-modal", ImageModal);
Vue.component("description-modal", DescriptionModal);
