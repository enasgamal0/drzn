<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.edit_sub_section") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <base-image-upload-input
            col="12"
            identifier="image"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.section_image')"
            @selectImage="selectImage"
            required
          />

          <!-- Start:: Ar Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.nameAr"
            required
          />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            required
          />
          <!-- End:: En Name Input -->

          <base-select-input
            col="6"
            :optionsList="allMainCategories"
            :placeholder="$t('PLACEHOLDERS.mainSection')"
            v-model="main_section"
            required
          />

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
export default {
  name: "CreateArea",

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

        nameAr: null,
        nameEn: null,
        active: true,
      },
      allMainCategories: [],
      main_section: "",
      // End:: Data Collection To Send
    };
  },

  methods: {
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `sub-categories/${this.$route.params.id}`,
        });
        // console.log( "DATA TO EDIT =>", res.data.data.region );

        // Start:: Set Data
        this.data.image.path = res.data.data.SubCategory?.image;
        this.data.nameAr = res.data.data.SubCategory?.name_ar;
        this.data.nameEn = res.data.data.SubCategory?.name_en;
        this.main_section = res.data.data.SubCategory?.category;
        this.data.active = res.data.data.SubCategory?.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (!this.main_section) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.main_section"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();

      if (this.data.image.file) {
        REQUEST_DATA.append("image", this.data.image.file);
      }
      // Start:: Append Request Data
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("category_id", this.main_section.id);
      // REQUEST_DATA.append("is_active", +this.data.active);
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `sub-categories/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/sub-categories/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    async getSections() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `categories?page=0&limit=0&is_active=1`,
        });
        this.allMainCategories = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    this.getSections();
    // End:: Fire Methods
  },
};
</script>
