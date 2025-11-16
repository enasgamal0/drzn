<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div
        class="filter_content_wrapper"
        :class="{ active: filterFormIsActive }"
      >
        <button
          class="filter_toggler"
          @click="filterFormIsActive = !filterFormIsActive"
        >
          <i class="fal fa-times"></i>
        </button>
        <div class="filter_title_wrapper">
          <h5>{{ $t("TITLES.searchBy") }}</h5>
        </div>
        <div class="filter_form_wrapper">
          <form @submit.prevent="submitFilterForm">
            <div class="row justify-content-center align-items-center w-100">
              <!-- Start:: Name Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('TABLES.Roles.role')"
                v-model.trim="filterOptions.name"
              />
              <!-- End:: Name Input -->

              <!-- Start:: Status Input -->
              <base-select-input
                col="6"
                :optionsList="activeStatuses"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.status"
              />
              <!-- End:: Status Input -->
            </div>

            <div class="btns_wrapper">
              <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.rseet_search") }}</span>
                </template>
                <span
                  class="reset_btn"
                  :disabled="isWaitingRequest"
                  @click="resetFilter"
                >
                  <i class="fal fa-redo"></i>
                </span>
              </a-tooltip>
              <!-- <button class="reset_btn" type="button" :disabled="isWaitingRequest" @click="resetFilter">
                <i class="fal fa-redo"></i>
              </button> -->
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->
      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("TITLES.roles") }}</h5>
          <button
            v-if="!filterFormIsActive"
            class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive"
          >
            <i class="fal fa-search"></i>
          </button>
        </div>
        <div class="title_route_wrapper" v-if="$can('create-role', 'الأدوار والصلاحيات') || $can('create-role', 'Roles & Permissions')">
          <router-link to="/roles/create">
            {{ $t("BUTTONS.addRole") }}
          </router-link>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table
        class="thumb"
        :loading="loading"
        :loading-text="$t('TABLES.loadingData')"
        :search="searchValue"
        :headers="tableHeaders"
        :items="tableRows"
        item-class="ltr"
        :items-per-page="paginations.items_per_page"
        hide-default-footer
        :expanded.sync="expanded"
      >
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <template v-slot:[`item.id`]="{ item, index }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.id">
              {{ $t("TABLES.noData") }}
            </h6>
            <p v-else>
              {{
                (paginations.current_page - 1) * paginations.items_per_page +
                index +
                1
              }}
            </p>
          </div>
        </template>

        <!-- Start:: Expanded Row -->
        <template v-slot:[`item.extend_icon`]="{ item }">
          <div class="actions">
            <button class="btn_expand" @click="expandItem(item)">
              <i class="fad fa-angle-down"></i>
            </button>
          </div>
        </template>
        <template v-slot:expanded-item="{ item }">
          <td colspan="4" class="fadeIn">
            <div
              class="cards_wrapper p-4"
              v-if="item.permissions?.length > 0"
            >
              <div
                v-for="group in groupPermissionsBySubject(item.permissions)"
                :key="group.subject"
                class="content_wrapper"
              >
                <p class="group_title">{{ group.subject }}</p>

                <div class="wrapper">
                  <div
                    class="item_data_card"
                    v-for="permission in group.permissions"
                    :key="permission.name"
                  >
                    <div class="card_title">
                      <h5>
                        {{ permission.label }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-center text-danger fs-6" v-else>
              {{ $t("TABLES.noData") }}
            </p>
          </td>
        </template>
        <!-- End:: Expanded Row -->

        <!-- Start:: Activation Status -->
        <template v-slot:[`item.is_active`]="{ item }">
          <span class="text-success text-h5" v-if="item.is_active">
            <i class="far fa-check"></i>
          </span>
          <span class="text-danger text-h5" v-else>
            <i class="far fa-times"></i>
          </span>
        </template>
        <!-- End:: Activation Status -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <span class="blue-grey--text text--darken-1" v-if="item.id === '00000000-0000-0000-0000-000000000001'">
              <!-- <i class="far fa-horizontal-rule"></i> -->
            </span>

            <a-tooltip
              placement="bottom"
              v-if="item.id !== '00000000-0000-0000-0000-000000000001' && $can('update-role', 'الأدوار والصلاحيات') || $can('update-role', 'Roles & Permissions')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>
              <button class="btn_edit" @click="editItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip>

            <a-tooltip
              placement="bottom"
              v-if="item.id !== '00000000-0000-0000-0000-000000000001' && $can('delete-role', 'الأدوار والصلاحيات') || $can('delete-role', 'Roles & Permissions')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>
            <template v-if="($can('update-role', 'الأدوار والصلاحيات') || $can('update-role', 'Roles & Permissions')) && item.id !== '00000000-0000-0000-0000-000000000001'">
              <a-tooltip placement="bottom" v-if="!item.is_active">
                <template slot="title">
                  <span>{{ $t("BUTTONS.activate") }}</span>
                </template>
                <button
                  class="btn_activate"
                  @click="HandlingItemActivationStatus(item)"
                >
                  <i class="fad fa-check-circle"></i>
                </button>
              </a-tooltip>
              <a-tooltip placement="bottom" v-if="item.is_active">
                <template slot="title">
                  <span>{{ $t("BUTTONS.deactivate") }}</span>
                </template>
                <button
                  class="btn_deactivate"
                  @click="selectDeactivateItem(item)"
                >
                  <i class="fad fa-times-circle"></i>
                </button>
              </a-tooltip>
            </template>

            <template v-else>
              <i
                class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"
              ></i>
            </template>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Deactivate Modal -->
          <v-dialog v-model="dialogDeactivate">
            <v-card>
              <v-card-title
                class="text-h5 justify-center"
                v-if="
                  itemToChangeActivationStatus &&
                  !itemToChangeActivationStatus?.hasAdmin
                "
              >
                {{
                  $t("TITLES.DeactivateConfirmingMessageRole", {
                    name: itemToChangeActivationStatus.name,
                  })
                }}
              </v-card-title>
              <v-card-title
                class="text-h5 justify-center"
                v-if="
                  itemToChangeActivationStatus &&
                  itemToChangeActivationStatus?.hasAdmin
                "
              >
                {{
                  $t("TITLES.DeactivateConfirmingMessageRoleWithAdmin", {
                    name: itemToChangeActivationStatus.name,
                  })
                }}
              </v-card-title>

              <form class="w-100">
                <!-- <base-input
                  col="12"
                  rows="3"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.deactivateReason')"
                  v-model.trim="deactivateReason"
                  required
                /> -->
              </form>

              <v-card-actions>
                <v-btn
                  class="modal_confirm_btn"
                  @click="HandlingItemActivationStatus"
                >
                  {{ $t("BUTTONS.ok") }}
                </v-btn>

                <v-btn
                  class="modal_cancel_btn"
                  @click="dialogDeactivate = false"
                  >{{ $t("BUTTONS.cancel") }}</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Deactivate Modal -->

          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{
                  $t("TITLES.DeleteConfirmingMessage", {
                    name: itemToDelete.name,
                  })
                }}
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmDeleteItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{
                  $t("BUTTONS.cancel")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Delete Modal -->
        </template>
        <!-- ======================== End:: Dialogs ======================== -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->

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
            getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
          "
          :next-icon="
            getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
          "
        />
      </div>
    </template>
    <!-- End:: Pagination -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AllRoles",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

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

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        status: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Roles.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Roles.role"),
          value: "name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Roles.permissions"),
          value: "extend_icon",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Admins.joiningDate"),
          value: "updated_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.ContactMessages.status"),
          value: "is_active",
          align: "center",
          sortable: false,
        },

        {
          text: this.$t("TABLES.Roles.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      expanded: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogDelete: false,
      itemToDelete: null,
      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,
      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      name: "",
    };
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.setTableRows();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== "1") {
        await this.$router.push({ path: "/roles/all", query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.status = null;
      if (this.$route.query.page !== "1") {
        await this.$router.push({ path: "/roles/all", query: { page: 1 } });
      }
      this.setTableRows();
    },
    // End:: Handel Filter

    // Start:: Set Table Rows
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
    async setTableRows() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "roles?include=permissions",
          params: {
            page: this.paginations.current_page,
            "search": this.filterOptions.name,
            "filter[is_active]": this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // Start:: Change Activation Status
    selectDeactivateItem(item) {
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },
    // Group flat permissions by subject for display in expanded row
    groupPermissionsBySubject(permissions) {
      const subjectToPermissions = {};
      if (Array.isArray(permissions)) {
        permissions.forEach((permission) => {
          const subject = permission?.subject || this.$t("TABLES.noData");
          if (!subjectToPermissions[subject]) {
            subjectToPermissions[subject] = [];
          }
          subjectToPermissions[subject].push(permission);
        });
      }
      return Object.keys(subjectToPermissions).map((subject) => ({
        subject,
        permissions: subjectToPermissions[subject],
      }));
    },
    async HandlingItemActivationStatus(selectedItem) {
      this.dialogDeactivate = false;
      let targetItem = this.itemToChangeActivationStatus
        ? this.itemToChangeActivationStatus
        : selectedItem;
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("reason", this.deactivateReason);
      // Start:: Append Request Data
      // REQUEST_DATA.append("_method", "PUT");

      try {
        await this.$axios({
          method: "PUT",
          url: `roles/toggle/${targetItem.id}`,
          data: REQUEST_DATA,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
        let filteredElemet = this.tableRows.find(
          (element) => element.id === targetItem.id
        );
        filteredElemet.is_active = !filteredElemet.is_active;

        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Activation Status

    // Start:: Control Expended Row
    expandItem(item) {
      const indexExpanded = this.expanded.findIndex((i) => i === item);
      if (indexExpanded > -1) {
        this.expanded.splice(indexExpanded, 1);
      } else {
        this.expanded = [];
        this.expanded.push(item);
      }
    },
    // End:: Control Expended Row

    // ==================== Start:: Crud ====================
    // ===== Start:: Edit
    editItem(item) {
      this.$router.push({ path: `/roles/edit/${item.id}` });
    },
    // ===== End:: Edit

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `roles/${this.itemToDelete.id}`,
        });
        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => {
          return item.id != this.itemToDelete.id;
        });
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Delete
    // ==================== End:: Crud ====================
  },

  created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    // End:: Fire Methods
  },
};
</script>
