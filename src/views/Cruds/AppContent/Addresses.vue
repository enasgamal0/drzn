<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.AppContent.addresses") }}</h4>
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
          <MultipleMarkersMap
            :markers="markers"
            @update:markers="(newMarkers) => (markers = newMarkers)"
          />
          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button
              class="mt-5"
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
import MultipleMarkersMap from "@/components/general/MultipleMarkersMap";

export default {
  name: "AboutUs",
  components: {
    MultipleMarkersMap,
  },
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        address: null,
        lat: null,
        lng: null,
      },
      markers: [],
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=company-addresses`,
        });

        const fetchedData = res.data.data.data[0]?.value || [];

        if (fetchedData.length > 0) {
          this.data.address = fetchedData[0]?.address || "";
          this.data.lat = fetchedData[0]?.lat || 0;
          this.data.lng = fetchedData[0]?.lng || 0;

          this.markers = fetchedData.map((item) => ({
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
          }));
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    },

    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.submitForm();
      return;
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = true;
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("key", "company-addresses");

      this.markers.forEach((marker, index) => {
        REQUEST_DATA.append(`value[${index}][lat]`, marker.lat);
        REQUEST_DATA.append(`value[${index}][lng]`, marker.lng);
        REQUEST_DATA.append(
          `value[${index}][address]`,
          "Address"
        ); // optional
      });

      try {
        await this.$axios({
          method: "POST",
          url: `settings?key=company-addresses`,
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
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
