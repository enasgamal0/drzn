<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.auctions.show") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Auction Details -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <h5>{{ $t("PLACEHOLDERS.auctionDetails") }}</h5>
          <div class="row">
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.auctionNumber')"
              v-model.trim="data.auction_number"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.startPrice')"
              v-model.trim="data.start_price"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.requiredPrice')"
              v-model.trim="data.asking_price"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.numberOfBids')"
              v-model.trim="data.number_of_bids"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.lastBiddingPrice')"
              v-model.trim="data.last_bidding_price"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.auctionStatus')"
              v-model.trim="data.status_trans"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.advertisementDate')"
              v-model.trim="data.created_at"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.remainingTime')"
              v-model.trim="data.number_of_minutes_left"
              disabled
              v-if="data.status === 'in_progress'"
            />
          </div>
        </div>
        <!-- End:: Auction Details -->

        <!-- Start:: Product Details -->
        <hr class="my-5 py-5" />
        <div class="product_details_wrapper">
          <h5>{{ $t("PLACEHOLDERS.productDetails") }}</h5>
          <div class="row">
            <div class="preview-container text-center my-3">
              <div v-for="(image, index) in data.product_images.slice(0, 5)" :key="index" class="d-inline-block">
                <img
                  :src="image.url"
                  :alt="$t('PLACEHOLDERS.productImage')"
                  v-if="image.url"
                  class="m-3"
                />
              </div>
            </div>
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.productName')"
              v-model.trim="data.product_name"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.category')"
              v-model.trim="data.category.name"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.productStatus')"
              v-model.trim="data.is_new"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.defects')"
              v-model.trim="data.defects"
              disabled
            />
          </div>
        </div>
        <!-- End:: Product Details -->

        <!-- Start:: Advertiser Details -->
        <hr class="my-5 py-5" />
        <div class="advertiser_details_wrapper">
          <h5>{{ $t("PLACEHOLDERS.advertiserDetails") }}</h5>
          <div class="row">
            <div class="preview-container text-center my-3">
              <img
                :src="data.user.image"
                :alt="$t('PLACEHOLDERS.userImage')"
                v-if="data.user.image"
              />
            </div>
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.advertiserName')"
              v-model.trim="data.user.name"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.mobileNumber')"
              v-model.trim="data.user.mobile"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.cityName')"
              v-model.trim="data.city.name"
              disabled
            />
          </div>
        </div>
        <!-- End:: Advertiser Details -->

        <!-- Start:: Winner Details -->
        <hr class="my-5 py-5" v-if="data.status === 'completed'" />
        <div class="winner_details_wrapper" v-if="data.status === 'completed'">
          <h5>{{ $t("PLACEHOLDERS.winnerDetails") }}</h5>
          <div class="row">
            <div class="preview-container text-center my-3">
              <img
                :src="data.winner.image"
                :alt="$t('PLACEHOLDERS.winnerImage')"
                v-if="data.winner.image"
              />
            </div>
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.winnerName')"
              v-model.trim="data.winner.name"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.phone')"
              v-model.trim="data.winner.mobile"
              disabled
            />
            <base-input
              col="12"
              type="text"
              :placeholder="$t('PLACEHOLDERS.city')"
              v-model.trim="data.winner.city.name"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.bank_name')"
              v-model.trim="data.winner.bank.name"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.iban')"
              v-model.trim="data.winner.iban"
              disabled
            />
          </div>
        </div>
        <!-- End:: Winner Details -->

        <!-- Start:: Cancellation Details -->
        <hr class="my-5 py-5" v-if="data.status === 'cancelled'" />
        <div
          class="cancellation_details_wrapper"
          v-if="data.status === 'cancelled'"
        >
          <h5>{{ $t("PLACEHOLDERS.cancellationDetails") }}</h5>
          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.cancellationReason')"
            v-model.trim="data.canceled_reason"
            disabled
          />
        </div>
        <!-- End:: Cancellation Details -->
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShowAuction",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        id: null,
        product_name: null,
        product_images: [],
        start_price: null,
        asking_price: null,
        number_of_bids: null,
        last_bidding_price: null,
        status: null,
        status_trans: null,
        created_at: null,
        is_new: null,
        number_of_minutes_left: null,
        user: {
          name: null,
          image: null,
          mobile: null,
          city: {
            name: null,
          },
        },
        city: {
          name: null,
        },
        defects: null,
        canceled_reason: null,
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
    async showAuction() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `auctions/${this.$route.params?.id}`,
        });
        this.data = res.data.data.data;
        this.data.is_new = this.data.is_new
          ? this.$t("STATUS.new")
          : this.$t("STATUS.used");
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },

  created() {
    this.showAuction();
  },
};
</script>
