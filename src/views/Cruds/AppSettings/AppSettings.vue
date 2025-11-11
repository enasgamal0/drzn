<template>
  <div class="crud_form_wrapper app_settings_class">
    <div class="table_title_wrapper">
      <div class="title_text_wrapper">
        <h5 style="color: #E1423D" class="font-weight-bold">{{ $t("SIDENAV.settings.general") }}</h5>
      </div>
      <div class="col-12 text-end">
        <v-btn @click="$router.go(-1)" style="color: #E1423D">
          <i class="fas fa-backward"></i>
        </v-btn>
      </div>
    </div>
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <base-input
            type="text"
            col="6"
            :placeholder="$t('PLACEHOLDERS.tax')"
            v-model.trim="data.tax"
            required
          />

          <base-input
            type="text"
            col="6"
            :placeholder="$t('PLACEHOLDERS.payment_amount')"
            v-model.trim="data.payment_amount"
            required
          />

          <base-input
            type="text"
            col="6"
            :placeholder="$t('PLACEHOLDERS.order_duration_hours')"
            v-model.trim="data.order_duration_hours"
            required
          />

          <base-input
            type="text"
            col="6"
            :placeholder="$t('PLACEHOLDERS.points_per_join')"
            v-model.trim="data.points_per_join"
            required
          />

          <base-input
            type="text"
            col="6"
            :placeholder="$t('PLACEHOLDERS.point_value_per_sar')"
            v-model.trim="data.point_value_per_sar"
            required
          />

          <div class="btn_wrapper">
            <base-button
              class="mt-2"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.save')"
              :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSetting",
  data() {
    return {
      isWaitingRequest: false,
      data: {
        tax: null,
        payment_amount: null,
        less_than_reference_price: null,
        greater_than_reference_price: null,
        ratio_of_start_price: null,
        incremental_ratio: null,
        points_per_join: null,
        point_value_per_sar: null,
      },
    };
  },
  methods: {
    async getDataToEdit() {
      try {
        let res = await this.$axios.get("settings-general?key=dashboard_setting");
        const settings = res.data.data.data[0].value;
        this.data.tax = settings.tax;
        this.data.payment_amount = settings.Payment_amount;
        this.data.order_duration_hours = settings.Request_period_hour;
        this.data.points_per_join = settings.Points_every_joining;
        this.data.point_value_per_sar = settings.Points_value_per_riyal;
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    async submitForm() {
      this.isWaitingRequest = true;
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("key", "dashboard_setting");
      REQUEST_DATA.append("value[tax]", this.data.tax);
      REQUEST_DATA.append("value[Payment_amount]", this.data.payment_amount);
      REQUEST_DATA.append(
        "value[Request_period_hour]",
        this.data.order_duration_hours
      );
      REQUEST_DATA.append(
        "value[Points_every_joining]",
        this.data.points_per_join
      );
      REQUEST_DATA.append(
        "value[Points_value_per_riyal]",
        this.data.point_value_per_sar
      );
      try {
        await this.$axios.post("settings", REQUEST_DATA);
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    validateFormInputs() {
      // if (!this.data.tax) {
      //   this.$message.error(this.$t("VALIDATION.tax"));
      //   return;
      // }
      this.submitForm();
    },
  },
  created() {
    this.getDataToEdit();
  },
};
</script>
