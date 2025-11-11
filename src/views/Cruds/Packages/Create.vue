<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addPackage") }}</h4>
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
          <!-- Start:: Color Input -->
          <label for="color" class="text-center" style="color: #E1423D; font-size: 16px;">{{ $t("PLACEHOLDERS.color") }} <span class="text-danger">*</span></label>
          <div class="d-flex justify-space-around">
            <v-color-picker
              class="ma-2"
              v-model="data.color"
            ></v-color-picker>
          </div>
          <!-- End:: Color Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.name_ar"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.name_en"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Number of Available Auctions -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.number_of_available_bids')"
            v-model.number="data.number_of_available_bids"
            min="1"
            required
          />
          <!-- End:: Number of Available Auctions -->

          <!-- Start:: Number of Available Bids -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.number_of_available_auctions')"
            v-model.number="data.number_of_available_auctions"
            min="1"
            required
          />
          <!-- End:: Number of Available Bids -->

          <!-- Start:: Auction Order -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.auction_order')"
            v-model.number="data.auction_order"
            min="1"
            required
          />
          <!-- End:: Auction Order -->

          <!-- Start:: Price Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.price')"
            v-model.number="data.price"
            min="1"
            required
          />
          <!-- End:: Price Input -->

          <!-- Start:: Price After Discount Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.price_after_discount')"
            v-model.number="data.price_after_discount"
            min="0"
          />
          <!-- End:: Price After Discount Input -->

          <!-- Start:: Status Dropdown -->
          <base-select-input
            col="6"
            :optionsList="statusOptions"
            :placeholder="$t('PLACEHOLDERS.status')"
            v-model="data.is_active"
            required
          />
          <!-- End:: Status Dropdown -->

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
export default {
  name: "CreatePackage",
  data() {
    return {
      isWaitingRequest: false,
      data: {
        color: "#F9F9F8",
        name_ar: "",
        name_en: "",
        number_of_available_auctions: null,
        number_of_available_bids: null,
        auction_order: null,
        price: null,
        price_after_discount: null,
        is_active: null,
      },
      statusOptions: [
        { id: 1, name: this.$t("STATUS.active"), value: 1 },
        { id: 0, name: this.$t("STATUS.notActive"), value: 0 },
      ],
    };
  },
  methods: {
    validateFormInputs() {
      this.isWaitingRequest = true;
      this.submitForm();
    },
    async submitForm() {
      const REQUEST_DATA = new FormData();
      console.log("aaaaaa", this.data.color)
      if (this.data.color != "#F9F9F8"){
        REQUEST_DATA.append("color", this.data.color);
      }
      REQUEST_DATA.append("name[ar]", this.data.name_ar);
      REQUEST_DATA.append("name[en]", this.data.name_en);
      REQUEST_DATA.append(
        "number_of_available_auctions",
        this.data.number_of_available_bids
      );
      REQUEST_DATA.append(
        "number_of_available_bids",
        this.data.number_of_available_auctions
      );
      REQUEST_DATA.append("auction_order", this.data.auction_order);
      REQUEST_DATA.append("price", this.data.price);
      if (this.data.price_after_discount) {
        REQUEST_DATA.append(
          "price_after_discount",
          this.data.price_after_discount
        );
      }
      if (this.data.is_active) {
        REQUEST_DATA.append("is_active", this.data.is_active?.value);
      }

      try {
        await this.$axios({
          method: "POST",
          url: "packages",
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/packages/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
  },
};
</script>
