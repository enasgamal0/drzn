<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showProvider") }}</h4>
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
          <div>
            <div
              class="preview-container text-center my-3"
              v-if="
                data.image &&
                data.image !=
                  'https://backend.drzn.moltaqadev.com/assets/avatar.png'
              "
            >
              <p for="image" style="color: #E1423D; font-size: 16px">
                {{ $t("PLACEHOLDERS.personalImage") }}
              </p>
              <img
                :src="data.image"
                :alt="$t('PLACEHOLDERS.personalImage')"
                class="my-3"
              />
              <hr style="width: 98%" />
            </div>
            <div
              class="preview-container text-center my-3"
              v-if="data.commercial_register_img"
            >
              <p for="image" style="color: #E1423D; font-size: 16px">
                {{ $t("PLACEHOLDERS.commercial_register_img") }}
              </p>
              <img
                :src="data.commercial_register_img"
                :alt="$t('PLACEHOLDERS.commercial_register_img')"
                class="my-3"
              />
              <hr style="width: 98%" />
            </div>
            <div
              class="preview-container text-center my-3"
              v-if="data.prev_imgs && data.prev_imgs?.length > 0"
            >
              <p for="image" style="color: #E1423D; font-size: 16px">
                {{ $t("PLACEHOLDERS.prev_imgs") }}
              </p>
              <img
                v-for="prev_img in data.prev_imgs"
                :src="prev_img?.previous_work"
                :alt="$t('PLACEHOLDERS.prev_imgs')"
                class="m-3"
              />
              <hr style="width: 98%" />
            </div>
          </div>

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.name')"
            v-model.trim="data.name"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Email Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            disabled
          />
          <!-- End:: Email Input -->

          <!-- Start:: Phone Input -->
          <!-- <base-phone-input
            col="12"
            disabled
            dir="ltr"
            v-model="data.mobile"
            @dialCode="dialCode"
            @isoCode="isoCode"
            :placeholder="$t('PLACEHOLDERS.phone')"
            :defaultCountry="data.dial_code"
            :key="key"
          /> -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.phone')"
            v-model.trim="data.mobile"
            disabled
          />
          <!-- End:: Phone Input -->

          <!-- Start:: Commercial Registration Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.commercial_register')"
            v-model.trim="data.commercial_registration_number"
            disabled
          />
          <!-- End:: Commercial Registration Input -->

          <!-- Start:: Categories With Sub Categories -->
          <div
            class="row no-padding"
            v-for="(category, index) in structuredCategories"
            :key="category.id"
          >
            <!-- Category Name -->
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.mainSection') + ' #' +  (Number(index)+1)"
              :value="category.name"
              disabled
            />

            <!-- Sub Categories -->
            <base-select-input
              col="6"
              :optionsList="[]"
              :placeholder="$t('PLACEHOLDERS.sub_categories') + ' #' +  (Number(index)+1)"
              v-model.trim="category.sub_categories"
              disabled
              multiple
            />
          </div>
          <!-- End:: Categories With Sub Categories -->

          <!-- Start:: City Select -->
          <base-input
            v-if="data.city"
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.city')"
            v-model.trim="data.city"
            disabled
          />
          <!-- End:: City Select -->

          <!-- Start:: District Select -->
          <base-input
            v-if="data.district"
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.district')"
            v-model.trim="data.district"
            disabled
          />
          <!-- End:: District Select -->

          <!-- Start:: Description Textarea -->
          <base-input
            col="12"
            :placeholder="$t('PLACEHOLDERS.description')"
            v-model.trim="data.description"
            type="textarea"
            disabled
          />
          <!-- End:: Description Textarea -->

          <!-- Start:: Active Switch -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="$t('PLACEHOLDERS.status')"
              v-model="data.is_active"
              hide-details
              disabled
            ></v-switch>
          </div>
          <!-- End:: Active Switch -->

          <hr style="width: 98%" />
          <!-- Start:: referral_code Switch -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="$t('PLACEHOLDERS.referral_code_status')"
              v-model="data.code_status"
              hide-details
              @change="changeReferralCodeStatus()"
            ></v-switch>
          </div>
          <!-- End:: referral_code Switch -->

          <!-- Start:: Referral Code Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.referral_code')"
            v-model.trim="data.referral_code"
            disabled
          />
          <!-- End:: Referral Code Input -->
          <!-- Start:: Referral Code Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.referral_points')"
            v-model.trim="data.referral_points"
            disabled
          />
          <!-- End:: Referral Code Input -->
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
  name: "ShowProvider",
  components: {
    BasePhoneInput,
  },
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        image: null,
        name: null,
        email: null,
        mobile: null,
        referral_code: null,
        code_status: null,
        description: null,
        commercial_registration_number: null,
        category: null,
        sub_categories: [],
        city: null,
        district: null,
        is_active: true,
        dial_code: null,
        iso_code: null,
        commercial_register_img: null,
        prev_imgs: [],
      },
      categories: [],
      subCategories: [],
      cities: [],
      districts: [],
      key: "",
      // End:: Data Collection To Send
    };
  },
  methods: {
    // Start:: API Methods
    async getCategories() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `/categories?page=0&limit=0&is_active=1&ignorePermissionCheck=1`,
        });
        this.categories = res.data.data.data;
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },

    async getSubCategories(categoryId = null) {
      try {
        const url = categoryId
          ? `/sub-categories?category_id=${categoryId}&page=0&limit=0&is_active=1&ignorePermissionCheck=1`
          : `/sub-categories?page=0&limit=0&is_active=1&ignorePermissionCheck=1`;

        let res = await this.$axios({
          method: "GET",
          url: url,
        });
        this.subCategories = res.data.data.data;
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },

    async getCities() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "/cities?page=0&limit=0&is_active=1&ignorePermissionCheck=1",
        });
        this.cities = res.data.data.data;
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },

    async getDistricts(cityId = null) {
      try {
        const url = cityId
          ? `/districts?city_id=${cityId}&page=0&limit=0&is_active=1&ignorePermissionCheck=1`
          : `/districts?page=0&limit=0&is_active=1&ignorePermissionCheck=1`;

        let res = await this.$axios({
          method: "GET",
          url: url,
        });
        this.districts = res.data.data.data;
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },

    // Start:: Show Provider Data
    async showProvider() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `providers/${this.$route.params?.id}`,
        });

        const provider = res.data.data.Provider;
        this.data.name = provider.name;
        this.data.email = provider.email;
        this.data.mobile = provider.mobile;
        this.data.referral_code = provider.code;
        this.data.referral_points = provider.points;
        this.data.code_status = provider.code_status;
        this.data.description = provider.description;
        this.data.commercial_registration_number =
          provider.commercial_registration_number;
        this.data.is_active = provider.is_active;
        this.data.image = provider.image;

        // Set category and load subcategories
        this.data.category = provider.category?.name;
        this.data.sub_categories = provider.provider_sub_categories;

        // Set city and load districts
        this.data.city = provider.city?.name;
        this.data.district = provider.district?.name;
        this.data.commercial_register_img = provider?.commercia_iImage;
        this.data.prev_imgs = provider?.previous_works;
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    },
    // End:: Show Provider Data

    // Start:: Event Handlers
    onCategoryChange(selectedCategory) {
      this.data.sub_categories = [];
      if (selectedCategory?.id) {
        this.getSubCategories(selectedCategory.id);
      }
    },

    onCityChange(selectedCity) {
      this.data.district = null;
      if (selectedCity?.id) {
        this.getDistricts(selectedCity.id);
      }
    },

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // End:: Select Upload Image

    dialCode(dialCode) {
      this.data.dial_code = dialCode;
    },

    isoCode(isoCode) {
      this.data.iso_code = isoCode;
    },

    async changeReferralCodeStatus() {
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("_method", "PUT");
      try {
        await this.$axios({
          method: "POST",
          url: `providers/${this.$route.params?.id}`,
          data: REQUEST_DATA,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
  },

  async created() {
    // Start:: Fire Methods
    await this.showProvider();
    // End:: Fire Methods
  },

  computed: {
    structuredCategories() {
      console.log(this.data.sub_categories);
      if (!this.data.sub_categories || this.data.sub_categories.length === 0) {
        return [];
      }

      const map = {};

      this.data?.sub_categories?.forEach((subCat) => {
        if (!map[subCat?.category_id]) {
          const category = this.categories?.find(
            (cat) => cat.id === subCat?.category_id
          );
          map[subCat?.category_id] = {
            id: subCat?.category_id,
            name: subCat?.category_name,
            sub_categories: [],
          };
        }
        map[subCat?.category_id].sub_categories.push(subCat);
      });

      return Object.values(map);
    },
  },
};
</script>

<style scoped>
.crud_form_wrapper {
  padding: 20px;
}

.form_title_wrapper h4 {
  color: #E1423D;
  margin-bottom: 20px;
}

.btn_wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.switch_wrapper {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.no-padding {
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
}
</style>
