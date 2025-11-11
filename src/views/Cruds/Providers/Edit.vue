<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editProvider") }}</h4>
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
            identifier="provider_image"
            :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage"
            :preSelectedImage="data.image.path"
          />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.name')"
            v-model.trim="data.name"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Email Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            required
          />
          <!-- End:: Email Input -->

          <!-- Start:: Phone Input -->
          <!-- <base-phone-input
            col="12"
            required
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
            required
          />
          <!-- End:: Phone Input -->

          <!-- Start:: Referral Code Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.referral_code')"
            v-model.trim="data.referral_code"
          />
          <!-- End:: Referral Code Input -->

          <!-- Start:: Commercial Registration Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.commercial_register')"
            v-model.trim="data.commercial_registration_number"
            required
          />
          <!-- End:: Commercial Registration Input -->

          <!-- Start:: Category Select -->
          <base-select-input
            col="6"
            :optionsList="categories"
            :placeholder="$t('PLACEHOLDERS.category')"
            v-model="data.category"
            @input="onCategoryChange"
            required
          />
          <!-- End:: Category Select -->

          <!-- Start:: Sub Categories Multi Select -->
          <base-multi-select-input
            col="6"
            :optionsList="subCategories"
            :placeholder="$t('PLACEHOLDERS.subCategories')"
            v-model="data.sub_categories"
            required
          />
          <!-- End:: Sub Categories Multi Select -->

          <!-- Start:: City Select -->
          <base-select-input
            col="6"
            :optionsList="cities"
            :placeholder="$t('PLACEHOLDERS.city')"
            v-model="data.city"
            @input="onCityChange"
            required
          />
          <!-- End:: City Select -->

          <!-- Start:: District Select -->
          <base-select-input
            col="6"
            :optionsList="districts"
            :placeholder="$t('PLACEHOLDERS.district')"
            v-model="data.district"
            required
          />
          <!-- End:: District Select -->

          <!-- Start:: Description Textarea -->
          <base-textarea-input
            col="12"
            :placeholder="$t('PLACEHOLDERS.description')"
            v-model.trim="data.description"
            rows="4"
          />
          <!-- End:: Description Textarea -->

          <!-- Start:: Active Switch -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="$t('PLACEHOLDERS.referral_code')"
              v-model="data.is_active"
              hide-details
            ></v-switch>
          </div>
          <!-- End:: Active Switch -->

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
  name: "EditProvider",
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
        image: {
          path: null,
          file: null,
        },
        name: null,
        email: null,
        mobile: null,
        referral_code: null,
        description: null,
        commercial_registration_number: null,
        category: null,
        sub_categories: [],
        city: null,
        district: null,
        is_active: true,
        dial_code: null,
        iso_code: null,
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
        this.data.referral_code = provider.referral_code;
        this.data.description = provider.description;
        this.data.commercial_registration_number = provider.commercial_registration_number;
        this.data.is_active = provider.is_active;
        this.data.image.path = provider.image;
        
        // Set category and load subcategories
        this.data.category = provider.category_id;
        if (provider.category_id) {
          await this.getSubCategories(provider.category_id);
        }
        this.data.sub_categories = provider.sub_category_ids || [];
        
        // Set city and load districts
        this.data.city = provider.city_id;
        if (provider.city_id) {
          await this.getDistricts(provider.city_id);
        }
        this.data.district = provider.district_id;
        
        // Set phone related data
        this.data.dial_code = provider.country_code;
        this.data.iso_code = provider.iso_code;
        this.key = +provider.country_code || "";
        
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

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      this.submitForm();
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      
      // Append image if selected
      if (this.data.image.file) {
        REQUEST_DATA.append("avatar", this.data.image.file);
      }
      
      // Append basic fields
      if (this.data.name) {
        REQUEST_DATA.append("name", this.data.name);
      }
      if (this.data.email) {
        REQUEST_DATA.append("email", this.data.email);
      }
      if (this.data.mobile) {
        REQUEST_DATA.append("mobile", this.data.mobile);
      }
      if (this.data.referral_code) {
        REQUEST_DATA.append("referral_code", this.data.referral_code);
      }
      if (this.data.description) {
        REQUEST_DATA.append("description", this.data.description);
      }
      if (this.data.commercial_registration_number) {
        REQUEST_DATA.append("commercial_registration_number", this.data.commercial_registration_number);
      }
      if (this.data.category?.id) {
        REQUEST_DATA.append("category_id", this.data.category.id);
      }
      if (this.data.city?.id) {
        REQUEST_DATA.append("city_id", this.data.city.id);
      }
      if (this.data.district?.id) {
        REQUEST_DATA.append("district_id", this.data.district.id);
      }
      if (this.data.dial_code) {
        REQUEST_DATA.append("country_code", this.data.dial_code);
      }
      if (this.data.iso_code) {
        REQUEST_DATA.append("iso_code", this.data.iso_code);
      }
      
      // Append sub categories array
      if (Array.isArray(this.data.sub_categories)) {
        this.data.sub_categories.forEach((subCat, index) => {
          REQUEST_DATA.append(`sub_category_ids[${index}]`, subCat.id);
        });
      }
      
      // Append active status
      REQUEST_DATA.append("is_active", this.data.is_active ? "1" : "0");
      
      // Add method for PUT request
      REQUEST_DATA.append("_method", "put");

      try {
        await this.$axios({
          method: "POST",
          url: `providers/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/providers/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response?.data?.message || "An error occurred");
      }
    },
    // End:: Submit Form
  },

  async created() {
    // Start:: Fire Methods
    await this.getCategories();
    await this.getCities();
    await this.showProvider();
    // End:: Fire Methods
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
</style>