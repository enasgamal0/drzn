<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editClient") }}</h4>
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
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input
            col="12"
            identifier="client_image"
            :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage"
            :preSelectedImage="data.image.path"
          />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            required
          />
          <!-- End:: Name Input -->
          <base-phone-input
            col="12"
            required
            dir="ltr"
            v-model="data.phone"
            @dialCode="dialCode"
            @isoCode="isoCode"
            :placeholder="$t('PLACEHOLDERS.phone')"
            :defaultCountry="data.dial_code"
            :key="key"
          />
          <!-- Start:: WhatsApp Checkbox -->
          <div class="col-12">
            <input
              type="checkbox"
              id="whatsappCheckbox"
              class="whatsappCheckbox"
              v-model="isWhatsappSame"
            />
            <label
              style="font-size: 16px; color: #E1423D"
              for="whatsappCheckbox"
              class="mx-3"
              >{{ $t("PLACEHOLDERS.whatsappCheckbox") }}</label
            >
          </div>
          <!-- End:: WhatsApp Checkbox -->

          <!-- Start:: WhatsApp Input -->
          <base-phone-input
            v-if="!isWhatsappSame"
            col="12"
            dir="ltr"
            v-model="data.whatsapp"
            @dialCode="dialCodeWhatsapp"
            @isoCode="isoCodeWhatsapp"
            :placeholder="$t('PLACEHOLDERS.whatsapp')"
            :defaultCountry="data.dial_code_whatsapp"
            :key="key"
          />
          <!-- End:: WhatsApp Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.client_name')"
            v-model.trim="data.client_name"
            required
          />
          <!-- <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.user_name')"
            v-model.trim="data.user_name"
            required
          /> -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.company_name')"
            v-model.trim="data.company_name"
            required
          />
          <base-select-input
            col="6"
            :optionsList="countries"
            :placeholder="$t('PLACEHOLDERS.country')"
            v-model.trim="data.country"
            required
          />
          <!-- <base-select-input
            col="6"
            :optionsList="nationalities"
            :placeholder="$t('PLACEHOLDERS.natonalty')"
            v-model.trim="data.natonalty"
            required
          /> -->
          <base-select-input
            col="6"
            :optionsList="country_sections"
            :placeholder="$t('PLACEHOLDERS.country_section')"
            v-model.trim="data.country_section"
            required
          />
          <!-- Start:: Phone Input -->
          <base-input
            ref="phoneInput"
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.address')"
            v-model.trim="data.address"
            required
          />
          <!-- End:: Phone Input -->
          <!-- Start:: Email Input -->
          <!-- End:: Email Input -->
          <!-- Start:: Password Input -->
          <base-input
            col="6"
            type="password"
            :placeholder="$t('PLACEHOLDERS.password')"
            v-model.trim="data.password"
            required
          />
          <!-- End:: Password Input -->

          <!-- Start:: Confirm Password Input -->
          <base-input
            col="6"
            type="password"
            :placeholder="$t('PLACEHOLDERS.confirmPassword')"
            v-model.trim="data.passwordConfirmation"
            required
          />
          <!-- End:: Deactivate Switch Input -->
          <hr v-if="data.fields?.length > 0" style="width: 97%" class="my-5" />
          <label
            v-if="data.fields?.length > 0"
            class="font-weight-bold"
            style="font-size: 16px; color: #E1423D"
            >{{ $t("PLACEHOLDERS.social_media_accounts") }}</label
          >
          <div class="row justify-content-center">
            <div
              class="col-12"
              v-for="(item, index) in data.fields"
              :key="'l' + index"
            >
              <!-- <label
                style="font-size: 16px; color: #E1423D"
                class="font-weight-bold mb-4"
                >{{ $t("PLACEHOLDERS.acount_index") }} #{{ index + 1 }}</label
              > -->
              <div class="row">
                <base-select-input
                  col="4"
                  :optionsList="getAvailableSocialTypes(index)"
                  :placeholder="$t('PLACEHOLDERS.platform')"
                  v-model.trim="item.socialType"
                />
                <base-input
                  col="4"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.account_name')"
                  v-model.trim="item.account_name"
                />
                <div class="item d-flex flex-wrap align-items-center col-4">
                  <div class="all_actions" v-if="data.fields?.length > 1">
                    <span
                      class="add_another text-2xl cursor-pointer"
                      @click="removeRow(index, item.account_id)"
                    >
                      <i class="fas fa-minus-circle"></i>
                    </span>
                  </div>
                  <div class="col-l2">
                    <div
                      class="add_another text-2xl cursor-pointer mx-2"
                      @click="addRow"
                    >
                      <i class="fas fa-plus-circle"></i>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <hr class="my-5" /> -->
            </div>
            <!-- <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="$t('SIDENAV.Clients.is_vip')"
              v-model="data.is_vip"
              hide-details
            ></v-switch>
          </div> -->
          </div>
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
import { mapGetters, mapActions } from "vuex";
import BasePhoneInput from "@/components/formInputs/BasePhoneInput.vue";
export default {
  name: "EditClients",
  components: {
    BasePhoneInput,
  },
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      isWhatsappSame: false,

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        email: null,
        is_vip: false,
        client_name: null,
        company_name: null,
        country: null,
        country_section: null,
        address: null,
        natonalty: null,
        password: null,
        passwordConfirmation: null,
        phone: null,
        // user_name: null,
        areas: [],
        active: true,
        fields: [
          {
            socialType: null,
            account_name: null,
          },
        ],
        iban: null,
        dial_code: null,
        dial_code_whatsapp: null,
      },
      allBanks: [],
      // nationalities: [],
      countries: [],
      country_sections: [],
      key: "",
      // End:: Data Collection To Send
    };
  },
  computed: {
    socialTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.x"),
          value: "x",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.facebook"),
          value: "facebook",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.tiktok"),
          value: "tiktok",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.snapchat"),
          value: "snapchat",
        },
        {
          id: 5,
          name: this.$t("PLACEHOLDERS.youtube"),
          value: "youtube",
        },
        {
          id: 6,
          name: this.$t("PLACEHOLDERS.instagram"),
          value: "instagram",
        },
      ];
    },
  },
  methods: {
    getAvailableSocialTypes(currentIndex) {
      const selectedValues = this.data.fields
        .map((item, index) => index !== currentIndex && item.socialType?.value)
        .filter(Boolean);

      return this.socialTypes.filter(
        (type) => !selectedValues.includes(type.value)
      );
    },
    async getCountries() {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `/countries?page=0&limit=0&is_active=1&ignorePermissionCheck=1`,
        });

        this.countries = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // async geNatonalities() {
    //   // this.loading = true;
    //   try {
    //     let res = await this.$axios({
    //       method: "GET",
    //       url: `nationalities?is_active=1&page=0&limit=0`,
    //     });

    //     this.nationalities = res.data.data.data;
    //   } catch (error) {
    //     this.loading = false;
    //     console.log(error.response.data.message);
    //   }
    // },
    async getCountry_sections() {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `/sections?page=0&limit=0&is_active=1&ignorePermissionCheck=1`,
        });

        this.country_sections = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    addRow() {
      this.data.fields.push({
        socialType: null,
        account_name: null,
      });
    },

    async removeRow(index, id) {
      if (id) {
        try {
          await this.$axios({
            method: "DELETE",
            url: `clients/${this.$route.params.id}/account/${id}`,
          });
          this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
        } catch (error) {
          this.$message.error(error.response?.data?.message);
          return;
        }
      }
      this.data.fields.splice(index, 1);
      if (this.data.fields.length === 0) {
        this.addRow();
      }
    },
    // Start:: Select Upload Image
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // End:: Select Upload Image
    dialCode(dialCode) {
      console.log(dialCode);
      this.data.dial_code = dialCode;
    },
    isoCode(iosCode) {
      this.data.iso_code = iosCode;
    },
    isoCodeWhatsapp(iosCode) {
      this.data.whatsapp_iso_code = iosCode;
    },
    dialCodeWhatsapp(dialCode) {
      this.data.dial_code_whatsapp = dialCode;
    },
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      this.submitForm();
    },
    // End:: validate Form Inputs
    async getCities() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "cities?page=0&limit=0&isActive=1&ignorePermissionCheck=1",
        });
        console.log("All Data ==>", res.data.data.data);
        this.allCities = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getBanks() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "banks?page=0&limit=0&isActive=1",
        });
        console.log("All Data ==>", res.data.data.data);
        this.allBanks = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // start show data
    async showClient() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `clients/${this.$route.params?.id}`,
        });
        this.data.client_name = res.data.data.Client.name;
        this.data.image.path = res.data.data.Client.image;
        this.data.email = res.data.data.Client.email;
        this.data.is_vip = res.data.data.Client.is_vip;
        this.data.phone = res.data.data.Client.mobile;
        this.data.whatsapp_iso_code = res.data.data.Client.whatsapp_iso_code;
        this.data.iso_code = res.data.data.Client.iso_code;
        this.key = +res.data.data.Client.country_code;
        // this.data.user_name = res.data.data.Client.user_name;
        this.data.country = res.data.data.Client.country_id;
        this.data.country_section = res.data.data.Client.section_id;
        // this.data.natonalty = res.data.data.Client.nationality_id;
        this.data.company_name = res.data.data.Client.company_name;
        this.data.address = res.data.data.Client.address;
        // this.data.fields = res.data.data.Client.social_media_accounts?.map(
        //   (ele, index) => ({
        //     id: ele.id,
        //     socialType: {
        //       id: index + 1,
        //       name: this.$t(`PLACEHOLDERS.${ele.platform}`),
        //       value: ele.platform,
        //     },
        //     account_name: ele.account_name,
        //   })
        // );
        this.data.fields = res.data.data.Client.social_media_accounts?.map((acc) => ({
            socialType:
              this.socialTypes?.find((s) => s.value === acc.platform) || null,
            account_id: acc.id,
            account_name: acc.account_name,
          })),
        console.log("resss", res.data.data.Client.is_whatsapp_same)
        if (this.data.fields.length === 0) {
          this.data.fields.push({
            socialType: null,
            account_name: null,
          });
        }
        this.isWhatsappSame = res.data.data.Client.is_whatsapp_same;
        this.data.dial_code_whatsapp = res.data.data.Client.whatsapp_country_code;
        this.data.whatsapp = res.data.data.Client.whatsapp_number;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      if (this.data.image.file) {
        REQUEST_DATA.append("avatar", this.data.image.file);
      }
      if (this.data.client_name) {
        REQUEST_DATA.append("name", this.data.client_name);
      }
      if (this.data.email) {
        REQUEST_DATA.append("email", this.data.email);
      }
      REQUEST_DATA.append("is_vip", this.data.is_vip ? 1 : 0)
      if (this.data.dial_code) {
        REQUEST_DATA.append("country_code", this.data.dial_code);
      }
      if (this.data.phone) {
        REQUEST_DATA.append("mobile", this.data.phone);
      }
      // if (this.data.user_name) {
      //   REQUEST_DATA.append("user_name", this.data.user_name);
      // }
      if (this.data.country) {
        REQUEST_DATA.append("country_id", this.data.country?.id);
      }
      if (this.data.country_section) {
        REQUEST_DATA.append("section_id", this.data.country_section?.id);
      }
      // if (this.data.natonalty) {
      //   REQUEST_DATA.append("nationality_id", this.data.natonalty?.id);
      // }
      if (this.data.company_name) {
        REQUEST_DATA.append("company_name", this.data.company_name);
      }
      if (this.data.address) {
        REQUEST_DATA.append("address", this.data.address);
      }
      if (this.data.password) {
        REQUEST_DATA.append("password", this.data.password);
      }
      if (this.data.passwordConfirmation) {
        REQUEST_DATA.append(
          "password_confirmation",
          this.data.passwordConfirmation
        );
      }
      if (this.data.iso_code) {
        REQUEST_DATA.append("iso_code", this.data.iso_code);
      }
      if (this.data.whatsapp_iso_code) {
        REQUEST_DATA.append("whatsapp_iso_code", this.data.whatsapp_iso_code);
      }
      REQUEST_DATA.append("is_whatsapp_same", this.isWhatsappSame ? "1" : "0");

      if (!this.isWhatsappSame) {
        if (this.data.dial_code_whatsapp) {
          REQUEST_DATA.append(
            "whatsapp_country_code",
            this.data.dial_code_whatsapp
          );
        }
        if (this.data.whatsapp) {
          REQUEST_DATA.append("whatsapp_number", this.data.whatsapp);
        }
      }
      if (Array.isArray(this.data.fields)) {
        this.data.fields.forEach((ele, index) => {
          if (ele.socialType?.value) {
            REQUEST_DATA.append(
              `social_media[${index}][platform]`,
              ele.socialType.value
            );
          }
          if (ele.account_id) {
            REQUEST_DATA.append(`social_media[${index}][id]`, ele.account_id);
          }
          if (ele.account_name) {
            REQUEST_DATA.append(
              `social_media[${index}][account_name]`,
              ele.account_name
            );
          }
        });
      }
      REQUEST_DATA.append("_method", "put");

      try {
        await this.$axios({
          method: "POST",
          url: `clients/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/clients/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  async created() {
    // Start:: Fire Methods
    // await this.getCities();
    // await this.getBanks();
    await this.showClient();
    // this.geNatonalities();
    this.getCountries();
    this.getCountry_sections();
    // End:: Fire Methods;
  },
};
</script>
