<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showPackage") }}</h4>
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
          <div class="preview-container my-3">
            <span style="color: #E1423D; font-size: 16px;">{{ $t("PLACEHOLDERS.color") }}</span>
            <div class="package_color d-inline-block mx-4" :style="{ backgroundColor: data.color }"></div>
          </div>
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.name_ar"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.name_en"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Number of Available Auctions -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.number_of_available_bids')"
            v-model.number="data.number_of_available_bids"
            min="1"
            disabled
          />
          <!-- End:: Number of Available Auctions -->

          <!-- Start:: Number of Available Bids -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.number_of_available_auctions')"
            v-model.number="data.number_of_available_auctions"
            min="1"
            disabled
          />
          <!-- End:: Number of Available Bids -->

          <!-- Start:: Auction Order -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.auction_order')"
            v-model.number="data.auction_order"
            min="1"
            disabled
          />
          <!-- End:: Auction Order -->

          <!-- Start:: Price Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.price')"
            v-model.number="data.price"
            min="1"
            disabled
          />
          <!-- End:: Price Input -->

          <!-- Start:: Price After Discount Input -->
          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.price_after_discount')"
            v-model.number="data.price_after_discount"
            min="0"
            v-if="data.price_after_discount"
            disabled
          />
          <!-- End:: Price After Discount Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
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
export default {
  name: "ShowPackage",
  data() {
    return {
      isWaitingRequest: false,
      data: {
        color: null,
        name_ar: "",
        name_en: "",
        number_of_available_auctions: null,
        number_of_available_bids: null,
        auction_order: null,
        price: null,
        price_after_discount: null,
        active: null,
      },
      statusOptions: [
        { id: 1, name: this.$t("STATUS.active"), value: 1 },
        { id: 0, name: this.$t("STATUS.notActive"), value: 0 },
      ],
    };
  },
  methods: {
    // start show data
    async showPackage() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `packages/${this.$route.params?.id}`,
        });
        this.data.color = res.data.data.data.color;
        this.data.name_ar = res.data.data.data.name_ar;
        this.data.name_en = res.data.data.data.name_en;
        this.data.number_of_available_auctions = res.data.data.data.number_of_available_bids;
        this.data.number_of_available_bids = res.data.data.data.number_of_available_auctions;
        this.data.auction_order = res.data.data.data.auction_order;
        this.data.price = res.data.data.data.price;
        this.data.price_after_discount = res.data.data.data.price_after_discount;
        this.data.active = res.data.data.data.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },
  created() {
    this.showPackage();
  },
};
</script>
<style>
.package_color{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>