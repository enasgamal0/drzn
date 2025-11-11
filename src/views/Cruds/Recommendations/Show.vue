<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showRecommendation") }}</h4>
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
            type="text"
            col="6"
            :placeholder="$t('SIDENAV.Clients.name')"
            v-model="data.user.name"
            disabled
          />
          <base-select-input
            col="6"
            :optionsList="[]"
            :placeholder="$t('PLACEHOLDERS.influencer_name')"
            v-model="data.influencers"
            required
            multiple
            disabled
          />
          <!-- End:: Name Input -->

          <base-input
            type="text"
            col="6"
            :placeholder="$t('PLACEHOLDERS.created_at')"
            v-model="data.created_at"
            disabled
          />

          <!-- Start:: Deactivate Switch Input -->
          <!-- <div class="input_wrapper switch_wrapper my-5 col-6">
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
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditRecommendation",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      users: null,
      influencers: null,

      // Start:: Data Collection To Send
      data: {
        user: null,
        influencers: [],
        created_at: null,
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
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
    },

    // start show data
    async showRecommendation() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `recommendations/${this.$route.params?.id}`,
        });
        this.data.user = res.data.data.Recommendation.user;
        this.data.influencers = res.data.data.Recommendation.influencers;
        this.data.created_at = res.data.data.Recommendation.created_at;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },

  created() {
    this.showRecommendation();
  },
};
</script>
