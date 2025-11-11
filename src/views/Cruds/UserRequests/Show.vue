<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_influencer_data") }}</h4>
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
            :placeholder="$t('PLACEHOLDERS.name')"
            v-model.trim="data.name"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.phone')"
            v-model.trim="fullPhoneNumber"
            style="direction: ltr;"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.whatsapp')"
            v-model.trim="fullWhatsappNumber"
            style="direction: ltr;"
            v-if="data.whatsapp"
            disabled
          />
          <!-- <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.user_name')"
            v-model.trim="data.user_name"
            disabled
          /> -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nationality')"
            v-model.trim="data.nationality"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.country')"
            v-model.trim="data.country"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Users.joiningDate')"
            v-model.trim="data.birth_date"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.hobbies')"
            v-model.trim="data.hobbies"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.gender')"
            v-model.trim="data.gender"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.address')"
            v-model.trim="data.address"
            disabled
          />
          <hr style="width: 97%;"/>
          <label class="mt-5 mb-3 font-weight-bold" style="color: #E1423D; font-size: 16px;">{{ $t('PLACEHOLDERS.social_media_accounts') }}</label>
          <base-input
            v-for="(account) in data.social_media_accounts"
            :key="account.id"
            col="6"
            type="text"
            :placeholder="account.platform"
            v-model.trim="account.account_name"
            disabled
          />
        </div>
        <base-input
              type="text"
              col="6"
              :placeholder="$t('PLACEHOLDERS.serial_number')"
              v-model.trim="data.serial_number"
              disabled
              v-if="data.serial_number"
            />
            <div class="col-6" v-if="data.qr_code">
              <a
                @click.prevent="handleQRCodeClick"
              >
                <base-button
                  style="margin-top: 22px"
                  styleType="primary_btn"
                  :btnText="$t('PLACEHOLDERS.qr_code')"
                />
              </a>
            </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "CreateInfluencer",
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
        email: null,
        country_code: null,
        phone: null,
        whatsapp: null,
        whatsapp_country_code: null,
        user_name: null,
        social_media_accounts: [],
        nationality: null,
        country: null,
        birth_date: null,
        hobbies: [],
        address: null,
        gender: null,
        serial_number: null,
        qr_code: null,
      },
      // End:: Data Collection To Send
      areas: [],
      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,

      influencerPoints: [],
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

    handleSaveInfluencer(coordinates) {
      // Handle the saved influencer coordinates from the child component

      this.coordinates = coordinates;
    },
    // start show data
    async showData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `influencers/${this.$route.params?.id}`,
        });
        this.data.name = res.data.data.Influencer.name;
        this.data.email = res.data.data.Influencer.email;
        this.data.country_code = res.data.data.Influencer.country_code;
        this.data.phone = res.data.data.Influencer.mobile;
        this.data.whatsapp_country_code = res.data.data.Influencer.whatsapp_country_code;
        this.data.whatsapp = res.data.data.Influencer.whatsapp_number;
        this.data.user_name = res.data.data.Influencer.user_name;
        this.data.social_media_accounts = res.data.data.Influencer.social_media_accounts;
        this.data.nationality = res.data.data.Influencer.nationality_id?.name;
        this.data.country = res.data.data.Influencer.country_id?.name;
        this.data.birth_date = res.data.data.Influencer.birth_date;
        this.data.hobbies = res.data.data.Influencer.hobbies?.map(hobby => hobby.name).join(' & ') || '';
        this.data.gender = res.data.data.Influencer.gender;
        this.data.address = res.data.data.Influencer.address;
        this.data.serial_number = res.data.data.Influencer.serial_number;
        this.data.qr_code = res.data.data.Influencer.qr_code;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data

    handleQRCodeClick(event) {
      event.preventDefault();
      window.open(this.data.qr_code, "_blank");
    },
  },

  created() {
    this.showData();
  },
  computed: {
    fullWhatsappNumber() {
      return this.data.whatsapp_country_code + this.data.whatsapp;
    },
    fullPhoneNumber() {
      return this.data.country_code + this.data.phone;
    }
  }
};
</script>
