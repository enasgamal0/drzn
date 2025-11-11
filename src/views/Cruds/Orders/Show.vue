<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.showOrder") }}</h4>
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
          <!-- <base-image-upload-input
            col="12"
            identifier="admin_image"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.productImg')"
            @selectImage="selectImage"
            disabled
          /> -->
          <!-- End:: Image Upload Input -->
          <h2>{{ $t("PLACEHOLDERS.showOrder") }}</h2>
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.orderNum')"
            v-model.trim="data.orderNum"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.orderCreate')"
            v-model.trim="data.orderCreate"
            disabled
          />
          <!-- Start:: Status Input -->
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.orderStatus')"
            v-model="data.status"
            disabled
          />
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.excuteAt')"
            v-model="data.excuteAt"
            disabled
          />
          <div
            class="col-4"
            v-for="(time, index) in data.excutetime"
            :key="index"
          >
            <base-input
              col="12"
              type="text"
              :placeholder="$t('PLACEHOLDERS.excutetime')"
              v-model.trim="time.name"
            />
          </div>
          <h2>{{ $t("PLACEHOLDERS.unitData") }}</h2>

          <base-input
            col="4"
            type="text"
            :placeholder="$t('SIDENAV.GoldenOrder.unitName')"
            v-model.trim="data.unit_name"
            disabled
          />
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.unitSpace')"
            v-model.trim="data.unitSpace"
            disabled
          />
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.secret_number')"
            v-model.trim="data.secret_number"
            disabled
          />
          <div v-if="data.additions?.length">
            <div
              class="col-12"
              v-for="(item, index) in data.additions"
              :key="item"
            >
              <v-chip>{{ $t("PLACEHOLDERS.additions") + (index + 1) }}</v-chip>
              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.additionName')"
                v-model.trim="item.name_addition"
                disabled
              />
              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.additionCount')"
                v-model.trim="item.count_addition"
                disabled
              />
              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.servicePriceForAdd')"
                v-model.trim="item.price"
                disabled
              />
            </div>
          </div>

          <h2>{{ $t("PLACEHOLDERS.serviceData") }}</h2>

          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.serviceName')"
            v-model.trim="data.serviceName"
            disabled
          />
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.servicePrice')"
            v-model.trim="data.servicePrice"
            disabled
          />
          <!-- <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.price_additions')"
            v-model.trim="data.price_additions"
            disabled
          /> -->

          <div class="col-12" v-if="data.products?.length">
            <h2>{{ $t("PLACEHOLDERS.productData") }}</h2>

            <div v-for="(product, index) in data.products" :key="product">
              <v-chip>{{ $t("PLACEHOLDERS.product") + (index + 1) }}</v-chip>
              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.productName')"
                v-model.trim="product.name_product"
                disabled
              />

              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.productPrice')"
                v-model.trim="product.price"
                disabled
              />
              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.quantatyy')"
                v-model.trim="product.count_product"
                disabled
              />
            </div>
          </div>
          <div class="col-12" v-if="data.addServices?.length">
            <h2>{{ $t("PLACEHOLDERS.addServices") }}</h2>

            <div v-for="(service, index) in data.addServices" :key="service">
              <v-chip>{{ $t("PLACEHOLDERS.service") + (index + 1) }}</v-chip>
              <base-input
                col="12"
                type="textarea"
                :placeholder="$t('PLACEHOLDERS.addServicesDecs')"
                v-model.trim="service.description"
                disabled
              />

              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.addServicesPrice')"
                v-model.trim="service.price"
                disabled
              />
              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.addServicesStatus')"
                v-model.trim="service.status"
                disabled
              />
            </div>
          </div>

          <h2>{{ $t("PLACEHOLDERS.priceData") }}</h2>
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.totalePrce')"
            v-model="data.totalePrce"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.totalTax')"
            v-model="data.totalTax"
            disabled
          />

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.discount')"
            v-model="data.discount"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.discountValue')"
            v-model="data.discountValue"
            disabled
          />

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.orderPriceAfterDiscount')"
            v-model="data.totalOrderPrice"
            disabled
          />

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.totalOrderPrice')"
            v-model="data.orderPriceAfterDiscount"
            disabled
          />

          <h2 v-if="data.cleaners && data.cleaners.length">
            {{ $t("PLACEHOLDERS.team") }}
          </h2>

          <div
            v-if="data.cleaners && data.cleaners.length"
            class="row"
            v-for="cleaner in data.cleaners"
            :key="cleaner"
          >
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.name')"
              v-model="cleaner.name"
              disabled
            />
            <base-input
              col="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.phoneNumber')"
              v-model="cleaner.whattsapp"
              disabled
            />
          </div>

          <div
            class="col-12"
            v-for="method in data.PaymentMethods"
            :key="method"
          >
            <base-input
              col="12"
              type="text"
              :placeholder="$t('PLACEHOLDERS.PaymentMethods')"
              v-model="method.payment_method"
              disabled
            />
            <base-input
              col="12"
              type="text"
              :placeholder="$t('PLACEHOLDERS.PaymentMoney')"
              v-model="method.money"
              disabled
            />
            <base-input
              v-if="
                data.back &&
                data.PaymentMethods &&
                data.PaymentMethods.length < 2
              "
              col="12"
              type="text"
              :placeholder="$t('PLACEHOLDERS.back')"
              v-model="data.back"
              disabled
            />
            <hr />
          </div>

          <h2>{{ $t("PLACEHOLDERS.userData") }}</h2>

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.clientName')"
            v-model="data.clientName"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.clientPhone')"
            v-model="data.clientPhone"
            disabled
          />
          <div v-if="data.cleaners">
            <h2>{{ $t("PLACEHOLDERS.employeeRate") }}</h2>

            <div class="d-flex" v-for="cleaner in data.cleaners">
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.name')"
                v-model="cleaner.name"
                disabled
              />
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.whatsapp')"
                v-model="cleaner.whatsapp"
                disabled
              />
            </div>
          </div>

          <div class="col-12" v-if="data.rate?.rate_service">
            <h2>{{ $t("PLACEHOLDERS.rates") }}</h2>
            <h6 class="text-center">{{ $t("PLACEHOLDERS.serviceRate") }}</h6>
            <rating-preview :rate="data.rate?.rate_service" />
            <h6 class="text-center">{{ $t("PLACEHOLDERS.matsRate") }}</h6>
            <rating-preview :rate="data.rate?.rate_materials" />
            <h6 class="text-center">{{ $t("PLACEHOLDERS.employeeRate") }}</h6>
            <rating-preview :rate="data.rate?.rate_cleaners" />
            <h6 class="text-center">{{ $t("PLACEHOLDERS.appRate") }}</h6>
            <rating-preview :rate="data.rate?.rate_application" />
            <label class="form-label mt-5 comment_label">
              {{ $t("PLACEHOLDERS.comment") }}
            </label>
            <div
              col="12"
              type="text"
              v-html="data.rate.comment.replace(/\n/g, '<br>')"
              disabled
              class="comment"
            ></div>
          </div>

          <base-input
            v-if="data.cancelReason"
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.cancelReason')"
            v-model="data.cancelReason"
            disabled
          />

          <base-input
            v-if="data.cancelDate"
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.cancelDate')"
            v-model="data.cancelDate"
            disabled
          />
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
// import RatingPreview from "@/components/ui/RatingPreview.vue";
import RatingPreview from "../../../components/ui/RatingPreview.vue";
export default {
  components: { RatingPreview },
  name: "showCity",
  comments: {
    RatingPreview,
  },
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        totalePrce: null,
        totalTax: null,
        totalOrderPrice: null,
        discount: null,
        discountValue: null,
        orderPriceAfterDiscount: null,
        comment: null,
        orderNum: null,
        orderCreate: null,
        status: null,
        unit_name: null,
        userName: null,
        userType: null,
        mangement: null,
        secret_number: null,
        products: null,
        serviceName: null,
        servicePrice: null,
        rate: null,
        manegerNmae: null,
        excuteAt: null,
        orderCode: "",
        mainC: null,
        clientName: null,
        back: null,
        clientPhone: null,
        status: null,
        cancelReason: null,
        cancelDate: null,
        subC: null,
        addServices: null,
        price_additions: null,
        PaymentMethods: null,
        descProd: null,
        excutetime: [],
        wood: null,
        countryFact: null,
        quantatyWanted: null,
        active: null,
        image: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        region_id: null,
        active: null,
        cleaners: [],
      },
      regions: [],
      // End:: Data Collection To Send
    };
  },

  computed: {},

  methods: {
    // start show data
    async showCity() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `orders/${this.$route.params.id}`,
        });
        this.data.status = res.data.data.Order?.status;
        this.data.orderNum = res.data.data.Order?.number_order;
        this.data.orderCreate = res.data.data.Order?.created_at;
        this.data.status = res.data.data.Order?.status;
        this.data.excuteAt = res.data.data.Order?.date;
        this.data.excutetime = res.data.data.Order.time?.map((ele, index) => ({
          id: index,
          name: ele,
        }));
        this.data.unit_name = res.data.data.Order?.unit_name;
        this.data.unitSpace = res.data.data.Order?.unit_capacity;
        this.data.additions = res.data.data.Order?.additions;
        this.data.secret_number = res.data.data.Order?.secret_number;
        this.data.serviceName = res.data.data.Order?.service_name;
        this.data.servicePrice = res.data.data.Order?.service_price;
        this.data.products = res.data.data.Order?.products;
        this.data.addServices = res.data.data.Order?.AdditionServices;
        this.data.totalePrce = res.data.data.Order?.order_price;
        this.data.totalTax = res.data.data.Order?.tax_value;
        this.data.totalOrderPrice = res.data.data.Order?.total;
        this.data.discount = res.data.data.Order?.percentage;
        this.data.discountValue = res.data.data.Order?.price_percentage;
        this.data.orderPriceAfterDiscount = res.data.data.Order?.total_amount;
        this.data.PaymentMethods = res.data.data.Order?.OrderPayment;
        this.data.back = res.data.data.Order?.package_name;
        this.data.cleaners = res.data.data.Order?.cleaners;
        this.data.clientName = res.data.data.Order?.user_name;
        this.data.clientPhone = res.data.data.Order?.user_mobile;
        this.data.rate = res.data.data.Order?.rate;
        this.data.cancelReason = res.data.data.Order?.reason;
        this.data.cancelDate = res.data.data.Order?.reason_time;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data
    async getRegions() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `regions`,
          params: {
            is_active: 1,
          },
        });
        // console.log("Cities =>", res.data.data);
        this.regions = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.showCity();
    // End:: Fire Methods
  },
};
</script>
<style>
.comment {
  border: 1px solid #E1423D;
  padding: 15px;
  border-radius: 6px;
}
.comment_label {
  color: #E1423D;
  font-size: 16px;
}
</style>
