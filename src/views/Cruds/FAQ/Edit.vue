<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.questions.edit") }}</h4>
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
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('SIDENAV.questions.bodyAr')"
            v-model.trim="data.nameAr"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('SIDENAV.questions.bodyEn')"
            v-model.trim="data.nameEn"
            required
          />

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('SIDENAV.questions.answerAr')"
            v-model.trim="data.answerAr"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('SIDENAV.questions.answerEn')"
            v-model.trim="data.answerEn"
            required
          />

          <!-- Start:: Status Input -->
          <!-- <base-select-input
            col="6"
            :optionsList="activeStatuses"
            :placeholder="$t('PLACEHOLDERS.status')"
            v-model="data.is_active"
            required
          /> -->
          <!-- End:: Status Input -->
          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button
              class="mt-2"
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
export default {
  name: "CreateAdditionalFields",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        nameAr: null,
        nameEn: null,
        answerEn: null,
        answerAr: null,
        is_active: null,
      },
      // End:: Data Collection To Send

      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  computed: {
    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        },
      ];
    },
  },

  methods: {
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },
    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.nameAr = this.data.nameAr.replace(/[^\u0600-\u06FF\s]/g, "");
      this.data.answerAr = this.data.answerAr.replace(
        /[^\u0600-\u06FF\s]/g,
        ""
      );
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
      this.data.answerEn = this.data.answerEn.replace(this.EnRegex, "");
    },

    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `faqs/${this.$route.params.id}`,
        });

        // const data = res.data.data.GoldenOffer;
        this.data.nameAr = res.data.data.Faq.question_ar;
        this.data.nameEn = res.data.data.Faq.question_en;
        this.data.answerAr = res.data.data.Faq.answer_ar;
        this.data.answerEn = res.data.data.Faq.answer_en;
        this.data.is_active = res.data.data.Faq.is_active;
        if (!this.data.is_active) {
          this.data.is_active = {
            id: 0,
            name: this.$t("STATUS.notActive"),
            value: 0,
          };
        } else {
          this.data.is_active = {
            id: 1,
            name: this.$t("STATUS.active"),
            value: 1,
          };
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      this.submitForm();
      return;
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("question[ar]", this.data.nameAr);
      REQUEST_DATA.append("question[en]", this.data.nameEn);
      REQUEST_DATA.append("answer[ar]", this.data.answerAr);
      REQUEST_DATA.append("answer[en]", this.data.answerEn);
      REQUEST_DATA.append("is_active", this.data.is_active?.value);
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `faqs/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/questions/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>

<style lang="scss" scoped>
.all_action {
  display: flex;
  gap: 15px;
}

.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .fa-trash {
    color: #ff2159;
    cursor: pointer;
  }
}
</style>
