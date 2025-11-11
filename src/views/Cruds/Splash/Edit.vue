<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.update_splash") }}</h4>
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
          <base-image-upload-input
            col="12"
            :identifier="'image'"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')"
            @selectImage="selectImage"
            required
            :acceptVideo="true"
          />

          <base-select-input
            col="12"
            :optionsList="[
              { id: 1, value: 1, name: '1' },
              { id: 2, value: 2, name: '2' },
              { id: 3, value: 3, name: '3' },
            ]"
            :placeholder="$t('PLACEHOLDERS.sort')"
            v-model="data.sort"
            required
          />

          <!-- Start:: Name Input -->
          <base-text-editor
            col="6"
            :placeholder="$t('PLACEHOLDERS.contentAr')"
            v-model.trim="data.nameAr"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-text-editor
            col="6"
            :placeholder="$t('PLACEHOLDERS.contentEn')"
            v-model.trim="data.nameEn"
            required
          />

          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <!-- <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="
                data.active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.active"
              hide-details
            ></v-switch>
          </div> -->
          <!-- End:: Deactivate Switch Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button
              class="mt-2"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.save')"
              :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest"
            />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import BaseImageUploadInput from "../../../components/formInputs/BaseImageUploadInput.vue";
import moment from "moment";

export default {
  name: "EditSplash",

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

      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  computed: {},

  methods: {
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },

    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.nameAr = this.data.nameAr.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
    },

    handleFileSelected({ file, fileType }) {
      this.file = file; // Store the selected file in your data
      this.fileType = fileType; // Store the selected file in your data
    },
    handleFileRemoved() {
      this.file = null; // Reset the file when it's removed
      this.fileType = "";
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      const stripHTML = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
      };

      const nameArText = stripHTML(this.data.nameAr || "");
      const nameEnText = stripHTML(this.data.nameEn || "");

      if (!nameArText) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      } else if (nameArText.length > 250) {
        this.isWaitingRequest = false;
        this.$message.error(
          this.$t("VALIDATION.maxChars")
            .replace("{field}", this.$t("PLACEHOLDERS.contentAr"))
            .replace("{max}", 250)
        );
        return;
      }

      if (!nameEnText) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
      } else if (nameEnText.length > 250) {
        this.isWaitingRequest = false;
        this.$message.error(
          this.$t("VALIDATION.maxChars")
            .replace("{field}", this.$t("PLACEHOLDERS.contentEn"))
            .replace("{max}", 250)
        );
        return;
      }
      if (!this.data.sort) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.sort"));
        return;
      }

      this.submitForm();
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("name[ar]", this.data.nameAr);

      REQUEST_DATA.append("name[en]", this.data.nameEn);
      if (this.data.image.file) {
        REQUEST_DATA.append("image", this.data.image.file); // Append the file to the FormData
        // REQUEST_DATA.append("image_type", this.file); // Append the file to the FormData
      }
      REQUEST_DATA.append("sort", this.data.sort?.value);
      // REQUEST_DATA.append("__method", "PUT");
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `opening-screens/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/splash/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

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
        let sortValue = res.data.data.OpeningScreen.sort;

        this.data.sort = {
          id: sortValue,
          value: sortValue,
          name: String(sortValue),
        };
        this.data.active = res.data.data.OpeningScreen.is_active;
        // console.log(res.data.body.add_space)
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
