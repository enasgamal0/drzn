<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.ResidentialAddEdit") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #7514b7">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.name')"
            v-model.trim="data.name"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            required
          />

          <!-- Start:: Deactivate Switch Input -->
          <!-- <div class="input_wrapper switch_wrapper my-5 col-4">
            <v-switch
              color="green"
              :label="
                data.active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.active"
              hide-details
            ></v-switch>
          </div> -->
          <!-- End:: Deactivate Switch Input -->

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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditCity",

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
        nameEn: null,
        descProd: null,
        descProdEn: null,
        mainCat: null,
        subCats: null,
        wood: null,
        countryFact: null,
        quantaty: null,
        min_quantaty: null,
        mostPaid: null,
        productCode: null,
        active: null,
        nameAr: null,
        nameEn: null,
        region_id: null,
        active: null,
      },
      regions: [],
      cats: [],
      subCats: [],

      // End:: Data Collection To Send
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
    mostPaids() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: true,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: false,
        },
      ];
    },
  },

  methods: {
    async getCats() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `categories?main=true&limit=0`,
        });
        // console.log("products =>", res.data.data);
        this.cats = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getSubcats() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `categories?limit=0`,
        });
        // console.log("products =>", res.data.data);
        this.subCats = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
        this.submitForm();
    },

    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      if (this.data.name) {
        REQUEST_DATA.append("name[ar]", this.data.name);
      }
      if (this.data.name) {
        REQUEST_DATA.append("name[en]", this.data.nameEn);
      }
      REQUEST_DATA.append("_method", "PUT");
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      try {
        await this.$axios({
          method: "POST",
          url: `additions/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/ResidentialAdd/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },

    // start show data
    async showCity() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `additions/${this.$route.params.id}`,
        });
        this.data.name = res.data.data.Addition.name_ar;
        this.data.nameEn = res.data.data.Addition.name_en;
        this.data.active = res.data.data.Addition.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data

    async getRegions() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `regions`,
          params: {
            is_active: 1,
          },
        });
        // console.log("products =>", res.data.data);
        this.regions = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.showCity();
    // this.getRegions();
    this.getCats()
    this.getSubcats()
    // End:: Fire Methods
  },
};
</script>
