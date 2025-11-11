<template>
  <div class="my-5" :class="col ? `col-lg-${col}` : ''">
    <div class="input_wrapper top_label">
      <label class="form-label" v-if="placeholder">
        {{ placeholder }}
        <span class="text-danger" v-if="required">*</span>
      </label>

      <v-rating
        :dir="getAppLocale == 'ar' ? 'rtl' : 'ltr'"
        class="text-center w-100"
        :background-color="backgroundColor"
        :color="color"
        :empty-icon="emptyIcon"
        :half-icon="halfIcon"
        :full-icon="fullIcon"
        :length="length"
        :size="size"
        :value="value"
        hover
        @click="$emit('fireClick')"
        @input="updateValue($event)"
        :disabled="disabled"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseRateInput",

  inheritAttrs: false,

  emits: ["fireClick"],

  props: {
    // ====== Start:: General Inputs Props ====== //
    col: {
      required: false,
      type: String,
    },
    value: {
      type: Number,
      required: true,
    },
    backgroundColor: {
      required: false,
      default: "warning",
    },
    color: {
      required: false,
      default: "warning",
    },
    emptyIcon: {
      required: false,
      default: "fal fa-star",
    },
    halfIcon: {
      required: false,
      default: "fas fa-star-half-alt",
    },
    fullIcon: {
      required: false,
      default: "fas fa-star",
    },
    size: {
      required: false,
      default: 30,
    },
    length: {
      required: false,
      default: 5,
    },
    placeholder: {
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
    readonly: {
      required: false,
      type: Boolean,
      default: false,
    },
    // ====== End:: General Inputs Props ====== //

    // ====== Start:: Textarea Input Props ====== //
    rows: {
      required: false,
      type: String,
      default: "4",
    },
    // ====== End:: Textarea Input Props ====== //
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e);
    },
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },
};
</script>
