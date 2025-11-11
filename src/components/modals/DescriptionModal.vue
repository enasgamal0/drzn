<template>
  <transition name="fadeInUp">
    <v-dialog 
      width="fit-content"
      min-width="600"
      max-width="600"
      elevation="0"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card>
        <h5 class="dialog_desc_text">
          {{ modalDesc }}
        </h5>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "DescriptionModal",

  emits: ["toggleModal"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    modalDesc: {
      type: String,
      required: true,
    },
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal');
    },
    // End:: Control Modal Apperance
  },
};
</script>