<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addRole") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #e1423d">
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
              required
            />
            <!-- End:: Name Input -->
          </div>

          <!-- Start:: Permissions -->
          <div class="col-12">
            <div
              class="row"
              v-if="groupedPermissions && groupedPermissions.length"
            >
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
                v-for="group in groupedPermissions"
                :key="group.subject"
                class="col-md-6"
              >
                <div class="permission_card_wrapper">
                  <p class="card_title">{{ group.subject }}</p>
                  <div class="card_body">
                    <div class="input_wrapper switch_wrapper my-5">
                      <v-switch
                        color="green"
                        :label="$t('PLACEHOLDERS.choose_all')"
                        :model-value="isAllSelected(group)"
                        @update:model-value="toggleAllPermission(group)"
                        :input-value="isAllSelected(group)"
                        @change="toggleAllPermission(group)"
                        hide-details
                      ></v-switch>
                    </div>
                    <div class="row">
                      <div
                        v-for="item in group.permissions"
                        :key="item.name"
                        class="col-6"
                      >
                        <div class="input_wrapper switch_wrapper my-5">
                          <v-switch
                            color="green"
                            :label="item.label"
                            :value="item.name"
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
          <!-- <div class="input_wrapper switch_wrapper my-5">
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
  name: "CreateRole",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        name_ar: null,
        name_en: null,
        // active: true,
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
    groupedPermissions() {
      if (!this.allSystemPermissions) return [];
      const subjectToPermissions = {};
      this.allSystemPermissions.forEach((perm) => {
        if (!perm || !perm.subject) return;
        if (!subjectToPermissions[perm.subject]) {
          subjectToPermissions[perm.subject] = [];
        }
        subjectToPermissions[perm.subject].push({
          name: perm.name,
          label: perm.label,
        });
      });
      return Object.keys(subjectToPermissions).map((subject) => ({
        subject,
        permissions: subjectToPermissions[subject],
      }));
    },
  },

  methods: {
    isAllSelected(group) {
      if (!group || !group.permissions || group.permissions.length === 0)
        return false;
      return group.permissions.every((item) =>
        this.data.permissions.includes(item.name)
      );
    },
    toggleAllPermission(group) {
      const allSelected = this.isAllSelected(group);
      group.permissions.forEach((item) => {
        const index = this.data.permissions.indexOf(item.name);
        if (!allSelected && index === -1) {
          this.data.permissions.push(item.name);
        } else if (allSelected && index !== -1) {
          this.data.permissions.splice(index, 1);
        }
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
    // Start:: Vuex Actions
    ...mapActions({
      getAllSystemPermissions: "PermissionsModule/getAllSystemPermissions",
    }),
    // End:: Vuex Actions

    // Function to check all switches when the button is clicked
    checkAllSwitches() {
      // Check if any switch in the group is unchecked
      const allChecked =
        this.groupedPermissions.length > 0 &&
        this.groupedPermissions.every((group) =>
          group.permissions.every((item) =>
            this.data.permissions.includes(item.name)
          )
        );

      // If all are checked, uncheck them; otherwise, check them
      this.groupedPermissions.forEach((group) => {
        group.permissions.forEach((item) => {
          const index = this.data.permissions.indexOf(item.name);
          if (allChecked && index !== -1) {
            this.data.permissions.splice(index, 1);
          } else if (!allChecked && index === -1) {
            this.data.permissions.push(item.name);
          }
        });
      });
    },

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
      // REQUEST_DATA.append("is_active", +this.data.active);
      this.data.permissions.forEach((element) => {
        REQUEST_DATA.append("permissions[]", element); // element is the permission name
      });
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `roles`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/roles/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data?.message);
      }
    },
    // End:: Submit Form
  },

  async created() {
    // Start:: Fire Methods
    await this.getAllSystemPermissions();
    // End:: Fire Methods
  },
};
</script>
