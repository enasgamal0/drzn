<template>
  <v-rating
    dir="ltr"
    class="text-center my-3"
    :background-color="backgroundColor"
    :color="color"
    :empty-icon="emptyIcon"
    :half-icon="halfIcon"
    :full-icon="fullIcon"
    :length="length"
    :size="size"
    :value="rate"
    half-increments
    readonly
    hover
  />
</template>

<script>
export default {
  name: "RatingPreview",

  props: {
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
    rate: {
      required: true,
    },
  },
};
</script>
