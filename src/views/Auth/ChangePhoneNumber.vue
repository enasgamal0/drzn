<template>
  <div class="change_phone_num_form_wrapper col-lg-6">
    <!-- START:: FORM TITLE -->
    <div class="form_title_wrapper">
      <!-- START:: LOGO -->
      <!-- <router-link to="/" class="logo_wrapper">
        <img
          src="@/assets/media/logo/logo.png"
          alt="Logo"
          width="140"
          height="140"
        />
      </router-link> -->
      <!-- END:: LOGO -->

      <!-- START:: TITLES -->
      <h2 class="form_title">{{ $t("TITLES.change_number") }}</h2>
      <h3 class="form_subtitle">
        {{ $t("TITLES.enter_new_phoneNumber") }}
      </h3>
      <!-- END:: TITLES -->
    </div>
    <!-- END:: FORM TITLE -->

    <!-- START:: FORM -->
    <div class="form_wrapper">
      <form class="mt-4" @submit.prevent="validateChangePhoneNumberFormInputs">
        <div class="row justify-content-center">
          <!-- START:: PHONE INPUT GROUP -->
          <div class="col-lg-12 my-5">
            <div class="input_wrapper phone_input_wrapper" dir="ltr">
              <div
                class="selected_key_wrapper"
                @click="toggleCountryKeysMenu"
                v-if="countriesData.selectedCountry"
              >
                <div class="flag_wrapper">
                  <img
                    :src="countriesData.selectedCountry.flag"
                    :alt="countriesData.selectedCountry.name"
                    width="30"
                    height="20"
                  />
                </div>
                <div class="key_wrapper" dir="ltr">
                  {{ countriesData.selectedCountry.key }}
                </div>

                <transition name="fadeInUp" mode="out-in">
                  <div
                    class="country_keys_menu_wrapper"
                    v-if="countryKiesMenuIsOpen"
                  >
                    <ul class="country_keys_menu" v-if="countriesData">
                      <li
                        class="menu_item"
                        v-for="countryKey in countriesData.allCountries"
                        :key="countryKey.id"
                        @click="changeSelectedPhoneCode(countryKey)"
                      >
                        <div class="flag_wrapper">
                          <img
                            :src="countryKey.flag"
                            :alt="countryKey.name"
                            width="30"
                            height="20"
                          />
                        </div>
                        <div class="key_wrapper" dir="ltr">
                          {{ countryKey.key }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>

              <input
                type="number"
                class="form-control"
                :placeholder="$t('PLACEHOLDERS.phone')"
                v-model="changePhoneNumData.phone"
                @focus="countryKiesMenuIsOpen = false"
              />
            </div>
          </div>
          <!-- END:: PHONE INPUT GROUP -->

          <!-- START:: SUBMIT BUTTON WRAPPER -->
          <div class="col-lg-12 my-5">
            <div class="btn_wrapper">
              <button class="w-100 mt-0">
                {{ $t("BUTTONS.confirm") }}
                <span class="btn_loader" v-if="isWaitingRequest"></span>
              </button>
            </div>
          </div>
          <!-- END:: SUBMIT BUTTON WRAPPER -->
        </div>
      </form>

      <!-- START:: LOGIN ROUTE WRAPPER -->
      <router-link to="/login" class="register_route">
        <span>{{ $t("BUTTONS.haveAccount") }}</span>
        <span> {{ $t("BUTTONS.login") }}</span>
      </router-link>
      <!-- END:: LOGIN ROUTE WRAPPER -->
    </div>
    <!-- END:: FORM -->
  </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
  name: "ChangePhoneNumberForm",

  data() {
    return {
      // START:: LOADER HANDLING DATA
      isWaitingRequest: false,
      // END:: LOADER HANDLING DATA

      // START:: COUNTRIES KEYS MENU HANDLING DATA
      countryKiesMenuIsOpen: false,
      // END:: COUNTRIES KEYS MENU HANDLING DATA

      // START:: USER ID
      userId: localStorage.getItem("elmo3lm_elmosa3d_user_id"),
      // END:: USER ID

      // START:: LOGIN DATA
      changePhoneNumData: {
        phone: null,
      },
      // END:: LOGIN DATA
    };
  },

  computed: {
    // START:: VUEX GET API GETS DATA
    ...mapGetters("ApiGetsModule", ["countriesData"]),
    // END:: VUEX GET API GETS DATA
  },

  methods: {
    // START:: VUEX API GETS ACTIONS
    ...mapActions("ApiGetsModule", ["getCountries", "changeSelectedPhoneCode"]),
    // END:: VUEX API GETS ACTIONS

    // START:: TOGGLE COUNTRIES KEYS MENU
    toggleCountryKeysMenu() {
      this.countryKiesMenuIsOpen = !this.countryKiesMenuIsOpen;
    },
    // END:: TOGGLE COUNTRIES KEYS MENU

    // START:: VALIDATE PHONE FORM INPUTS
    validateChangePhoneNumberFormInputs() {
      this.isWaitingRequest = true;

      if (!this.changePhoneNumData.phone) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.phoneNumber"),
          messageSize: "22",
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else {
        this.submitChangePhoneNumberForm();
      }
    },
    // END:: VALIDATE PHONE FORM INPUTS

    // START:: SUBMIT PHONE FORM
    submitChangePhoneNumberForm() {
      this.isWaitingRequest = false;

      const theData = new FormData();
      // START:: APPEND STATIC DATA
      theData.append("phone", this.changePhoneNumData.phone);
      theData.append("country_id", this.countriesData.selectedCountry.id);
      // END:: APPEND TEACHER DATA

      // START:: SEND REQUEST
      this.$axios
        .post(`update_phone_after_register/${this.userId}`, theData, {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("elmo3lm_elmosa3d_user_token"),
            "Accept-language": localStorage.getItem(
              "elmo3lm_elmosa3d_app_lang"
            ),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        })
        .then(() => {
          this.isWaitingRequest = false;

          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("MESSAGES.editedSuccessfully"),
            messageSize: "22",
            position: this.$t("iziToastConfigs.position"),
            rtl: this.$t("iziToastConfigs.dir"),
          });

          // START:: LOCAL STORAGE SET REGISTERED USER DATA
          localStorage.setItem(
            "elmo3lm_elmosa3d_registered_user_country_id",
            this.countriesData.selectedCountry.id
          );
          localStorage.setItem(
            "elmo3lm_elmosa3d_registered_user_phone_and_key",
            this.countriesData.selectedCountry.key +
              this.changePhoneNumData.phone
          );
          localStorage.setItem(
            "elmo3lm_elmosa3d_registered_user_phone",
            this.changePhoneNumData.phone
          );
          // END:: LOCAL STORAGE SET REGISTERED USER DATA
          this.$router.back();
          return;
        })
        .catch((error) => {
          this.isWaitingRequest = false;

          this.$iziToast.error({
            timeout: 2000,
            position: this.$t("iziToastConfigs.position"),
            rtl: this.$t("iziToastConfigs.dir"),
            message: error.response.data.message,
            messageSize: "22",
          });
          return;
        });
      // END:: SEND REQUEST
    },
    // END:: SUBMIT PHONE FORM

    // START:: CLEAR PHONE FORM DATA
    clearResetPassPhoneNumberFormData() {
      this.changePhoneNumData.phone = null;
    },
    // END:: CLEAR PHONE FORM DATA
  },
};
</script>
