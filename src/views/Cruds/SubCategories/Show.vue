<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_sub_section") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image -->
          <div class="preview-container text-center my-3">
            <img
              v-if="data.image.path"
              col="12"
              :src="data.image.path"
              :alt="$t('PLACEHOLDERS.section_image')"
            />
          </div>
          <!-- End:: Image -->

          <!-- Start:: Ar Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.nameAr"
            disabled
          />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: En Name Input -->

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.mainSection')"
            v-model="main_section"
            disabled
          />

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
        // Start:: Set Data
        this.data.image.path = res.data.data.SubCategory?.image;
        this.data.nameAr = res.data.data.SubCategory?.name_ar;
        this.data.nameEn = res.data.data.SubCategory?.name_en;
        this.main_section = res.data.data.SubCategory?.category?.name;
        this.data.active = res.data.data.SubCategory?.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    async getSections() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `categories?main=true`,
        });
        this.allMainCategories = res.data.data;
        console.log(res.data.data);
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
