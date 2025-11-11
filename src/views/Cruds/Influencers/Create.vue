<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addInfluencer") }}</h4>
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
            identifier="influencer_image"
            :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage"
          />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.full_name')"
            v-model.trim="data.influencer_name"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
          />
          <!-- End:: Input -->
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
            :placeholder="$t('PLACEHOLDERS.influencer_name')"
            v-model.trim="data.full_name"
            required
          />
          <base-input
            col="6"
            type="date"
            :placeholder="$t('TABLES.Users.joiningDate')"
            v-model.trim="data.date"
          />
          <base-select-input
            col="6"
            :optionsList="nationalities"
            :placeholder="$t('PLACEHOLDERS.nationality')"
            v-model.trim="data.nationality"
          />
          <base-select-input
            col="6"
            :optionsList="countries"
            :placeholder="$t('PLACEHOLDERS.country')"
            v-model.trim="data.country"
            @input="getAreas(data.country?.id), data.area = null, data.city = null, data.district = null, areas=[], cities=[], districts=[]"
          />
          <base-select-input
            col="6"
            :optionsList="areas"
            :placeholder="$t('PLACEHOLDERS.area')"
            v-model.trim="data.area"
            @input="getCities(data.area?.id), data.city = null, data.district = null, cities=[], districts=[]"
          />
          <base-select-input
            col="6"
            :optionsList="cities"
            :placeholder="$t('PLACEHOLDERS.city')"
            v-model.trim="data.city"
            @input="getDistricts(data.city?.id), data.district = null, districts=[]"
          />
          <base-select-input
            col="6"
            :optionsList="districts"
            :placeholder="$t('PLACEHOLDERS.district')"
            v-model.trim="data.district"
          />
          <base-input
            ref="streetInput"
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.street')"
            v-model.trim="data.street"
          />
          <base-input
            ref="addressInput"
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.address')"
            v-model.trim="data.address"
          />
          <base-select-input
            col="6"
            :optionsList="hobbies"
            :placeholder="$t('PLACEHOLDERS.hobbies')"
            v-model.trim="data.hobbies"
            :multiple="true"
          />

          <!-- Start:: Gender Selection -->
          <div class="gender-options my-5">
            <label>{{ $t("PLACEHOLDERS.gender") }}: </label>
            <label class="mx-5">
              <input
                class="mx-1"
                type="radio"
                v-model="data.gender"
                value="male"
                @input="data.hijab = null"
                required
              />
              {{ $t("TABLES.Users.male") }}
            </label>
            <label>
              <input
                type="radio"
                class="mx-1"
                v-model="data.gender"
                value="female"
                @input="data.hijab = null"
                required
              />
              {{ $t("TABLES.Users.female") }}
            </label>
          </div>
          <!-- End:: Gender Selection -->
          <!-- Start:: Password Input -->
          <base-input
            col="6"
            type="password"
            :placeholder="$t('PLACEHOLDERS.password')"
            v-model.trim="data.password"
          />
          <!-- End:: Password Input -->

          <!-- Start:: Confirm Password Input -->
          <base-input
            col="6"
            type="password"
            :placeholder="$t('PLACEHOLDERS.confirmPassword')"
            v-model.trim="data.passwordConfirmation"
          />
          <!-- End:: Confirm Password Input -->

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.zip_code')"
            v-model.trim="data.zip_code"
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.verified')"
            v-model.trim="data.verified"
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.mothoq')"
            v-model.trim="data.mothoq"
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.speak')"
            v-model.trim="data.speak"
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.face')"
            v-model.trim="data.face"
            required
          />

          <base-select-input
            v-if="!data.gender || data.gender == 'female'"
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.hijab')"
            v-model.trim="data.hijab"
          />

          <base-select-input
            col="6"
            :optionsList="maritalStatus"
            :placeholder="$t('PLACEHOLDERS.marital_status')"
            v-model.trim="data.marital_status"
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.children')"
            v-model.trim="data.children"
          />

          <base-select-input
            col="6"
            :optionsList="platforms"
            :placeholder="$t('PLACEHOLDERS.best_platform')"
            v-model.trim="data.best_platform"
          />

          <base-select-input
            col="6"
            :optionsList="activeStatuses"
            :placeholder="$t('PLACEHOLDERS.status')"
            v-model.trim="data.account_status"
          />

          <hr style="width: 97%" class="my-5" />
          <label
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
                      @click="removeRow(index)"
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
            </div>
          </div>

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
import { mapGetters, mapActions } from "vuex";
import BasePhoneInput from "@/components/formInputs/BasePhoneInput.vue";

export default {
  name: "CreateInfluencer",
  components: {
    BasePhoneInput,
  },
  computed: {
    activeStatuses() {
      return [
        {
          id: 5,
          name: this.$t("STATUS.pending"),
          value: "pending",
        },
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: "active",
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: "inactive",
        },
        {
          id: 3,
          name: this.$t("STATUS.blocked"),
          value: "blocked",
        },
        {
          id: 4,
          name: this.$t("STATUS.no_response"),
          value: "no_response",
        },
      ];
    },
    yesOrNo() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
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
    platforms() {
      return [
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
          id: 6,
          name: this.$t("PLACEHOLDERS.instagram"),
          value: "instagram",
        },
      ];
    },

    maritalStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.single"),
          value: "single",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.married"),
          value: "married",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.divorced"),
          value: "divorced",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.widowed"),
          value: "widowed",
        },
      ];
    },
  },
  data() {
    return {
      isWaitingRequest: false,
      isWhatsappSame: false,
      data: {
        image: {
          path: null,
          file: null,
        },
        email: null,
        influencer_name: null,
        company_name: null,
        country: null,
        nationality: null,
        hobbies: [],
        address: null,
        password: null,
        passwordConfirmation: null,
        phone: null,
        user_name: null,
        areas: [],
        country: null,
        area: null,
        city: null,
        district: null,
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
      nationalities: [],
      countries: [],
      areas: [],
      cities: [],
      districts: [],
      hobbies: [],
    };
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
    addRow() {
      this.data?.fields.push({
        type: "text",
      });
    },

    removeRow(index) {
      this.data?.fields.splice(index, 1);
    },
    dialCode(dialCode) {
      this.data.dial_code = dialCode;
    },
    dialCodeWhatsapp(dialCode) {
      this.data.dial_code_whatsapp = dialCode;
    },
    isoCode(iosCode) {
      this.data.iso_code = iosCode;
    },
    isoCodeWhatsapp(iosCode) {
      this.data.whatsapp_iso_code = iosCode;
    },
    // Start:: Select Upload Image
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // End:: Select Upload Image
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
    async getAreas(country_id) {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `areas?is_active=1&page=0&limit=0&country_id=${country_id}&ignorePermissionCheck=1`,
        });

        this.areas = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getCities(area_id) {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `cities?is_active=1&page=0&limit=0&area_id=${area_id}&ignorePermissionCheck=1`,
        });

        this.cities = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getDistricts(city_id) {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `districts?is_active=1&page=0&limit=0&city_id=${city_id}&ignorePermissionCheck=1`,
        });

        this.districts = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async geNatonalities() {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `nationalities?is_active=1&page=0&limit=0&ignorePermissionCheck=1`,
        });

        this.nationalities = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getHobbies() {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `hobbies?is_active=1&page=0&limit=0&ignorePermissionCheck=1`,
        });

        this.hobbies = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      this.submitForm();
    },
    // End:: validate Form Inputs
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
    // Start:: Submit Form
    async submitForm() {
      console.log("test1");
      const REQUEST_DATA = new FormData();

      if (this.data.image?.file) {
        REQUEST_DATA.append("avatar", this.data.image.file);
      }
      if (this.data.influencer_name) {
        REQUEST_DATA.append("name", this.data.influencer_name);
      }
      if (this.data.email) {
        REQUEST_DATA.append("email", this.data.email);
      }
      if (this.data.dial_code) {
        REQUEST_DATA.append("country_code", this.data.dial_code);
      }
      if (this.data.iso_code) {
        REQUEST_DATA.append("iso_code", this.data.iso_code);
      }
      if (this.data.whatsapp_iso_code) {
        REQUEST_DATA.append("whatsapp_iso_code", this.data.whatsapp_iso_code);
      }
      if (this.data.phone) {
        REQUEST_DATA.append("mobile", this.data.phone);
      }
      if (this.data.user_name) {
        REQUEST_DATA.append("user_name", this.data.user_name);
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
      if (this.data.country?.id) {
        REQUEST_DATA.append("country_id", this.data.country.id);
      }
      if (this.data.nationality?.id) {
        REQUEST_DATA.append("nationality_id", this.data.nationality.id);
      }
      if (this.data.date) {
        REQUEST_DATA.append("birth_date", this.data.date);
      }
      if (this.data.gender) {
        REQUEST_DATA.append("gender", this.data.gender);
      }
      if (this.data.address) {
        REQUEST_DATA.append("full_address", this.data.address);
        REQUEST_DATA.append("address", this.data.address);
      }
      if (Array.isArray(this.data.fields)) {
        this.data.fields.forEach((ele, index) => {
          if (ele.socialType?.value) {
            REQUEST_DATA.append(
              `social_media[${index}][platform]`,
              ele.socialType.value
            );
          }
          if (ele.account_name) {
            REQUEST_DATA.append(
              `social_media[${index}][account_name]`,
              ele.account_name
            );
          }
        });
      }
      if (Array.isArray(this.data.hobbies)) {
        this.data.hobbies.forEach((hobby) => {
          if (hobby) {
            REQUEST_DATA.append(`hobbies[]`, hobby?.id);
          }
        });
      }

      if (this.data.full_name) {
        REQUEST_DATA.append("full_name", this.data.full_name);
      }
      if (this.data.zip_code) {
        REQUEST_DATA.append("zip_code", this.data.zip_code);
      }
      if (this.data.city) {
        REQUEST_DATA.append("city_id", this.data.city?.id);
      }
      if (this.data.area) {
        REQUEST_DATA.append("area_id", this.data.area?.id);
      }
      if (this.data.district) {
        REQUEST_DATA.append("district_id", this.data.district?.id);
      }
      if (this.data.street) {
        REQUEST_DATA.append("street", this.data.street);
      }
      if (this.data.verified) {
        REQUEST_DATA.append("verified", this.data.verified?.value);
      }
      if (this.data.mothoq) {
        REQUEST_DATA.append("mothoq", this.data.mothoq?.value);
      }
      if (this.data.speak) {
        REQUEST_DATA.append("speak", this.data.speak?.value);
      }
      if (this.data.face) {
        REQUEST_DATA.append("face", this.data.face?.value);
      }
      if (this.data.hijab) {
        REQUEST_DATA.append("hajib", this.data.hijab?.value);
      }
      if(this.data.gender == "male"){
        REQUEST_DATA.append("hajib", 0);
      }
      if (this.data.marital_status) {
        REQUEST_DATA.append("married", this.data.marital_status?.value);
      }
      if (this.data.children) {
        REQUEST_DATA.append("have_child", this.data.children?.value);
      }
      if (this.data.best_platform) {
        REQUEST_DATA.append("best_platform", this.data.best_platform?.value);
      }
      if (this.data.account_status) {
        REQUEST_DATA.append("account_status", this.data.account_status?.value);
      }

      try {
        await this.$axios({
          method: "POST",
          url: `influencers`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/influencers/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(
          error.response?.data?.message || "An error occurred"
        );
      }
    },

    // End:: Submit Form
  },

  async created() {
    this.geNatonalities();
    this.getCountries();
    this.getHobbies();
    this.$nextTick(() => {
      this.data.phone = "";
    });
  },
};
</script>
<style>
.whatsappCheckbox {
  cursor: pointer !important;
}
.gender-options {
  color: #E1423D;
  font-size: 16px;
}
.gender-options input {
  cursor: pointer !important;
}
</style>
