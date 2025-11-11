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
              <!-- Start:: request_number Input -->
              <base-input
                col="4"
                type="text"
                :placeholder="$t('SIDENAV.orders-provider.number_order')"
                v-model.trim="filterOptions.request_number"
              />
              <!-- End:: request_number Input -->

              <!-- Start:: user_name Input -->
              <base-select-input
                col="4"
                :optionsList="clients"
                :placeholder="$t('PLACEHOLDERS.name_admin')"
                v-model.trim="filterOptions.user_id"
              />
              <!-- End:: user_name Input -->

              <!-- Start:: Status Input -->
              <base-select-input
                col="4"
                :optionsList="activeStatuses"
                :placeholder="$t('SIDENAV.orders-provider.status')"
                v-model="filterOptions.status"
              />
              <!-- End:: Status Input -->
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
          <h5>{{ $t("SIDENAV.Users.wallet-settlement-requests") }}</h5>
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
        :items-per-page="paginations.items_per_page"
        hide-default-footer
      >
        <template v-slot:[`item.reject_reason`]="{ item }">
          {{ item.reject_reason || "-" }}
        </template>

        <template v-slot:[`item.serial_number`]="{ item, index }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.id">-</p>
          <p v-else>
            {{
              (paginations.current_page - 1) * paginations.items_per_page +
              index +
              1
            }}
          </p>
        </template>
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->
        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions" v-if="item.status_enum == 'new'">
            <a-tooltip
              placement="bottom"
              v-if="
                $can('accepted_providers updatewallet', 'accepted_providers')
              "
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.accept") }}</span>
              </template>
              <button
                class="btn_show"
                @click="openRequestStatusModal(item, 'accepted')"
              >
                <i class="fad fa-check-circle"></i>
              </button>
            </a-tooltip>
            <a-tooltip
              placement="bottom"
              v-if="
                $can('accepted_providers updatewallet', 'accepted_providers')
              "
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.reject") }}</span>
              </template>
              <button
                class="btn_deactivate"
                @click="openRequestStatusModal(item, 'rejected')"
              >
                <i class="fad fa-times-circle"></i>
              </button>
            </a-tooltip>
          </div>
          <div v-else>-</div>
        </template>

        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <v-dialog v-model="dialogStatusAccept">
            <v-card>
              <v-card-title class="text-h5 justify-center">
                {{ $t("PLACEHOLDERS.accept_settlement_request") }}
              </v-card-title>
              <div class="w-100">
                <div class="mt-3">
                  <h6 class="d-inline-block font-weight-bold mb-4">
                    {{ $t("SIDENAV.Clients.user_balance") }}:
                  </h6>
                  <h6 class="d-inline-block mx-1">
                    {{ modalRequest?.amount }}
                    {{ $t("PLACEHOLDERS.riyal") }}
                  </h6>
                  <div>
                    <label class="font-weight-bold mx-1"
                      >{{ $t("PLACEHOLDERS.settlement_request_money") }}:
                    </label>
                    <input
                      type="number"
                      v-model.trim="modalRequest.money"
                      class="bg-white rounded mx-3 p-2 w-25"
                    />
                    <span>{{ $t("PLACEHOLDERS.riyal") }}</span>
                    <div class="text-center mt-5">
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-success text-white"
                        @click="changeRequestStatus(modalRequest, 'accepted')"
                        >{{ $t("BUTTONS.save") }}</v-btn
                      >
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-danger text-white"
                        @click="cancelRequest()"
                        >{{ $t("BUTTONS.cancel") }}</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogStatusReject">
            <v-card>
              <!-- <v-card-title class="text-h5 justify-center">
                {{ $t("PLACEHOLDERS.accept_settlement_request") }}
              </v-card-title> -->
              <div class="w-100">
                <div class="mt-3">
                  <div>
                    <label class="font-weight-bold mx-1"
                      >{{ $t("PLACEHOLDERS.reason_reject") }}:
                    </label>
                    <input
                      type="textarea"
                      rows="4"
                      v-model.trim="modalRequest.reason"
                      class="bg-white rounded p-2 w-100 mt-4"
                    />
                    <div class="text-center mt-5">
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-success text-white"
                        @click="changeRequestStatus(modalRequest, 'rejected')"
                        >{{ $t("BUTTONS.save") }}</v-btn
                      >
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-danger text-white"
                        @click="cancelRequest()"
                        >{{ $t("BUTTONS.cancel") }}</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllRequestWallets",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.new"),
          value: "new",
        },
        {
          id: 2,
          name: this.$t("STATUS.accepted"),
          value: "accepted",
        },
        {
          id: 3,
          name: this.$t("STATUS.rejected"),
          value: "rejected",
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
        request_number: null,
        status: null,
        user_name: null,
      },
      // End:: Filter Data
      clients: [],
      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "serial_number",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("SIDENAV.orders-provider.number_order"),
          value: "id",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.name_admin"),
          value: "user_name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("SIDENAV.orders-provider.created_at"),
          value: "created_at",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("SIDENAV.orders-provider.status"),
          value: "status",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.reason_reject"),
          value: "reject_reason",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.bank_name"),
          value: "bank_name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.iban"),
          value: "iban",
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
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogStatusAccept: false,
      dialogStatusReject: false,
      selectedDescriptionTextToShow: "",
      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      regions: [],
      cites: [],
      currentRequest: {
        money: null,
        reason: "",
      },
      modalRequest: {},
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
        await this.$router.push({
          path: "/request-wallets/all",
          query: { page: 1 },
        });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.request_number = null;
      this.filterOptions.status = null;
      this.filterOptions.user_id = null;

      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/request-wallets/all",
          query: { page: 1 },
        });
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

      // Scroll To Screen's Top After Get requestwallets
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    async setTableRows() {
      this.loading = true;
      try {
        console.log("this.filterOptions.request_number", this.filterOptions);
        let res = await this.$axios({
          method: "GET",
          url: "withdraw-requests",
          params: {
            page: this.paginations.current_page,
            id: this.filterOptions.request_number,
            // user_id: this.filterOptions.user_id?.id,
            name: this.filterOptions.user_id,
            status: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        this.tableRows = res.data.data;
        // console.log(res.data.data.items?.id.requestwallet.request_number);
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows
    async getClients() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "withdraw-requests/salons?page=0&limit=0",
        });
        this.loading = false;
        this.clients = res.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    openRequestStatusModal(item, status) {
      if (status == "accepted") {
        this.dialogStatusAccept = true;
      } else if (status == "rejected") {
        this.dialogStatusReject = true;
      }
      this.modalRequest = { ...item };
      this.currentRequest = item;
    },
    async changeRequestStatus(modalRequest, status) {
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("status", status);

      if (status === "rejected" && modalRequest?.reason) {
        REQUEST_DATA.append("reason", modalRequest?.reason);
      }
      if (status === "accepted" && modalRequest?.money) {
        REQUEST_DATA.append("amount", modalRequest?.money);
      }

      try {
        await this.$axios({
          method: "POST",
          url: `withdraw-requests/change-status/${modalRequest.id}`,
          data: REQUEST_DATA,
        });

        this.dialogStatusAccept = false;
        this.dialogStatusReject = false;
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

    // ==================== Start:: Crud ====================
    // ===== Start:: End
    editItem(item) {
      this.$router.push({ path: `/request-wallets/edit/${item.id}` });
    },
    showItem(item) {
      this.$router.push({ path: `/request-wallets/show/${item.id}` });
    },
    // ===== End:: End
    cancelRequest() {
      this.dialogStatusAccept = false;
      this.dialogStatusReject = false;
    },
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
    this.getClients();
    // End:: Fire Methods
  },
};
</script>
