<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addService") }}</h4>
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
          <base-image-upload-input
            col="12"
            identifier="image"
            :placeholder="$t('PLACEHOLDERS.service_main_image')"
            @selectImage="selectImage"
            required
          />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Image Upload Input -->
          <base-multi-image-upload-input
            :urls="imgUrls"
            multiple
            @onFileSelect="onFileSelect"
            @onFileRemove="onFileRemove"
          >
            {{ $t("PLACEHOLDERS.service_images") }}
          </base-multi-image-upload-input>
          <!-- End:: Image Upload Input -->

          <!-- <BaseImageUploadInput @file-selected="handleFileSelected" @file-removed="handleFileRemoved" /> -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Services.nameAr')"
            v-model.trim="data.name"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Services.nameEn')"
            v-model.trim="data.nameEn"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Services.descriptionAr')"
            v-model.trim="data.descProd"
            required
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Services.descriptionEn')"
            v-model.trim="data.descProdEn"
            required
          />
          <!-- End:: Name Input -->
          <hr class="my-5" style="width: 97%" />
          <div class="justify-content-center">
            <div
              class="col-12"
              v-for="(item, index) in data.fields"
              :key="'l' + index"
            >
              <label
                style="font-size: 16px; color: #E1423D"
                class="font-weight-bold mb-4"
                >{{ $t("PLACEHOLDERS.feature") }} #{{ index + 1 }}</label
              >
              <div class="row">
                <base-input
                  col="6"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.feature_name_ar')"
                  v-model.trim="item.nameAr"
                  required
                />
                <base-input
                  col="6"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.feature_name_en')"
                  v-model.trim="item.nameEn"
                  required
                />
                <base-input
                  col="6"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.feature_desc_ar')"
                  v-model.trim="item.descAr"
                  required
                />
                <base-input
                  col="6"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.feature_desc_en')"
                  v-model.trim="item.descEn"
                  required
                />
              </div>
              <div class="item d-flex flex-wrap align-items-center">
                <div class="all_actions" v-if="data.fields?.length > 1">
                  <span class="add_another" @click="removeRow(index)">
                    <i class="fas fa-minus"></i>
                  </span>
                </div>
                <div class="col-l2">
                  <div class="add_another mx-2" @click="addRow">
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
              </div>
              <hr class="my-5" />
            </div>
          </div>

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-4">
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
          </div>
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
  name: "CreateService",

  components: { BaseImageUploadInput },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      file: null,
      fileType: "",
      additionalImages: [],
      imgUrls: [],

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        active: null,
        active: true,
        publish_start_date: null,
        publish_end_date: null,
        fields: [
          {
            type: "text",
          },
        ],
      },
      // End:: Data Collection To Send
      cats: [],
      subCats: [],
      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  computed: {
    mostPaids() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: true,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: false,
        },
      ];
    },
  },

  methods: {
    addRow() {
      this.data?.fields.push({
        type: "text",
      });
    },

    removeRow(index) {
      this.data?.fields.splice(index, 1);
    },
    onFileSelect(files) {
      this.additionalImages = files;
    },
    onFileRemove(index) {
      this.$delete(this.data.imgUrls, index);
    },
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
      this.data.name = this.data.name.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
    },

    handleFileSelected({ file, fileType }) {
      this.file = file;
      this.fileType = fileType;
    },
    handleFileRemoved() {
      this.file = null;
      this.fileType = "";
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      this.submitForm();
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.data.name) {
        REQUEST_DATA.append("name[ar]", this.data.name);
      }
      if (this.data.nameEn) {
        REQUEST_DATA.append("name[en]", this.data.nameEn);
      }
      if (this.data.descProd) {
        REQUEST_DATA.append("description[ar]", this.data.descProd);
      }
      if (this.data.descProdEn) {
        REQUEST_DATA.append("description[en]", this.data.descProdEn);
      }
      if (this.data.image.file) {
        REQUEST_DATA.append("main_image", this.data.image.file);
      }
      if (this.additionalImages.length) {
        this.additionalImages.forEach((file) => {
          REQUEST_DATA.append("images[]", file);
        });
      }
      this.data.fields.forEach((feature, index) => {
        if (feature.nameAr) {
          REQUEST_DATA.append(
            `service_features[${index}][name][ar]`,
            feature.nameAr
          );
        }
        if (feature.nameEn) {
          REQUEST_DATA.append(
            `service_features[${index}][name][en]`,
            feature.nameEn
          );
        }
        if (feature.descAr) {
          REQUEST_DATA.append(
            `service_features[${index}][description][ar]`,
            feature.descAr
          );
        }
        if (feature.descEn) {
          REQUEST_DATA.append(
            `service_features[${index}][description][en]`,
            feature.descEn
          );
        }
      });

      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `services`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/services/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },
};
</script>
<style lang="scss">
.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  // border: 1px solid var(--light_gray_clr);
  border: 1px solid #E1423D;
  border-radius: 50%;
  font-size: 18px;
  color: #E1423D;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto !important;
}
</style>
