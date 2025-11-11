<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showService") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>
        <div class="row">
          <!-- Start:: Main Image -->
          <label v-if="data.image.path" class="service_image_title">{{
            $t("PLACEHOLDERS.service_main_image")
          }}</label>
          <div
            class="preview-container text-center mt-3 mb-5"
            v-if="data.image.path"
          >
            <img :src="data.image.path" alt="Service Image" />
          </div>
          <!-- End:: Main Image -->
          <!-- Start:: Additional Image -->
          <label
            v-if="data.images?.length > 0"
            class="service_image_title mt-5"
            >{{ $t("PLACEHOLDERS.service_images") }}</label
          >
          <div
            class="d-flex flex-wrap justify-content-center mb-5"
            v-if="data.images?.length > 0"
          >
            <div
              v-for="image in data.images"
              class="preview-container text-center m-3"
              v-if="image.url"
            >
              <img :src="image.url" alt="Service Image" />
            </div>
          </div>
          <!-- End:: Additional Image -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Services.nameAr')"
            v-model.trim="data.name"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Services.nameEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Services.descriptionAr')"
            v-model.trim="data.descProd"
            disabled
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Services.descriptionEn')"
            v-model.trim="data.descProdEn"
            disabled
          />
          <!-- End:: Name Input -->
          <base-picker-input
            col="12"
            type="date"
            :placeholder="$t('TABLES.Workplaces.date')"
            v-model.trim="data.created_at"
            disabled
          />

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
              <div class="row">
                <base-input
                  col="6"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.feature_name_ar')"
                  v-model.trim="item.nameAr"
                  disabled
                />
                <base-input
                  col="6"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.feature_name_en')"
                  v-model.trim="item.nameEn"
                  disabled
                />
                <base-input
                  col="6"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.feature_desc_ar')"
                  v-model.trim="item.descAr"
                  disabled
                />
                <base-input
                  col="6"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.feature_desc_en')"
                  v-model.trim="item.descEn"
                  disabled
                />
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShowService",

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
        images: [],
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        created_at: null,
        active: null,
        fields: [],
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
    async showService() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `services/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.Service.main_image;
        this.data.images = res.data.data.Service.images;
        this.data.name = res.data.data.Service.name_ar;
        this.data.nameEn = res.data.data.Service.name_en;
        this.data.descProd = res.data.data.Service.description_ar;
        this.data.descProdEn = res.data.data.Service.description_en;
        this.data.created_at = res.data.data.Service.created_at;
        this.data.active = res.data.data.Service.is_active;
        this.data.fields = res.data.data.Service.features.map((feature) => ({
          nameAr: feature.name_ar,
          nameEn: feature.name_en,
          descAr: feature.description_ar,
          descEn: feature.description_en,
        }));
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data
  },

  created() {
    // Start:: Fire Methods
    this.showService();
    // End:: Fire Methods
  },
};
</script>
<style>
.service_image_title {
  font-size: 16px;
  color: #E1423D;
  text-align: center;
}
</style>
