<template>
  <div class="my-5" :class="col ? `col-lg-${col}` : ''">
    <div class="input_wrapper top_label">
      <label class="form-label">
        {{ placeholder }}
        <span class="text-danger" v-if="required">*</span>
      </label>
      <!-- :key="defaultCountry" -->
      <vue-tel-input
        @input="updateValue"
        :autoFormat="false"
        @country-changed="countryChanged"
        :defaultCountry="isoCountryCode"
        :key="isoCountryCode"
        :disabled="disabled"
        :inputOptions="{ placeholder: placeholder }"
        v-model="value"
      />
    </div>
  </div>
</template>

<script>
import vueInput from "vue-tel-input/dist/vue-tel-input.common";
import CountryCodes from "../../assets/CountryCodes.json";

export default {
  name: "BasePhoneInput",
  props: {
    placeholder: String,
    value: {
      type: String,
      required: true,
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
    col: {
      required: false,
      type: String,
    },
    defaultCountry: {
      required: false,
      type: String,
    },
    key: {
      required: false,
      type: String,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isoCountryCode() {
      const dialCode = this.defaultCountry?.startsWith("+")
        ? this.defaultCountry
        : `+${this.defaultCountry}`;

      const country = CountryCodes.find((c) => c.dial_code == dialCode);
      return country ? country.code.toLowerCase() : null;
    },
  },

  methods: {
    countryChanged(country) {
      this.$emit("dialCode", country.dialCode);
      this.$emit("isoCode", country.iso2);
    },

    updateValue(number) {
      this.$emit("input", number);
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-tel-input {
  width: 100% !important;
}
.vti__dropdown-list.below {
  z-index: 3 !important;
  left: -326px !important;
}
</style>
<style lang="scss">
.vti__dropdown-list.below {
  z-index: 3 !important;
}
</style>

