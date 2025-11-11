import Vue from "vue";

// Start::Forms Inputs
import BaseInput from "@/components/formInputs/BaseInput.vue";
// import BasePhoneInput from "@/components/formInputs/BasePhoneInput.vue";
import BaseSelectInput from "@/components/formInputs/BaseSelectInput.vue";
import BaseSelectInputWorkingHours from "@/components/formInputs/BaseSelectInputWorkingHours.vue";
import BasePickerInput from "@/components/formInputs/BasePickerInput.vue";
import BaseSwitchInput from "@/components/formInputs/BaseSwitchInput.vue";
import BaseRateInput from "@/components/formInputs/BaseRateInput.vue";
import BaseImageUploadInput from "@/components/formInputs/BaseImageUploadInput.vue";
import BaseMultiImageUploadInput from "@/components/formInputs/BaseMultiImageUploadInput.vue";
import BaseNamePreviewFileUploadInput from "@/components/formInputs/BaseNamePreviewFileUploadInput.vue";
import BaseTextEditor from "@/components/formInputs/BaseTextEditor.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
// End::Forms Inputs

Vue.component("base-input", BaseInput);
// Vue.component("base-phone-input", BasePhoneInput);
Vue.component("base-select-input", BaseSelectInput);
Vue.component("base-select-input-working-hours", BaseSelectInputWorkingHours);
Vue.component("base-picker-input", BasePickerInput);
Vue.component("base-switch-input", BaseSwitchInput);
Vue.component("base-image-upload-input", BaseImageUploadInput);
Vue.component("base-multi-image-upload-input", BaseMultiImageUploadInput);
Vue.component("base-rate-input", BaseRateInput);
Vue.component(
  "base-name-preview-file-upload-input",
  BaseNamePreviewFileUploadInput
);
Vue.component("base-text-editor", BaseTextEditor);
Vue.component("base-button", BaseButton);
