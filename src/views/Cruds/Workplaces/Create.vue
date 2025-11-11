<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addWorkplace") }}</h4>
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
            :placeholder="$t('TABLES.Workplaces.nameAr')"
            v-model.trim="data.name"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Workplaces.nameEn')"
            v-model.trim="data.nameEn"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Description Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Workplaces.descriptionAr')"
            v-model.trim="data.descProd"
            required
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Workplaces.descriptionEn')"
            v-model.trim="data.descProdEn"
            required
          />
          <!-- End:: Description Input -->

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

          <ChangableMapComponent
            :lat="parseFloat(data.latitude)"
            :lng="parseFloat(data.longitude)"
            @update:lat="data.latitude = $event"
            @update:lng="data.longitude = $event"
          />

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
import moment from "moment";
import ChangableMapComponent from "@/components/general/ChangableMapComponent";

export default {
  name: "CreateWorkplace",
  components: {
    ChangableMapComponent,
  },
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      file: null,
      fileType: "",

      // Start:: Data Collection To Send
      data: {
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        active: true,
        publish_start_date: null,
        publish_end_date: null,
        latitude: 24.7136,
        longitude: 46.6753,
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
      this.data.name = this.data.name.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
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
      if (this.data.descProd) {
        REQUEST_DATA.append("description[ar]", this.data.descProd);
      }
      if (this.data.descProdEn) {
        REQUEST_DATA.append("description[en]", this.data.descProdEn);
      }
      if (this.data.latitude) {
        REQUEST_DATA.append("latitude", this.data.latitude);
      }
      if (this.data.longitude) {
        REQUEST_DATA.append("longitude", this.data.longitude);
      }
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `workplaces`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/workplaces/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },
};
</script>
