<template>
  <div class="reset_password_form_wrapper">
    <!-- Start:: Form Title -->
    <!-- <div class="form_title_wrapper">
    </div> -->
    <!-- End:: Form Title -->

    <!-- Start:: Form -->
    <div class="form_wrapper">
      <form class="mt-4" @submit.prevent="validateFormInputs">
        <div class="row justify-content-center">
          <!-- Start:: Password Input -->
          <base-input
            col="7"
            type="password"
            :placeholder="$t('PLACEHOLDERS.password')"
            v-model.trim="resetPasswordData.password"
            required
          />
          <!-- End:: Password Input -->

          <!-- Start:: Confirm Password Input -->
          <base-input
            col="7"
            type="password"
            :placeholder="$t('PLACEHOLDERS.confirmPassword')"
            v-model.trim="resetPasswordData.confirmPassword"
            required
          />
          <!-- End:: Confirm Password Input -->

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
import { mapGetters } from "vuex";

export default {
  name: "ResetPasswordForm",
  computed: {
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    }),
  },
  data() {
    return {
      // Start:: Loader Data
      isWaitingRequest: false,
      // End:: Loader Data

      // Start:: Data Collection To Send
      resetPasswordData: {
        password: null,
        confirmPassword: null,
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.resetPasswordData.password) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (this.resetPasswordData.password.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      } else if (!this.resetPasswordData.confirmPassword) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (this.resetPasswordData.confirmPassword.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      } else if (
        this.resetPasswordData.password !=
        this.resetPasswordData.confirmPassword
      ) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.notEqualPasswords"));
        return;
      } else {
        this.submitForm();
      }
    },
    // End:: Validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = true;
      this.$axios.defaults.headers.common["Authorization"] =
        "Bearer " +
        localStorage.getItem("drzn_admin_dashboard_forget_pass_token");

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("password", this.resetPasswordData.password);
      REQUEST_DATA.append(
        "password_confirmation",
        this.resetPasswordData.confirmPassword
      );
      REQUEST_DATA.append("email", localStorage.getItem("drzn_admin_dashboard_email"));
      REQUEST_DATA.append("code", localStorage.getItem("drzn_admin_dashboard_verification_code"));
      // End:: Append Request Data
      const token = localStorage.getItem(
        "drzn_admin_dashboard_forget_pass_token"
      );
      try {
        await this.$axios({
          method: "POST",
          url: `auth/admin/reset-password`,
          data: REQUEST_DATA,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        localStorage.removeItem("drzn_admin_dashboard_forget_pass_token");
        localStorage.removeItem("drzn_admin_dashboard_reset_pass_token");
        localStorage.removeItem("drzn_admin_dashboard_email");
        this.clearFormInputs();
        this.$router.replace("/");
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: Clear Form
    clearFormInputs() {
      this.resetPasswordData.password = null;
      this.resetPasswordData.confirmPassword = null;
    },
    // End:: Clear Form
  },
};
</script>
