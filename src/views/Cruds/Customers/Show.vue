<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_customer") }}</h4>
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
          <!-- Start:: Image -->
          <div class="preview-container text-center my-3">
            <img
              v-if="data.image.path"
              col="12"
              :src="data.image.path"
              :alt="$t('PLACEHOLDERS.image')"
            />
          </div>
          <!-- End:: Image -->

          <!-- Start:: Ar Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.nameAr"
            disabled
          />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: En Name Input -->

          <!-- Start:: created_at Input -->
          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.created_at')"
            v-model.trim="data.created_at"
            disabled
          />
          <!-- End:: created_at Input -->

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
  name: "CreateArea",

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
        payment_status: null,
        nameAr: null,
        nameEn: null,
        active: true,
        created_at: null
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    paymentStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.paid"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.unpaid"),
          value: 0,
        },
      ];
    },
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `customers/${this.$route.params.id}`,
        });
        // Start:: Set Data
        this.data.image.path = res.data.data.Customer.image;
        this.data.nameAr = res.data.data.Customer.name_ar;
        this.data.nameEn = res.data.data.Customer.name_en;
        this.data.created_at = res.data.data.Customer.created_at;
        this.data.active = res.data.data.Customer.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
