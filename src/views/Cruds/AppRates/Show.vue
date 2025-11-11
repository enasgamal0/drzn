<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.showRate") }}</h4>
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
            :placeholder="$t('PLACEHOLDERS.client-name')"
            v-model.trim="data.user_name"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.phone')"
            v-model.trim="data.mobile"
            disabled
          />
          <base-rate-input
            col="6"
            :placeholder="$t('PLACEHOLDERS.rating_stars')"
            v-model.trim="data.rate"
            size="22"
            :readonly="true"
          />
          <base-input
            v-if="data.feedback"
            col="12"
            type="text"
            :placeholder="$t('TABLES.Rates.comment')"
            v-model.trim="data.feedback"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.created_at')"
            v-model.trim="data.created_at"
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
  name: "ShowRate",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        user_name: null,
        email: null,
        mobile: null,
        rate: null,
        feedback: null,
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
    // start show data
    async showRate() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `rates/${this.$route.params?.id}`,
        });
        console.log(res.data.data.data);
        this.data.user_name = res.data.data.Rate?.user?.name;
        this.data.email = res.data.data.Rate?.user?.email;
        this.data.mobile = res.data.data.Rate?.user?.mobile;
        this.data.rate = res.data.data.Rate?.rate;
        this.data.feedback = res.data.data.Rate?.message;
        this.data.created_at = res.data.data.Rate?.created_at;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },

  created() {
    this.showRate();
  },
};
</script>
