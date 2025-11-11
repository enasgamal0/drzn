<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.showCustomerOpinion") }}</h4>
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
          <div class="preview-container text-center my-3">
            <img
              v-if="data.image?.path"
              col="12"
              :src="data.image?.path"
              :alt="$t('PLACEHOLDERS.personalImage')"
            />
          </div>
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.client_name_ar')"
            v-model.trim="data.client_name_ar"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.client_name_en')"
            v-model.trim="data.client_name_en"
            disabled
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.client_opinion_ar')"
            v-model.trim="data.client_opinion_ar"
            disabled
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.client_opinion_en')"
            v-model.trim="data.client_opinion_en"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.count_finished')"
            v-model.trim="data.count_finish_order"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShowCity",

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
        client_name_ar: null,
        client_name_en: null,
        client_opinion_ar: null,
        client_opinion_en: null,
        count_finish_order: null,
        created_at: null,
        active: null,
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
    // start show data
    async showCity() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `customer-opinions/${this.$route.params?.id}`,
        });
        this.data.client_name_ar = res.data.data.CustomerOpinion.name_ar;
        this.data.client_name_en = res.data.data.CustomerOpinion.name_en;
        this.data.client_opinion_ar = res.data.data.CustomerOpinion.comment_ar;
        this.data.client_opinion_en = res.data.data.CustomerOpinion.comment_en;
        this.data.image.path = res.data.data.CustomerOpinion.image;
        this.data.created_at = res.data.data.CustomerOpinion.created_at;
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
