<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editService") }}</h4>
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
            identifier="admin_image"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.service_main_image')"
            @selectImage="selectImage"
            required
          />
          <!-- End:: Image Upload Input -->
          <!-- Start:: Additional Images Upload Input -->
          <base-multi-image-upload-input
            :urls="imgUrls.map((img) => img.image)"
            multiple
            @onFileSelect="onFileSelect"
            @onFileRemove="onFileRemove"
          >
            {{ $t("PLACEHOLDERS.service_images") }}
          </base-multi-image-upload-input>
          <!-- End:: Additional Images Upload Input -->

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
          <div class="row justify-content-center">
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
              <div class="item d-flex flex-wrap align-items-center">
                <base-input
                  col="6"
                  class="w-100"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.feature_name_ar')"
                  v-model.trim="item.nameAr"
                  required
                />
                <base-input
                  col="6"
                  class="w-100"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.feature_name_en')"
                  v-model.trim="item.nameEn"
                  required
                />
                <base-input
                  col="6"
                  class="w-100"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.feature_desc_ar')"
                  v-model.trim="item.descAr"
                  required
                />
                <base-input
                  col="6"
                  class="w-100"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.feature_desc_en')"
                  v-model.trim="item.descEn"
                  required
                />
                <div class="all_actions" v-if="data.fields?.length > 0">
                  <span class="add_another" @click="removeRow(index, item.id)">
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditService",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

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
        fields: [
          {
            type: "text",
            nameAr: "",
            nameEn: "",
            descAr: "",
            descEn: "",
          },
        ],
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
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
    async removeRow(index, id) {
      if (id) {
        try {
          await this.$axios({
            method: "DELETE",
            url: `services/${this.$route.params.id}/feature/${id}`,
          });
          this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
        } catch (error) {
          this.$message.error(error.response?.data?.message);
          return;
        }
      }
      this.data.fields.splice(index, 1);
      if (this.data.fields.length === 0) {
        this.addRow();
      }
    },
    onFileSelect(files) {
      this.additionalImages = files;
    },
    async onFileRemove(index) {
      const removedImage = this.imgUrls[index];
      if (removedImage?.id) {
        try {
          await this.$axios({
            method: "DELETE",
            url: `services/${this.$route.params.id}/images/${removedImage.id}`,
          });
          this.imgUrls.splice(index, 1);
          this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
        } catch (error) {
          this.$message.error(error.response?.data?.message);
        }
      }
    },
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      this.submitForm();
    },

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
        if (feature.id) {
          REQUEST_DATA.append(`service_features[${index}][id]`, feature.id);
        }
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

      REQUEST_DATA.append("_method", "PUT");
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      try {
        await this.$axios({
          method: "POST",
          url: `services/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/services/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },

    // start show data
    async showService() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `services/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.Service.main_image;
        this.data.name = res.data.data.Service.name_ar;
        this.data.nameEn = res.data.data.Service.name_en;
        this.data.descProd = res.data.data.Service.description_ar;
        this.data.descProdEn = res.data.data.Service.description_en;
        this.data.active = res.data.data.Service.is_active;
        this.imgUrls = res.data.data.Service.images.map((file, index) => ({
          id: file.id,
          image: file.url,
          index,
        }));
        if (res.data.data.Service.features?.length > 0) {
          this.data.fields = res.data.data.Service.features.map((feature) => ({
            id: feature.id,
            nameAr: feature.name_ar,
            nameEn: feature.name_en,
            descAr: feature.description_ar,
            descEn: feature.description_en,
          }));
        }
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data

    async getRegions() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `regions`,
          params: {
            is_active: 1,
          },
        });
        // console.log("services =>", res.data.data);
        this.regions = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.showService();
    // End:: Fire Methods
  },
};
</script>