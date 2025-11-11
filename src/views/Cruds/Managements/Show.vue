<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_department") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- <base-image-upload-input
            col="12"
            identifier="image"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.section_image')"
            @selectImage="selectImage"
            disabled
          /> -->

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

          <base-select-input
            col="6"
            :optionsList="users"
            :placeholder="$t('PLACEHOLDERS.department_manager_name')"
            v-model="department_manager_name"
            disabled
          />

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

        nameAr: null,
        nameEn: null,
        active: true,
      },
      users: [],
      department_manager_name: "",
      allDepartment_manager_name: [],
      // End:: Data Collection To Send
    };
  },

  methods: {
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `management/${this.$route.params.id}`,
        });
        // console.log( "DATA TO EDIT =>", res.data.data.region );

        // Start:: Set Data
        // this.data.image.path = res.data.data.Management.image;
        this.data.nameAr = res.data.data.Management.trans.name.ar;
        this.data.nameEn = res.data.data.Management.trans.name.en;
        this.department_manager_name = res.data.data.Management.user;
        this.data.active = res.data.data.Management.status;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    async getUsers() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `users?type=employee&statusRequests=accepted`,
        });
        this.users = res.data.data.map((item) => ({
          ...item.user,
        }));
        console.log("this.users", this.users);
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    this.getUsers();
    // End:: Fire Methods
  },
};
</script>
