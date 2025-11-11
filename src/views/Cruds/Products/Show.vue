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
          <!-- Start:: Image Upload Input -->
          <div class="preview-container text-center my-3">
            <img
              :src="data.image.path"
              alt="Product Image"
              v-if="data.image.path"
            />
          </div>
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.codename')"
            v-model.trim="data.name"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.codenameEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.descProd')"
            v-model.trim="data.descProd"
            disabled
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.descProdEn')"
            v-model.trim="data.descProdEn"
            disabled
          />
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.package_price')"
            v-model.trim="data.price"
            disabled
          />
          <!-- End:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.product_count_order')"
            v-model.trim="data.count_order"
            disabled
          />
          <base-picker-input
            col="6"
            type="date"
            :placeholder="$t('TABLES.Workplaces.date')"
            v-model.trim="data.created_at"
            disabled
          />
          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-4">
            <v-switch
              color="green"
              :label="
                data.active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.active"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShowProduct",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        price: null,
        count_order: null,
        created_at: null,
        active: null,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  methods: {
    // start show data
    async showProduct() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `products/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.Product.image;
        this.data.name = res.data.data.Product.name_ar;
        this.data.nameEn = res.data.data.Product.name_en;
        this.data.descProd = res.data.data.Product.description_ar;
        this.data.descProdEn = res.data.data.Product.description_en;
        this.data.price = res.data.data.Product.price;
        this.data.count_order = res.data.data.Product.count_order;
        this.data.created_at = res.data.data.Product.created_at;
        this.data.active = res.data.data.Product.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data
  },

  created() {
    // Start:: Fire Methods
    this.showProduct();
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
}
</style>
