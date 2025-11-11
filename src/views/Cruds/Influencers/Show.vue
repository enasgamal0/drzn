<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showInfluencer") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <!-- Start:: Image -->
          <div class="preview-container text-center my-3">
            <img
              v-if="data.image.path"
              col="12"
              :src="data.image.path"
              :alt="$t('PLACEHOLDERS.section_image')"
            />
          </div>
          <!-- End:: Image -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.full_name')"
            v-model.trim="data.influencer_name"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            disabled
          />
          <!-- End:: Input -->
          <base-phone-input
            col="12"
            disabled
            dir="ltr"
            v-model="data.phone"
            @dialCode="dialCode"
            :placeholder="$t('PLACEHOLDERS.phone')"
            :defaultCountry="data.dial_code"
            :key="key"
          />
          <!-- Start:: WhatsApp Checkbox -->
          <div class="col-12" v-if="isWhatsappSame">
            <input
              type="checkbox"
              id="whatsappCheckbox"
              v-model="isWhatsappSame"
              disabled
            />
            <label
              style="font-size: 16px; color: #E1423D"
              for="whatsappCheckbox"
              class="mx-3"
              >{{ $t("PLACEHOLDERS.whatsappCheckbox") }}</label
            >
          </div>
          <!-- End:: WhatsApp Checkbox -->

          <!-- Start:: WhatsApp Input -->
          <base-phone-input
            v-if="!isWhatsappSame"
            col="12"
            dir="ltr"
            v-model="data.whatsapp"
            @dialCode="dialCodeWhatsapp"
            :placeholder="$t('PLACEHOLDERS.whatsapp')"
            :defaultCountry="data.dial_code_whatsapp"
            :key="key"
            disabled
          />
          <!-- End:: WhatsApp Input -->
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
            :placeholder="$t('PLACEHOLDERS.influencer_name')"
            v-model.trim="data.full_name"
            disabled
          />
          <base-input
            col="6"
            type="date"
            :placeholder="$t('TABLES.Users.joiningDate')"
            v-model.trim="data.date"
            disabled
          />
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
            :placeholder="$t('PLACEHOLDERS.area')"
            v-model.trim="data.area"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.city')"
            v-model.trim="data.city"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.district')"
            v-model.trim="data.district"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.street')"
            v-model.trim="data.street"
            disabled
          />
          <base-input
            ref="phoneInput"
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.address')"
            v-model.trim="data.address"
            disabled
          />
          <base-select-input
            col="6"
            :optionsList="hobbies"
            :placeholder="$t('PLACEHOLDERS.hobbies')"
            v-model.trim="data.hobbies"
            :multiple="true"
            disabled
          />
          <!-- Start:: Phone Input -->

          <!-- End:: Phone Input -->
          <!-- Start:: Gender Selection -->
          <div class="gender-options my-5">
            <label>{{ $t("PLACEHOLDERS.gender") }}: </label>
            <label class="mx-5">
              <input
                class="mx-1"
                type="radio"
                v-model="data.gender"
                value="male"
                disabled
              />
              {{ $t("TABLES.Users.male") }}
            </label>
            <label>
              <input
                type="radio"
                class="mx-1"
                v-model="data.gender"
                value="female"
                disabled
                style="cursor: not-allowed !important"
              />
              {{ $t("TABLES.Users.female") }}
            </label>
          </div>

          <!-- End:: Gender Selection -->

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.zip_code')"
            v-model.trim="data.zip_code"
            disabled
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.verified')"
            v-model.trim="data.verified"
            disabled
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.mothoq')"
            v-model.trim="data.mothoq"
            disabled
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.speak')"
            v-model.trim="data.speak"
            disabled
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.face')"
            v-model.trim="data.face"
            disabled
          />

          <base-select-input
            v-if="!data.gender || data.gender == 'female'"
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.hijab')"
            v-model.trim="data.hijab"
            disabled
          />

          <base-select-input
            col="6"
            :optionsList="maritalStatus"
            :placeholder="$t('PLACEHOLDERS.marital_status')"
            v-model.trim="data.marital_status"
            disabled
          />

          <base-select-input
            col="6"
            :optionsList="yesOrNo"
            :placeholder="$t('PLACEHOLDERS.children')"
            v-model.trim="data.children"
            disabled
          />
          {{ best_platform }}
          <base-select-input
            col="6"
            :optionsList="platforms"
            :placeholder="$t('PLACEHOLDERS.best_platform')"
            v-model.trim="data.best_platform"
            disabled
          />

          <base-select-input
            col="6"
            :optionsList="activeStatuses"
            :placeholder="$t('PLACEHOLDERS.status')"
            v-model.trim="data.account_status"
            disabled
          />

          <hr v-if="data.fields?.length > 0" style="width: 97%" class="my-5" />
          <label
            v-if="data.fields?.length > 0"
            class="font-weight-bold"
            style="font-size: 16px; color: #E1423D"
            >{{ $t("PLACEHOLDERS.social_media_accounts") }}</label
          >
          <div class="row justify-content-center">
            <div
              class="col-12"
              v-for="(item, index) in data.fields"
              :key="'l' + index"
            >
              <div class="row">
                <base-input
                  type="text"
                  col="6"
                  :placeholder="$t('PLACEHOLDERS.platform')"
                  v-model.trim="item.socialType.name"
                  disabled
                />
                <base-input
                  col="6"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.account_name')"
                  v-model.trim="item.account_name"
                  disabled
                />
                <base-input
                  v-if="item.account_url"
                  col="6"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.account_url')"
                  v-model.trim="item.account_url"
                  disabled
                />
                <!-- <div
                  v-if="!showAllFilters && !filterFormIsActive"
                  class="text-center col-1 mt-7"
                >
                  <img
                    alt="Arrow Down"
                    src="../../../assets/media/icons/ui_icons/arrow_down.svg"
                    style="width: 30px; height: 30px; cursor: pointer"
                  />
                </div> -->
              </div>
            </div>
            <hr
              v-if="data.qr_code || data.serial_number"
              style="width: 97%"
              class="my-5"
            />
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
          </div>
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import BasePhoneInput from "@/components/formInputs/BasePhoneInput.vue";

export default {
  name: "CreateInfluencer",
  components: {
    BasePhoneInput,
  },
  data() {
    return {
      isWaitingRequest: false,
      isWhatsappSame: false,
      data: {
        image: {
          path: null,
          file: null,
        },
        email: null,
        influencer_name: null,
        country: null,
        nationality: null,
        hobbies: [],
        address: null,
        password: null,
        passwordConfirmation: null,
        phone: null,
        user_name: null,
        gender: null,
        date: null,
        fields: [],
        iban: null,
        dial_code: null,
        dial_code_whatsapp: null,
        qr_code: null,
        serial_number: null,
      },
      allBanks: [],
      nationalities: [],
      countries: [],
      hobbies: [],
    };
  },

  computed: {
    activeStatuses() {
      return [
        {
          id: 5,
          name: this.$t("STATUS.pending"),
          value: "pending",
        },
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: "active",
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: "inactive",
        },
        {
          id: 3,
          name: this.$t("STATUS.blocked"),
          value: "blocked",
        },
        {
          id: 4,
          name: this.$t("STATUS.no_response"),
          value: "no_response",
        },
      ];
    },
    yesOrNo() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
    socialTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.x"),
          value: "x",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.facebook"),
          value: "facebook",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.tiktok"),
          value: "tiktok",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.snapchat"),
          value: "snapchat",
        },
        {
          id: 5,
          name: this.$t("PLACEHOLDERS.youtube"),
          value: "youtube",
        },
        {
          id: 6,
          name: this.$t("PLACEHOLDERS.instagram"),
          value: "instagram",
        },
      ];
    },
    platforms() {
      return [
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.tiktok"),
          value: "tiktok",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.snapchat"),
          value: "snapchat",
        },
        {
          id: 6,
          name: this.$t("PLACEHOLDERS.instagram"),
          value: "instagram",
        },
      ];
    },

    maritalStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.single"),
          value: "single",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.married"),
          value: "married",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.divorced"),
          value: "divorced",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.widowed"),
          value: "widowed",
        },
      ];
    },
  },

  methods: {
    yesOrNoFunction(value) {
      return this.yesOrNo.find((item) => item.value == value) || null;
    },
    maritalStatusFunction(value) {
      return (
        this.maritalStatus.find(
          (item) => item.value?.toLowerCase() == value?.toLowerCase()
        ) || null
      );
    },
    platformFunction(value) {
      return (
        this.platforms.find(
          (item) => item.value?.toLowerCase() == value?.toLowerCase()
        ) || null
      );
    },
    accountStatusFunction(value) {
      return (
        this.activeStatuses.find(
          (item) => item.value?.toLowerCase() == value?.toLowerCase()
        ) || null
      );
    },
    async fetchInfluencerData() {
      try {
        let response = await this.$axios.get(
          `/influencers/${this.$route.params?.id}`
        );
        const influencer = response.data.data.Influencer;
        this.data = {
          image: { path: influencer.image, file: null },
          email: influencer.email,
          full_name: influencer.full_name,
          influencer_name: influencer.name,
          country: influencer.country_id?.name || null,
          area: influencer.area?.name || null,
          city: influencer.city?.name || null,
          district: influencer.district?.name || null,
          nationality: influencer.nationality_id?.name || null,
          hobbies: influencer.hobbies,
          address: influencer.address || influencer.full_address,
          street: influencer.street,
          zip_code: influencer.zip_code,
          verified: this.yesOrNoFunction(influencer.verified),
          mothoq: this.yesOrNoFunction(influencer.mothoq),
          speak: this.yesOrNoFunction(influencer.speak),
          face: this.yesOrNoFunction(influencer.face),
          hijab: this.yesOrNoFunction(influencer.hajib),
          marital_status: this.maritalStatusFunction(influencer.married),
          children: this.yesOrNoFunction(influencer.have_child),
          best_platform: this.platformFunction(influencer.best_platform),
          account_status: this.accountStatusFunction(influencer.account_status),
          phone: influencer.mobile,
          user_name: influencer.user_name,
          gender: influencer.gender,
          date: influencer.birth_date,
          dial_code: influencer.country_code,
          iso_code: influencer.iso_code,
          whatsapp_iso_code: influencer.whatsapp_iso_code,
          dial_code_whatsapp: influencer.whatsapp_country_code,
          whatsapp: influencer.whatsapp_number,
          qr_code: influencer.qr_code,
          serial_number: influencer.serial_number,
          fields: influencer.social_media_accounts?.map((acc) => ({
            socialType:
              this.socialTypes?.find((s) => s.value === acc.platform) || null,
            account_id: acc.id,
            account_name: acc.account_name,
            id: acc.id,
          })),
        };
        this.isWhatsappSame = influencer.is_whatsapp_same;
      } catch (error) {
        console.error("Error fetching influencer data:", error);
      }
    },
    dialCode(dialCode) {
      this.data.dial_code = dialCode;
    },

    dialCodeWhatsapp(dialCode) {
      this.data.dial_code_whatsapp = dialCode;
    },
    handleQRCodeClick(event) {
      event.preventDefault();
      window.open(this.data.qr_code, "_blank");
    },
  },

  async created() {
    await this.fetchInfluencerData();
  },
};
</script>

<style>
.gender-options {
  color: #E1423D;
  font-size: 16px;
}
</style>
