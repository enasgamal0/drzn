<template>
  <transition name="fadeInUp">
    <v-dialog
      width="fit-content"
      max-width="600"
      elevation="0"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <div class="image_modal">
        <v-card
          class="d-flex justify-center"
          color="transparent"
          elevation="0"
        >
          <div class="image_wrapper">
            <video
                v-if="modalImage.endsWith('mp4')"
                :src="modalImage"
                width="500"
                height="280"
                controls
                autoplay
                loop
              ></video>
            <img
              v-else
              :src="modalImage"
              alt="Modal Image"
              width="500"
              height="280"
            />
          </div>
        </v-card>
      </div>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "ImageModal",

  emits: ["toggleModal"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    modalImage: {
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

<style lang="scss">
.image_modal {
  .v-card {
    padding: 0 !important;
    .image_wrapper {
      background-color: var(--white_clr);
      width: fit-content;
      border-radius: 15px;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}

  @media screen and (max-width: 850px) {
    .image_wrapper {
      height: auto;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
