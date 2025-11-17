<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.addProduct") }}</h4>
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
          <!-- Start:: Main Image Upload Input -->
          <base-image-upload-input
            col="12"
            identifier="main_image"
            :placeholder="$t('PLACEHOLDERS.productImg')"
            @selectImage="selectMainImage"
            required
          />
          <!-- End:: Main Image Upload Input -->

          <!-- Start:: Additional Images Upload Input -->
          <div class="col-12 my-5">
            <base-multi-image-upload-input
              @onFileSelect="handleAdditionalImages"
              @onFileRemove="removeAdditionalImage"
              :urls="additionalImagesUrls"
            >
              {{ $t('PLACEHOLDERS.additionalImages') || 'Additional Images' }}
            </base-multi-image-upload-input>
          </div>
          <!-- End:: Additional Images Upload Input -->
          <!-- Start:: Name Input (Arabic) -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.codename')"
            v-model.trim="data.name"
            :maxlength="100"
            required
          />
          <!-- End:: Name Input (Arabic) -->

          <!-- Start:: Name Input (English) -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.codenameEn')"
            v-model.trim="data.nameEn"
            :maxlength="100"
            required
          />
          <!-- End:: Name Input (English) -->

          <!-- Start:: Description Input (Arabic) -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.descProd')"
            v-model.trim="data.descProd"
            :maxlength="500"
          />
          <!-- End:: Description Input (Arabic) -->

          <!-- Start:: Description Input (English) -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.descProdEn')"
            v-model.trim="data.descProdEn"
            :maxlength="500"
          />
          <!-- End:: Description Input (English) -->

          <!-- Start:: Category Select Input -->
          <base-select-input
            col="6"
            :optionsList="categoriesList"
            :placeholder="$t('PLACEHOLDERS.category') || 'Product Category'"
            v-model="data.category_id"
            required
          />
          <!-- End:: Category Select Input -->

          <!-- Start:: Weight or Size Input -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.weightOrSize') || 'Weight or Size'"
            v-model.number="data.weight_or_size"
            step="0.01"
            required
          />
          <!-- End:: Weight or Size Input -->

          <!-- Start:: Weight Unit Select Input -->
          <base-select-input
            col="6"
            :optionsList="weightUnitOptions"
            :placeholder="$t('PLACEHOLDERS.weightUnit') || 'Weight Unit'"
            v-model="data.weight_unit"
            required
          />
          <!-- End:: Weight Unit Select Input -->

          <!-- Start:: Prices Section -->
          <div class="col-12">
            <h5 class="my-3" style="color: #E1423D;">{{ $t('PLACEHOLDERS.pricesByQuantity') || 'Prices by Quantity' }}</h5>
            <div
              v-for="(price, index) in data.prices"
              :key="index"
              class="price-item-wrapper mb-4 p-3"
              style="border: 1px solid #ddd; border-radius: 8px;"
            >
              <div class="row">
                <base-input
                  col="2"
                  type="number"
                  :placeholder="$t('PLACEHOLDERS.quantity') || 'Quantity'"
                  v-model.number="price.quantity"
                  required
                />
                <base-select-input
                  col="2"
                  :optionsList="quantityUnitOptions"
                  :placeholder="$t('PLACEHOLDERS.quantityUnit') || 'Quantity Unit'"
                  v-model="price.quantity_unit"
                  required
                />
                <base-input
                  col="2"
                  type="number"
                  :placeholder="$t('PLACEHOLDERS.price') || 'Price'"
                  v-model.number="price.price"
                  step="0.01"
                  required
                />
                <base-input
                  col="2"
                  type="number"
                  :placeholder="$t('PLACEHOLDERS.availableQuantity') || 'Available Quantity'"
                  v-model.number="price.available_quantity"
                  required
                />
                <base-input
                  col="2"
                  type="number"
                  :placeholder="$t('PLACEHOLDERS.minimumQuantity') || 'Minimum Quantity'"
                  v-model.number="price.minimum_quantity"
                  required
                />
              </div>
              <v-btn
                v-if="data.prices.length > 1"
                @click="removePrice(index)"
                color="error"
                small
                class="mt-2"
              >
                {{ $t('BUTTONS.remove') || 'Remove' }}
              </v-btn>
            </div>
            <v-btn
              @click="addPrice"
              color="primary"
              small
              class="mt-2"
            >
              {{ $t('BUTTONS.addPrice') || 'Add Price' }}
            </v-btn>
          </div>
          <!-- End:: Prices Section -->

          <!-- Start:: Freeze Status Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-6">
            <label class="form-label" style="margin: 0 13px !important; color: #E1423D;">
              {{ $t('PLACEHOLDERS.isFrozen') || 'Freeze Status' }}:
              <span class="text-danger">*</span>
            </label>
            <v-switch
              color="green"
              :label="
                data.is_frozen
                  ? $t('PLACEHOLDERS.yes')
                  : $t('PLACEHOLDERS.no')
              "
              v-model="data.is_frozen"
              hide-details
            ></v-switch>
          </div>
          <!-- End:: Freeze Status Switch Input -->

          <!-- Start:: Product Status Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-6">
            <label class="form-label" style="margin: 0 13px !important; color: #E1423D;">
              {{ $t('PLACEHOLDERS.productStatus') || 'Product Status' }}:
              <span class="text-danger">*</span>
            </label>
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
          <!-- End:: Product Status Switch Input -->

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
import BaseMultiImageUploadInput from "../../../components/formInputs/BaseMultiImageUploadInput.vue";

export default {
  name: "CreateProduct",

  components: {
    BaseImageUploadInput,
    BaseMultiImageUploadInput,
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        main_image: {
          path: null,
          file: null,
        },
        category_id: null,
        is_frozen: false,
        weight_or_size: null,
        weight_unit: null,
        prices: [
          {
            quantity: null,
            quantity_unit: null,
            price: null,
            available_quantity: null,
            minimum_quantity: null,
          },
        ],
        is_active: true,
      },
      // End:: Data Collection To Send

      categoriesList: [],
      additionalImages: [],
      additionalImagesUrls: [],
    };
  },

  computed: {
    weightUnitOptions() {
      return [
        { id: "kg", name: this.$t("PLACEHOLDERS.kg") || "kg" },
        { id: "g", name: this.$t("PLACEHOLDERS.g") || "g" },
        { id: "liter", name: this.$t("PLACEHOLDERS.liter") || "liter" },
        { id: "ml", name: this.$t("PLACEHOLDERS.ml") || "ml" },
        { id: "carton", name: this.$t("PLACEHOLDERS.carton") || "carton" },
        { id: "package", name: this.$t("PLACEHOLDERS.package") || "package" },
      ];
    },
    quantityUnitOptions() {
      return [
        { id: "package", name: this.$t("PLACEHOLDERS.package") || "package" },
        { id: "kg", name: this.$t("PLACEHOLDERS.kg") || "kg" },
        { id: "liter", name: this.$t("PLACEHOLDERS.liter") || "liter" },
        { id: "carton", name: this.$t("PLACEHOLDERS.carton") || "carton" },
      ];
    },
  },

  methods: {
    // Start:: Image Handlers
    selectMainImage(selectedImage) {
      if (selectedImage.file) {
        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (selectedImage.file.size > maxSize) {
          this.$message.error(
            this.$t("VALIDATION.fileSizeExceeded") ||
              "File size must not exceed 10MB"
          );
          return;
        }
        // Validate file type (images only)
        if (!selectedImage.file.type.startsWith("image/")) {
          this.$message.error(
            this.$t("VALIDATION.selectedFileMustBeImage") ||
              "Only image files are allowed"
          );
          return;
        }
      }
      this.data.main_image = selectedImage;
    },

    handleAdditionalImages(files) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const validFiles = [];

      files.forEach((file) => {
        if (file.size > maxSize) {
          this.$message.error(
            `${file.name}: ${this.$t("VALIDATION.fileSizeExceeded") || "File size must not exceed 10MB"}`
          );
          return;
        }
        if (!file.type.startsWith("image/")) {
          this.$message.error(
            `${file.name}: ${this.$t("VALIDATION.selectedFileMustBeImage") || "Only image files are allowed"}`
          );
          return;
        }
        validFiles.push(file);
      });

      this.additionalImages = validFiles;
    },

    removeAdditionalImage(index) {
      this.additionalImagesUrls.splice(index, 1);
    },
    // End:: Image Handlers

    // Start:: Price Management
    addPrice() {
      this.data.prices.push({
        quantity: null,
        quantity_unit: null,
        price: null,
        available_quantity: null,
        minimum_quantity: null,
      });
    },

    removePrice(index) {
      if (this.data.prices.length > 1) {
        this.data.prices.splice(index, 1);
      }
    },
    // End:: Price Management

    // Start:: Get Categories
    async getCategories() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "product-categories?paginate=false&filter[is_active]=true",
          params: {
            limit: 0,
            page: 0,
            isActive: 1,
          },
        });
        this.categoriesList = (res.data.data?.data || res.data.data || []).map(
          (category) => ({
            id: category.id,
            name: category.name,
          })
        );
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },
    // End:: Get Categories

    validateFormInputs() {
      this.isWaitingRequest = true;
      this.submitForm();
    },

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.data.name) {
        REQUEST_DATA.append("name[ar]", this.data.name);
      }
      if (this.data.nameEn) {
        REQUEST_DATA.append("name[en]", this.data.nameEn);
      }
      if (this.data.descProd) {
        REQUEST_DATA.append("description[ar]", this.data.descProd);
      }
      if (this.data.descProdEn) {
        REQUEST_DATA.append("description[en]", this.data.descProdEn);
      }
      if (this.data.main_image.file) {
        REQUEST_DATA.append("main_image", this.data.main_image.file);
      }
      if (this.additionalImages.length > 0) {
        this.additionalImages.forEach((file) => {
          REQUEST_DATA.append("images[]", file);
        });
      }
      if (this.data.category_id) {
        REQUEST_DATA.append("category_id", this.data.category_id?.id);
      }
      REQUEST_DATA.append("is_frozen", this.data.is_frozen ? 1 : 0);
      if (this.data.weight_or_size) {
        REQUEST_DATA.append("weight_or_size", this.data.weight_or_size);
      }
      if (this.data.weight_unit) {
        REQUEST_DATA.append("weight_unit", this.data.weight_unit?.id);
      }

      // Append prices
      this.data.prices.forEach((price, index) => {
        REQUEST_DATA.append(`prices[${index}][quantity]`, price.quantity);
        REQUEST_DATA.append(`prices[${index}][quantity_unit]`, price.quantity_unit?.id);
        REQUEST_DATA.append(`prices[${index}][price]`, price.price);
        REQUEST_DATA.append(`prices[${index}][available_quantity]`, price.available_quantity);
        REQUEST_DATA.append(`prices[${index}][minimum_quantity]`, price.minimum_quantity);
      });

      REQUEST_DATA.append("is_active", this.data.is_active ? 1 : 0);
      // End:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `products`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/products/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getCategories();
    // End:: Fire Methods
  },
};
</script>
