<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.referral-providers-codes.show") }}</h4>
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
          <!-- Start:: اسم صاحب الكود -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.codeOwnerName')"
            :label="$t('LABELS.codeOwnerName')"
            v-model.trim="data.codeOwnerName"
            disabled
          />
          <!-- End:: اسم صاحب الكود -->

          <!-- Start:: كود الإحالة -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.referralCode')"
            :label="$t('LABELS.referralCode')"
            v-model.trim="data.referralCode"
            disabled
          />
          <!-- End:: كود الإحالة -->

          <!-- Start:: اسم مقدم الخدمة المنضم -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.joinedProviderName')"
            :label="$t('LABELS.joinedProviderName')"
            v-model.trim="data.joinedProviderName"
            disabled
          />
          <!-- End:: اسم مقدم الخدمة المنضم -->

          <!-- Start:: البريد الإلكتروني للمنضم -->
          <base-input
            col="6"
            type="email"
            :placeholder="$t('PLACEHOLDERS.joinedProviderEmail')"
            :label="$t('LABELS.joinedProviderEmail')"
            v-model.trim="data.joinedProviderEmail"
            disabled
          />
          <!-- End:: البريد الإلكتروني للمنضم -->

          <!-- Start:: تاريخ الإنضمام -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.joinDate')"
            :label="$t('LABELS.joinDate')"
            v-model.trim="data.joinDate"
            disabled
          />
          <!-- End:: تاريخ الإنضمام -->

          <!-- Start:: عدد النقاط المكتسبة من الإحالة -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.referralPoints')"
            :label="$t('LABELS.referralPoints')"
            v-model.trim="data.referralPoints"
            disabled
          />
          <!-- End:: عدد النقاط المكتسبة من الإحالة -->

          <!-- Start:: رصيد النقاط الإجمالي -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.totalPoints')"
            :label="$t('LABELS.totalPoints')"
            v-model.trim="data.totalPoints"
            disabled
          />
          <!-- End:: رصيد النقاط الإجمالي -->

          <!-- Start:: حالة الكود -->
          <div class="input_wrapper switch_wrapper my-5 col-6">
            <v-switch
              color="green"
              :label="
                data.codeStatus
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.codeStatus"
              hide-details
              disabled
            ></v-switch>
          </div>
          <!-- End:: حالة الكود -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ShowReferralProviderCode",
  
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Display
      data: {
        codeOwnerName: null,          // اسم صاحب الكود
        referralCode: null,            // كود الإحالة
        joinedProviderName: null,      // اسم مقدم الخدمة المنضم
        joinedProviderEmail: null,     // البريد الإلكتروني للمنضم
        joinDate: null,                // تاريخ الإنضمام
        referralPoints: null,          // عدد النقاط المكتسبة من الإحالة
        totalPoints: null,             // رصيد النقاط الإجمالي
        codeStatus: null,              // حالة الكود
      },
      // End:: Data Collection To Display
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  methods: {
    // Start:: Show Referral Provider Code Data
    async showReferralProviderCode() {
      this.isWaitingRequest = true;
      
      try {
        let res = await this.$axios({
          method: "GET",
          url: `referral_provider-codes/${this.$route.params?.id}`,
        });

        const responseData = res.data.data.referralProviderCodes;

        // تعبئة البيانات من الاستجابة
        this.data.codeOwnerName = responseData.provider.name;
        this.data.referralCode = responseData.joined_provider.code;
        this.data.joinedProviderName = responseData.joined_provider.name;
        this.data.joinedProviderEmail = responseData.joined_provider.email;
        this.data.joinDate = responseData.created_at;
        this.data.referralPoints = responseData.points;
        this.data.totalPoints = responseData.provider_points;
        this.data.codeStatus = responseData.provider.code_status;

        this.isWaitingRequest = false;
      } catch (error) {
        this.isWaitingRequest = false;
        console.log(error?.response?.data?.message);
        
        // عرض رسالة خطأ للمستخدم
        this.$izitoast.error({
          title: this.$t("MESSAGES.errorOccurred"),
          message: error?.response?.data?.message || this.$t("MESSAGES.somethingWentWrong"),
        });
      }
    },
    // End:: Show Referral Provider Code Data
  },

  created() {
    this.showReferralProviderCode();
  },
};
</script>