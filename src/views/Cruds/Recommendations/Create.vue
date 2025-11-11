<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addRecommendation") }}</h4>
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
          <base-select-input
            v-if="users"
            col="6"
            :optionsList="users"
            :placeholder="$t('SIDENAV.Clients.name')"
            v-model="data.user"
            required
          />
          <base-select-input
            col="6"
            :optionsList="influencers"
            :placeholder="$t('PLACEHOLDERS.influencer_name')"
            v-model="data.influencers"
            required
            multiple
            :disabled="!influencers"
            :style="!influencers ? 'cursor: wait;' : ''"
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

export default {
  name: "CreateRecommendation",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      users: null,
      influencers: null,

      file: null,
      fileType: "",

      // Start:: Data Collection To Send
      data: {
        user: null,
        influencers: [],
      },
      // End:: Data Collection To Send
      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
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

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.data.user) {
        REQUEST_DATA.append("user_id", this.data.user?.id);
      }
      if (this.data.influencers) {
        this.data.influencers?.forEach((element) => {
          REQUEST_DATA.append("influencers[]", element?.id);
        });
      }

      // Start:: Append Request Data
      try {
        await this.$axios({
          method: "POST",
          url: `recommendations`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/recommendations/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: Get Users
    async getUsers() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "clients?page=0&limit=0&is_active=1",
        });
        this.users = res.data.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Users
    // Start:: Get Influencers
    async getInfluencers() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "influencers?page=0&limit=0&is_active=1",
        });
        this.influencers = res.data.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Influencers
  },
  mounted() {
    this.getUsers();
    this.getInfluencers();
  },
};
</script>
