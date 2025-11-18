<template>
  <div class="crud_form_wrapper">
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.contact_admins") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <div class="row justify-content-center">
            <div class="col-l2" v-if="phones?.length < 4">
              <div class="add_another" @click="addRow()">
                <i class="fas fa-plus"></i>
              </div>
            </div>

            <div
              class="col-lg-6 col-12"
              v-for="(item, index) in phones"
              :key="'l' + index"
            >
              <div class="item d-flex align-items-center">
                <base-input
                  class="w-100"
                  type="tel"
                  :placeholder="$t('PLACEHOLDERS.phone')"
                  v-model.trim="item.phone"
                />

                <div class="all_actions" v-if="phones?.length > 1">
                  <span
                    class="add_another remove_phone_number"
                    @click="removeRow(index)"
                  >
                    <i class="fas fa-minus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- Start:: Tax Percentage Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.WhatsApp_contact')"
            v-model.trim="data.WhatsApp_contact"
          />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Tax Percentage Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
          />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Tax Percentage Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.facebook_link')"
            v-model.trim="data.facebook_link"
          />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.insta_link')"
            v-model.trim="data.instagram_link"
          />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Delivery Price Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.snap_link')"
            v-model.trim="data.snapchat_link"
          />
          <!-- End:: Delivery Price Input -->

          <!-- Start:: Delivery Price Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.tiktok_link')"
            v-model.trim="data.tiktok_link"
          />
          <!-- End:: Delivery Price Input -->

          <!-- Start:: Tax Percentage Input -->
          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.twitter_link')"
            v-model.trim="data.twitter_link"
          />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Tax Percentage Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.android')"
            v-model.trim="data.android"
          />
          <!-- End:: Tax Percentage Input -->
          <!-- Start:: Tax Percentage Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.ios')"
            v-model.trim="data.ios"
          />
          <!-- End:: Tax Percentage Input -->

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
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "GeneralSettings",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        WhatsApp_contact: null,
        twitter_link: null,
        tiktok_link: null,
        snapchat_link: null,
        instagram_link: null,
        facebook_link: null,
        android: null,
        ios: null,
        email: null,
      },
      // End:: Data Collection To Send

      phones: [
        {
          phone: "",
        },
      ],
    };
  },

  methods: {
    addRow() {
      this.phones.push({ phone: "" });
    },

    removeRow(index) {
      this.phones.splice(index, 1);
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?include=translations`,
          params: {
            "filter[key]": "phone,email,whatsapp_number,facebook_username,snapchat_username,instagram_username,x_username,tiktok_username,ios,android",
          },
        });
        // Start:: Set Data
        const settings = res.data.data;

        // Get phone numbers
        const phoneSetting = settings.find((item) => item.key === "phone");
        if (phoneSetting && Array.isArray(phoneSetting.value)) {
          this.phones = phoneSetting.value.map((phone) => ({ phone: phone }));
        }
        if (this.phones.length === 0) {
          this.phones.push({ phone: "" });
        }

        // Get other settings
        const emailSetting = settings.find((item) => item.key === "email");
        this.data.email = emailSetting?.value || null;

        const whatsappSetting = settings.find((item) => item.key === "whatsapp_number");
        this.data.WhatsApp_contact = whatsappSetting?.value || null;

        const facebookSetting = settings.find((item) => item.key === "facebook_username");
        this.data.facebook_link = facebookSetting?.value || null;

        const instagramSetting = settings.find((item) => item.key === "instagram_username");
        this.data.instagram_link = instagramSetting?.value || null;

        const snapchatSetting = settings.find((item) => item.key === "snapchat_username");
        this.data.snapchat_link = snapchatSetting?.value || null;

        const twitterSetting = settings.find((item) => item.key === "x_username");
        this.data.twitter_link = twitterSetting?.value || null;

        const tiktokSetting = settings.find((item) => item.key === "tiktok_username");
        this.data.tiktok_link = tiktokSetting?.value || null;

        const androidSetting = settings.find((item) => item.key === "android");
        this.data.android = androidSetting?.value || null;

        const iosSetting = settings.find((item) => item.key === "ios");
        this.data.ios = iosSetting?.value || null;

        // Note: android and ios might need separate API calls if they exist
        // End:: Set Data
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = true;

      const REQUEST_DATA = {};

      // Phone numbers (array)
      const phoneNumbers = this.phones
        .map((item) => item.phone)
        .filter((phone) => phone && phone.trim() !== "");
      if (phoneNumbers.length > 0) {
        REQUEST_DATA.phone = phoneNumbers;
      }

      // Non-translatable fields
      if (this.data.email) {
        REQUEST_DATA.email = this.data.email;
      }
      if (this.data.WhatsApp_contact) {
        REQUEST_DATA.whatsapp_number = this.data.WhatsApp_contact;
      }
      if (this.data.facebook_link) {
        REQUEST_DATA.facebook_username = this.data.facebook_link;
      }
      if (this.data.instagram_link) {
        REQUEST_DATA.instagram_username = this.data.instagram_link;
      }
      if (this.data.snapchat_link) {
        REQUEST_DATA.snapchat_username = this.data.snapchat_link;
      }
      if (this.data.twitter_link) {
        REQUEST_DATA.x_username = this.data.twitter_link;
      }
      if (this.data.tiktok_link) {
        REQUEST_DATA.tiktok_username = this.data.tiktok_link;
      }
      if (this.data.android) {
        REQUEST_DATA.android = this.data.android;
      }
      if (this.data.ios) {
        REQUEST_DATA.ios = this.data.ios;
      }

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

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.submitForm();
    },
    // End:: validate Form Inputs
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>

<style lang="scss" scoped>
.item {
  gap: 10px;
}

.all_action {
  display: flex;
  gap: 15px;
}

.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto;

  .fa-trash {
    color: #ff2159;
    cursor: pointer;
  }
}
</style>