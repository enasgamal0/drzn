<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.show_offer") }}</h4>
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
          <!-- Start:: Image Upload Input -->
          <!-- <base-image-upload-input col="12" identifier="image" :placeholder="$t('PLACEHOLDERS.image')"
             /> -->
          <!-- End:: Image Upload Input -->

          <div v-if="data.image.path">
            <!-- Display image -->
            <div class="preview-container text-center my-3">
              <video
                v-if="data.image.type === 'video' || ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm', 'm4v'].some(ext => data.image.path.toLowerCase().endsWith(ext))"
                :src="data.image.path"
                controls
                autoplay
                loop
              ></video>
              <img v-else :src="data.image.path" alt="Advertisement Image" />
            </div>
          </div>

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.ImagesSpaces.name')"
            v-model.trim="data.name"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Link Type -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.link_type')"
            :value="getLinkTypeLabel()"
            disabled
          />
          <!-- End:: Link Type -->

          <!-- Start:: External URL (shown when link_type is external) -->
          <base-input
            v-if="data.link_type === 'external'"
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.external_url')"
            v-model.trim="data.external_url"
            disabled
          />
          <!-- End:: External URL -->

          <!-- Start:: Internal Type (shown when link_type is internal) -->
          <base-input
            v-if="data.link_type === 'internal'"
            :col="data.internal_type ? 6 : 12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.internal_type')"
            :value="getInternalTypeLabel()"
            disabled
          />
          <!-- End:: Internal Type -->

          <!-- Start:: Item Name (shown when link_type is internal) -->
          <base-input
            v-if="data.link_type === 'internal'"
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.item')"
            v-model.trim="data.item_name"
            disabled
          />
          <!-- End:: Item Name -->

          <base-picker-input
            col="6"
            type="date"
            :placeholder="$t('PLACEHOLDERS.start_date')"
            v-model.trim="data.start_date"
            disabled
          />

          <base-picker-input
            col="6"
            type="date"
            :placeholder="$t('PLACEHOLDERS.end_date')"
            v-model.trim="data.end_date"
            disabled
          />

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="
                data.is_active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.is_active"
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
import BaseImageUploadInput from "../../../components/formInputs/BaseImageUploadInput.vue";

export default {
  name: "CreateAds",
  components: { BaseImageUploadInput },

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
          path: null,
          type: null, // 'image' or 'video', if applicable
        },
        name: null,
        link_type: null,
        external_url: null,
        internal_type: null,
        item_id: null,
        item_name: null,
        start_date: null,
        end_date: null,
        is_active: true,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {},

  methods: {
    getLinkTypeLabel() {
      if (this.data.link_type === 'external') {
        return this.$t("PLACEHOLDERS.external") || "External";
      } else if (this.data.link_type === 'internal') {
        return this.$t("PLACEHOLDERS.internal") || "Internal";
      }
      return "-";
    },
    getInternalTypeLabel() {
      if (this.data.internal_type === 'product') {
        return this.$t("PLACEHOLDERS.product") || "Product";
      } else if (this.data.internal_type === 'offer') {
        return this.$t("PLACEHOLDERS.offer") || "Offer";
      } else if (this.data.internal_type === 'category') {
        return this.$t("PLACEHOLDERS.category") || "Category";
      }
      return "-";
    },
    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },
    // start all ads data
    async getAdsData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `advertisings/${this.$route.params.id}`,
        });
        const ad = res.data.data;
        this.data.image.path = ad.advertising_url;
        this.data.image.type = ad.advertising_type || (ad.advertising_url && ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm', 'm4v'].some(ext => ad.advertising_url.toLowerCase().endsWith(ext)) ? 'video' : 'image');
        // Handle name from translations
        this.data.name = ad.name || (ad.translations?.ar?.name) || (ad.translations?.en?.name) || '';
        this.data.link_type = ad.link_type;
        this.data.external_url = ad.external_url;
        // Handle new internal_type structure (object with type and data)
        this.data.internal_type = ad.internal_type?.type || ad.internal_type;
        this.data.item_id = ad.item_id;
        this.data.start_date = ad.start_date;
        this.data.end_date = ad.end_date;
        this.data.is_active = ad.is_active;
        
        // Fetch item name if internal type - use data from internal_type.data if available
        if (this.data.link_type === 'internal' && this.data.internal_type && this.data.item_id) {
          if (ad.internal_type?.data?.name) {
            // Use the name from internal_type.data if available
            this.data.item_name = ad.internal_type.data.name || 
                                  ad.internal_type.data.translations?.ar?.name || 
                                  ad.internal_type.data.translations?.en?.name || 
                                  ad.internal_type.data.name_ar || 
                                  ad.internal_type.data.title || 
                                  ad.internal_type.data.title_ar || 
                                  '-';
          } else {
            // Fallback to API call if data is not available
            await this.fetchItemName(this.data.internal_type, this.data.item_id);
          }
        }
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all ads data
    
    // Start:: Fetch Item Name
    async fetchItemName(type, itemId) {
      try {
        let url = "";
        if (type === "product") {
          url = `products/${itemId}`;
        } else if (type === "offer") {
          url = `offers/${itemId}`;
        } else if (type === "category") {
          url = `product-categories/${itemId}`;
        }

        if (url) {
          let res = await this.$axios({
            method: "GET",
            url: url,
          });
          const item = res.data.data?.Product || res.data.data?.Offer || res.data.data?.Category || res.data.data;
          this.data.item_name = item.name || item.name_ar || item.title || item.title_ar || "-";
        }
      } catch (error) {
        console.log(error.response?.data?.message);
        this.data.item_name = "-";
      }
    },
    // End:: Fetch Item Name
  },

  created() {
    // Start:: Fire Methods
    this.getAdsData();
    // End:: Fire Methods
  },
};
</script>

<style>
.preview-container img,
.preview-container video {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: 20px;
}
</style>
