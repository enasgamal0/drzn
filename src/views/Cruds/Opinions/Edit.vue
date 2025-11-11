<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.editCustomerOpinion") }}</h4>
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
          <base-image-upload-input
            col="12"
            identifier="admin_image"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.customerOpinionImage')"
            @selectImage="selectImage"
            required
          />
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.client_name_ar')"
            v-model.trim="data.client_name_ar"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.client_name_en')"
            v-model.trim="data.client_name_en"
            required
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.client_opinion_ar')"
            v-model.trim="data.client_opinion_ar"
            required
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.client_opinion_en')"
            v-model.trim="data.client_opinion_en"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <!-- <div class="input_wrapper switch_wrapper my-5 col-6">
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
        client_name_ar: null,
        client_name_en: null,
        client_opinion_ar: null,
        client_opinion_en: null,
        active: null,
        image: {
          path: null,
          file: null,
        },
      },

      // End:: Data Collection To Send
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  methods: {
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
      REQUEST_DATA.append("_method", "PUT");
      if (this.data.client_name_ar) {
        REQUEST_DATA.append("name[ar]", this.data.client_name_ar);
      }
      if (this.data.client_name_en) {
        REQUEST_DATA.append("name[en]", this.data.client_name_en);
      }
      if (this.data.client_opinion_ar) {
        REQUEST_DATA.append("comment[ar]", this.data.client_opinion_ar);
      }
      if (this.data.client_opinion_en) {
        REQUEST_DATA.append("comment[en]", this.data.client_opinion_en);
      }
      if (this.data.image.file) {
        REQUEST_DATA.append("image", this.data.image.file);
      }
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      try {
        await this.$axios({
          method: "POST",
          url: `customer-opinions/${this.$route.params?.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/customeropinions/all" });
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
          url: `customer-opinions/${this.$route.params?.id}`,
        });
        this.data.client_opinion_ar = res.data.data.CustomerOpinion.comment_ar;
        this.data.client_name_ar = res.data.data.CustomerOpinion.name_ar;
        this.data.client_opinion_en = res.data.data.CustomerOpinion.comment_en;
        this.data.client_name_en = res.data.data.CustomerOpinion.name_en;
        this.data.image.path = res.data.data.CustomerOpinion.image;
        // this.data.created_at = res.data.data.CustomerOpinion.created_at;
        this.data.active = res.data.data.CustomerOpinion.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },

  created() {
    this.showCity();
  },
};
</script>
