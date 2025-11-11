<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showClient", { name: data.name }) }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <!-- ==== Start:: Status Badges ==== -->
      <div class="badges_wrapper justify-content-between">
        <div class="wrapper">
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.numberOfVisits", { number: data.login_count }) }}
          </v-chip>
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.lastVisit", { date: data.lastVisit }) }}
          </v-chip>
        </div>

        <v-chip :color="data.is_active ? 'green' : 'red'" text-color="white">
          {{ data.is_active ? $t("STATUS.active") : $t("STATUS.notActive") }}
        </v-chip>
      </div>
      <!-- ==== End:: Status Badges ==== -->

      <!-- ==== Start:: Client Main Data ==== -->
      <form>
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <!-- <base-image-upload-input col="12" identifier="client_image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            :preSelectedImage="data.image" disabled  /> -->
          <div class="preview-container text-center my-3">
            <img :src="data.image" alt="Product Image" v-if="data.image" />
          </div>
          <!-- End:: Image Upload Input -->

          <!-- Start:: Ar Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.name')"
            v-model.trim="data.name"
            disabled
          />
          <!-- End:: Ar Name Input -->

          <!-- Start:: Phone Input -->
          <base-input
            col="6"
            type="tel"
            :placeholder="$t('PLACEHOLDERS.phone')"
            v-model.trim="data.phone"
            readonly
          />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            disabled
          />
          <!-- End:: Email Input -->
        </div>
      </form>
      <!-- ==== End:: Client Main Data ==== -->
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "SingleClient",

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

      // Start:: Data
      data: {
        image: null,
        name: null,
        phone: null,
        email: null,
        lastVisit: null,
        login_count: null,
        is_active: null,
      },
      // End:: Data
    };
  },
  computed: {
    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("BUTTONS.yes"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
  },

  methods: {
    // Start:: Get Data To Show
    async getDataToShow() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `clients/${this.id}`,
        });
        // console.log("DATA =>", res.data.data);
        this.data.image = res.data.data.User.image;
        if (this.data.image == null) {
          this.data.image = require("@/assets/media/images/user_avatar.png");
        }
        this.data.name = res.data.data.User.name;
        this.data.phone = res.data.data.User.mobile;
        this.data.email = res.data.data.User.email;
        this.data.login_count = res.data.data.User.login_count;
        this.data.lastVisit = res.data.data.User.last_login;
        this.data.is_active = res.data.data.User.is_active;
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
