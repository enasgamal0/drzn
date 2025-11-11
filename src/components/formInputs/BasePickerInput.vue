<template>
  <div class="my-5" :class="col ? `col-lg-${col}` : ''">
    <!-- ========== Start:: Date Picker Input ========== -->
    <div class="input_wrapper top_label" v-if="type === 'date'">
      <label class="form-label">
        {{ placeholder }}
        <span class="text-danger" v-if="required">*</span>
      </label>
      <a-date-picker
        dir="rtl"
        placeholder=""
        format="YYYY-MM-DD"
        valueFormat="YYYY-MM-DD"
        :value="value"
        :disabled-date="disabledDate"
        @change="updateValue($event)"
        :readonly="readonly"
        :disabled="disabled"
      />
    </div>
    <!-- ========== End:: Date Picker Input ========== -->
     <!-- ========== Start:: Time Picker Input ========== -->
    <div class="input_wrapper top_label" v-if="type === 'time'">
      <label class="form-label">
        {{ placeholder }}
        <span class="text-danger" v-if="required">*</span>
      </label>
      <a-time-picker
        placeholder=""
        format="HH:mm"
        valueFormat="HH:mm"
        :value="value"
        @change="updateValue($event)"
        :readonly="readonly"
        :disabled="disabled"
        class="w-100"
      />
    </div>
    <!-- ========== End:: Time Picker Input ========== -->
  </div>
</template>

<script>
export default {
  name: "BasePickerInput",

  props: {
    // ====== Start:: General Inputs Props ====== //
    col: {
      required: false,
      type: String,
    },
    value: {
      required: true,
    },
    disabledDate: {
      required: false,
    },
    type: {
      required: true,
      type: String,
      validator: (value) => ['date', 'time'].includes(value),
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
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e);
    },
  },
};
</script>
