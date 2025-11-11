<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showBlog") }}</h4>
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
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.titleAr')"
            v-model.trim="data.name"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.titleEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.descAr')"
            v-model.trim="data.descProd"
            disabled
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.descEn')"
            v-model.trim="data.descProdEn"
            disabled
          />
          <!-- End:: Name Input -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShowBlog",

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
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        active: null,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  methods: {
    // start show data
    async showBlog() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `blogs/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.Blog.image;
        this.data.name = res.data.data.Blog.title_ar;
        this.data.nameEn = res.data.data.Blog.title_en;
        this.data.descProd = res.data.data.Blog.description_ar;
        this.data.descProdEn = res.data.data.Blog.description_en;
        this.data.active = res.data.data.Blog.is_active;
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
        // console.log("blogs =>", res.data.data);
        this.regions = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.showBlog();
    // End:: Fire Methods
  },
};
</script>
