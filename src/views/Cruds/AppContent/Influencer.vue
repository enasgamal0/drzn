<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.influencer") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Input -->
          <base-image-upload-input
            col="12"
            identifier="influencer_image"
            :placeholder="$t('PLACEHOLDERS.main_image')"
            @selectImage="selectImage"
            :preSelectedImage="data.image.path"
            required
          />
          <!-- End:: Image Input -->

          <div class="d-flex justify-content-center">
            <div>
              <!-- Start:: Image Input -->
              <base-image-upload-input
                col="12"
                identifier="influencer_image1"
                :placeholder="$t('PLACEHOLDERS.optional_image1')"
                @selectImage="selectImageSmall1"
                :preSelectedImage="data.imageSmall1.path"
                required
              />
              <!-- End:: Image Input -->
            </div>

            <div>
              <!-- Start:: Image Input -->
              <base-image-upload-input
                col="12"
                identifier="influencer_image2"
                :placeholder="$t('PLACEHOLDERS.optional_image2')"
                @selectImage="selectImageSmall2"
                :preSelectedImage="data.imageSmall2.path"
                required
              />
              <!-- End:: Image Input -->
            </div>
          </div>

          <!-- Start:: Title Ar Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.titleAr')"
            v-model.trim="data.titleAr"
            required
          />
          <!-- End:: Title Ar Input -->

          <!-- Start:: Title En Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.titleEn')"
            v-model.trim="data.titleEn"
            required
          />
          <!-- End:: Title En Input -->

          <!-- Start:: Content Ar Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.contentAr')"
            v-model.trim="data.contentAr"
            required
          />
          <!-- End:: Content Ar Input -->

          <!-- Start:: Content En Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.contentEn')"
            v-model.trim="data.contentEn"
            required
          />
          <!-- End:: Content En Input -->
          <div
            v-for="(feature, index) in data.features"
            :key="index"
            class="col-12"
          >
            <hr style="width: 97%" class="my-5" />
            <p style="color: #E1423D; font-size: 16px" class="font-weight-bold">
              {{ $t("PLACEHOLDERS.features") }} #{{ index + 1 }}
            </p>
            <div class="row mb-4">
              <!-- Start:: Feature Name Ar Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.feature_name_ar')"
                v-model.trim="feature.nameAr"
                required
              />
              <!-- End:: Feature Name Ar Input -->

              <!-- Start:: Feature Name En Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.feature_name_en')"
                v-model.trim="feature.nameEn"
                required
              />
              <!-- End:: Feature Name En Input -->

              <!-- Start:: Feature Description Ar Input -->
              <base-input
                col="6"
                type="textarea"
                :placeholder="$t('PLACEHOLDERS.feature_desc_ar')"
                v-model.trim="feature.descriptionAr"
                required
              />
              <!-- End:: Feature Description Ar Input -->

              <!-- Start:: Feature Description En Input -->
              <base-input
                col="6"
                type="textarea"
                :placeholder="$t('PLACEHOLDERS.feature_desc_en')"
                v-model.trim="feature.descriptionEn"
                required
              />
              <!-- End:: Feature Description En Input -->

              <!-- Start:: Add and Delete Buttons -->
              <div class="col-12 text-end">
                <v-btn
                  color="error"
                  @click="removeFeature(index)"
                  v-if="data.features.length > 1"
                >
                  <i class="fas fa-trash"></i>
                </v-btn>
                <v-btn
                  class="mx-3"
                  @click="addNewFeature"
                  style="background-color: #E1423D; color: white"
                >
                  <i class="fas fa-plus"></i>
                </v-btn>
              </div>
              <!-- End:: Add and Delete Buttons -->
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
export default {
  name: "Influencer",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        imageSmall1: {
          path: null,
          file: null,
        },
        imageSmall2: {
          path: null,
          file: null,
        },
        titleAr: null,
        titleEn: null,
        contentAr: null,
        contentEn: null,
        features: [
          {
            nameAr: null,
            nameEn: null,
            descriptionAr: null,
            descriptionEn: null,
          },
        ],
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Select Upload Image
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    selectImageSmall1(selectedImage) {
      this.data.imageSmall1 = selectedImage;
    },
    selectImageSmall2(selectedImage) {
      this.data.imageSmall2 = selectedImage;
    },
    // End:: Select Upload Image
    // Start:: Handle Image Upload
    handleImageUpload(event) {
      this.data.image = event.target.files[0];
    },
    // End:: Handle Image Upload

    // Start:: Add New Feature
    addNewFeature() {
      this.data.features.push({
        nameAr: null,
        nameEn: null,
        descriptionAr: null,
        descriptionEn: null,
      });
    },
    // End:: Add New Feature

    // Start:: Remove Feature
    removeFeature(index) {
      this.data.features.splice(index, 1);
    },
    // End:: Remove Feature

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=add-influencer`,
        });
        // Start:: Set Data
        if (res.data.data.data[0]?.value) {
          const value = res.data.data.data[0].value;
          this.data.titleAr = value.title?.ar;
          this.data.titleEn = value.title?.en;
          this.data.contentAr = value.content?.ar;
          this.data.contentEn = value.content?.en;
          this.data.image.path = value.first_image;
          this.data.imageSmall1.path = value.second_image;
          this.data.imageSmall2.path = value.third_image;
          if (value.features?.length) {
            this.data.features = value.features.map((feature) => ({
              nameAr: feature.name?.ar,
              nameEn: feature.name?.en,
              descriptionAr: feature.description?.ar,
              descriptionEn: feature.description?.en,
            }));
          }
        }
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

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
      REQUEST_DATA.append("key", "add-influencer");

      if (this.data.image?.file) {
        REQUEST_DATA.append("value[first_image]", this.data.image.file);
      }
      if (this.data.imageSmall1?.file) {
        REQUEST_DATA.append("value[second_image]", this.data.imageSmall1.file);
      }
      if (this.data.imageSmall2?.file) {
        REQUEST_DATA.append("value[third_image]", this.data.imageSmall2.file);
      }
      if (this.data.titleAr)
        REQUEST_DATA.append("value[title][ar]", this.data.titleAr);
      if (this.data.titleEn)
        REQUEST_DATA.append("value[title][en]", this.data.titleEn);
      if (this.data.contentAr)
        REQUEST_DATA.append("value[content][ar]", this.data.contentAr);
      if (this.data.contentEn)
        REQUEST_DATA.append("value[content][en]", this.data.contentEn);

      this.data.features.forEach((feature, index) => {
        if (feature.nameAr)
          REQUEST_DATA.append(
            `value[features][${index}][name][ar]`,
            feature.nameAr
          );
        if (feature.nameEn)
          REQUEST_DATA.append(
            `value[features][${index}][name][en]`,
            feature.nameEn
          );
        if (feature.descriptionAr)
          REQUEST_DATA.append(
            `value[features][${index}][description][ar]`,
            feature.descriptionAr
          );
        if (feature.descriptionEn)
          REQUEST_DATA.append(
            `value[features][${index}][description][en]`,
            feature.descriptionEn
          );
      });

      try {
        await this.$axios({
          method: "POST",
          url: `settings?key=add-influencer`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
