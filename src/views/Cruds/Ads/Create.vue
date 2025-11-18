<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.add_ads") }}</h4>
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
          <base-image-upload-input
            col="12"
            identifier="image"
            :placeholder="$t('PLACEHOLDERS.advertisement')"
            @selectImage="selectImage"
            :acceptVideo="true"
            required
          />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.ImagesSpaces.name')"
            v-model.trim="data.name"
            :maxlength="100"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Link Type -->
          <base-select-input
            col="6"
            :optionsList="linkTypes"
            :placeholder="$t('PLACEHOLDERS.link_type')"
            v-model="data.link_type"
            trackBy="value"
            label="name"
          />
          <!-- End:: Link Type -->

          <!-- Start:: External URL (shown when link_type is external) -->
          <base-input
            v-if="data.link_type && data.link_type.value === 'external'"
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.external_url')"
            v-model.trim="data.external_url"
          />
          <!-- End:: External URL -->

          <!-- Start:: Internal Type (shown when link_type is internal) -->
          <base-select-input
            v-if="data.link_type && data.link_type.value === 'internal'"
            :col="data.internal_type ? 6 : 12"
            :optionsList="internalTypes"
            :placeholder="$t('PLACEHOLDERS.internal_type')"
            v-model="data.internal_type"
            trackBy="value"
            label="name"
            @input="handleInternalTypeChange"
          />
          <!-- End:: Internal Type -->

          <!-- Start:: Item ID (shown when link_type is internal) -->
          <base-select-input
            v-if="data.link_type && data.link_type.value === 'internal' && data.internal_type"
            col="6"
            :optionsList="itemsList"
            :placeholder="$t('PLACEHOLDERS.item')"
            v-model="data.item_id"
            trackBy="id"
            label="name"
          />
          <!-- End:: Item ID -->

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledStartDate"
            :placeholder="$t('PLACEHOLDERS.start_date')"
            v-model.trim="data.start_date"
            required
          />

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledEndDate"
            :placeholder="$t('PLACEHOLDERS.end_date')"
            v-model.trim="data.end_date"
            required
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
            ></v-switch>
          </div>
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
import BaseImageUploadInput from "../../../components/formInputs/BaseImageUploadInput.vue";
import moment from "moment";

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
          file: null,
        },
        name: null,
        link_type: null,
        external_url: null,
        internal_type: null,
        item_id: null,
        start_date: null,
        end_date: null,
        is_active: true,
      },
      // End:: Data Collection To Send

      // Start:: Options Lists
      itemsList: [],
      // End:: Options Lists
    };
  },

  computed: {
    linkTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.external") || "External",
          value: "external",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.internal") || "Internal",
          value: "internal",
        },
      ];
    },
    internalTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.product") || "Product",
          value: "product",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.offer") || "Offer",
          value: "offer",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.category") || "Category",
          value: "category",
        },
      ];
    },
  },

  methods: {
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    disabledStartDate(current) {
      return current && current < moment().startOf("day");
    },
    disabledEndDate(current) {
      if (!this.data.start_date) {
        return current && current < moment().startOf("day");
      }
      return current && current < moment(this.data.start_date).startOf("day");
    },

    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },

    // Start:: Handle Internal Type Change
    async handleInternalTypeChange() {
      this.data.item_id = null;
      this.itemsList = [];
      if (this.data.internal_type && this.data.internal_type.value) {
        await this.fetchItems(this.data.internal_type.value);
      }
    },
    // End:: Handle Internal Type Change

    // Start:: Fetch Items Based on Internal Type
    async fetchItems(type) {
      try {
        let url = "";
        if (type === "product") {
          url = "products?paginate=false&filter[is_active]=true";
        } else if (type === "offer") {
          url = "offers?paginate=false&filter[is_active]=true";
        } else if (type === "category") {
          url = "product-categories?paginate=false&filter[is_active]=true";
        }

        if (url) {
          let res = await this.$axios({
            method: "GET",
            url: url,
            params: {
              limit: 0,
              page: 0,
            },
          });
          this.itemsList = (res.data.data?.data || res.data.data || []).map(
            (item) => ({
              id: item.id,
              name: item.name || item.name_ar || item.title || item.title_ar,
            })
          );
        }
      } catch (error) {
        console.log(error.response?.data?.message);
        this.itemsList = [];
      }
    },
    // End:: Fetch Items Based on Internal Type

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.name || this.data.name.trim().length < 2) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name") || "Name must be at least 2 characters");
        return;
      } else if (this.data.name.length > 100) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name") || "Name must not exceed 100 characters");
        return;
      } else if (!this.data.image.file) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.image"));
        return;
      } else if (!this.data.start_date) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.publish_start_date"));
        return;
      } else if (!this.data.end_date) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.publish_end_date"));
        return;
      } else if (moment(this.data.end_date).isBefore(this.data.start_date)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.end_date_after_start") || "End date must be after or equal to start date");
        return;
      } else if (this.data.link_type && this.data.link_type.value === 'external' && !this.data.external_url) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.external_url") || "External URL is required");
        return;
      } else if (this.data.link_type && this.data.link_type.value === 'internal' && (!this.data.internal_type || !this.data.item_id)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.internal_link") || "Internal type and item are required");
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
      REQUEST_DATA.append("name", this.data.name);
      
      if (this.data.image.file) {
        REQUEST_DATA.append("advertising", this.data.image.file);
      }
      
      if (this.data.link_type && this.data.link_type.value) {
        REQUEST_DATA.append("link_type", this.data.link_type.value);
        
        if (this.data.link_type.value === 'external' && this.data.external_url) {
          REQUEST_DATA.append("external_url", this.data.external_url);
        } else if (this.data.link_type.value === 'internal') {
          if (this.data.internal_type && this.data.internal_type.value) {
            REQUEST_DATA.append("internal_type", this.data.internal_type.value);
          }
          if (this.data.item_id && this.data.item_id.id) {
            REQUEST_DATA.append("item_id", this.data.item_id.id);
          }
        }
      }
      
      if (this.data.start_date) {
        REQUEST_DATA.append("start_date", this.data.start_date);
      }
      if (this.data.end_date) {
        REQUEST_DATA.append("end_date", this.data.end_date);
      }
      REQUEST_DATA.append("is_active", this.data.is_active ? 1 : 0);
      // End:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `advertisings`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/ads/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    // End:: Fire Methods
  },
};
</script>
