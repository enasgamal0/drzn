<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.ResidentialShow") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #7514b7">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.name')"
            v-model.trim="data.name"
            required
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            required
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.created_at')"
            v-model.trim="data.crated"
            required
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.ResidentialAddUse')"
            v-model.trim="data.count"
            required
            disabled
          />

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
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "showCity",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        name: null,
        nameEn: null,
        crated: null,
        count: null,
        mainCat: null,
        subCats: null,
        wood: null,
        countryFact: null,
        quantaty: null,
        min_quantaty: null,
        mostPaid: null,
        productCode: null,
        active: null,
        image: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        region_id: null,
        active: null,
      },
      regions: [],
      // End:: Data Collection To Send
    };
  },

  computed: {},

  methods: {
    // start show data
    async showCity() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `additions/${this.$route.params.id}`,
        });
        this.data.name = res.data.data.Addition.name_ar;
        this.data.nameEn = res.data.data.Addition.name_en;
        this.data.count = res.data.data.Addition.count_use;
        this.data.crated = res.data.data.Addition.created_at;
        this.data.active = res.data.data.Addition.is_active;
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
        // console.log("Cities =>", res.data.data);
        this.regions = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.showCity();
    // End:: Fire Methods
  },
};
</script>
