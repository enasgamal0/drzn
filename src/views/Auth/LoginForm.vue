<template>
  <div class="login_form_wrapper">
    <!-- Start:: Form Title -->
    <!-- <div class="form_title_wrapper">
    </div> -->
    <!-- End:: Form Title -->

    <!-- Start:: Form -->
    <div class="form_wrapper">
      <form
        class="mt-4"
        @submit.prevent="validateFormInputs"
        autocomplete="off"
      >
        <div class="row justify-content-center">
          <!-- Start:: Email Input -->
          <base-input
            col="7"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="loginData.email"
            required
          />
          <!-- End:: Email Input -->

          <!-- Start:: Password Input -->
          <base-input
            col="7"
            type="password"
            :placeholder="$t('PLACEHOLDERS.password')"
            v-model.trim="loginData.password"
            required
          />
          <!-- End:: Password Input -->

          <!-- Start:: Forget Password Route -->
          <div class="col-lg-7">
            <router-link to="/reset-password-email" class="forget_pass_route">
              {{ $t("BUTTONS.forgetPassword") }}
            </router-link>
          </div>
          <!-- End:: Forget Password Route -->

          <!-- Start:: Submit Button -->
          <div class="col-lg-7 my-5">
            <base-button
              class="mt-0 w-100"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.login')"
              :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest"
            />
          </div>
          <!-- End:: Submit Button -->
        </div>
      </form>
    </div>
    <!-- End:: Form -->
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/messaging";
import { mapGetters, mapActions } from "vuex";
import { mapPermissionsToAbilityCombos } from "@/utils/permissionAdapter";

export default {
  name: "LoginForm",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  data() {
    return {
      // Start:: Loader Data
      isWaitingRequest: false,
      // End:: Loader Data

      // Start:: Data Collection To Send
      loginData: {
        email: null,
        password: null,
      },

      device_token: null,
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Vuex Set Authenticated User Data
    ...mapActions({
      setAuthenticatedUserData: "AuthenticationModule/setAuthenticatedUserData",
      updatePermissions: "CaslModule/updatePermissions",
    }),
    // End:: Vuex Set Authenticated User Data

    // Start:: Validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.loginData.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      } else if (!this.loginData.password) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      }
      // else if (this.loginData.password.length < 6) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.passwordLength"));
      //   return;
      // }
      else {
        this.submitForm();
      }
    },
    // End:: Validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data (JSON)
      REQUEST_DATA.append("email", this.loginData.email);
      REQUEST_DATA.append("password", this.loginData.password);
      REQUEST_DATA.append("device_token", this.device_token);

      // End:: Append Request Data (JSON)

      try {
        await fetch("sanctum/csrf-cookie");

        let res = await this.$axios({
          method: "POST",
          url: `auth/admin/login`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        const { user, token } = res.data.data;

        localStorage.setItem(
          "drzn_admin_roles",
          JSON.stringify(user)
        );

        const abilityCombos = mapPermissionsToAbilityCombos(user?.permissions);
        localStorage.setItem(
          "drzn_admin_dashboard_user_ability",
          JSON.stringify(abilityCombos)
        );

        console.log(JSON.parse(localStorage.getItem("drzn_admin_roles")));
        // Start:: Set Authed User Data
        this.setAuthenticatedUserData({
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.user_type,
          token,
          image: user.avatar,
          ability: JSON.stringify(abilityCombos),
        });
        // End:: Set Authed Data
        this.$message.success(this.$t("VALIDATION.loginSuccess"));
        this.clearFormInputs();
        this.$router.replace("/home");
        location.reload();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: Clear Form Inputs
    clearFormInputs() {
      this.loginData.email = null;
      this.loginData.password = null;
    },
    // End:: Clear Form Inputs

    // get fcm token

    async getFirebaseToken() {
      const messaging = firebase.messaging();
      try {
        const token = await messaging.getToken();
        this.device_token = token;
        console.log("FCM token:", token);
      } catch (error) {
        console.error("Error requesting permission/token:", error);
      }
    },
  },

  mounted() {
    this.getFirebaseToken();
  },
};
</script>
