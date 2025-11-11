<template>
  <div class="my-5 mx-4" :class="col ? `col-lg-${col}` : ''">
    <div class="input_wrapper switch_wrapper">
      <v-switch
        :color="color"
        :label="label"
        :value="value"
        @change="updateValue($event)"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        hide-details
      ></v-switch>
      <span class="text-danger d-inline-block mx-2" v-if="required">*</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSwitchInput",

  props: {
    // ====== Start:: General Inputs Props ====== //
    col: {
      required: false,
      type: String,
    },
    value: {
      required: true,
    },
    color: {
      required: false,
      type: String,
      default: "#2390C6",
    },
    label: {
      required: false,
      type: String,
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
    readonly: {
      required: false,
      type: Boolean,
      default: false,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    // ====== End:: General Inputs Props ====== //
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e);
    },
  },
};
</script>
