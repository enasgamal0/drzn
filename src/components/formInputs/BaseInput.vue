<template>
  <div class="my-5" :class="col ? `col-lg-${col}` : ''">
    <!-- ========== Start:: Text || Number || Tel || Email Input ========== -->
    <div class="input_wrapper top_label" v-if="type === 'text' ||
      type === 'number' ||
      type === 'tel' ||
      type === 'email' ||
      type === 'date' ||
       type === 'time'
      ">
      <label class="form-label">
        {{ placeholder }}
        <span class="text-danger" v-if="required">*</span>
      </label>
      <input :id="$attrs.id" class="form-control" :type="type" :value="value" @click="$emit('fireClick')"
      :dir="getAppLocale == 'ar' && type == 'tel' ? 'rtl' : ''"

        @input="updateValue($event)" :readonly="readonly" :disabled="disabled" />
    </div>
    <!-- ========== End:: Text || Number || Tel || Email Input ========== -->

    <!-- ========== Start:: Password Input ========== -->
    <div class="input_wrapper top_label password_input_wrapper" v-else-if="type === 'password'">
      <label class="form-label">
        {{ placeholder }}
        <span class="text-danger" v-if="required">*</span>
      </label>
      <input class="form-control" :type="passwordIsVisible ? 'text' : 'password'" :value="value"
        @input="updateValue($event)" :readonly="readonly" :disabled="disabled" readonly 
        onfocus="this.removeAttribute('readonly');"/>
      <button type="button" class="password_visibility_toggler" @click="passwordIsVisible = !passwordIsVisible">
        <i class="fal fa-eye" v-if="passwordIsVisible"></i>
        <i class="fal fa-eye-slash" v-else></i>
      </button>
    </div>
    <!-- ========== End:: Password Input ========== -->

    <!-- ========== Start:: Textarea Input ========== -->
    <div class="input_wrapper top_label" v-if="type === 'textarea'">
      <label class="form-label">
        {{ placeholder }}
        <span class="text-danger" v-if="required">*</span>
      </label>
      <textarea class="form-control" :rows="rows" :value="value" @input="updateValue($event)" :readonly="readonly"
        :disabled="disabled">
      </textarea>
    </div>
    <!-- ========== End:: Textarea Input ========== -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseInput",

  inheritAttrs: false,

  emits: ["fireClick"],

  props: {
    // ====== Start:: General Inputs Props ====== //
    col: {
      required: false,
      type: String,
    },
    value: {
      required: true,
    },
    type: {
      required: true,
      type: String,
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
    // ====== End:: General Inputs Props ====== //

    // ====== Start:: Textarea Input Props ====== //
    rows: {
      required: false,
      type: String,
      default: "4",
    },
    // ====== End:: Textarea Input Props ====== //
  },

  data() {
    return {
      // Start:: Password Visibility Data
      passwordIsVisible: false,
      // End:: Password Visibility Data
    };
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
    },
  },
  computed: {
      // START:: VUEX GET APP THEME
      ...mapGetters("AppLangModule", ["getAppLocale"]),
      // END:: VUEX GET APP THEME
  },
};
</script>
