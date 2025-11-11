<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.how_to_delete_account") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Name Input -->
          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleAr')" v-model.trim="data.nameAr" required /> -->
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleEn')" v-model.trim="data.nameEn" required /> -->

          <!-- End:: Name Input -->

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
  name: "AboutUs",

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
          url: `settings-general?key=delete_account`,
        });
        // Start:: Set Data
        this.data.contentAr = res.data.data.data[0].value.ar;
        this.data.contentEn = res.data.data.data[0].value.en;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
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
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("key", "delete_account");

      REQUEST_DATA.append("value[ar]", this.data.contentAr);
      REQUEST_DATA.append("value[en]", this.data.contentEn);
      // REQUEST_DATA.append("_method", "PUT");

      try {
        await this.$axios({
          method: "POST",
          url: `settings?key=delete_account`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
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
