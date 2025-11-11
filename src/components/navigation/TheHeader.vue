<template>
  <nav id="navbar">
    <div class="container p-0">
      <div class="navbar_wrapper">
        <!-- Start:: Welcome Message -->
        <div class="welcome_message">
          <h4>
            {{ $t("TITLES.hi") }}
            {{ getAuthenticatedUserData.name }}
          </h4>
          <span> 🖐️ </span>
        </div>
        <!-- End:: Welcome Message -->

        <!-- Start:: Navbar Buttons -->
        <div class="navbar_btns_wrapper">
          <div
            class="group"
            :class="notificationsData.unreadNotifications > 0 ? '' : 'none'"
          >
          
            <!-- ********** Start:: Notification Button ********** -->
            <v-tooltip bottom v-if="$can('notifications index', 'notifications')"> 
              <template v-slot:activator="{ on, attrs }">
                <button v-bind="attrs" v-on="on">
                  <v-badge
                    :content="notificationsData.unreadNotifications"
                    floating
                  >
                    <div
                      class="notification_btn"
                      @click.stop="toggleNotificationsMenu()"
                    >
                      <i class="fal fa-bell"></i>
                    </div>
                  </v-badge>
                </button>
              </template>
              <span class="toolTip">{{ $t("TOOLTIPS.notifications") }}</span>
            </v-tooltip>
            <!-- ********** End:: Notification Button ********** -->

            <div class="group">
              <!-- ********** Start:: Theme Switcher Button ********** -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <button
                    aria-label="theme_changer"
                    class="theme_changer"
                    @click="changeAppTheme"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <i
                      class="fal fa-moon"
                      v-if="getAppTheme == 'light_theme'"
                    ></i>
                    <i class="fal fa-sun" v-else></i>
                  </button>
                </template>
                <span class="toolTip">{{ $t("TOOLTIPS.change_theme") }}</span>
              </v-tooltip>
              <!-- ********** End:: Theme Switcher Button ********** -->

              <!-- ********** Start:: Language Switcher Button ********** -->
              <div class="lang_toggler_wrapper">
                <v-tooltip bottom v-if="getAppLocale == 'ar'">
                  <template v-slot:activator="{ on, attrs }">
                    <button
                      class="lang_toggeler_btn"
                      @click="changeAppLanguage('en')"
                      v-bind="attrs"
                      v-on="on"
                    >
                      En
                    </button>
                  </template>
                  <span class="toolTip">{{
                    $t("TOOLTIPS.change_language")
                  }}</span>
                </v-tooltip>
                <v-tooltip bottom v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <button
                      class="lang_toggeler_btn pb-3"
                      @click="changeAppLanguage('ar')"
                      v-bind="attrs"
                      v-on="on"
                    >
                      ع
                    </button>
                  </template>
                  <span class="toolTip">{{
                    $t("TOOLTIPS.change_language")
                  }}</span>
                </v-tooltip>
              </div>
              <!-- ********** End:: Language Switcher Button ********** -->

              <!-- ********** Start:: Small Screens Navbar Drawer Button ********** -->
              <button
                class="small_screens_navbar_toggeler"
                @click="$emit('fireToggleNavDrawerEmit')"
              >
                <i class="fal fa-bars"></i>
              </button>
              <!-- ********** End:: Small Screens Navbar Drawer Button ********** -->
            </div>

            <!-- ********** Start:: User Profile Button -->
            <div class="user_profile_menu_wrapper">
              <button
                class="user_profile_menu_btn"
                @click="userProfileModalIsOpen = true"
              >
                <div class="name_wrapper">
                  <h3>{{ getAuthenticatedUserData.name }}</h3>
                </div>

                <div class="avatar_wrapper" v-if="getAuthenticatedUserData.avatar">
                  <img :alt="getAuthenticatedUserData.name" :src="getAuthenticatedUserData.avatar"/>
                </div>
                <div class="avatar_wrapper" v-else>
                  <AvatarPlaceholder
                    :nameAvatar="getAuthenticatedUserData.name"
                  />
                </div>
              </button>
            </div>

            <UserDataModal
              :modalIsOpen="userProfileModalIsOpen"
              @toggleModal="userProfileModalIsOpen = !userProfileModalIsOpen"
            />
            <!-- ********** End:: User Profile Button -->
          </div>
        </div>
        <!-- End:: Navbar Buttons -->
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AvatarPlaceholder from "@/components/ui/AvatarPlaceholder.vue";
import UserDataModal from "@/components/modals/UserDataModal.vue";

export default {
  name: "TheHeader",

  components: {
    AvatarPlaceholder,
    UserDataModal,
  },

  emits: ["fireToggleNavDrawerEmit"],

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      getAppTheme: "AppThemeModule/getAppTheme",
      getAppLocale: "AppLangModule/getAppLocale",
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
      notificationsData: "NotificationsModule/notificationsData",
    }),
    // End:: Vuex Getters
  },

  data() {
    return {
      receivedMessages: [],
      notificationCount: 0,
      // Start:: Notifications Menu Control Data
      notificationsMenuIsOpen: false,
      // End:: Notifications Menu Control Data

      // Start:: User Profile Modal Controlling Data
      userProfileModalIsOpen: false,
      // End:: User Profile Modal Controlling Data
    };
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      changeAppTheme: "AppThemeModule/changeAppTheme",
      changeAppLanguage: "AppLangModule/changeAppLanguage",
      readAllNotifications: "NotificationsModule/readAllNotifications",
    }),
    // End:: Vuex Actions

    // Start:: Toggle Notifications Menu
    toggleNotificationsMenu() {
      // this.notificationsMenuIsOpen = !this.notificationsMenuIsOpen;
      // this.chatsDrawerIsOpen = false;
      this.$router.push("/all-notifications/show");
    },
    // End:: Toggle Notifications Menu

    // Start:: Notification Redirect
    redirectNotification(notifyType) {
      if (notifyType == "new_user_register") {
        this.$router.push("/clients/all");
      } else if (
        notifyType == "add_shipment_attach" ||
        notifyType == "update_shipment_request" ||
        notifyType == "new_shipment_request"
      ) {
        this.$router.push("/shipment/all");
      } else if (notifyType == "new_authorization_for_user") {
        this.$router.push("/authorizations/all");
      }
    },
    // End:: Notification Redirect

    async getData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "notification/index",
        });
        // console.log("All Data ==>", res.data.data);
        this.notificationCount = res.data.data.filter(
          (item) => item.is_read == false
        ).length;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // this.getData();
    this.readAllNotifications();

    navigator.serviceWorker.addEventListener("message", (event) => {
      this.notificationCount++;
    });

    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.notificationsMenuIsOpen = false;
    });
    // End:: Fire Methods
  },
};
</script>

<style>
.none .v-badge__badge {
  display: none !important;
}
</style>

<style scoped lang="scss">
#custom-badge {
  > span {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

.notification_btn {
  cursor: pointer;

  i {
    font-size: 25px;
  }
}

.v-badge__badge.primary {
  background: #627950 !important;
}
</style>
