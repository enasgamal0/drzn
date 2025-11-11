<template>
  <div class="app_structure_wrapper">
    <!-- Start:: Side Nav -->
    <TheSideNav 
      :navIsActive="smallScreensNavDrawerIsOpen"
      @fireToggleNavDrawerEmit="toggleNavDrawer"
    />
    <!-- End:: Side Nav -->

    <!-- Start:: Content Body -->
    <div class="dashboard_body_wrapper">
      <div class="inner_structure_wrapper">
        <!-- ********** Start:: Header ********** -->
        <TheHeader @fireToggleNavDrawerEmit="toggleNavDrawer"/>
        <!-- ********** End:: Header ********** -->

        <!-- ********** Start:: App Router View ********** -->
        <section class="main_content">
          <transition name="fadeInUp" mode="out-in">
            <router-view />
          </transition>
        </section>
        <!-- ********** End:: App Router View ********** -->

        <!-- ********** Start:: Footer ********** -->
        <TheFooter />
        <!-- ********** End:: Footer ********** -->
      </div>
    </div>
    <!-- End:: Content Body -->
  </div>
</template>

<script>
// Start:: Importing Vuex Helpers
import { mapActions, mapGetters } from "vuex";
// End:: Importing Vuex Helpers

// STart:: Importing Navigations
import TheHeader from "@/components/navigation/TheHeader.vue";
import TheFooter from "@/components/navigation/TheFooter.vue";
import TheSideNav from "@/components/navigation/TheSideNav.vue";
// End:: Importing Navigations

import Echo from "laravel-echo";

export default {
  name: "AppContentWrapper",

  components: {
    TheHeader,
    TheFooter,
    TheSideNav,
  },

  computed: {
    // Start:: Vuex Get Authenticated User Data
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    }),
    // End:: Vuex Get Authenticated User Data
  },

  data() {
    return {
      // Start:: Small Screens Nav Drawer Control Data
      smallScreensNavDrawerIsOpen: false,
      // End:: Small Screens Nav Drawer Control Data
    }
  },

  methods: {
    // Start:: Vuex Notifications Actions
    ...mapActions({
      getNotifications: "NotificationsModule/getNotifications",
    }),
    // End:: Vuex Notifications Actions

    // Start:: Toggle Small Screens Nav Drawer
    toggleNavDrawer() {
      this.smallScreensNavDrawerIsOpen = !this.smallScreensNavDrawerIsOpen;
    },
    // End:: Toggle Small Screens Nav Drawer

    receiveMessage() {
      if (this.getAuthenticatedUserData.token) {
        window.io = require("socket.io-client");
        window.Echo = new Echo({
          broadcaster: "socket.io",
          host: "https://mronah.develobug.com:6060",
          csrfToken: "Bearer " + this.getAuthenticatedUserData.token,
          auth: {
            headers: {
              Authorization: "Bearer " + this.getAuthenticatedUserData.token,
            },
          },
        });

        // -----------------
        // console.log("ECHO ==>", window.Echo);
        window.Echo.private(
          `mronah-admin-notification.${this.getAuthenticatedUserData.id}`
        ).notification((payload) => {
          if (payload) {
            // console.log("SOCKET PAYLOAD ==>", payload);

            this.getNotifications();
            this.$message.open({
              content: payload.title,
              icon: () => <i class="fad fa-bell notification_icon"></i>,
            });
            new Audio(require("@/assets/media/sound/notification.mp3")).play();
          }
        });
      }
    },
  },

  mounted() {
    // Start:: Fire Methods
    // if (this.getAuthenticatedUserData.token) {
    //   this.receiveMessage();
    // }
    // End:: Fire Methods
  },
};
</script>
