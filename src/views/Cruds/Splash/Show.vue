<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.show_offer") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <!-- <base-image-upload-input col="12" identifier="image" :placeholder="$t('PLACEHOLDERS.image')"
             /> -->
          <!-- End:: Image Upload Input -->

          <div v-if="data.image.path">
            <!-- Display image -->
            <div class="preview-container text-center my-3">
              <video
                v-if="['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm', 'm4v'].some(ext => data.image.path.endsWith(ext))"
                :src="data.image.path"
                controls
                autoplay
                loop
              ></video>
              <img v-else :src="data.image.path" alt="Advertisement Image" />
            </div>
          </div>

          <!-- <base-image-upload-input
            col="12"
            identifier="image"
            :placeholder="$t('PLACEHOLDERS.image')"
            disabled
            :preSelectedImage="data.image.path"
          /> -->

          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.sort')"
            v-model.trim="data.sort"
            disabled
          />

          <!-- Start:: Name Input -->
          <base-text-editor
            col="6"
            :placeholder="$t('PLACEHOLDERS.contentAr')"
            v-model.trim="data.nameAr"
            disabled
            readonly
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-text-editor
            col="6"
            :placeholder="$t('PLACEHOLDERS.contentEn')"
            v-model.trim="data.nameEn"
            disabled
            readonly
          />
          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="
                data.active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.active"
              hide-details
              disabled
            ></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import BaseImageUploadInput from "../../../components/formInputs/BaseImageUploadInput.vue";

export default {
  name: "ShowSplash",
  components: { BaseImageUploadInput },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data
      file: null,
      fileType: "",
      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        sort: null,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {},

  methods: {
    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },
    // start all splash data
    async getSplashData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `opening-screens/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.OpeningScreen.image;
        this.data.nameAr = res.data.data.OpeningScreen.name_ar;
        this.data.nameEn = res.data.data.OpeningScreen.name_en;
        this.data.sort = res.data.data.OpeningScreen.sort;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all splash data
  },

  created() {
    // Start:: Fire Methods
    this.getSplashData();
    // End:: Fire Methods
  },
};
</script>

<style>
.preview-container img,
.preview-container video {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: 20px;
}
</style>
