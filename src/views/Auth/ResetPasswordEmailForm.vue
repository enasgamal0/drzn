<template>
  <div class="reset_password_phone_num_form_wrapper">
    <!-- Start:: Form Title -->
    <!-- <div class="form_title_wrapper">
    </div> -->
    <!-- End:: Form Title -->

    <!-- Start:: Form -->
    <div class="form_wrapper">
      <form class="mt-4" @submit.prevent="validateFormInputs">
        <div class="row justify-content-center">
          <!-- Start:: Email Input -->
          <base-input
            col="7"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="resetPassPhoneNumData.email"
            required
          />
          <!-- End:: Email Input -->

          <!-- Start:: Submit Button -->
          <div class="col-lg-7 my-5">
            <base-button
              class="mt-0 w-100"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.confirm')"
              :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest"
            />
          </div>
          <!-- End:: Submit Button -->
        </div>
      </form>

      <!-- Start:: Login Route Wrapper -->
      <router-link to="/" class="register_route">
        <span>{{ $t("BUTTONS.haveAccount") }}</span>
        <span> {{ $t("BUTTONS.login") }}</span>
      </router-link>
      <!-- End:: Login Route Wrapper -->
    </div>
    <!-- End:: Form -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ResetPasswordEmailForm",

  data() {
    return {
      // Start:: Loader Data
      isWaitingRequest: false,
      // End:: Loader Data

      // Start:: Data Collection To Send
      resetPassPhoneNumData: {
        email: null,
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
    ...mapActions({
      setAuthenticatedUserData: "AuthenticationModule/setAuthenticatedUserData",
    }),

    // Start:: Validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.resetPassPhoneNumData.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      } else {
        this.submitForm();
      }
    },
    // End:: Validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = true;

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("email", this.resetPassPhoneNumData.email);
      // End:: Append Request Data

      try {
        let res = await this.$axios({
          method: "POST",
          url: `auth/admin/forgot-password`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
        localStorage.setItem(
          "drzn_admin_dashboard_verification_code",
          res.data.data.code
        );
        localStorage.setItem(
          "drzn_admin_dashboard_forget_pass_token",
          res.data.data.access_token
        );
        this.setAuthenticatedUserData({
          email: this.resetPassPhoneNumData.email,
        });
        this.clearFormInputs();
        this.$router.replace("/email-verification/reset-password");
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: Clear Form Inputs
    clearFormInputs() {
      this.resetPassPhoneNumData.email = null;
    },
    // End:: Clear Form Inputs
  },
};
</script>
