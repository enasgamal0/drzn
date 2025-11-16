<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_area_data") }}</h4>
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
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.name_ar"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.name_en"
            disabled
          />
          <!-- End:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.created_at')"
            v-model.trim="data.created_at"
            disabled
          />
          <!-- <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.count_finish_order')"
            v-model.trim="data.count_order_finish"
            disabled
          /> -->

          <!-- Start:: Deactivate Switch Input -->
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
              disabled
            ></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "CreateCity",
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      file: null,
      fileType: "",

      // Start:: Data Collection To Send
      data: {
        name_ar: null,
        name_en: null,
        created_at: null,
        count_order_finish: null,
        area_id: null,
        active: true,
      },
      // End:: Data Collection To Send
      areas: [],
      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,

      areaPoints: [],
      coordinates: [],
    };
  },

  methods: {
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

    handleSaveArea(coordinates) {
      // Handle the saved area coordinates from the child component

      this.coordinates = coordinates;
    },
    // start show data
    async showData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `regions/${this.$route.params?.id}?include=translations`,
        });
        this.data.name_ar = res.data.data.translations?.ar?.name;
        this.data.name_en = res.data.data.translations?.en?.name;
        this.data.created_at = res.data.data.created_at;
        this.data.active = res.data.data.is_active;
        // this.data.count_order_finish = res.data.data.count_order_finish;

        // Convert points to an array of objects with numeric values

        // this.areaPoints = res.data.data.Area.location.map((point) => ({
        //   lat: parseFloat(point.lat),
        //   lng: parseFloat(point.lng),
        // }));

        console.log("this.areaPoints", this.areaPoints);
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },

  created() {
    this.showData();
  },
};
</script>
