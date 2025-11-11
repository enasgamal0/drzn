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
                col="4"
                type="text"
                :placeholder="$t('PLACEHOLDERS.name')"
                v-model.trim="filterOptions.name"
              />
              <!-- End:: Name Input -->

              <!-- Start:: Phone Input -->
              <base-input
                col="4"
                type="text"
                :placeholder="$t('PLACEHOLDERS.email')"
                v-model.trim="filterOptions.email"
              />
              <!-- End:: Phone Input -->

              <!-- Start:: email Input -->
              <base-input
                col="4"
                type="number"
                :placeholder="$t('PLACEHOLDERS.phone')"
                v-model.trim="filterOptions.mobile"
              />
              <!-- End:: email Input -->

              <!-- Start:: Status Input -->
              <!-- <base-select-input
                col="3"
                :optionsList="activeStatuses"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.isActive"
              /> -->
              <!-- End:: Status Input -->
            </div>

            <div class="btns_wrapper">
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.search") }}</span>
                </template>
                <span
                  class="submit_btn"
                  @click="submitFilterForm"
                  :disabled="isWaitingRequest"
                >
                  <i class="fal fa-search"></i>
                </span>
              </a-tooltip>

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
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.manage_user_join_requests") }}</h5>
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
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <template v-slot:[`item.status.id`]="{ item, index }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.status.id">
            -
          </p>
          <p v-else>
            {{
              (paginations.current_page - 1) * paginations.items_per_page +
              index +
              1
            }}
          </p>
        </template>

        <template v-slot:[`item.user.id`]="{ item, index }">
          <h6 class="text-danger" v-if="!item.user.id">
            {{ $t("TABLES.noData") }}
          </h6>
          <h6 v-else>{{ index + 1 }}</h6>
        </template>

        <!-- Start:: Activation Status -->
        <!-- <template v-slot:[`item.user.is_active`]="{ item }">
          <span class="text-success text-h5" v-if="item.user.is_active">
            <i class="far fa-check"></i>
          </span>
          <span class="text-danger text-h5" v-else>
            <i class="far fa-times"></i>
          </span>
        </template> -->
        <!-- End:: Activation Status -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <template v-if="$can('users index', 'users')">
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("STATUS.accepted") }}</span>
                </template>
                <button class="btn_activate" @click="confirmAcceptItem(item)">
                  <i class="fad fa-check-circle"></i>
                </button>
              </a-tooltip>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("STATUS.canceled") }}</span>
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
          <!-- Start:: Replay Modal -->
          <description-modal
            v-if="dialogReplay"
            :modalIsOpen="dialogReplay"
            :modalDesc="selectedReplayTextToShow"
            @toggleModal="dialogReplay = !dialogReplay"
          />
          <!-- End:: Replay Modal -->

          <!-- Start:: Deactivate Modal -->
          <v-dialog v-model="dialogDeactivate">
            <v-card>
              <v-card-title
                class="text-h5 justify-center"
                v-if="itemToChangeActivationStatus"
              >
                {{
                  $t("PLACEHOLDERS.reason_reject", {
                    name: itemToChangeActivationStatus.userName,
                  })
                }}
              </v-card-title>

              <form class="w-100">
                <!-- <base-select-input col="12" :optionsList="availabilityStatuses" :placeholder="$t('PLACEHOLDERS.activate')"
                  v-model="filterOptions.isAvailable" /> -->
                <base-input
                  col="12"
                  rows="3"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.reason_reject')"
                  v-model.trim="deactivateReason"
                  required
                />
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
                {{ $t("PLACEHOLDERS.membership_request_accept") }}
              </v-card-title>

              <form class="w-100">
                <base-select-input
                  col="12"
                  type="number"
                  :optionsList="allRanks"
                  :placeholder="$t('SIDENAV.designer.rank')"
                  v-model.trim="number"
                  :label="'title'"
                  required
                />
                <!-- <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.enter_settlement_amount')"
                  v-model.trim="balance_package" required /> -->
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmAcceptItem">{{
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllRegions",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.accepted"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.canceled"),
          value: 0,
        },
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: null,
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
        email: null,
        mobile: null,
      },
      allProviders: [],
      allStatus: [],
      allRanks: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Clients.serialNumber"),
          value: "user.id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.name"),
          value: "user.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.phone"),
          value: "user.mobile",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.email"),
          value: "user.email",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.joiningDate"),
          value: "user.created_at",
          align: "center",
          sortable: false,
        },
        // {
        //   text: this.$t("PLACEHOLDERS.registration_otp_status"),
        //   value: "is_verified",
        //   align: "center",
        //   sortable: false,
        // },
        // {
        //   text: this.$t("TABLES.Clients.active"),
        //   value: "user.is_active",
        //   align: "center",
        //   width: "120",
        //   sortable: false,
        // },
        {
          text: this.$t("TABLES.Clients.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      permissions: [],

      status_now: null,

      // Start:: Dialogs Control Data
      dialogReplay: false,
      selectedReplayTextToShow: "",
      dialogImage: false,
      selectedItemImage: null,
      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,
      dialogDelete: false,
      itemToDelete: null,
      // End:: Dialogs Control Data
      status_now: null,

      // balance_package: null
      number: null,
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
          path: "/order-requests/all",
          query: { page: 1 },
        });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.email = null;
      this.filterOptions.mobile = null;
      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/order-requests/all",
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

      // Scroll To Screen's Top After Get Products
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    async setTableRows() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "users?type=employee&statusRequests=pending",
          params: {
            page: this.paginations.current_page,
            name: this.filterOptions.name,
            email: this.filterOptions.email,
            mobile: this.filterOptions.mobile,
          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // ===== Start:: Handling Activation & Deactivation
    selectDeactivateItem(item) {
      console.log(item);
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },

    async HandlingItemActivationStatus() {
      this.dialogDeactivate = false;

      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("reason", this.deactivateReason);
      REQUEST_DATA.append("status", "rejected");

      try {
        await this.$axios({
          method: "POST",
          url: `users/accept-register-request/${this.itemToChangeActivationStatus.user.id}`,
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
    // ===== End:: Handling Activation & Deactivation

    // Start:: Control Modals
    showReplayModal(replay) {
      this.dialogReplay = true;
      this.selectedReplayTextToShow = replay;
    },
    // End:: Control Modals

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/order-requests/show/${item.user.id}` });
    },
    // ===== End:: Show

    selectAcceptItem(item) {
      // this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmAcceptItem(item) {
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("status", "accepted");

      try {
        await this.$axios({
          method: "POST",
          url: `users/accept-register-request/${item.user.id}`,
          data: REQUEST_DATA,
        });
        this.dialogDelete = false;
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.verifiedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
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
    // End:: Fire Methods
  },
};
</script>
<style>
span.submit_btn {
  width: 45px;
  height: 45px;
  font-size: 16px;
  border-radius: 10px;
  color: var(--white_clr);
  transition: all 0.3s linear;
  background-color: #f6a513;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
