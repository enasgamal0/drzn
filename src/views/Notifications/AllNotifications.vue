<template>
  <div class="all_notifications_wrapper">
    <div class="container">
      <!-- START:: PAGE TITLE  -->
      <div class="page_title">
        <h4>{{ $t("TITLES.allNotifications") }}</h4>

        <button
          @click="openDeleteDialog"
          v-if="
            allReadiedNotificationsData.allReadiedNotificationsList.length != 0
          "
        >
          {{ $t("BUTTONS.deleteAllNotifications") }}
        </button>
      </div>
      <!-- END:: PAGE TITLE  -->

      <!-- START:: EMPTY NOTIFICATIONS -->
      <div
        class="empty_notifications_wrapper"
        v-if="
          allReadiedNotificationsData.allReadiedNotificationsList.length == 0
        "
      >
        <img
          src="../../assets/media/empty_messages/snooze.png"
          alt="Empty Notifications"
          width="160"
          height="160"
        />

        <h4 class="message_text">{{ $t("TITLES.noNotifications") }}</h4>
      </div>
      <!-- END:: EMPTY NOTIFICATIONS -->

      <!-- START:: PAGE CONTENT -->
      <div class="row" v-else>
        <!-- START:: SINGLE NOTIFICATION ROW -->
        <div
          class="col-12"
          v-for="item in allReadiedNotificationsData.allReadiedNotificationsList"
          :key="item.id"
        >
          <div class="single_notification_row">
            <!-- ********** START:: NOTIFICATION BODY ********** -->
            <div
              class="notification_body"
              @click="
                redirectNotification(item.notify_type);
                readSingleNotification(item.id);
              "
            >
              <p class="notification_title">
                {{ item.title }}
              </p>
              <p class="notification_body">
                {{ item.body }}
              </p>
              <p class="notification_date">
                {{ item.created_at }}
              </p>
            </div>
            <!-- ********** END:: NOTIFICATION BODY ********** -->

            <!-- ********** START:: NOTIFICATION DELETE BUTTON ********** -->
            <div class="delete_btn_wrapper">
              <button
                class="delete_notification_btn"
                @click.stop="
                  deleteNotification({
                    id: item.id,
                    notificationType: 'readied_notification',
                  })
                "
              >
                <i class="fal fa-trash-alt"></i>
              </button>
            </div>
            <!-- ********** END:: NOTIFICATION DELETE BUTTON ********** -->
          </div>
        </div>
        <!-- END:: SINGLE NOTIFICATION ROW -->
      </div>
      <!-- END:: PAGE CONTENT -->

      <!-- START:: DELETE DIALOG -->
      <v-dialog v-model="dialogDelete">
        <v-card>
          <v-card-title class="text-h5 justify-center">{{
            $t("TITLES.DeleteConfirmingMessage")
          }}</v-card-title>
          <v-card-actions>
            <v-btn class="modal_confirm_btn" @click="deleteAllNotifications">{{
              $t("BUTTONS.yes")
            }}</v-btn>

            <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{
              $t("BUTTONS.cancel")
            }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- END:: DELETE DIALOG -->
    </div>
  </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
  name: "AllNotifications",

  computed: {
    // START:: VUEX GET NOTIFICATIONS DATA
    ...mapGetters("NotificationsModule", ["allReadiedNotificationsData"]),
    // END:: VUEX GET NOTIFICATIONS DATA
  },

  data() {
    return {
      // START:: DIALOGS STATUS
      dialogDelete: false,
      // END:: DIALOGS STATUS
    };
  },

  methods: {
    // START:: VUEX NOTIFICATIONS ACTIONS
    ...mapActions("NotificationsModule", [
      "readAllNotifications",
      "deleteNotification",
      "deleteAllNotifications",
      "readSingleNotification",
    ]),
    // END:: VUEX NOTIFICATIONS ACTIONS

    // START:: DELETE ALL NOTIFICATIONS
    openDeleteDialog() {
      this.dialogDelete = true;
    },
    // END:: ALL NOTIFICATIONS

    // START:: REDIRECT NOTIFICATION
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
    // END:: REDIRECT NOTIFICATION
  },

  created() {
    // START:: FIRE METHODS
    this.readAllNotifications();
    // END:: FIRE METHODS
  },
};
</script>
