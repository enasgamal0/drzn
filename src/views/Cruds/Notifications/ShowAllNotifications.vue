<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>
        <transition-group name="fade" v-if="receivedMessages.length">
          <div
            class="notification"
            :class="{ read: message.is_read == true }"
            v-for="(message, index) in receivedMessages"
            :key="'k' + index"
          >
            <router-link v-if="message?.data?.type != 'delete_account'" :to="message?.data?.type === 'contact_us' ? '/contact-messages/all' : message?.data?.type === 'new_client' ? `/Clients/show/${message?.data.id}` : message?.data?.type === 'new_influencer' ? `/influencers/show/${message?.data.id}` : ''">
              <h3>{{ message.title }}</h3>
              <p>{{ message.body }}</p>
            </router-link>
            <div v-if="message?.data?.type == 'delete_account'">
                <h3>{{ message.title }}</h3>
                <p>{{ message.body }}</p>
            </div>
            <div
              class="delete_notification"
              :class="{ read: message.is_read }"
              @click="NotificationsReaded(message.id)"
              v-if="!message.is_read"
            >
              <i class="fas fa-check-double"></i>
            </div>
            <div
              class="delete_notification"
              :class="{ read: message.is_read }"
              style="cursor: default;"
              v-if="message.is_read"
            >
              <i class="fas fa-check-double"></i>
            </div>
          </div>
        </transition-group>

        <p class="text-danger text-center text--darken-4 pt-5 pb-5" v-else>
          {{ $t("PLACEHOLDERS.no_notifications") }}
        </p>

        <!-- Start:: Pagination -->
        <template>
          <div class="pagination_container text-center mt-3 mb-0">
            <v-pagination
              class="py-0"
              square
              v-model="paginations.current_page"
              :length="paginations.last_page"
              :total-visible="6"
              @input="updateRouterQueryParam($event)"
              :prev-icon="
                getAppLocale == 'ar'
                  ? 'fal fa-angle-right'
                  : 'fal fa-angle-left'
              "
              :next-icon="
                getAppLocale == 'ar'
                  ? 'fal fa-angle-left'
                  : 'fal fa-angle-right'
              "
            />
          </div>
        </template>
        <!-- End:: Pagination -->
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CreateContact",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      receivedMessages: [],

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      notificationsData: "NotificationsModule/notificationsData",
    }),
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.getData();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {
    ...mapActions({
      readAllNotifications: "NotificationsModule/readAllNotifications",
    }),
    openNotify({ id, notification_type }) {
      if (notification_type == "booking_golden_unit") {
        this.$router.push(`/orders-golden-units/show/${id}`);
      } else if (notification_type == "booking_provider_unit") {
        this.$router.push(`/orders-provider-units/show/${id}`);
      } else if (notification_type == "distinction") {
        this.$router.push(`/orders-distinction/show/${id}`);
      } else if (notification_type == "add_unit") {
        this.$router.push(`/orders-units/show/${id}`);
      }
    },
    async getData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "notification/admin-notifications",
          params: {
            page: this.paginations.current_page,
          },
        });
        this.receivedMessages = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // async DeleteNotification(item_id) {
    //   const REQUEST_DATA = new FormData();
    //   REQUEST_DATA.append("_method", "PUT");
    //   try {
    //     let res = await this.$axios({
    //       method: "POST",
    //       url: `notifications/${item_id}`,
    //       params: REQUEST_DATA,
    //     });
    //     this.$message.success(res.data.message);
    //     this.getData();
    //   } catch (error) {
    //     this.dialogDelete = false;
    //     this.$message.error(error.response.data.errors);
    //   }
    // },

    async NotificationsReaded(item_id) {
      try {
        const REQUEST_DATA = new FormData();
        REQUEST_DATA.append("notification_id", item_id);

        let res = await this.$axios({
          method: "POST",
          url: `notification/mark-as-read`,
          data: REQUEST_DATA,
        });

        this.$message.success(res.data.message);
        // Update the local state for the specific message
        const message = this.receivedMessages.find((msg) => msg.id === item_id);
        if (message) {
          message.is_read = true;
        }

        this.getData();
        this.readAllNotifications();
        this.notificationsData.unreadNotifications--;
      } catch (error) {
        this.$message.error(error.response.data.errors);
      }
    },
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll To Screen's Top After Get Products
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
  },

  created() {
    this.getData();

    navigator.serviceWorker.addEventListener("message", (event) => {
      const receivedMessage = event.data.data;

      this.receivedMessages.unshift(receivedMessage);
      this.getData();
      this.readAllNotifications();
      this.notificationsData.unreadNotifications--;

      console.log(event.data.data);
      // console.log("receivedMessage", event)
      // Update component state or display the received message in the UI
    });

    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.show_order {
  cursor: pointer;
  i {
    font-size: 20px;
    position: absolute;
    top: 20px;
    left: 60px;
  }
}
.notification {
  background: #000;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;

  .delete_notification {
    position: absolute;
    z-index: 500 !important;
    top: 20px;
    left: 20px;
    cursor: pointer;

    &.read {
      i {
        color: #49a956;
      }
    }

    i {
      font-size: 20px;
      color: #ddd;
    }
  }
}

.text-danger {
  font-size: 22px;
}
</style>
