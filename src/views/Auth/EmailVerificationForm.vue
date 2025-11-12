<template>
  <div class="phone_verification_form_wrapper">
    <!-- Start:: Form Title -->
    <!-- <div class="form_title_wrapper">
    </div> -->
    <!-- End:: Form Title -->
    <!-- Start:: Form -->
    <div class="form_wrapper">
      <form dir="ltr" @submit.prevent="validateFormInputs">
        <div class="row justify-content-center">
          <!-- Start:: Otp Inputs -->
          <div class="col-lg-7">
            <div class="input_wrapper verification_inputs_wrapper">
              <input
                ref="first_input"
                class="form-control"
                type="text"
                maxlength="1"
                size="1"
                @keyup="toggleFocus"
                v-model.trim="firstNumber"
              />
              <input
                class="form-control"
                type="text"
                maxlength="1"
                size="1"
                @keyup="toggleFocus"
                v-model.trim="secondNumber"
              />
              <input
                class="form-control"
                type="text"
                maxlength="1"
                size="1"
                @keyup="toggleFocus"
                v-model.trim="thirdNumber"
              />
              <input
                class="form-control"
                type="text"
                maxlength="1"
                size="1"
                @keyup="toggleFocus"
                v-model.trim="fourthNumber"
              />
            </div>
          </div>
          <!-- End:: Otp Inputs -->

          <!-- Start:: Submit Button -->
          <div class="col-lg-7 my-5">
            <base-button
              class="mt-0 w-100"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.checkAccount')"
              :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest"
            />
          </div>
          <!-- End:: Submit Button -->

          <!-- Start:: Countdown Timer -->
          <div class="col-12">
            <div class="timer_wrapper">
              <h3>{{ "0 : " + timerCount }}</h3>
              <div class="resend_btn_wrapper">
                <button
                  id="resend_btn"
                  type="button"
                  v-if="timerCount > 0"
                  class="disabled"
                  disabled="disabled"
                >
                  {{ $t("BUTTONS.resendCode") }}
                </button>

                <button
                  id="resend_btn"
                  type="button"
                  v-else
                  @click="resendVerificationCode"
                  :class="timerCount"
                >
                  {{ $t("BUTTONS.resendCode") }}
                </button>
              </div>
            </div>
          </div>
          <!-- Start:: Countdown Timer -->
        </div>
      </form>
    </div>
    <!-- End:: Form -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EmailVerificationForm",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    }),
  },

  data() {
    return {
      // Start:: Loader Data
      isWaitingRequest: false,
      // End:: Loader Data

      // Start:: Verification Type Data
      verificationType: this.$route.params.verification_type,
      // End:: Verification Type Data

      // Start:: Verification Inputs Data
      firstNumber: null,
      secondNumber: null,
      thirdNumber: null,
      fourthNumber: null,
      // End:: Verification Inputs Data

      // Start:: Timer Data
      timerCount: 60,
      // End:: Timer Data
    };
  },

  methods: {
    ...mapActions({
      setAuthenticatedUserData: "AuthenticationModule/setAuthenticatedUserData",
    }),

    // Start:: Toggle Inputs Focus
    toggleFocus(e) {
      if (e.currentTarget.value.length == 1) {
        if (e.currentTarget.nextSibling) {
          e.currentTarget.blur();
          e.currentTarget.nextSibling.focus();
        }
      } else if (e.currentTarget.value.length == 0) {
        if (e.currentTarget.previousSibling) {
          e.currentTarget.blur();
          e.currentTarget.previousSibling.focus();
        }
      }
    },
    // End:: Toggle Inputs Focus

    // Start:: Countdown Timer
    countDown() {
      if (this.timerCount > 0) {
        setTimeout(() => {
          this.timerCount -= 1;
          this.countDown();
        }, 1000);
      }
    },
    // End:: Countdown Timer

    // Start:: Resend Verification Code
    async resendVerificationCode() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("email", this.getAuthenticatedUserData.email);
      // End:: Append Request Data
      const token = localStorage.getItem(
        "drzn_admin_dashboard_forget_pass_token"
      );
      try {
        let res = await this.$axios({
          method: "POST",
          url: `auth/admin/forgot-password`,
          data: REQUEST_DATA,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.timerCount = 60;
        this.countDown();
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
        localStorage.setItem(
          "drzn_admin_dashboard_verification_code",
          res.data.body.code
        );
        this.clearFormInputs();
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Resend Verification Code

    // Start:: Validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (
        !this.firstNumber ||
        !this.secondNumber ||
        !this.thirdNumber ||
        !this.fourthNumber
      ) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phoneVerificationInputs"));
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
      /*this.$axios.defaults.headers.common["Authorization"] =
        "Bearer " +
        localStorage.getItem("drzn_admin_dashboard_forget_pass_token");*/
      REQUEST_DATA.append(
        "code",
        this.firstNumber +
          this.secondNumber +
          this.thirdNumber +
          this.fourthNumber
      );
      REQUEST_DATA.append("email", this.getAuthenticatedUserData.email);
      //REQUEST_DATA.append("is_changed", 1);
      // Start:: Append Request Data

      if (this.verificationType == "reset-password") {
        try {
          let res = await this.$axios({
            method: "POST",
            url: `auth/admin/verify-password-reset-otp`,
            data: REQUEST_DATA,
          });
          this.isWaitingRequest = false;
          /*localStorage.setItem(
            "drzn_admin_dashboard_reset_pass_token",
            res.data.data.access_token
          );*/
          localStorage.setItem(
            "drzn_admin_dashboard_verification_code",
            this.firstNumber +
          this.secondNumber +
          this.thirdNumber +
          this.fourthNumber
          );
          this.$message.success(this.$t("MESSAGES.verifiedSuccessfully"));
          this.clearFormInputs();
          //localStorage.removeItem("drzn_admin_dashboard_email");
          this.$router.replace("/reset-password");
        } catch (error) {
          this.isWaitingRequest = false;
          this.$message.error(error.response.data.message);
        }
      }
    },
    // End:: Submit Form

    // Start:: Clear Form Inputs
    clearFormInputs() {
      this.firstNumber = null;
      this.secondNumber = null;
      this.thirdNumber = null;
      this.fourthNumber = null;
    },
    // End:: Clear Form Inputs
  },

  created() {
    // Start:: Fire Methods
    this.countDown();
    // End:: Fire Methods
  },

  mounted() {
    this.$refs.first_input.focus();
  },
};
</script>
