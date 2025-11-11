<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.showcoupons") }}</h4>
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
          <!-- Start:: Image Upload Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.coupon_name')"
            v-model.trim="data.codeName"
            
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.coupon_nameEN')"
            v-model.trim="data.codeNameEn"
            
            disabled
          />
          <!-- End:: Name Input -->

          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.code')"
            v-model="data.code"
            
            disabled
          />
          <!-- End:: Status Input -->

          <!-- Start:: Status Input -->
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.discount')"
            v-model="data.discount"
            
            disabled
          />
          <!-- End:: Status Input -->
          <!-- End:: Status Input -->
          <base-picker-input
            col="4"
            type="date"
            :placeholder="$t('PLACEHOLDERS.startDate')"
            v-model.trim="data.from_date"
            disabled
          />
          <!-- End:: Start Date Input -->

          <!-- Start:: End Date Input -->
          <base-picker-input
            col="4"
            type="date"
            :placeholder="$t('PLACEHOLDERS.endDate')"
            v-model.trim="data.to_date"
            disabled
          />

          <base-select-input
            multiple
            col="4"
            :optionsList="allUsers"
            :placeholder="$t('SIDENAV.Users.title')"
            v-model="data.users"
            
            disabled
          />
          <!-- End:: Name Input -->

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
        codeName: null,
        codeNameEn: null,
        code: null,
        discount: null,
        from_date: null,
        to_date: null,
        users: null,
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
      allUsers: [],
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
          url: `coupons/${this.$route.params.id}`,
        });
        this.data.codeName = res.data.data.Coupon.name_ar;
        this.data.codeNameEn = res.data.data.Coupon.name_en;
        this.data.code = res.data.data.Coupon.code;
        this.data.discount = res.data.data.Coupon.percentage;
        this.data.from_date = res.data.data.Coupon.start_at;
        this.data.to_date = res.data.data.Coupon.end_at;
        this.data.users = res.data.data.Coupon.users;
        this.data.active = res.data.data.Coupon.is_active;
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
