<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.client_request_details") }}</h4>
    </div>
    <!-- End:: Title -->
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- <v-row>
            <v-col cols="12">
              <base-image-upload-input
                col="12"
                identifier="admin_image"
                :placeholder="$t('PLACEHOLDERS.admin_image')"
                :preSelectedImage="data.image.path"
                @selectImage="selectImage"
                disabled
              />
            </v-col>
          </v-row> -->
          <!-- Start:: Name Input -->
          <!-- <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.user_name')"
            v-model.trim="data.user_name"
            disabled
          /> -->
          <base-input
            col="12"
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
            disabled
          />

          <!-- end phone tel -->
          <!-- Start:: email Input -->
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
            :placeholder="$t('PLACEHOLDERS.company_name')"
            v-model.trim="data.company_name"
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
            :placeholder="$t('PLACEHOLDERS.country_section')"
            v-model.trim="data.country_section"
            disabled
          />
          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.address')"
            v-model.trim="data.address"
            disabled
          />

          <div class="row col-12" v-for="(item, index) in socials" :key="item">
            <p>
              {{ $t("PLACEHOLDERS.acount_index") + " " + (index + 1) }}
            </p>

            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.platform')"
              v-model.trim="item.platform"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.account_name')"
              v-model.trim="item.account_name"
              disabled
            />
          </div>
          <!-- End:: email Input -->

          <!-- <h3>{{ $t("PLACEHOLDERS.salon_data") }}</h3> -->

          <!-- <v-row>
            <v-col cols="12">
              <base-image-upload-input
                col="12"
                identifier="salon_logo"
                :placeholder="$t('PLACEHOLDERS.salon_logo')"
                @selectImage="selectImageSalon"
                :preSelectedImage="data.salon_image.path"
                disabled
              />
            </v-col>
          </v-row> -->

          <!-- ********** Start:: slider Data ********** -->
          <!-- <div class="col-12">
            <div class="row align-items-center">
              <v-col col="12" sm="12" md="12">
                <h4>{{ $t("PLACEHOLDERS.salon_images") }}</h4>

                <div class="images">
                  <div
                    class="image"
                    v-for="(item, index) in imgUrls"
                    :key="'j' + index"
                  >
                    <img :src="item.url" :alt="item.id" />
                  </div>
                </div>
              </v-col>
            </div>
          </div> -->
          <!-- <div class="col-12">
            <div class="row align-items-center">
              <v-col col="12" sm="12" md="12">
                <UploadsPhotos
                  :urls="imgUrls"
                  multiple
                  @onFileSelect="onFileSelect"
                  @onFileRemove="onFileRemove"
                  disabled
                >
                  {{ $t("PLACEHOLDERS.salon_images") }}
                  {{ $t("PLACEHOLDERS.extendPhoto") }}
                  <span class="text-danger">*</span>
                </UploadsPhotos>
              </v-col>
            </div>
          </div> -->
          <!-- ********** End::  slider Data ********** -->

          <!-- Start:: salon_name_ar Input -->
          <!-- <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.whatsapp')"
            v-model.trim="fullWhatsappNumber"
            style="direction: ltr;"
            v-if="data.whatsapp"
            disabled
          /> -->
          <!-- End:: salon_name_ar Input -->

          <!-- Start:: salon_name_en Input -->
          <!-- <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.user_name')"
            v-model.trim="data.user_name"
            disabled
          /> -->
          <!-- End:: salon_name_en Input -->

          <!-- Start:: salon_description_ar Input -->
          <!-- <base-input
            col="6"
            rows="4"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.salon_description_ar')"
            v-model.trim="data.salon_description_ar"
            disabled
          /> -->
          <!-- End:: salon_description_ar Input -->

          <!-- Start:: salon_description_en Input -->
          <!-- <base-input
            col="6"
            rows="4"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.salon_description_en')"
            v-model.trim="data.salon_description_en"
            disabled
          /> -->
          <!-- End:: salon_description_en Input -->
          <!-- 
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nationality')"
            v-model.trim="data.nationality"
            disabled
          /> -->
          <!-- 
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.country')"
            v-model.trim="data.country"
            disabled
          /> -->

          <!-- Start:: Deactivate Switch Input -->
          <!-- <h4>{{ $t("PLACEHOLDERS.registered_in_marouf") }}</h4>

          <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="
                data.registered_in_marouf
                  ? $t('PLACEHOLDERS.yes')
                  : $t('PLACEHOLDERS.no')
              "
              v-model="data.registered_in_marouf"
              hide-details
              disabled
            ></v-switch>

            <base-input
              v-if="data.marouf"
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.marouf_number')"
              v-model.trim="data.marouf"
              disabled
            />
          </div> -->
          <!-- End:: Deactivate Switch Input -->

          <!-- <base-select-input
            v-if="main_sections"
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
            col="12"
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

          <div style="pointer-events: none">
            <ChangableMapComponent
              :lat="parseFloat(data.latitude)"
              :lng="parseFloat(data.longitude)"
              @update:lat="data.latitude = $event"
              @update:lng="data.longitude = $event"
              class="mb-5"
              disabled
            />
          </div> -->
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
        image: {
          path: "",
          file: "",
        },
        salon_image: {
          path: "",
          file: "",
        },
        email: null,
        // user_name: null,
        phone: null,
        name: null,
        company_name: null,
        country: null,
        country_section: null,
        address: null,
        salon_description_ar: null,
        salon_description_en: null,
        commercial_register: null,
        salon_number: null,
        active: true,
        registered_in_marouf: 0,
        main_section: null,
        marouf: null,
        sub_section: null,
        region: null,
        WhatsApp_contact: null,
        twitter_link: null,
        snap_link: null,
        insta_link: null,
        latitude: 24.7136,
        longitude: 46.6753,
        whatsapp_country_code: null,
        whatsapp: null,
      },

      phones: [],
      days: [],
      socials: [],

      mapOptions: {
        zoomControl: false, // Disable the default zoom control
        disableDoubleClickZoom: true, // Disable zooming on double-click
        draggable: false, // Disable dragging the map
        clickableIcons: false, // Disable clickable icons on the map
        // More options can be added if required
      },

      additionalImages: [],
      imgUrls: [],
      main_sections: [],
      sub_sections: [],
      regions: [],

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
          url: `clients/${this.$route.params.id}`,
        });

        // this.data.user_name = res.data.data?.Client.user_name;
        this.data.email = res.data.data?.Client.email;
        this.data.phone = res.data.data?.Client.mobile;
        this.data.country_code = res.data.data?.Client.country_code;
        this.data.name = res.data.data?.Client.name;
        // this.data.user_name = res.data.data?.Client.user_name;
        this.data.company_name = res.data.data?.Client.company_name;
        this.data.country = res.data.data?.Client.country_id?.name;
        this.data.country_section = res.data.data?.Client.section_id?.name;
        this.data.address = res.data.data?.Client?.address;
        this.socials = res.data.data?.Client?.social_media_accounts;
        this.data.whatsapp_country_code = res.data.data?.Client?.whatsapp_country_code;
        this.data.whatsapp = res.data.data?.Client?.whatsapp_number;
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
