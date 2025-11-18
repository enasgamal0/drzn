<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.ContactMessages.show") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #ec1c24">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Conversation Data -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="">
        <div class="row">
          <!-- Start:: Client Name -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.ContactMessages.clientName')"
            v-model.trim="data.client_name"
            disabled
          />
          <!-- End:: Client Name -->

          <!-- Start:: Phone Number -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.phoneNumber')"
            v-model.trim="data.phone"
            disabled
          />
          <!-- End:: Phone Number -->

          <!-- Start:: Last Message Date -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.data_last_message')"
            v-model.trim="data.last_message_date"
            disabled
          />
          <!-- End:: Last Message Date -->

          <!-- Start:: Last Message Content -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.last_message')"
            v-model.trim="data.last_message_content"
            disabled
          />
          <!-- End:: Last Message Content -->

          <!-- Start:: Messages History -->
          <div class="col-12 mb-4">
            <h6 class="mb-3">{{ $t("PLACEHOLDERS.messageHistory") || "Message History" }}</h6>
            <div class="messages-history" style="max-height: 400px; overflow-y: auto; border: 1px solid #e0e0e0; padding: 15px; border-radius: 8px;">
              <div
                v-for="(message, index) in data.messages"
                :key="message.id || index"
                class="message-item mb-3"
                style="padding: 10px; background: #f5f5f5; border-radius: 5px;"
              >
                <div class="d-flex justify-content-between mb-2">
                  <small class="text-muted">
                    {{ formatDate(message.created_at) }}
                  </small>
                  <small class="text-muted">
                    <span v-if="message.is_from_admin">{{ $t("PLACEHOLDERS.admin") || "Admin" }}</span>
                    <span v-else-if="message.is_from_guest">{{ $t("PLACEHOLDERS.guest") || "Guest" }}</span>
                    <span v-else>{{ $t("PLACEHOLDERS.user") || "User" }}</span>
                  </small>
                </div>
                <p class="mb-0" v-if="message.body">{{ message.body }}</p>
                <p class="mb-0 text-muted" v-else>{{ $t("PLACEHOLDERS.file") || "File" }}</p>
              </div>
              <div v-if="!data.messages || data.messages.length === 0" class="text-center text-muted">
                {{ $t("TABLES.noData") }}
              </div>
            </div>
          </div>
          <!-- End:: Messages History -->

          <!-- Start:: Send Reply -->
          <base-input
            col="12"
            type="textarea"
            rows="4"
            :placeholder="$t('PLACEHOLDERS.send_reply')"
            v-model.trim="data.send_reply"
          />
          <base-button
            styleType="primary_btn"
            class="mt-2"
            @fireClick="sendReplay"
            :btnText="$t('BUTTONS.send_reply')"
            :isLoading="isWaitingRequest"
          />
          <!-- End:: Send Reply -->
        </div>
      </form>
    </div>
    <!-- END:: Conversation Data -->
  </div>
</template>

<script>
import BaseInput from "../../../components/formInputs/BaseInput.vue";
import BaseTextEditor from "../../../components/formInputs/BaseTextEditor.vue";
import BaseButton from "../../../components/ui/BaseButton.vue";
export default {
  components: { BaseTextEditor, BaseButton },
  name: "showCity",

  data() {
    BaseInput;
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        client_name: null,
        phone: null,
        last_message_date: null,
        last_message_content: null,
        messages: [],
        send_reply: null,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {},

  methods: {
    formatDate(date) {
      if (!date) return "--";
      return new Date(date).toLocaleString();
    },

    // start show data
    async showMessage() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `conversations/admin/${this.$route.params.id}`,
        });

        const conversation = res.data.data;

        // Set client name
        if (conversation.user) {
          this.data.client_name = conversation.user.name;
          this.data.phone = conversation.user.phone;
        } else if (conversation.is_anonymous) {
          this.data.client_name = this.$t("PLACEHOLDERS.guest") || "Guest";
          this.data.phone = "-";
        } else {
          this.data.client_name = this.$t("PLACEHOLDERS.guest") || "Guest";
          this.data.phone = "-";
        }

        // Set last message data
        if (conversation.messages && conversation.messages.length > 0) {
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          this.data.last_message_date = this.formatDate(lastMessage.created_at);
          this.data.last_message_content = lastMessage.body || this.$t("PLACEHOLDERS.file") || "File";
        } else {
          this.data.last_message_date = "--";
          this.data.last_message_content = "--";
        }

        // Set messages history (reverse to show newest first or keep original order)
        this.data.messages = conversation.messages || [];
      } catch (error) {
        console.error("Error fetching conversation:", error);
        if (error.response && error.response.data) {
          this.$message.error(error.response.data.message || this.$t("MESSAGES.errorOccurred"));
        }
      }
    },
    // end show data

    async sendReplay() {
      if (!this.data.send_reply || this.data.send_reply.trim().length < 3) {
        this.$message.warning(this.$t("MESSAGES.pleaseEnterValidReply") || "Please enter a valid reply");
        return;
      }

      const REQUEST_DATA = {
        body: this.data.send_reply.trim(),
      };

      try {
        this.isWaitingRequest = true;
        await this.$axios({
          method: "POST",
          url: `conversations/admin/${this.$route.params.id}/messages`,
          data: REQUEST_DATA,
        });
        
        this.data.send_reply = "";
        this.isWaitingRequest = false;
        await this.showMessage(); // Refresh data
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
      } catch (error) {
        this.isWaitingRequest = false;
        if (error.response && error.response.data) {
          this.$message.error(error.response.data.message || this.$t("MESSAGES.errorOccurred"));
        } else {
          this.$message.error(this.$t("MESSAGES.errorOccurred") || "An error occurred");
        }
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.showMessage();
    // End:: Fire Methods
  },
};
</script>
