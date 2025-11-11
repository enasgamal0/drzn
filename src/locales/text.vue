<template>
  <div>
    <label v-if="label" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <v-select
      v-model="inputValue"
      :options="options"
      :multiple="multiple"
      @blur="onBlur"
      :loading="loading"
      @select="onSelect"
      @click="$emit('click')"
      :reduce="reduce"
      :label="labelOption"
      :disabled="!editable"
      :clearable="clearable && !required"
      :placeholder="props.placeholder"
      :class="flat ? 'datatable-filter-input-flat' : ''"
    >
      <!-- use the slot option to define how the options are displayed -->
      <template #option="option">
        <slot name="custom-option" :option="option"></slot>
      </template>

      <!-- use the slot selected-option to define how the selected options are displayed -->
      <template #selected-option="option">
        <slot name="custom-selected-option" :option="option"></slot>
      </template>

      <!-- use the slot selected-option-container to define how the selected options container is displayed -->
      <template #selected-option-container="option">
        <slot name="custom-selected-option-container" :option="option.option">
          <template v-if="!multiple">
            <div class="flex content-center items-center">
              {{ option.option[labelOption] }}
            </div>
          </template>
        </slot>
      </template>

      <!-- use to change  open-indicator -->
      <template #open-indicator>
        <slot name="custom-open-indicator"></slot>
      </template>

      <!-- use to change  clear-indicator -->
      <template #clear-indicator>
        <slot name="custom-clear-indicator"></slot>
      </template>

      <!-- use to change  clear-indicator -->
      <template #list-footer>
        <slot name="custom-list-footer"></slot>
      </template>
    </v-select>

    <div
      class="invalid-feedback animated fadeIn d-block"
      v-if="!!rulesErrors.length || !!errorMessage.length"
    >
      <div v-for="message in rulesErrors" :key="message">
        {{ message }}
      </div>

      <div v-for="message in errorMessage" :key="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
//import "vue-select/dist/vue-select.css";

const props = defineProps({
  label: {
    type: String,
    require: false,
    default: null,
  },

  modelValue: {
    type: [Object, String, Boolean, Number, Array],
    require: false,
    default: null,
  },

  editable: {
    type: Boolean,
    default: true,
  },

  placeholder: {
    type: String,
    require: false,
    default: "Select",
  },

  errorMessage: {
    type: Array,
    require: false,
    default: () => [],
  },

  required: {
    type: Boolean,
    default: false,
  },

  rules: {
    type: Array[{ rule: Function, message: String }],
    default: () => [],
    description:
      "Array of rules to validate the input value. " +
      "Each rule is an object with a rule function and a message string." +
      "The rule function must return true if the value is valid, or false if the value is invalid." +
      "The message string is displayed if the rule function returns false.",
  },

  options: {
    type: Array,
    default: () => [],
  },

  multiple: {
    type: Boolean,
    default: false,
  },

  labelOption: {
    type: String,
    default: "label",
  },

  labelValue: {
    type: String,
    default:null,
  },

  reduceOption: {
    type: Function,
    default: (option) => option,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  clearable: {
    type: Boolean,
    default: true,
  },

  flat: {
    type: Boolean,
    default: false,
  },

  excluded: {
    type: Array,
    default: () => [],
  },
});

// rules errors
const rulesErrors = ref([]);

// model value
const emit = defineEmits(["update:modelValue", "select", "click"]);
const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

watch(
  () => inputValue.value,
  () => {
    emit("select");
    validate();
  }
);

const options = computed(() => {
  return props.options.filter((option) => {
    return !props.excluded.includes(option[props.labelValue]);
  })
})

// validate input value
const validate = () => {
  rulesErrors.value.length = 0;
  // validate rules
  props.rules.forEach((rule) => {
    if (!rule.rule(inputValue.value)) {
      rulesErrors.value.push(rule.message);
    }
  });
  rulesErrors.value = [...rulesErrors.value];
};

// validate input value on input
const onBlur = () => {
  validate();
};

// validate input value on select
const onSelect = () => {
  validate();
  emit("select");
};

// reduce option
const reduce = (val) => {
  // if(props.labelValue){
  //   return val[props.labelValue];
  // }
  // return props.reduceOption(val);
};


</script>

<style lang="scss">
// Vue Select + Custom overrides
// @import "vue-select/src/scss/vue-select";
// @import "@/assets/scss/vendor/vue-select";

.dark-mode .vs__selected {
  background-color: var(--bg-body) !important;
  border-color: rgb(255, 255, 255) !important;
  color: white !important;
}

.datatable-filter-input-flat .vs__dropdown-toggle {
  border: none !important;
  padding: 0 !important;
  font-variant: small-caps !important;
}


.vs__search {
  border: none !important;
  padding-top: 0!important;
  padding-bottom: 0!important;
}

vs__search:focus {
  border: none !important;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: #2563eb;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    border-color: none !important;
}

 [type='search']:focus, select:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-inset: var(--tw-empty, /!/ /!/);
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff!important;
    --tw-ring-color: #fdfdfd!important; 
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); 
     box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    border-color: #ffffff!important;
}

.vs__selected-options {
  border: none;
}

.vs__dropdown-toggle{
  --tw-border-opacity: 1 !important;
    border-color: rgb(226 232 240 / 1 ) !important;
}
</style>