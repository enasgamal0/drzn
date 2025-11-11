<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showWorkplace") }}</h4>
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
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Workplaces.nameAr')"
            v-model.trim="data.name"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Workplaces.nameEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Workplaces.descriptionAr')"
            v-model.trim="data.descProd"
            disabled
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Workplaces.descriptionEn')"
            v-model.trim="data.descProdEn"
            disabled
          />
          <!-- End:: Name Input -->
          <base-picker-input
            col="6"
            type="date"
            :placeholder="$t('TABLES.Workplaces.date')"
            v-model.trim="data.created_at"
            disabled
          />
          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-6">
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
          <!-- Start:: Store Map -->
          <div class="col-12 my-5">
            <label class="preview-container-label d-block">{{
              $t("PLACEHOLDERS.map_location")
            }}</label>
            <MapComponent
              :lat="parseFloat(data.latitude)"
              :lng="parseFloat(data.longitude)"
            />
          </div>
          <!-- End:: Store Map -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MapComponent from "@/components/general/MapComponent";

export default {
  name: "ShowWorkplace",
  components: {
    MapComponent,
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        created_at: null,
        active: null,
        latitude: null,
        longitude: null,
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
    // start show data
    async showWorkplace() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `workplaces/${this.$route.params.id}`,
        });
        this.data.name = res.data.data.Workplace.name_ar;
        this.data.nameEn = res.data.data.Workplace.name_en;
        this.data.descProd = res.data.data.Workplace.description_ar;
        this.data.descProdEn = res.data.data.Workplace.description_en;
        this.data.created_at = res.data.data.Workplace.created_at;
        this.data.active = res.data.data.Workplace.is_active;
        this.data.latitude = res.data.data.Workplace.latitude;
        this.data.longitude = res.data.data.Workplace.longitude;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data
  },

  created() {
    // Start:: Fire Methods
    this.showWorkplace();
    // End:: Fire Methods
  },
};
</script>
<style>
.preview-container-label {
  font-size: 16px;
  color: var(--main_theme_clr);
  margin-bottom: 14px;
  z-index: 2;
}
</style>
