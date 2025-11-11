<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.sub_categories_questions_edit") }}</h4>
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
          
          <!-- Start:: Main Section Select -->
          <!-- <base-select-input
            col="6"
            :optionsList="allMainCategories"
            :placeholder="$t('PLACEHOLDERS.mainSection')"
            v-model="main_section"
            @input="onMainCategoryChange"
            required
          /> -->
          <!-- End:: Main Section Select -->

          <!-- Start:: Sub Section Select -->
          <!-- <base-select-input
            col="6"
            :optionsList="allSubCategories"
            :placeholder="$t('PLACEHOLDERS.sub_section')"
            v-model="sub_section"
            :disabled="!main_section"
            required
          /> -->
          <!-- End:: Sub Section Select -->

          <!-- Start:: Question Text Input -->
          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.questionText')"
            v-model.trim="data.question"
            required
          />
          <!-- End:: Question Text Input -->

          <!-- Start:: Question Type Select -->
          <base-select-input
            col="6"
            :optionsList="questionTypes"
            :placeholder="$t('PLACEHOLDERS.questionType')"
            v-model="data.type"
            required
          />
          <!-- End:: Question Type Select -->

          <!-- Start:: Active Switch Input -->
          <!-- <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="
                data?.is_active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.is_active"
              hide-details
            ></v-switch>
          </div> -->
          <!-- End:: Active Switch Input -->

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

    <!-- Start:: Loading Spinner -->
    <!-- <div v-else class="text-center py-5">
      <v-progress-circular
        indeterminate
        color="#E1423D"
        size="64"
      ></v-progress-circular>
    </div> -->
    <!-- End:: Loading Spinner -->
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "EditQuestion",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      loading: false,
      // End:: Loader Control Data

      // Start:: Question ID
      questionId: null,
      // End:: Question ID

      // Start:: Data Collection To Send
      data: {
        question: null,
        type: null,
        is_active: true,
        options: ['', ''], // Default two empty options for multiple choice
      },
      main_section: null,
      sub_section: null,
      allMainCategories: [],
      allSubCategories: [],
      // End:: Data Collection To Send

      // Start:: Question Types
      questionTypes: [
        {
          id: 'written_question',
          name: this.$t('PLACEHOLDERS.writtenQuestion') || 'سؤال مقالي (نصي)',
        },
        {
          id: 'mcq',
          name: this.$t('PLACEHOLDERS.multipleChoice') || 'اختيار من متعدد',
        },
      ],
      // End:: Question Types
    };
  },

  methods: {
    // Start:: Handle Main Category Change
    async onMainCategoryChange() {
      this.sub_section = null;
      this.allSubCategories = [];
      if (this.main_section) {
        await this.getSubCategories(this.main_section.id);
      }
    },
    // End:: Handle Main Category Change

    // Start:: Add Option
    addOption() {
      this.data?.options.push('');
    },
    // End:: Add Option

    // Start:: Remove Option
    removeOption(index) {
      if (this.data?.options.length > 2) {
        this.data?.options.splice(index, 1);
      }
    },
    // End:: Remove Option

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      // if (!this.main_section) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.main_section"));
      //   return;
      // } else if (!this.sub_section) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.sub_section"));
      //   return;
      // }
      if (!this.data.question) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.question"));
        return;
      } else if (!this.data.type) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.questionType"));
        return;
      }
      
      this.submitForm();
      return;
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();

      // Start:: Append Request Data
      REQUEST_DATA.append("_method", "PUT");
      
      // if (this.sub_section?.id) {
      //   REQUEST_DATA.append("sub_category_id", this.sub_section?.id);
      // }
      if (this.data?.type?.id) {
        REQUEST_DATA.append("type", this.data?.type?.id);
      }
      if (this.data?.question) {
        REQUEST_DATA.append("question", this.data?.question);
      }
      REQUEST_DATA.append("is_active", this.data?.is_active ? 1 : 0);
      // End:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `sub-categorys-questions/${this.questionId}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: `/sub-categories-questions/all/${this.sub_section?.id}` });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: Get Question Details
    async getQuestionDetails() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `sub-categorys-questions/${this.questionId}`,
        });
        
        const questionData = res.data.data?.SubCategoryQuestion;
        
        // Set question data
        this.data.question = questionData.question;
        this.data.is_active = questionData.is_active;
        
        // Set question type
        const typeId = questionData.type;
        this.data.type = this.questionTypes.find(t => t.id === typeId);
        
        // Set sub category
        const subCategory = questionData.sub_category_id;
        this.sub_section = {
          id: subCategory.id,
          name: subCategory.name
        };
        
        // Get main category ID from sub category and load categories
        await this.getMainCategories();
        
        // Find and set main category based on sub category
        // Note: You might need to adjust this based on your API structure
        // If your sub_category_id object includes category_id, use it
        if (subCategory.category_id) {
          this.main_section = this.allMainCategories.find(
            cat => cat.id === subCategory.category_id
          );
          await this.getSubCategories(subCategory.category_id);
        }
        
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$message.error(error.response?.data?.message || this.$t("MESSAGES.errorLoadingData"));
        console.log(error.response?.data?.message);
      }
    },
    // End:: Get Question Details

    // Start:: Get Main Categories
    async getMainCategories() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `categories?page=0&limit=0&is_active=1`,
        });
        this.allMainCategories = res.data.data?.data;
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },
    // End:: Get Main Categories

    // Start:: Get Sub Categories
    async getSubCategories(categoryId) {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `sub-categories?page=0&limit=0&is_active=1&category_id=${categoryId}`,
        });
        this.allSubCategories = res.data.data?.data;
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },
    // End:: Get Sub Categories
  },

  async created() {
    // Get question ID from route params
    this.questionId = this.$route.params.id;
    
    if (!this.questionId) {
      this.$message.error(this.$t("MESSAGES.invalidQuestionId"));
      this.$router.push({ path: `/sub-categories-questions/all/${this.sub_section?.id}` });
      return;
    }
    
    await this.getQuestionDetails();
  },
};
</script>

<style scoped>
.options_wrapper {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.option_item {
  align-items: center;
}

.form-label {
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
}
</style>