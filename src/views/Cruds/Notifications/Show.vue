<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.view_notification_details") }}</h4>
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
          <!-- Start:: Receiver Type Input -->
          <!-- <base-select-input
            col="6"
            :optionsList="receiverTypes"
            :placeholder="$t('PLACEHOLDERS.receiverType')"
            v-model="data.receiverType"
            disabled
          /> -->
          <!-- End:: Receiver Type Input -->

          <!-- Start:: service_providers Type Input -->
          <!-- <base-select-input
            v-if="data.providers && data.receiverType.value === 'provider'"
            col="6"
            :optionsList="data.providers"
            :placeholder="$t('PLACEHOLDERS.service_providers_plural')"
            v-model="data.provider"
            disabled
            multiple
          /> -->
          <!-- End:: Drivers Type Input -->

          <div class="col-12">
            <div class="row">
              <!-- Start:: Title Ar Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.titleAr')"
                v-model.trim="data.titleAr"
                disabled
              />
              <!-- End:: Title Ar Input -->

              <!-- Start:: Title En Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.titleEn')"
                v-model.trim="data.titleEn"
                disabled
              />
              <!-- End:: Title En Input -->

              <!-- Start:: Content Ar Input -->
              <base-input
                col="6"
                rows="7"
                type="textarea"
                :placeholder="$t('PLACEHOLDERS.contentAr')"
                v-model.trim="data.contentAr"
                disabled
              />
              <!-- End:: Content Ar Input -->

              <!-- Start:: Content En Input -->
              <base-input
                col="6"
                rows="7"
                type="textarea"
                :placeholder="$t('PLACEHOLDERS.contentEn')"
                v-model.trim="data.contentEn"
                disabled
              />
              <!-- End:: Content En Input -->
              <base-input
                col="12"
                type="text"
                :placeholder="$t('PLACEHOLDERS.send_date')"
                v-model.trim="data.date"
                disabled
              />
              <!-- Start:: Clients Type Input -->
              <!-- <base-input
                v-if="data.receiverType == 'All' || data.receiverType == 'الكل'"
                col="12"
                :placeholder="$t('PLACEHOLDERS.recievers')"
                type="text"
                v-model="data.receiverType"
                disabled
              /> -->
              <base-select-input
                v-if="data.client?.length"
                col="12"
                :optionsList="data.client"
                :placeholder="$t('PLACEHOLDERS.recievers')"
                v-model="data.client"
                disabled
                multiple
              />
              <base-input
                v-else
                col="12"
                :placeholder="$t('PLACEHOLDERS.recievers')"
                type="text"
                v-model="data.receiverType"
                disabled
              />
              <!-- End:: Clients Type Input -->
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateNotification",

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allClientsData: "ApiGetsModule/allClientsData",
      allDriversData: "ApiGetsModule/allDriversData",
    }),
    // End:: Vuex Getters

    receiverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.service_seeker_singular"),
          value: "client",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.all_service_seekers"),
          value: "clients",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.service_provider_singular"),
          value: "provider",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.all_service_providers"),
          value: "providers",
        },
        {
          id: 5,
          name: this.$t("PLACEHOLDERS.both"),
          value: "both",
        },
      ];
    },
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        // receiverType: {
        //   id: 1,
        //   name: this.$t("PLACEHOLDERS.service_seeker_singular"),
        //   value: "client",
        // },
        receiverType: this.$t("PLACEHOLDERS.all"),
        clients: [],
        providers: [],
        client: [],
        provider: [],
        titleAr: null,
        titleEn: null,
        contentAr: null,
        contentEn: null,
        date: null,
      },

      // End:: Data Collection To Send
    };
  },
  methods: {
    // End:: Vuex Actions
    async getNotificationData() {
      try {
        let res = await this.$axios({
          method: "POST",
          url: `notification/show`,
          data: {
            notification_id: this.$route.params.id,
          },
        });

        this.data.titleAr = res.data.data.notification.data.title.ar;
        this.data.titleEn = res.data.data.notification.data.title.en;
        this.data.contentAr = res.data.data.notification.data.body.ar;
        this.data.contentEn = res.data.data.notification.data.body.en;
        this.data.date = res.data.data.notification.created_at;
        // this.data.receiverType = res.data.data.notification.data.type;
        this.data.client = res.data.data.notification?.users;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.getNotificationData();
    // End:: Fire Methods
  },
};
</script>
