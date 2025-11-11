<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.ContactMessages.show") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Message Data -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="">
        <div class="row">
          <!-- Start:: Sender name  -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.sender_name')"
            v-model.trim="data.sender_name"
            disabled
          />
          <!-- End:: Sender name -->

          <!-- Start:: Phone Number -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.sender_phone')"
            v-model.trim="data.sender_phone"
            disabled
          />
          <!-- End:: Phone Number -->

          <!-- Start:: Email -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.sender_email')"
            v-model.trim="data.sender_email"
            disabled
          />
          <!-- End:: Email -->

          <!-- Start:: Type of Message -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.message_type')"
            v-model.trim="data.message_type"
            disabled
          />
          <!-- End:: Type of Message -->

          <!-- Start:: Date of Message -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.message_date')"
            v-model.trim="data.message_date"
            disabled
          />
          <!-- End:: Date of Message -->

          <!-- Start:: Content -->
          <base-input
            col="6"
            cols="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.message_content')"
            v-model.trim="data.message_content"
            disabled
          />
          <!-- End:: Content -->

          <!-- Start:: reply -->
          <base-input
            v-if="hasReply"
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.reply')"
            v-model.trim="data.reply"
            disabled
          />
          <!-- End:: reply -->

          <!-- Start:: Send Message -->
          <base-input
            v-if="!hasReply"
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.send_reply')"
            v-model.trim="data.send_reply"
          />
          <base-button
            v-if="!hasReply"
            styleType="primary_btn"
            class="mt-0"
            @fireClick="sendReplay"
            :btnText="$t('BUTTONS.send_reply')"
            :isLoading="isWaitingRequest"
          />
          <!-- End:: Send Message -->
        </div>
      </form>
    </div>
    <!-- END:: Message Data -->
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

      hasReply: true,

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        sender_name: null,
        sender_phone: null,
        sender_email: null,
        message_type: null,
        message_date: null,
        message_content: null,
        send_reply: null,
      },
      regions: [],
      // End:: Data Collection To Send
    };
  },

  computed: {},

  methods: {
    // start show data
    async showMessage() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `contacts/${this.$route.params.id}`,
        });
        this.data.sender_name = res.data.data.Contact.name;
        this.data.sender_phone = res.data.data.Contact.mobile;
        this.data.sender_email = res.data.data.Contact.email;
        this.data.message_type = res.data.data.Contact.type;
        this.data.message_date = res.data.data.Contact.created_at;
        this.data.message_content = res.data.data.Contact.body;
        this.data.reply = res.data.data.Contact.reply;
        if (res.data.data.Contact.reply) {
          this.hasReply = true;
        } else {
          this.hasReply = false;
        }
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data
    async sendReplay() {
      const REQUEST_DATA = {
        reply: this.data.send_reply,
      };
      console.log("done");

      try {
        this.isWaitingRequest = true;
        await this.$axios({
          method: "POST",
          url: `contacts/reply/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.showMessage();
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
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
