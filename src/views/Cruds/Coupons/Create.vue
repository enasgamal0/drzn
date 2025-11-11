<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.addCoupon") }}</h4>
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
          <!-- <base-image-upload-input
            col="12"
            identifier="image"
            :placeholder="$t('PLACEHOLDERS.productImg')"
            @selectImage="selectImage"
            required
          /> -->
          <!-- End:: Image Upload Input -->

          <!-- <BaseImageUploadInput @file-selected="handleFileSelected" @file-removed="handleFileRemoved" /> -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.coupon_name')"
            v-model.trim="data.codeName"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.coupon_nameEN')"
            v-model.trim="data.codeNameEn"
            required
          />
          <!-- End:: Name Input -->

          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.code')"
            v-model="data.code"
            required
          />
          <!-- End:: Status Input -->

          <!-- Start:: Status Input -->
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.discount')"
            v-model="data.discount"
            required
          />
          <!-- End:: Status Input -->
          <!-- End:: Status Input -->
          <base-picker-input
            col="4"
            type="date"
            :placeholder="$t('PLACEHOLDERS.startDate')"
            v-model.trim="data.from_date"
          />
          <!-- End:: Start Date Input -->

          <!-- Start:: End Date Input -->
          <base-picker-input
            col="4"
            type="date"
            :placeholder="$t('PLACEHOLDERS.endDate')"
            v-model.trim="data.to_date"
          />

          <base-select-input
            v-if="data.choose_all == 0"
            multiple
            col="4"
            :optionsList="allUsers"
            :placeholder="$t('SIDENAV.Users.title')"
            v-model="data.users"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-4">
            <v-switch
              color="green"
              :label="
                data.choose_all
                  ? $t('PLACEHOLDERS.chooseAll')
                  : $t('PLACEHOLDERS.choose')
              "
              v-model="data.choose_all"
              hide-details
            ></v-switch>
          </div>
          <div class="input_wrapper switch_wrapper my-5 col-6">
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
        codeName: null,
        codeNameEn: null,
        code: null,
        discount: null,
        from_date: null,
        to_date: null,
        users: null,
        countryFact: null,
        quantaty: null,
        min_quantaty: null,
        mostPaid: null,
        productCode: null,
        choose_all: 0,
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
      allUsers: [],
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
        // console.log("Cities =>", res.data.data);
        this.cats = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getAllUsers() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `clients?is_active=1&page=0&limit=0`,
        });
        // console.log("Cities =>", res.data.data);
        this.allUsers = res.data.data;
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
      if (this.data.codeName) {
        REQUEST_DATA.append("name[ar]", this.data.codeName);
      }
      if (this.data.codeNameEn) {
        REQUEST_DATA.append("name[en]", this.data.codeNameEn);
      }
      if (this.data.discount) {
        REQUEST_DATA.append("percentage", this.data.discount);
      }
      if (this.data.from_date) {
        REQUEST_DATA.append("start_at", this.data.from_date);
      }
      if (this.data.to_date) {
        REQUEST_DATA.append("end_at", this.data.to_date);
      }
      if (this.data.code) {
        REQUEST_DATA.append("code", this.data.code);
      }
      if(this.data.choose_all == 1){
        this.allUsers?.map((ele , index)=>{
          REQUEST_DATA.append(`users[${index}]`, ele.id);
        })
      }else{
        if (this.data.users) {
          this.data.users?.map((ele , index)=>{
            REQUEST_DATA.append(`users[${index}]`, ele.id);
          })
        }
      }

      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `coupons`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/coupons/all" });
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
    this.getAllUsers();
  },
};
</script>
