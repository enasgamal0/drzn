<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.statistics") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <div
            v-for="(statistic, index) in data.statistics"
            :key="index"
            class="col-12"
          >
            <h5 style="color: #E1423D" class="font-weight-bold">
              {{ $t("PLACEHOLDERS.stat") }} #{{ index + 1 }}
            </h5>
            <div class="row mb-4">
              <!-- Start:: Count Input -->
              <base-input
                col="12"
                type="number"
                :placeholder="$t('PLACEHOLDERS.count')"
                v-model.trim="statistic.count"
                required
              />
              <!-- End:: Count Input -->

              <!-- Start:: Name Ar Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.nameAr')"
                v-model.trim="statistic.nameAr"
                required
              />
              <!-- End:: Name Ar Input -->

              <!-- Start:: Name En Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.nameEn')"
                v-model.trim="statistic.nameEn"
                required
              />
              <!-- End:: Name En Input -->

              <!-- Start:: Description Ar Input -->
              <base-input
                col="6"
                type="textarea"
                :placeholder="$t('PLACEHOLDERS.descriptionAr')"
                v-model.trim="statistic.descriptionAr"
                required
              />
              <!-- End:: Description Ar Input -->

              <!-- Start:: Description En Input -->
              <base-input
                col="6"
                type="textarea"
                :placeholder="$t('PLACEHOLDERS.descriptionEn')"
                v-model.trim="statistic.descriptionEn"
                required
              />
              <!-- End:: Description En Input -->

              <!-- Start:: Add and Delete Buttons -->
              <div class="col-12 text-end">
                <v-btn
                  color="error"
                  @click="removeStatistic(index)"
                  v-if="data.statistics.length > 1"
                >
                  <i class="fas fa-trash"></i>
                </v-btn>
                <v-btn
                  class="mx-3"
                  @click="addNewStatistic"
                  style="background-color: #E1423D; color: white"
                >
                  <i class="fas fa-plus"></i>
                </v-btn>
              </div>
              <!-- End:: Add and Delete Buttons -->
              <hr style="width: 97%" class="my-5" />
            </div>
          </div>

          <div class="col-12 text-center" v-if="data.statistics.length == 0">
            <v-btn
              class="mx-3"
              @click="addNewStatistic"
              style="background-color: #E1423D; color: white"
            >
              <i class="fas fa-plus"></i>
            </v-btn>
          </div>

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
  name: "Statistics",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        statistics: [
          {
            count: null,
            nameAr: null,
            nameEn: null,
            descriptionAr: null,
            descriptionEn: null,
          },
        ],
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Add New Statistic
    addNewStatistic() {
      this.data.statistics.push({
        count: null,
        nameAr: null,
        nameEn: null,
        descriptionAr: null,
        descriptionEn: null,
      });
    },
    // End:: Add New Statistic

    // Start:: Remove Statistic
    removeStatistic(index) {
      this.data.statistics.splice(index, 1);
    },
    // End:: Remove Statistic

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=statistics`,
        });
        // Start:: Set Data
        if (res.data.data.data[0]?.value) {
          let stats = res.data.data.data[0].value;
          if (typeof stats === "string") {
            stats = JSON.parse(stats);
          }
          this.data.statistics = [];
          this.data.statistics = stats.map((stat) => ({
            count: stat.count,
            nameAr: stat.name.ar,
            nameEn: stat.name.en,
            descriptionAr: stat.description.ar,
            descriptionEn: stat.description.en,
          }));
        }

        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      this.submitForm();
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();

      // Start:: Append Request Data
      REQUEST_DATA.append("key", "statistics");

      this.data.statistics.forEach((stat, index) => {
        if (stat.count)
          REQUEST_DATA.append(`value[${index}][count]`, stat.count);
        if (stat.nameAr)
          REQUEST_DATA.append(`value[${index}][name][ar]`, stat.nameAr);
        if (stat.nameEn)
          REQUEST_DATA.append(`value[${index}][name][en]`, stat.nameEn);
        if (stat.descriptionAr)
          REQUEST_DATA.append(
            `value[${index}][description][ar]`,
            stat.descriptionAr
          );
        if (stat.descriptionEn)
          REQUEST_DATA.append(
            `value[${index}][description][en]`,
            stat.descriptionEn
          );
      });

      try {
        await this.$axios({
          method: "POST",
          url: `settings?key=statistics`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
