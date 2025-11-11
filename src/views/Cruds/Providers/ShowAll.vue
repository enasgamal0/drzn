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
              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.name')"
                v-model.trim="filterOptions.name"
              />

              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.phone')"
                v-model.trim="filterOptions.mobile"
              />

              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.email')"
                v-model.trim="filterOptions.email"
              />

              <base-select-input
                :optionsList="activeStatuses"
                col="3"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.status"
              />
            </div>

            <div class="btns_wrapper">
              <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button>
              <button
                class="reset_btn"
                type="button"
                :disabled="isWaitingRequest"
                @click="resetFilter"
              >
                <i class="fal fa-redo"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.control_admins") }}</h5>
          <button
            v-if="!filterFormIsActive"
            class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive"
          >
            <i class="fal fa-search"></i>
          </button>
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
        hide-default-footer
      >
        <!-- :items-per-page="paginations.items_per_page" -->
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
        <!-- Start:: Activation Status -->
        <template v-slot:[`item.is_active`]="{ item }">
          <span class="text-success text-h5" v-if="item?.is_active">
            <i class="far fa-check"></i>
          </span>
          <span class="text-danger text-h5" v-else>
            <i class="far fa-times"></i>
          </span>
        </template>
        <!-- End:: Activation Status -->

        <!-- Start:: Verification Status -->
        <template v-slot:[`item.is_verified`]="{ item }">
          <span class="text-success text-h5" v-if="item?.is_verified">
            <i class="far fa-check"></i>
          </span>
          <span class="text-danger text-h5" v-else>
            <i class="far fa-times"></i>
          </span>
        </template>
        <!-- End:: Verification Status -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <!--  v-if="permissions.show" -->
            <a-tooltip placement="bottom" v-if="!item?.is_active">
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
            <a-tooltip placement="bottom" v-if="item?.is_active">
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
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>
            <!-- <a-tooltip
              placement="bottom"
              v-if="$can('admins edit', 'admins') && item?.id !== 1"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>
              <button class="btn_edit" @click="editItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip> -->
            <!-- <a-tooltip
              placement="bottom"
              v-if="$can('users delete', 'users') && item?.id !== 1"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip> -->
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
                v-if="itemToChangeActivationStatus"
              >
                {{
                  $t("TITLES.DeactivateConfirmingMessage", {
                    name: itemToChangeActivationStatus.name,
                  })
                }}
              </v-card-title>

              <form class="w-100">
                <base-input
                  col="12"
                  rows="3"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.deactivateReason')"
                  v-model.trim="deactivateReason"
                  required
                />
              </form>

              <v-card-actions>
                <v-btn
                  class="modal_confirm_btn"
                  @click="HandlingItemActivationStatus"
                  :disabled="
                    !!!deactivateReason || deactivateReason?.length < 3
                  "
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
      <!-- ==== Start:: Overall_statistics Addresses ==== -->
      <div class="table_content">
        <div class="table_title_wrapper">
          <div class="title_text_wrapper">
            <!-- <h5>{{ $t("PLACEHOLDERS.Overall_statistics") }}</h5> -->
          </div>
        </div>
        <!-- <v-simple-table class="stat-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  {{ $t("PLACEHOLDERS.totalTaxValue") }}
                </th>
                <th class="text-center">
                  {{ $t("PLACEHOLDERS.total_platform_profit") }}
                </th>
                <th class="text-center">
                  {{ $t("PLACEHOLDERS.totalOrdars") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template>
                <tr class="text-center all-stat">
                  <td>{{ total_tax }}</td>
                  <td>{{ totalProfitWithTax }}</td>
                  <td>{{ totalInvestedMoney }}</td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table> -->
      </div>
      <!-- ==== End:: Overall_statistics Addresses ==== -->
    </main>
    <!-- End:: Main Section -->

    <!-- Start:: Pagination -->
    <!-- <template>
      <div class="pagination_container text-center mt-3 mb-0">
        <v-pagination class="py-0" square v-model="paginations.current_page" :length="paginations.last_page"
          :total-visible="6" @input="updateRouterQueryParam($event)" :prev-icon="getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
            " :next-icon="getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
              " />
      </div>
    </template> -->
    <!-- End:: Pagination -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AllFinancialReports",
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
      statistic: {
        count: null,
        providerRevenu: null,
        appRevenu: null,
        totalVat: null,
      },

      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        mobile: null,
        status: null,
      },
      allproviders: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.name"),
          value: "name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.phone"),
          value: "mobile",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.email"),
          value: "email",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.joiningDate"),
          value: "created_at",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.is_verified"),
          value: "is_verified",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.status"),
          value: "is_active",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Admins.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      users: [],
      // End:: Table Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data
      // Start:: Dialogs Control Data
      dialogImage: false,
      selectedItemImage: null,
      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,
      dialogDescription: false,
      selectedDescriptionTextToShow: "",
      dialogDelete: false,
      itemToDelete: null,
      // End:: Dialogs Control Data

      // Start:: Page Permissions
      permissions: null,
      // Start:: Page Permissions
      totalInvestedMoney: null,
      total_tax: null,
      totalProfitWithTax: null,
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
      // if (this.$route.query.page !== "1") {
      // await this.$router.push({
      //   path: "/financialpack/all",
      //   // query: { page: 1 },
      // });
      // }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.mobile = null;
      this.filterOptions.email = null;
      this.filterOptions.status = null;
      // if (this.$route.query.page !== "1") {
      // await this.$router.push({
      //   path: "/financialpack/all",
      //   // query: { page: 1 },
      // });
      // }
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
          url: "providers",
          params: {
            // page: this.paginations.current_page,
            name: this.filterOptions.name,
            mobile: this.filterOptions.mobile,
            email: this.filterOptions.email,
            is_active: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        this.tableRows = res.data.data?.data;
        this.paginations.last_page = res.data.data?.meta?.last_page;
        this.paginations.items_per_page = res.data.data?.meta?.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    selectDeactivateItem(item) {
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },

    async HandlingItemActivationStatus(selectedItem) {
      this.dialogDeactivate = false;
      let targetItem = this.itemToChangeActivationStatus
        ? this.itemToChangeActivationStatus
        : selectedItem;
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.deactivateReason) {
        REQUEST_DATA.append("reason", this.deactivateReason);
      }
      // REQUEST_DATA.append("is_active", targetItem.is_active == 1 ? 0 : 1);
      // Start:: Append Request Data
      // REQUEST_DATA.append("_method", "PUT");

      try {
        await this.$axios({
          method: "POST",
          url: `providers/activate/${targetItem?.id}`,
          data: REQUEST_DATA,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
        this.setTableRows();

        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/providers/show/${item.id}` });
    },
    // ===== End:: Show

    // ===== Start:: Edit
    editItem(item) {
      this.$router.push({ path: `/providers/edit/${item.id}` });
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
          url: `providers/${this.itemToDelete?.id}`,
        });
        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => {
          return item.id != this.itemToDelete?.id;
        });
        this.setTableRows();
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

<style scoped>
.ex-btn-s {
  color: black !important;
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline !important;
}

.all-stat {
  background: var(--main_theme_clr);
}

.all-stat td {
  color: white;
  font-size: 21px !important;
  font-weight: 800;
}

.show_all_content_wrapper
  .v-data-table
  .v-data-table__wrapper
  table
  tbody
  tr:hover {
  background: var(--main_theme_clr) !important;
  text-align: center;
}

table,
tbody,
tr,
td {
  text-align: center !important;
}
</style>
