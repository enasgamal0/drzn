<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.privacyPolicy") }}</h4>
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
          <!-- Start:: Ar Content Text Editor -->
          <base-text-editor
            col="6"
            :placeholder="$t('PLACEHOLDERS.contentAr')"
            v-model.trim="data.contentAr"
            required
          />
          <!-- End:: Ar Content Text Editor -->

          <!-- Start:: En Content Text Editor -->
          <base-text-editor
            col="6"
            :placeholder="$t('PLACEHOLDERS.contentEn')"
            v-model.trim="data.contentEn"
            required
          />
          <!-- Start:: En Content Text Editor -->

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
export default {
  name: "PrivacyPolicy",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        contentAr: null,
        contentEn: null,
        nameAr: null,
        nameEn: null,
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?include=translations`,
          params: {
            "filter[key]": "privacy_policy_page",
          },
        });
        // Start:: Set Data
        const setting = res.data.data.find((item) => item.key === "privacy_policy_page");
        if (setting && setting.translations) {
          const arTranslation = setting.translations.find((t) => t.locale === "ar");
          const enTranslation = setting.translations.find((t) => t.locale === "en");
          this.data.contentAr = arTranslation?.value || setting.value || null;
          this.data.contentEn = enTranslation?.value || setting.value || null;
        }
        // End:: Set Data
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      const isValidContent = (content) => {
        // Check if the content is either empty or only contains whitespace or tags
        const strippedContent = content.replace(/<[^>]*>/g, '').trim();
        return strippedContent.length > 0;
      };
      if (!this.data.contentAr || !isValidContent(this.data.contentAr)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      } else if (!this.data.contentEn || !isValidContent(this.data.contentEn)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = {
        privacy_policy_page: {
          ar: this.data.contentAr,
          en: this.data.contentEn,
        },
      };

      try {
        await this.$axios({
          method: "PATCH",
          url: `settings`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response?.data?.message || error.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
