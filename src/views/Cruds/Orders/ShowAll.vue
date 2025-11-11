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
                :placeholder="$t('PLACEHOLDERS.orderNum')"
                v-model.trim="filterOptions.orderNum"
              />
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.mobileClient')"
                v-model.trim="filterOptions.mobileClient"
              />
              <!-- End:: Name Input -->

              <!-- Start:: Status Input -->
              <base-select-input
                col="6"
                :optionsList="users"
                :placeholder="$t('PLACEHOLDERS.clientName')"
                v-model="filterOptions.clientName"
              />
              <!-- End:: Status Input -->
              <!-- Start:: Status Input -->
              <base-select-input
                col="6"
                :optionsList="activeStatuses"
                :placeholder="$t('PLACEHOLDERS.orderStatus')"
                v-model="filterOptions.status"
              />
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
          <h5>{{ $t("PLACEHOLDERS.orders") }}</h5>
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

        <template v-slot:[`item.id`]="{ item, index }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.id">-</p>
          <p v-else>
            {{
              (paginations.current_page - 1) * paginations.items_per_page +
              index +
              1
            }}
          </p>
        </template>

        <!-- <template v-slot:[`item.id`]="{ item }">
          <h6 class="text-danger" v-if="!item.id">
            {{ $t("TABLES.noData") }}
          </h6>
          <h6 v-else>{{ item.id }}</h6>
        </template> -->

        <!-- <template v-slot:[`item.serialNumber`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.serialNumber">-</p>
          <p v-else>{{ item.serialNumber }}</p>
        </template> -->

        <!-- Start:: Activation Status -->
        <template v-slot:[`item.trans_status`]="{ item }">
          <v-chip>
            {{ item.trans_status }}
          </v-chip>
        </template>
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

            <a-tooltip placement="bottom" v-if="item.status_en == 'finish'">
              <template slot="title">
                <span>{{ $t("PLACEHOLDERS.pdf") }}</span>
              </template>
              <button class="btn_show" @click="downloadPdf(item)">
                <i class="fas fa-file-pdf"></i>
              </button>
            </a-tooltip>

            <div v-if="item.action == false">
              <a-tooltip placement="bottom" v-if="item.status_en == 'new'">
                <template slot="title">
                  <span>{{ $t("PLACEHOLDERS.switch") }}</span>
                </template>
                <button class="btn_show" @click="Onswitch(item)">
                  <i class="fas fa-random"></i>
                </button>
              </a-tooltip>

              <a-tooltip
                placement="bottom"
                v-if="item.status_en == 'new' && item.date == today"
              >
                <template slot="title">
                  <span>{{ $t("PLACEHOLDERS.road") }}</span>
                </template>
                <button class="btn_show" @click="OnRoad(item)">
                  <i class="fas fa-road"></i>
                </button>
              </a-tooltip>

              <a-tooltip
                placement="bottom"
                v-if="item.status_en == 'On_the_way_to_Unit'"
              >
                <template slot="title">
                  <span>{{ $t("PLACEHOLDERS.onClean") }}</span>
                </template>
                <button class="btn_show" @click="onClean(item)">
                  <i class="fas fa-broom"></i>
                </button>
              </a-tooltip>

              <a-tooltip
                placement="bottom"
                v-if="item.status_en == 'Cleaning_is_underway'"
              >
                <template slot="title">
                  <span>{{ $t("PLACEHOLDERS.onAdd") }}</span>
                </template>
                <button class="btn_show" @click="onAdd(item)">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </a-tooltip>

              <a-tooltip
                placement="bottom"
                v-if="item.status_en == 'Cleaning_is_underway'"
              >
                <template slot="title">
                  <span>{{ $t("PLACEHOLDERS.onFinish") }}</span>
                </template>
                <button class="btn_show" @click="onFinish(item)">
                  <i class="far fa-calendar-times"></i>
                </button>
              </a-tooltip>

              <!-- <template
                v-if="
                  item.status == 'new' || item.status == 'accepted_from_manager'
                "
              >
                <a-tooltip placement="bottom">
                  <template slot="title">
                    <span>{{ $t("STATUS.accepted") }}</span>
                  </template>
                  <button class="btn_activate" @click="selectAcceptItem(item)">
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
              </template> -->
            </div>
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
          <v-dialog v-model="switchOpen">
            <v-card>
              <v-card-title class="text-h5 justify-center">
                {{ $t("PLACEHOLDERS.switchOrder") }}
              </v-card-title>

              <form class="w-100">
                <base-select-input
                  col="12"
                  :optionsList="SimlerOrder"
                  :placeholder="$t('PLACEHOLDERS.orderNum')"
                  v-model="chosenOrder"
                />
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="HandlingSwitch(item)">
                  {{ $t("BUTTONS.ok") }}
                </v-btn>

                <v-btn class="modal_cancel_btn" @click="switchOpen = false">{{
                  $t("BUTTONS.cancel")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeactivate">
            <v-card>
              <v-card-title
                class="text-h5 justify-center"
                v-if="itemToChangeActivationStatus"
              >
                {{
                  $t("PLACEHOLDERS.rejictionMessage", {
                    name: itemToChangeActivationStatus.user.user.name,
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
                  :placeholder="$t('PLACEHOLDERS.reason')"
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
          <v-dialog v-model="addOpen">
            <v-card>
              <form class="w-100">
                <base-input
                  col="12"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.serviceDesc')"
                  v-model.trim="serviceDesc"
                  :label="'title'"
                  required
                />
                <base-input
                  col="12"
                  type="number"
                  :placeholder="$t('PLACEHOLDERS.price')"
                  v-model.trim="servicePrice"
                  required
                />
              </form>

              <v-card-actions>
                <v-btn
                  class="modal_confirm_btn"
                  :disabled="isWaitingRequestPrice"
                  @click="confirmAdd"
                  >{{ $t("BUTTONS.ok") }}</v-btn
                >

                <v-btn class="modal_cancel_btn" @click="addOpen = false">{{
                  $t("BUTTONS.cancel")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
          name: this.$t("PLACEHOLDERS.new"),
          value: "new",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.On_the_way_to_Unit"),
          value: "On_the_way_to_Unit",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.Cleaning_is_underway"),
          value: "Cleaning_is_underway",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.canceled"),
          value: "finish",
        },
        {
          id: 4,
          name: this.$t("STATUS.stoped"),
          value: "canceled",
        },
      ];
    },
    userType() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.moder"),
          value: "manager",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.impular"),
          value: "employee",
        },
      ];
    },
  },

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      isWaitingRequestPrice: false,
      chosenOrder: null,
      switchOpen: false,
      orderData: null,
      addOpen: false,
      addData: false,
      serviceDesc: null,
      servicePrice: null,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        orderNum: null,
        mobileClient: null,
        clientName: null,
        status: null,
        mangement: null,
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
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.orderNum"),
          value: "number_order",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.clientName"),
          value: "client_name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.subscriptions.Totalorder"),
          value: "OrderBudget",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.orderArea"),
          value: "Area",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.created_at"),
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.excuteAt"),
          value: "date",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.orderStatus"),
          value: "status",
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
      today: new Date(),
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
      users: [],
      mangement: [],
      SimlerOrder: [],
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
    downloadPdf(item) {
      window.open(item.fatoora, "_blank");
    },
    onAdd(item) {
      this.addOpen = true;
      this.addData = item;
    },
    async onFinish(item) {
      try {
        const REQUEST_DATA = new FormData();
        REQUEST_DATA.append("status", "finish");
        let res = await this.$axios({
          method: "POST",
          url: `orders/ChangeStatus/${item.id}`,
          data: REQUEST_DATA,
        });
        this.$message.success(res.data.message);
        this.setTableRows();
      } catch (error) {
        this.$message.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    },
    async onClean(item) {
      try {
        const REQUEST_DATA = new FormData();
        REQUEST_DATA.append("status", "Cleaning_is_underway");
        let res = await this.$axios({
          method: "POST",
          url: `orders/ChangeStatus/${item.id}`,
          data: REQUEST_DATA,
        });
        this.$message.success(res.data.message);
        this.setTableRows();
      } catch (error) {
        this.$message.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    },
    async OnRoad(item) {
      try {
        const REQUEST_DATA = new FormData();
        REQUEST_DATA.append("status", "On_the_way_to_Unit");
        let res = await this.$axios({
          method: "POST",
          url: `orders/ChangeStatus/${item.id}`,
          data: REQUEST_DATA,
        });
        this.$message.success(res.data.message);
        this.setTableRows();
      } catch (error) {
        this.$message.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    },
    async Onswitch(item) {
      this.switchOpen = true;
      this.orderData = item;
      try {
        let res = await this.$axios({
          method: "POST",
          url: `orders/SimlerOrder/${item.id}`,
        });
        this.SimlerOrder = res.data.orders;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async confirmAdd() {
      this.isWaitingRequestPrice = true;
      this.addOpen = true;
      const REQUEST_DATA = new FormData();
      if (this.serviceDesc) {
        REQUEST_DATA.append("description", this.serviceDesc);
      } else {
        this.$message.error(this.$t("VALIDATION.desc"));
      }
      if (this.servicePrice) {
        REQUEST_DATA.append("price", this.servicePrice);
      } else {
        this.$message.error(this.$t("VALIDATION.price"));
      }
      try {
        let res = await this.$axios({
          method: "POST",
          url: `orders/AdditionService/${this.addData?.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequestPrice = false;
        this.addOpen = false;
        this.addData = null;
        this.serviceDesc = null;
        this.servicePrice = null;
        this.$message.success(res.data.message);
      } catch (error) {
        // this.addOpen = false;
        this.isWaitingRequestPrice = false;
        if (this.serviceDesc && this.servicePrice) {
          this.addData = null;
          this.serviceDesc = null;
          this.servicePrice = null;
          this.$message.error(error.response.data.message);
        }
      }
    },
    async HandlingSwitch() {
      this.switchOpen = true;
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("order_id", this.chosenOrder?.id);
      try {
        let res = await this.$axios({
          method: "POST",
          url: `orders/SwitchOrder/${this.orderData?.id}`,
          data: REQUEST_DATA,
        });
        this.switchOpen = false;
        this.orderData = null;
        this.chosenOrder = null;
        this.$message.success(res.data.message);
      } catch (error) {
        this.switchOpen = false;
        this.orderData = null;
        this.chosenOrder = null;
        this.$message.error(error.response.data.message);
      }
    },

    async getUsers() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "clients?page=0&limit=0",
        });
        this.users = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getManeg() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "management?page=0",
        });
        this.mangement = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/orders/all",
          query: { page: 1 },
        });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.orderNum = null;
      this.filterOptions.mobileClient = null;
      this.filterOptions.clientName = null;
      this.filterOptions.status = null;
      this.filterOptions.mangement = null;
      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/orders/all",
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
          url: "orders",
          params: {
            page: this.paginations.current_page,
            number_order: this.filterOptions.orderNum,
            mobile: this.filterOptions.mobileClient,
            user_id: this.filterOptions.clientName?.id,
            status: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
        res.data.data.forEach((item, index) => {
          item.serialNumber =
            (this.paginations.current_page - 1) *
              this.paginations.items_per_page +
            index +
            1;
        });
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
          url: `orders/change-status/${this.itemToChangeActivationStatus.id}`,
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
      this.$router.push({ path: `/orders/show/${item.id}` });
    },
    // ===== End:: Show

    async selectAcceptItem(item) {
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("status", "finished");

      try {
        await this.$axios({
          method: "POST",
          url: `orders/change-status/${item.id}`,
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
    async confirmAcceptItem(item) {
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("status", "accepted");

      try {
        await this.$axios({
          method: "POST",
          url: `users/accept-register-request/${this.itemToDelete.user.id}`,
          data: REQUEST_DATA,
        });
        this.dialogDelete = false;
        (this.number = null), this.setTableRows();
        this.$message.success(this.$t("MESSAGES.verifiedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ==================== End:: Crud ====================
  },

  created() {
    const year = this.today.getFullYear();
    const month = String(this.today.getMonth() + 1).padStart(2, "0");
    const day = String(this.today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    this.today = formattedDate;

    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    this.getUsers();
    this.getManeg();
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
