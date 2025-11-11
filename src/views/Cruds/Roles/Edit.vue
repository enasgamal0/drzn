<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editRole") }}</h4>
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
          <div class="col-md-6 col-12">
            <!-- Start:: Name Input -->
            <base-input
              cols="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.nameAr')"
              v-model.trim="data.name_ar"
              required
            />
            <!-- End:: Name Input -->
          </div>

          <div class="col-md-6 col-12">
            <!-- Start:: Name Input -->
            <base-input
              cols="6"
              type="text"
              :placeholder="$t('PLACEHOLDERS.nameEn')"
              v-model.trim="data.name_en"
            />
            <!-- End:: Name Input -->
          </div>

          <!-- Start:: Permissions -->
          <div class="col-12">
            <div class="row" v-if="allSystemPermissions">
              <div class="btn_wrapper">
                <button
                  class="primary_btn"
                  type="button"
                  @click="checkAllSwitches"
                >
                  {{ $t("PLACEHOLDERS.choose_all") }}
                </button>
              </div>
              <div
                v-for="permission in allSystemPermissions"
                :key="permission.name"
                class="col-md-6"
              >
                <div class="permission_card_wrapper">
                  <p class="card_title">{{ permission.name }}</p>
                  <div class="card_body">
                    <div class="input_wrapper switch_wrapper my-5">
                      <v-switch
                        color="green"
                        :label="$t('PLACEHOLDERS.choose_all')"
                        :value="permission.name"
                        :input-value="isAllSelected(permission)"
                        @change="toggleAllPermission(permission)"
                        hide-details
                      ></v-switch>
                    </div>
                    <div class="row">
                      <div
                        v-for="(item, index) in permission.controls"
                        :key="item.id"
                        class="col-6"
                        v-if="!(index === 0 && item.name === permission.name)"
                      >
                        <div class="input_wrapper switch_wrapper my-5">
                          <v-switch
                            color="green"
                            :label="item.name"
                            :value="item.id"
                            v-model="data.permissions"
                            hide-details
                          ></v-switch>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End:: Permissions -->

          <!-- Start:: Deactivate Switch Input -->
          <!--<div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="
                data.active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.active"
              hide-details
            ></v-switch>
          </div> -->
          <!-- End:: Deactivate Switch Input -->

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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditRole",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: System Permissions
      systemPermissions: null,
      // End:: System Permissions

      // Start:: Data Collection To Send
      data: {
        name_ar: null,
        name_en: null,
        // active: null,
        permissions: [],
      },
      EnRegex: /[\u0600-\u06FF]/,
      // End:: Data Collection To Send
    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allSystemPermissions: "PermissionsModule/allSystemPermissions",
    }),
    // End:: Vuex Getters
  },

  methods: {
    isAllSelected(permission) {
      return Object.values(permission.controls).every((item) => {
        return this.data.permissions.includes(item.id);
      });
    },
    toggleAllPermission(permission) {
      const allSelected = this.isAllSelected(permission);

      permission.controls.forEach((item) => {
        const index = this.data.permissions.indexOf(item.id);
        if (!allSelected && index === -1) {
          this.data.permissions.push(item.id);
        } else if (allSelected && index !== -1) {
          this.data.permissions.splice(index, 1);
        }
      });
    },
    // Start:: Vuex Actions
    ...mapActions({
      getAllSystemPermissions: "PermissionsModule/getAllSystemPermissions",
    }),
    // End:: Vuex Actions
    // Function to check all switches when the button is clicked
    checkAllSwitches() {
      // Check if any switch in the group is unchecked
      const allChecked = this.allSystemPermissions.every((permission) => {
        return Object.values(permission.controls).every((item) => {
          return this.data.permissions.includes(item.id);
        });
      });

      // If all are checked, uncheck them; otherwise, check them
      this.allSystemPermissions.forEach((permission) => {
        Object.values(permission.controls).forEach((item) => {
          // Fix here: use Object.values()
          const index = this.data.permissions.indexOf(item.id);
          if (allChecked) {
            if (index !== -1) {
              this.data.permissions.splice(index, 1);
            }
          } else {
            if (index === -1) {
              this.data.permissions.push(item.id);
            }
          }
        });
      });
    },
    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },

    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.name_ar = this.data.name_ar.replace(/[^\u0600-\u06FF\s]/g, "");
    },

    removeArabicCharacters() {
      this.data.name_en = this.data.name_en.replace(this.EnRegex, "");
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `roles/${this.id}`,
        });
        // console.log( "DATA TO EDIT =>", res.data.body );

        // Start:: Set Data
        this.data.name_ar = res.data.data.role.name_ar;
        this.data.name_en = res.data.data.role.name_en;
        // this.data.active = res.data.data.is_active;
        res.data.data.role.permissions.forEach((element) => {
          element.controls.forEach((item) => {
            this.data.permissions.push(item.id);
          });
        });
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.name_ar) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.name_en) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (this.data.permissions.length === 0) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.permissions"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("name[ar]", this.data.name_ar);
      REQUEST_DATA.append("name[en]", this.data.name_en);
      this.data.permissions.forEach((element) => {
        REQUEST_DATA.append("role_permissions[]", element);
      });
      // REQUEST_DATA.append("is_active", +this.data.active);

      REQUEST_DATA.append("_method", "PUT");

      try {
        await this.$axios({
          method: "POST",
          url: `roles/${this.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/roles/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  async created() {
    // Start:: Fire Methods
    if (this.id == 1) {
      this.$router.back();
    }
    this.getDataToEdit();
    this.getAllSystemPermissions();
    // End:: Fire Methods
  },
};
</script>