<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showFinancialReport", { number: id }) }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <!-- ==== Start:: Badges ==== -->
      <div class="badges_wrapper justify-content-between">
        <div class="wrapper">
          <v-chip v-if="data.orderStatus && data.orderStatus === 'new'" color="light-blue darken-2" text-color="white">
            {{ $t("STATUS.new") }}
          </v-chip>
          <v-chip v-else-if="data.orderStatus && data.orderStatus === 'approved'" color="deep-purple darken-1"
            text-color="white">
            {{ $t("STATUS.approved") }}
          </v-chip>
          <v-chip v-else-if="data.orderStatus && data.orderStatus === 'in_way'" color="orange darken-4"
            text-color="white">
            {{ $t("STATUS.inWay") }}
          </v-chip>
          <v-chip v-else-if="data.orderStatus && data.orderStatus === 'processing'" color="yellow darken-3"
            text-color="white">
            {{ $t("STATUS.processing") }}
          </v-chip>
          <v-chip v-else-if="data.orderStatus && data.orderStatus === 'done'" color="green darken-1" text-color="white">
            {{ $t("STATUS.done") }}
          </v-chip>
          <v-chip color="blue-grey darken-1" text-color="white" v-if="data.orderType">
            <template v-if="data.orderType === 'service'">
              {{ $t("TITLES.service") }}
            </template>
            <template v-else-if="data.orderType === 'product'">
              {{ $t("TITLES.product") }}
            </template>
          </v-chip>
        </div>

        <div class="wrapper" v-if="data.orderDate">
          <v-chip color="teal darken-1" text-color="white">
            {{ $t("TITLES.orderDate", { date: data.orderDate }) }}
          </v-chip>
        </div>
      </div>
      <!-- ==== End:: Badges ==== -->

      <!-- ==== Start:: Order Main Data ==== -->
      <form>
        <div class="row">
          <!-- ********** Start:: Service Data ********** -->
          <div class="col-12" v-if="data.orderType === 'service'">
            <h4 class="group_title mt-6 mb-3">
              {{ $t("TITLES.serviceDetails") }}
            </h4>
            <div class="row">
              <!-- Start:: Image Upload Input -->
              <base-image-upload-input v-if="data.serviceImage" col="12" identifier="service_image"
                :placeholder="$t('PLACEHOLDERS.serviceImage')" :preSelectedImage="data.serviceImage" disabled />
              <!-- End:: Image Upload Input -->

              <!-- Start:: Service Type Input -->
              <base-input v-if="data.serviceType" col="4" type="text" :placeholder="$t('PLACEHOLDERS.serviceType')"
                v-model.trim="data.serviceType" readonly />
              <!-- End:: Service Type Input -->

              <!-- Start:: Service Name Input -->
              <base-input v-if="data.serviceName" col="4" type="text" :placeholder="$t('PLACEHOLDERS.service')"
                v-model.trim="data.serviceName" readonly />
              <!-- End:: Service Name Input -->

              <!-- Start:: Service Price Input -->
              <base-input v-if="data.servicePrice" col="4" type="text" :placeholder="$t('PLACEHOLDERS.servicePrice')"
                v-model.trim="data.servicePrice" readonly />
              <!-- End:: Service Price Input -->

              <!-- Start:: Order Time Input -->
              <base-input v-if="data.orderTime" col="6" type="text" :placeholder="$t('PLACEHOLDERS.orderTime')"
                v-model.trim="data.orderTime" readonly />
              <!-- End:: Order Time Input -->

              <!-- Start:: Service Implementation Input -->
              <base-input v-if="data.serviceImplementationTime" col="6" type="text"
                :placeholder="$t('PLACEHOLDERS.serviceImplementationTime')"
                v-model.trim="data.serviceImplementationTime" readonly />
              <!-- End:: Service Implementation Input -->

              <!-- Start:: Car Model Input -->
              <base-input v-if="data.carModel" col="6" type="text" :placeholder="$t('PLACEHOLDERS.carModel')"
                v-model.trim="data.carModel" readonly />
              <!-- End:: Car Model Input -->

              <!-- Start:: Car Category Input -->
              <base-input v-if="data.carCategory" col="6" type="text" :placeholder="$t('PLACEHOLDERS.carCategory')"
                v-model.trim="data.carCategory" readonly />
              <!-- End:: Car Category Input -->

              <!-- Start:: Car Number Input -->
              <base-input v-if="data.carNumber" col="6" type="text" :placeholder="$t('PLACEHOLDERS.carNumber')"
                v-model.trim="data.carNumber" readonly />
              <!-- End:: Car Number Input -->

              <!-- Start:: Car Color Input -->
              <base-color-input v-if="data.carColor" col="6" type="text" :placeholder="$t('PLACEHOLDERS.carColor')"
                v-model.trim="data.carColor" disabled />
              <!-- End:: Car Color Input -->
            </div>
          </div>
          <!-- ********** End:: Service Data ********** -->

          <!-- ********** Start:: Products Data ********** -->
          <div class="col-12" v-if="data.orderType && data.orderType === 'product'">
            <h4 class="group_title mt-6 mb-3">{{ $t("TITLES.products") }}</h4>
            <div class="row">
              <!-- Start:: Products Quantity Input -->
              <base-input v-if="data.orderProductsAmount" col="6" type="text"
                :placeholder="$t('PLACEHOLDERS.productsQuantity')" v-model.trim="data.orderProductsAmount" readonly />
              <!-- End:: Products Quantity Input -->

              <!-- Start:: Products Total Price Input -->
              <base-input v-if="data.orderProductsTotalPrice" col="6" type="text"
                :placeholder="$t('PLACEHOLDERS.orderProductsTotalPrice')" v-model.trim="data.orderProductsTotalPrice"
                readonly />
              <!-- End:: Products Total Price Input -->

              <!-- Start:: Products -->
              <!-- <div class="col-12">
                <div class="row" v-if="data.orderProducts || data.orderProducts.length > 0">
                  <div class="col-6 col-md-4" v-for="product in data.orderProducts" :key="product.id">
                    <ProductCard :productData="product" />
                  </div>
                </div>
              </div> -->
              <!-- End:: Products -->
            </div>
          </div>
          <!-- ********** End:: Products Data ********** -->

          <!-- ********** Start:: Order Address Data ********** -->
          <div class="col-12" v-if="data.orderArea &&
        data.orderCity &&
        data.orderDistrict &&
        data.orderAddress &&
        data.lat &&
        data.lng
        ">
            <h4 class="group_title mt-6 mb-3">
              {{ $t("TITLES.orderAddress") }}
            </h4>
            <div class="row">
              <!-- Start:: Order Area Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.area')" v-model.trim="data.orderArea"
                readonly />
              <!-- End:: Order Area Input -->

              <!-- Start:: Order City Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.city')" v-model.trim="data.orderCity"
                readonly />
              <!-- End:: Order City Input -->

              <!-- Start:: Order District Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.district')"
                v-model.trim="data.orderDistrict" readonly />
              <!-- End:: Order District Input -->

              <!-- Start:: Order Address Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.address')" v-model.trim="data.orderAddress"
                readonly />
              <!-- End:: Order Address Input -->

              <!-- Start:: Order Map Location Input -->
              <div class="map_wrapper">
                <GmapMap :center="{
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
      }" :zoom="13" map-type-id="terrain" style="width: 100%; height: 500px">
                  <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="false"
                    :draggable="false" @click="center = m.position" />
                </GmapMap>
              </div>
              <!-- End:: Order Map Location Input -->
            </div>
          </div>
          <!-- ********** End:: Order Address Data ********** -->

          <!-- ********** Start:: Order Payment And Price Data ********** -->
          <div class="col-12" v-if="data.paymentMethod ||
        data.serviceAndProductSPriceWithoutTax ||
        data.tax ||
        data.orderTotalPrice
        ">
            <h4 class="group_title mt-6 mb-3">
              {{ $t("TITLES.paymentAndPrice") }}
            </h4>
            <div class="row">
              <!-- Start:: Payment Method Input -->
              <base-input v-if="data.paymentMethod" col="6" type="text" :placeholder="$t('PLACEHOLDERS.paymentMethod')"
                v-model.trim="data.paymentMethod" readonly />
              <!-- End:: Payment Method Input -->

              <!-- Start:: Service & ProductS Price Without Tax Input -->
              <base-input v-if="data.serviceAndProductSPriceWithoutTax" col="6" type="text" :placeholder="$t('PLACEHOLDERS.serviceAndProductSPriceWithoutTax')
        " v-model.trim="data.serviceAndProductSPriceWithoutTax" readonly />
              <!-- End:: Service & ProductS Price Without Tax Input -->

              <!-- Start:: Tax Input -->
              <base-input v-if="data.tax" col="6" type="text" :placeholder="$t('PLACEHOLDERS.tax')"
                v-model.trim="data.tax" readonly />
              <!-- End:: Tax Input -->

              <!-- Start:: Delivery Price Input -->
              <base-input v-if="data.isDelivery" col="6" type="text" :placeholder="$t('PLACEHOLDERS.deliveryPrice')"
                v-model.trim="data.deliveryPrice" readonly />
              <!-- End:: Delivery Price Input -->

              <!-- Start:: Order Total Price Input -->
              <base-input v-if="data.orderTotalPrice" col="6" type="text"
                :placeholder="$t('PLACEHOLDERS.orderTotalPrice')" v-model.trim="data.orderTotalPrice" readonly />
              <!-- End:: Order Total Price Input -->
            </div>
          </div>
          <!-- ********** End:: Order Payment And Price Data ********** -->

          <!-- ********** Start:: Client Data ********** -->
          <div class="col-12" v-if="data.clientImage ||
        data.clientName ||
        data.clientPhone ||
        data.clientType
        ">
            <h4 class="group_title mt-6 mb-3">
              {{ $t("TITLES.clientData") }}
            </h4>
            <div class="row">
              <!-- Start:: Image Upload Input -->
              <base-image-upload-input v-if="data.clientImage" col="12" identifier="client_image"
                :placeholder="$t('PLACEHOLDERS.personalImage')" :preSelectedImage="data.clientImage" disabled />
              <!-- End:: Image Upload Input -->

              <!-- Start:: Client Name Input -->
              <base-input v-if="data.clientName" col="4" type="text" :placeholder="$t('PLACEHOLDERS.name')"
                v-model.trim="data.clientName" readonly />
              <!-- End:: Client Name Input -->

              <!-- Start:: Client Phone Input -->
              <base-input v-if="data.clientPhone" col="4" type="text" :placeholder="$t('PLACEHOLDERS.mobileNumber')"
                v-model.trim="data.clientPhone" readonly />
              <!-- End:: Client Phone Input -->

              <!-- Start:: Client Type Input -->
              <base-input v-if="data.clientType" col="4" type="text" :placeholder="$t('PLACEHOLDERS.clientType')"
                v-model.trim="data.clientType" readonly />
              <!-- End:: Client Type Input -->
            </div>
          </div>
          <!-- ********** End:: Client Data ********** -->

          <!-- ********** Start:: Driver Data ********** -->
          <div class="col-12" v-if="data.driverImage || data.driverName || data.driverPhone">
            <h4 class="group_title mt-6 mb-3">
              {{ $t("TITLES.driverData") }}
            </h4>
            <div class="row">
              <!-- Start:: Image Upload Input -->
              <base-image-upload-input v-if="data.driverImage" col="12" identifier="driver_image"
                :placeholder="$t('PLACEHOLDERS.personalImage')" :preSelectedImage="data.driverImage" disabled />
              <!-- End:: Image Upload Input -->

              <!-- Start:: Driver Name Input -->
              <base-input v-if="data.driverName" col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')"
                v-model.trim="data.driverName" readonly />
              <!-- End:: Driver Name Input -->

              <!-- Start:: Driver Phone Input -->
              <base-input v-if="data.driverPhone" col="6" type="text" :placeholder="$t('PLACEHOLDERS.mobileNumber')"
                v-model.trim="data.driverPhone" readonly />
              <!-- End:: Driver Phone Input -->
            </div>
          </div>
          <!-- ********** End:: Driver Data ********** -->

          <!-- ********** Start:: Driver Rate Data ********** -->
          <!-- <div class="rate_wrapper" v-if="data.orderStatus === 'done'">
            <h4 class="group_title mt-6 mb-3">
              {{ $t("TITLES.driverRating") }}
            </h4>
            <RatingPreview v-if="data.driverRate" :rate="data.driverRate" />
            <base-input
              v-if="data.rateComment"
              rows="5"
              type="textarea"
              :placeholder="$t('PLACEHOLDERS.rateComment')"
              v-model.trim="data.rateComment"
              readonly
            />
          </div> -->
          <!-- ********** End:: Driver Rate Data ********** -->

          <!-- ********** End:: Order Completion Image ********** -->
          <!-- <ImagePreviewCard
            v-if="data.orderStatus === 'done' && data.orderCompletionImage"
            :title="$t('PLACEHOLDERS.orderCompletionImage')"
            :imageSrc="data.orderCompletionImage"
          /> -->
          <!-- ********** End:: Order Completion Image ********** -->
        </div>
      </form>
      <!-- ==== End:: Order Main Data ==== -->

      <!-- ==== Start:: Driver Deactivate Reasons ==== -->
      <div class="table_content" v-if="data.banReasonsCount > 0">
        <h6 class="table_title mt-5 mb-4 text-danger">
          {{ $t("TITLES.deactivateHistory") }}
        </h6>
        <v-simple-table class="border border-danger">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center" v-for="item in banReasonsTableHeaders" :key="item.text"
                  :style="{ width: `${item.width}px` }">
                  {{ item.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center text-danger" v-if="data.banReasons.length === 0">
                <td colspan="7">
                  {{ $t("TABLES.noData") }}
                </td>
              </tr>
              <template v-else>
                <tr class="text-center" v-for="item in data.banReasons" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.reason }}</td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <!-- ==== End:: Driver Deactivate Reasons ==== -->
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script
  src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA"></script>
<script>
// import ProductCard from "@/components/ui/ProductCard.vue";
// import RatingPreview from "@/components/ui/RatingPreview.vue";
// import ImagePreviewCard from "@/components/ui/ImagePreviewCard.vue";

export default {
  name: "SingleFinancialReport",

  components: {
    // ProductCard,
    // RatingPreview,
    // ImagePreviewCard,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loading Data
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Map Markers Data
      markers: [],
      // End:: Map Markers Data

      // Start:: Dialogs Control Data
      dialogImage: false,
      // End:: Dialogs Control Data

      // Start:: Table Data
      banReasonsTableHeaders: [
        { text: this.$t("TABLES.DeactivateReasons.serialNumber"), width: "80" },
        { text: this.$t("TABLES.DeactivateReasons.reason") },
      ],
      // End:: Table Data

      // Start:: Data
      data: {
        number: null,
        orderType: null,
        orderStatus: null,
        orderDate: null,
        serviceImage: null,
        serviceType: null,
        serviceName: null,
        servicePrice: null,
        orderTime: null,
        serviceImplementationTime: null,
        carModel: null,
        carCategory: null,
        carNumber: null,
        carColor: null,
        orderProductsAmount: null,
        orderProductsTotalPrice: null,
        orderProducts: null,
        orderArea: null,
        orderCity: null,
        orderDistrict: null,
        orderAddress: null,
        lat: null,
        lng: null,
        paymentMethod: null,
        serviceAndProductSPriceWithoutTax: null,
        tax: null,
        isDelivery: false,
        deliveryPrice: null,
        orderTotalPrice: null,
        clientImage: null,
        clientName: null,
        clientPhone: null,
        clientType: null,
        driverImage: null,
        driverName: null,
        driverPhone: null,
        driverRate: null,
        rateComment: null,
        orderCompletionImage: null,
      },
      // End:: Data
    };
  },

  methods: {
    // Start:: Get Data To Show
    async getDataToShow() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `main/report-details`,
          params: {
            driver_id: this.$route.query.driver_id,
            status: this.$route.query.status,
            booking_type: this.$route.query.order_type,
          },
        });
        // console.log("DATA =>", res.data.data[0]);

        this.data.number = res.data.data[0]?.id;
        this.data.orderStatus = res.data.data[0]?.booking_status;
        this.data.orderType = res.data.data[0]?.booking_type;
        this.data.tax = res.data.data[0]?.tax;
        this.data.orderDate = res.data.data[0]?.booking_date;
        this.data.serviceImage = res.data.data[0]?.service_image;
        this.data.serviceType = res.data.data[0]?.service_type;
        this.data.serviceName = res.data.data[0]?.service;
        this.data.servicePrice = `${res.data.data[0]?.service_price} ${this.$t(
          "SYSTEM_CURRENCY"
        )}`;
        this.data.orderTime = res.data.data[0]?.booking_time;
        this.data.serviceImplementationTime =
          res.data.data[0]?.service_execution_time;
        this.data.carModel = res.data.data[0]?.car_model;
        this.data.carCategory = res.data.data[0]?.car_category;
        this.data.carNumber = res.data.data[0]?.car_number;
        this.data.carColor = res.data.data[0]?.car_color;
        this.data.orderProductsAmount = res.data.data[0]?.booking_product?.qty;
        this.data.orderProductsTotalPrice = `${
          res.data.data[0]?.booking_product.total
        } ${this.$t("SYSTEM_CURRENCY")}`;
        this.data.orderProducts = res.data.data[0]?.booking_product?.products;

        this.data.orderArea = res.data.data[0]?.address_client?.region_name;
        this.data.orderCity = res.data.data[0]?.address_client?.city_name;
        this.data.orderDistrict = res.data.data[0]?.address_client?.town_name;
        this.data.orderAddress = res.data.data[0]?.address;
        this.data.lat = res.data.data[0]?.address_client?.lat;
        this.data.lng = res.data.data[0]?.address_client?.lon;
        (this.markers = [
          {
            id: 1,
            position: {
              lat: parseFloat(res.data.data[0]?.address_client?.lat),
              lng: parseFloat(res.data.data[0]?.address_client?.lon),
            },
          },
        ]),
          (this.data.paymentMethod = res.data.data[0]?.payment_method);
        this.data.serviceAndProductSPriceWithoutTax = `${
          res.data.data[0]?.total_price_without_tax
        } ${this.$t("SYSTEM_CURRENCY")}`;
        this.data.tax = `${res.data.data[0]?.tax} ${this.$t(
          "SYSTEM_CURRENCY"
        )}`;
        this.data.isDelivery = !!res.data.data[0]?.delivery_price;
        this.data.deliveryPrice = `${
          res.data.data[0]?.delivery_price
        } ${this.$t("SYSTEM_CURRENCY")}`;
        this.data.orderTotalPrice = `${
          res.data.data[0]?.total_price_with_tax
        } ${this.$t("SYSTEM_CURRENCY")}`;
        this.data.clientImage = res.data.data[0]?.client_image;
        this.data.clientName = res.data.data[0]?.client;
        this.data.clientPhone = res.data.data[0]?.client_number;
        this.data.clientType = res.data.data[0]?.client_type;
        this.data.driverImage = res.data.data[0]?.driver_image;
        this.data.driverName = res.data.data[0]?.driver_name;
        this.data.driverPhone = res.data.data[0]?.driver_number;
        this.data.driverRate = parseInt(
          res.data.data[0]?.rate_data?.phone_number
        );
        this.data.rateComment = res.data.data[0]?.rate_data?.phone_number;
        this.data.orderCompletionImage = res.data.data[0]?.booking_image;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Show
  },

  created() {
    // Start:: Fire Methods
    this.getDataToShow();
    // End:: Fire Methods
  },
};
</script>
