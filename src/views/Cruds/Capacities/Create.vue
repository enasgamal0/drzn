<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.CapacitiesAdd") }}</h4>
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
          <base-select-input
                col="6"
                :optionsList="mostPaids"
                :placeholder="$t('PLACEHOLDERS.ResidentialAddIs')"
                v-model="data.most"
              />

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-4">
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
          </div>
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
import BaseImageUploadInput from "../../../components/formInputs/BaseImageUploadInput.vue";
import moment from "moment";

export default {
  name: "CreateAds",

  components: { BaseImageUploadInput },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      file: null,
      fileType: "",

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
        most: null,
        productCode: null,
        active: null,
        nameAr: null,
        nameEn: null,
        active: true,
        publish_start_date: null,
        publish_end_date: null,
      },
      // End:: Data Collection To Send
      cats: [],
      subCats: [],
      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  computed: {
    mostPaids() {
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

  },

  methods: {
    async getCats() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `categories?main=true&limit=0`,
        });
        // console.log("Cities =>", res.data.data);
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
        // console.log("Cities =>", res.data.data);
        this.subCats = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },

    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.nameAr = this.data.nameAr.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
    },

    handleFileSelected({ file, fileType }) {
      this.file = file; // Store the selected file in your data
      this.fileType = fileType; // Store the selected file in your data
    },
    handleFileRemoved() {
      this.file = null; // Reset the file when it's removed
      this.fileType = "";
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
      // Start:: Append Request Data
      if (this.data.name) {
        REQUEST_DATA.append("name[ar]", this.data.name);
      }
      if (this.data.nameEn) {
        REQUEST_DATA.append("name[en]", this.data.nameEn);
      }

      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      REQUEST_DATA.append("double_perioud", this.data.most?.value);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `capacities`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/Capacities/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    // End:: Fire Methods
    // this.getCats();
    // this.getSubcats();
  },
};
</script>
