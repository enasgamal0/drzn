<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editRecommendation") }}</h4>
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
          <base-select-input
            v-if="users"
            col="6"
            :optionsList="users"
            :placeholder="$t('SIDENAV.Clients.name')"
            v-model="data.user"
            required
          />
          <base-select-input
            col="6"
            :optionsList="influencers"
            :placeholder="$t('PLACEHOLDERS.influencer_name')"
            v-model="data.influencers"
            required
            multiple
            :disabled="!influencers"
            :style="!influencers ? 'cursor: wait;' : ''"
          />
          <!-- End:: Name Input -->

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
      this.submitForm();
    },

    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.data.user) {
        REQUEST_DATA.append("user_id", this.data.user?.id);
      }
      if (this.data.influencers) {
        this.data.influencers?.forEach((element) => {
          REQUEST_DATA.append("influencers[]", element?.id);
        });
      }
      REQUEST_DATA.append("_method", "PUT");
      try {
        await this.$axios({
          method: "POST",
          url: `recommendations/${this.$route.params?.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/recommendations/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
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
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data

    // start get users
    async getUsers() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "clients?page=0&limit=0&is_active=1",
        });
        this.users = res.data.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // end get users

    // start get influencers
    async getInfluencers() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "influencers?page=0&limit=0&is_active=1",
        });
        this.influencers = res.data.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // end get influencers
  },

  created() {
    this.showRecommendation();
    this.getUsers();
    this.getInfluencers();
  },
};
</script>
