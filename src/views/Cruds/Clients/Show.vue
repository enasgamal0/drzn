<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showClient") }}</h4>
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
      <div class="badges_wrapper d-flex justify-content-between">
        <div class="wrapper">
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.numberOfVisits", { number: data.numberOfVisits }) }}
          </v-chip>
          <v-chip color="amber darken-2 mx-2" text-color="white">
            {{ $t("TITLES.lastVisit", { date: data.lastVisit }) }}
          </v-chip>
        </div>

        <v-chip :color="data.is_active ? 'green' : 'red'" text-color="white">
          {{ data.is_active ? $t("STATUS.active") : $t("STATUS.notActive") }}
        </v-chip>
      </div>
      <!-- ==== End:: Status Badges ==== -->
      <form>
        <div class="row">
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.client_name')"
            v-model.trim="data.client_name"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.phone')"
            v-model.trim="data.mobile"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.joiningDate')"
            v-model.trim="data.created_at"
            disabled
          />
          </div>
        </form>
      </div>
    </div>
    <!-- END:: Single Step Form Content -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BasePhoneInput from "@/components/formInputs/BasePhoneInput.vue";

export default {
  name: "ShowClients",
  components: {
    BasePhoneInput,
  },
  data() {
    return {
      key: null,
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data
      isWhatsappSame: false,
      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        mobile: null,
        client_name: null,
        is_active: true,
        created_at: null,
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // start show data
    async showClient() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `users/${this.$route.params?.id}`,
        });
        this.data.client_name = res.data.data.User.name;
        this.data.mobile = res.data.data.User.mobile;
        this.data.created_at = res.data.data.User.created_at;
        this.data.is_active = res.data.data.User.is_active;
        this.data.numberOfVisits = res.data.data.User.login_count;
        this.data.lastVisit = res.data.data.User.last_login;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
    dialCode(dialCode) {
      this.data.dial_code = dialCode;
    },

    dialCodeWhatsapp(dialCode) {
      this.data.dial_code_whatsapp = dialCode;
    },
  },
  
  async created() {
    // Start:: Fire Methods
    this.showClient();
    // End:: Fire Methods;
  },
};
</script>
