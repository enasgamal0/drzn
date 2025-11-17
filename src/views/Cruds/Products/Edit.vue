<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.updateProduct") }}</h4>
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
            :preSelectedImage="data.main_image.path"
            :placeholder="$t('PLACEHOLDERS.productImg')"
            required
          />
          <!-- End:: Main Image Upload Input -->

          <!-- Start:: Additional Images Upload Input -->
          <div class="col-12 my-5">
            <base-multi-image-upload-input
              @onFileSelect="handleAdditionalImages"
              @onFileRemove="removeAdditionalImage"
              :urls="originalImages.map(img => img.url)"
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
import { mapGetters } from "vuex";
import BaseImageUploadInput from "../../../components/formInputs/BaseImageUploadInput.vue";
import BaseMultiImageUploadInput from "../../../components/formInputs/BaseMultiImageUploadInput.vue";

export default {
  name: "EditProduct",

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
        prices: [],
        is_active: true,
      },
      // End:: Data Collection To Send

      categoriesList: [],
      additionalImages: [],
      originalPrices: [], // Store original prices with IDs for comparison
      originalImages: [], // Store current images with IDs (gets modified when images are removed)
      deletedImageIds: [], // Track IDs of images that were deleted
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
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
      // The index corresponds to the position in the originalImages array
      // (new images are handled internally by the component)
      
      // It's an old image - remove from originalImages
      const oldImg = this.originalImages[index];
      
      // Only add to deletedImageIds if the image has a valid ID
      if (oldImg && oldImg.id) {
        this.deletedImageIds.push(oldImg.id);
      }
      
      // Remove from originalImages array
      this.originalImages.splice(index, 1);
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

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      this.submitForm();
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const productId = this.$route.params.id;
      
      try {
        // Step 1: Update main product data (excluding prices and additional images)
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

        REQUEST_DATA.append("is_active", this.data.is_active ? 1 : 0);
        // End:: Append Request Data

        await this.$axios({
          method: "PATCH",
          url: `products/${productId}`,
          data: REQUEST_DATA,
        });

        // Step 2: Handle prices - Add new prices
        const newPrices = this.data.prices.filter((price) => !price.id);
        for (const price of newPrices) {
          await this.$axios({
            method: "POST",
            url: `products/${productId}/prices`,
            data: {
              quantity: price.quantity,
              quantity_unit: price.quantity_unit?.id,
              price: price.price,
              available_quantity: price.available_quantity,
              minimum_quantity: price.minimum_quantity,
            },
          });
        }

        // Step 3: Handle prices - Update existing prices
        const existingPrices = this.data.prices.filter((price) => price.id);
        for (const price of existingPrices) {
          const originalPrice = this.originalPrices.find((p) => p.id === price.id);
          if (originalPrice) {
            // Check if price has changed
            const hasChanged =
              originalPrice.quantity !== price.quantity ||
              originalPrice.quantity_unit !== price.quantity_unit?.id ||
              originalPrice.price !== price.price ||
              originalPrice.available_quantity !== price.available_quantity ||
              originalPrice.minimum_quantity !== price.minimum_quantity;

            if (hasChanged) {
              await this.$axios({
                method: "PATCH",
                url: `products/${productId}/prices/${price.id}`,
                data: {
                  quantity: price.quantity,
                  quantity_unit: price.quantity_unit?.id,
                  price: price.price,
                  available_quantity: price.available_quantity,
                  minimum_quantity: price.minimum_quantity,
                },
              });
            }
          }
        }

        // Step 4: Handle prices - Delete removed prices
        const currentPriceIds = this.data.prices
          .filter((p) => p.id)
          .map((p) => p.id);
        const removedPrices = this.originalPrices.filter(
          (p) => !currentPriceIds.includes(p.id)
        );
        for (const removedPrice of removedPrices) {
          await this.$axios({
            method: "DELETE",
            url: `products/${productId}/prices/${removedPrice.id}`,
          });
        }

        // Step 5: Handle images - Add new images
        for (const imageFile of this.additionalImages) {
          const imageFormData = new FormData();
          imageFormData.append("image", imageFile);
          await this.$axios({
            method: "POST",
            url: `products/${productId}/images`,
            data: imageFormData,
          });
        }
        // Step 6: Handle images - Delete removed images
        for (const imageId of this.deletedImageIds) {
          // Only delete if imageId is valid (not null or undefined)
          if (imageId) {
            await this.$axios({
              method: "DELETE",
              url: `products/${productId}/images/${imageId}`,
            });
          }
        }
        
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/products/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response?.data?.message || error.message || "An error occurred");
      }
    },
    // End:: Submit Form

    // Start:: Get Product Images
    async getProductImages() {
      try {
        const productId = this.$route.params.id;
        let res = await this.$axios({
          method: "GET",
          url: `products/${productId}/images`,
        });
        
        if (res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          this.originalImages = res.data.data.map((img) => ({
            id: img.id || null,
            url: img.url || null,
          }));
        } else {
          this.originalImages = [];
        }
      } catch (error) {
        console.log(error.response?.data?.message);
        // If endpoint fails, set empty array
        this.originalImages = [];
      }
    },
    // End:: Get Product Images

    // Start:: Show Product Data
    async showProduct() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `products/${this.$route.params.id}?include=translations,category,prices`,
        });
        const product = res.data.data;

        // Set translations
        if (product.translations) {
          this.data.name = product.translations.ar?.name || product.name;
          this.data.nameEn = product.translations.en?.name || product.name;
          this.data.descProd = product.translations.ar?.description || product.description;
          this.data.descProdEn = product.translations.en?.description || product.description;
        } else {
          this.data.name = product.name_ar || product.name;
          this.data.nameEn = product.name_en || product.name;
          this.data.descProd = product.description_ar || product.description;
          this.data.descProdEn = product.description_en || product.description;
        }

        // Set main image
        if (product.main_image_url) {
          this.data.main_image.path = product.main_image_url;
        }

        // Fetch additional images from dedicated endpoint
        await this.getProductImages();
        // Reset deleted image IDs when loading product
        this.deletedImageIds = [];

        // Set category
        if (product.category_id) {
          this.data.category_id = {
            id: product.category_id,
            name: product.category.name || product.category.translations?.ar?.name || product.category.translations?.en?.name,
          };
        }

        // Set freeze status
        this.data.is_frozen = product.is_frozen || false;

        // Set weight and unit
        this.data.weight_or_size = product.weight_or_size || null;
        this.data.weight_unit = {
          id: product.weight_unit,
          name: this.weightUnitOptions.find((unit) => unit.id === product.weight_unit)?.name || null,
        };

        // Set prices
        if (product.prices && product.prices.length > 0) {
          this.originalPrices = product.prices.map((price) => ({
            id: price.id,
            quantity: price.quantity,
            quantity_unit: price.quantity_unit,
            price: parseFloat(price.price),
            available_quantity: price.available_quantity,
            minimum_quantity: price.minimum_quantity,
          }));
          this.data.prices = product.prices.map((price) => ({
            id: price.id, // Store ID to track existing prices
            quantity: price.quantity,
            quantity_unit: {
              id: price.quantity_unit,
              name: this.quantityUnitOptions.find((unit) => unit.id === price.quantity_unit)?.name || null,
            },
            price: parseFloat(price.price),
            available_quantity: price.available_quantity,
            minimum_quantity: price.minimum_quantity,
          }));
        } else {
          // Default price if none exists
          this.originalPrices = [];
          this.data.prices = [
            {
              quantity: null,
              quantity_unit: null,
              price: null,
              available_quantity: null,
              minimum_quantity: null,
            },
          ];
        }

        // Set active status
        this.data.is_active = product.is_active !== undefined ? product.is_active : true;
      } catch (error) {
        this.isWaitingRequest = false;
        console.log(error.response?.data?.message);
        this.$message.error(error.response?.data?.message || "Failed to load product data");
      }
    },
    // End:: Show Product Data
  },

  created() {
    // Start:: Fire Methods
    this.getCategories();
    this.showProduct();
    // End:: Fire Methods
  },
};
</script>
