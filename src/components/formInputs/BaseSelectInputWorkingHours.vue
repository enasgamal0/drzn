<template>
  <div :class="col ? `col-lg-${col}` : ''">
    <!-- :class="{ disabled_input: disabled }" -->
    <div class="input_wrapper top_label select_wrapper">
      <multiselect
        :options="optionsList"
        :label="label"
        :track-by="trackBy" 
        placeholder=" "
        :searchable="true"
        :allow-empty="true"
        :show-labels="false"
        :open-direction="'bottom'"
        :value="value"
        @input="
          updateValue($event);
          $emit('fireInputEvent');
        "
        :multiple="multiple"
        :close-on-select="focus"
        v-bind="$attrs"
        v-on="$listeners"
      >
      </multiselect>
    </div>
  </div>
</template>
<script>
export default {
  inheritAttrs:false,
  name: "BaseSelectInput",
  emits: ["fireInputEvent"],
  props: {
    // ====== Start:: General Inputs Props ====== //
    col: {
      required: false,
      type: String,
    },
    optionsList: {
      required: true,
    },
    label:{
     type:String,
     default:'name'
    },
    value: {
      required: true,
    },
    placeholder: {
      required: false,
      type: String,
    },
    multiple: {
      required: false,
      type: Boolean,
      default: false,
    },
     trackBy: {
      required: false,
      type: String,
      default: 'name',
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
    focus: {
      required: false,
      type: Boolean,
      default: true,
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
      console.log("change", e)
      this.$emit("input", e);
    },
  },
};
</script>
