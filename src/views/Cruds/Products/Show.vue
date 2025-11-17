<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.showProduct") || "Show Product" }}</h4>
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
          <!-- Start:: Main Image Display -->
          <div class="col-12 text-center my-3">
            <div class="preview-container">
              <img
                v-if="data.main_image.path"
                :src="data.main_image.path"
                alt="Product Main Image"
                style="max-width: 300px; max-height: 300px; border: 1px solid #ccc; border-radius: 8px;"
              />
            </div>
          </div>
          <!-- End:: Main Image Display -->

          <!-- Start:: Additional Images Display -->
          <div class="col-12 my-3" v-if="additionalImagesUrls.length > 0">
            <h5>{{ $t('PLACEHOLDERS.additionalImages') || 'Additional Images' }}</h5>
            <div class="image-gallery d-flex flex-wrap gap-3">
              <div
                v-for="(imgUrl, index) in additionalImagesUrls"
                :key="index"
                class="image-preview-item"
              >
                <img
                  :src="imgUrl"
                  alt="Additional Image"
                  style="max-width: 150px; max-height: 150px; border: 1px solid #ccc; border-radius: 8px;"
                />
              </div>
            </div>
          </div>
          <!-- End:: Additional Images Display -->

          <!-- Start:: Name Input (Arabic) -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.codename')"
            v-model.trim="data.name"
            disabled
          />
          <!-- End:: Name Input (Arabic) -->

          <!-- Start:: Name Input (English) -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.codenameEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: Name Input (English) -->

          <!-- Start:: Description Input (Arabic) -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.descProd')"
            v-model.trim="data.descProd"
            disabled
          />
          <!-- End:: Description Input (Arabic) -->

          <!-- Start:: Description Input (English) -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.descProdEn')"
            v-model.trim="data.descProdEn"
            disabled
          />
          <!-- End:: Description Input (English) -->

          <!-- Start:: Category Display -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.category') || 'Product Category'"
            :value="categoryName"
            disabled
          />
          <!-- End:: Category Display -->

          <!-- Start:: Weight or Size Display -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.weightOrSize') || 'Weight or Size'"
            v-model.number="data.weight_or_size"
            disabled
          />
          <!-- End:: Weight or Size Display -->

          <!-- Start:: Weight Unit Display -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.weightUnit') || 'Weight Unit'"
            :value="weightUnitName"
            disabled
          />
          <!-- End:: Weight Unit Display -->

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
                  disabled
                />
                <base-input
                  col="2"
                  type="text"
                  :placeholder="$t('PLACEHOLDERS.quantityUnit') || 'Quantity Unit'"
                  :value="getQuantityUnitName(price.quantity_unit)"
                  disabled
                />
                <base-input
                  col="2"
                  type="number"
                  :placeholder="$t('PLACEHOLDERS.price') || 'Price'"
                  v-model.number="price.price"
                  disabled
                />
                <base-input
                  col="2"
                  type="number"
                  :placeholder="$t('PLACEHOLDERS.availableQuantity') || 'Available Quantity'"
                  v-model.number="price.available_quantity"
                  disabled
                />
                <base-input
                  col="2"
                  type="number"
                  :placeholder="$t('PLACEHOLDERS.minimumQuantity') || 'Minimum Quantity'"
                  v-model.number="price.minimum_quantity"
                  disabled
                />
              </div>
            </div>
          </div>
          <!-- End:: Prices Section -->

          <!-- Start:: Freeze Status Display -->
          <div class="input_wrapper switch_wrapper my-5 col-6">
            <label class="form-label" style="margin: 0 13px !important; color: #E1423D;">
              {{ $t('PLACEHOLDERS.isFrozen') || 'Freeze Status' }}:
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
              disabled
            ></v-switch>
          </div>
          <!-- End:: Freeze Status Display -->

          <!-- Start:: Product Status Display -->
          <div class="input_wrapper switch_wrapper my-5 col-6">
            <label class="form-label" style="margin: 0 13px !important; color: #E1423D;">
              {{ $t('PLACEHOLDERS.productStatus') || 'Product Status' }}:
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
              disabled
            ></v-switch>
          </div>
          <!-- End:: Product Status Display -->

          <!-- Start:: Created At Display -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Workplaces.date') || 'Created At'"
            :value="data.created_at"
            disabled
          />
          <!-- End:: Created At Display -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShowProduct",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Display
      data: {
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        main_image: {
          path: null,
        },
        category_id: null,
        categoryName: null,
        is_frozen: false,
        weight_or_size: null,
        weight_unit: null,
        prices: [],
        is_active: true,
        created_at: null,
      },
      // End:: Data Collection To Display

      additionalImagesUrls: [],
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
    categoryName() {
      return this.data.categoryName || "-";
    },
    weightUnitName() {
      const units = {
        kg: this.$t("PLACEHOLDERS.kg") || "kg",
        g: this.$t("PLACEHOLDERS.g") || "g",
        liter: this.$t("PLACEHOLDERS.liter") || "liter",
        ml: this.$t("PLACEHOLDERS.ml") || "ml",
        carton: this.$t("PLACEHOLDERS.carton") || "carton",
        package: this.$t("PLACEHOLDERS.package") || "package",
      };
      return units[this.data.weight_unit] || this.data.weight_unit || "-";
    },
  },

  methods: {
    getQuantityUnitName(unit) {
      const units = {
        package: this.$t("PLACEHOLDERS.package") || "package",
        kg: this.$t("PLACEHOLDERS.kg") || "kg",
        liter: this.$t("PLACEHOLDERS.liter") || "liter",
        carton: this.$t("PLACEHOLDERS.carton") || "carton",
      };
      return units[unit] || unit || "-";
    },

    // Start:: Show Product Data
    async showProduct() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `products/${this.$route.params.id}?include=category,translations,prices`,
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

        // Set additional images
        if (product.images && product.images.length > 0) {
          this.additionalImagesUrls = product.images.map((img) => img.url || img);
        }

        // Set category
        if (product.category_id) {
          this.data.category_id = product.category_id;
        }
        if (product.category) {
          this.data.categoryName = product.category.name || product.category.translations?.ar?.name || product.category.translations?.en?.name;
        }

        // Set freeze status
        this.data.is_frozen = product.is_frozen || false;

        // Set weight and unit
        this.data.weight_or_size = product.weight_or_size || null;
        this.data.weight_unit = product.weight_unit || null;

        // Set prices
        if (product.prices && product.prices.length > 0) {
          this.data.prices = product.prices.map((price) => ({
            quantity: price.quantity,
            quantity_unit: price.quantity_unit,
            price: parseFloat(price.price),
            available_quantity: price.available_quantity,
            minimum_quantity: price.minimum_quantity,
          }));
        }

        // Set active status
        this.data.is_active = product.is_active !== undefined ? product.is_active : true;

        // Set created at
        this.data.created_at = product.created_at || null;
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
    this.showProduct();
    // End:: Fire Methods
  },
};
</script>

<style scoped>
.preview-container img,
.preview-container video {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ccc;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.image-preview-item {
  position: relative;
}
</style>
