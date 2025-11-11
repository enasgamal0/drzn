<template>
  <button @click="$emit('fireClick')" :class="styleType" :disabled="disabled">
    {{ btnText }}
    <span class="btn_loader" v-if="isLoading"></span>
  </button>
</template>

<script>
export default {
  name: "BaseButton",

  emits: ["fireClick"],

  props: {
    btnText: {
      required: true,
      type: String,
    },
    styleType: {
      // primary_btn || secondary_btn || cancel_btn
      required: true,
      type: String,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  &.primary_btn {
    @include simpleButtonStyle;
  }
  &.cancel_btn {
    @include simpleButtonStyle;
    background-color: transparent !important;
    background-image: linear-gradient(
      90deg,
      transparent 50%,
      var(--light_red_clr) 50%
    );
    border: 1px solid var(--light_red_clr);
    height: unset !important;

    &:hover {
      background-position: 0;
      color: var(--light_red_clr);

      .btn_loader {
        border: 3px dotted var(--light_red_clr);
      }
    }
  }
  // &.secondary_btn {
  //   @include secondaryBtnStyle;
  // }
}
</style>
