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
                col="3"
                type="text"
                :placeholder="$t('TABLES.Users.name')"
                v-model.trim="filterOptions.name"
              />
              <!-- End:: Name Input -->
              <!-- Start:: Phone Input -->
              <base-input
                col="3"
                type="tel"
                :placeholder="$t('TABLES.Clients.phone')"
                v-model.trim="filterOptions.phone"
              />
              <!-- End:: Phone Input -->
              <!-- Start:: Status Input -->
              <base-select-input
                col="3"
                :optionsList="activeStatuses"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.is_active"
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
          <h5>{{ $t("TABLES.Users.users") }}</h5>
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

        <!-- Start:: Item Image -->
        <template v-slot:[`item.image`]="{ item }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.image">
              {{ $t("TABLES.noData") }}
            </h6>

            <button class="my-1" @click="showImageModal(item.image)" v-else>
              <img
                class="rounded"
                :src="item.image"
                :alt="item.name"
                width="60"
                height="60"
              />
            </button>
          </div>
        </template>
        <!-- End:: Item Image -->
        <!-- Start:: Item Image -->
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
        <!-- End:: Item Image -->

        <!-- Start:: Name -->
        <template v-slot:[`item.name`]="{ item }">
          <span class="text-danger" v-if="!item.name">
            {{ $t("TABLES.noData") }}
          </span>
          <span v-else> {{ item.name }} </span>
        </template>
        <!-- End:: Name -->

        <!-- Start:: Phone -->
        <template v-slot:[`item.phone`]="{ item }">
          <span class="text-danger" v-if="!item.phone">
            {{ $t("TABLES.noData") }}
          </span>
          <span v-else> {{ item.phone || "-" }} </span>
        </template>
        <!-- End:: Phone -->

        <!-- Start:: Email -->
        <template v-slot:[`item.email`]="{ item }">
          <span> {{ item.email || "-" }} </span>
        </template>
        <!-- End:: Email -->

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
            <a-tooltip placement="bottom" v-if="$can('users show', 'users')">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom" v-if="$can('users show', 'users')">
              <template slot="title">
                <span>{{ $t("BUTTONS.wallet_history") }}</span>
              </template>
              <router-link :to="`/WalletHistory/all/${item.id}`">
                <button class="btn_show">
                  <i class="fal fa-wallet"></i>
                </button>
              </router-link>
            </a-tooltip>

            <a-tooltip placement="bottom" v-if="$can('users edit', 'users')">
              <template slot="title">
                <span>{{ $t("BUTTONS.user_wallet") }}</span>
              </template>
              <button class="btn_show" @click="openWalletModal(item)">
                <i class="fa fa-dollar-sign"></i>
              </button>
            </a-tooltip>
            <template v-if="$can('admins activate', 'admins') && item.id !== 1">
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
          <!-- Start:: Image Modal -->
          <image-modal
            v-if="dialogImage"
            :modalIsOpen="dialogImage"
            :modalImage="selectedItemImage"
            @toggleModal="dialogImage = !dialogImage"
          />
          <!-- End:: Image Modal -->
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
                  :disabled="!!!deactivateReason"
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
          <!-- Start:: Wallet Modal -->
          <v-dialog v-model="user_wallet_modal">
            <v-card>
              <v-card-title class="text-h5 justify-center">
                {{ $t("PLACEHOLDERS.change_balance") }}
              </v-card-title>
              <div class="w-100">
                <div class="mt-3">
                  <div>
                    <label class="font-weight-bold mx-1"
                      >{{ $t("SIDENAV.Clients.user_balance") }}:
                    </label>
                    <input
                      type="number"
                      class="bg-white rounded mx-3 p-2 w-25"
                      v-model="balance"
                    />
                    <span>{{ $t("PLACEHOLDERS.riyal") }}</span>
                    <div class="mt-5">
                      <label class="font-weight-bold mx-1"
                        >{{ $t("SIDENAV.Clients.note2") }} ({{
                          $t("PLACEHOLDERS.optional")
                        }}):
                      </label>
                      <input
                        type="text"
                        class="bg-white rounded mx-3 p-2 w-75 mt-2"
                        v-model="note"
                      />
                    </div>
                    <div class="text-center mt-5">
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-success text-white"
                        @click="changeBalance()"
                        :disabled="button_waiting"
                        >{{ $t("BUTTONS.save") }}</v-btn
                      >
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-danger text-white"
                        @click="closeWalletModal()"
                        >{{ $t("BUTTONS.cancel") }}</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>
          <!-- End:: Wallet Modal -->
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
  name: "AllUsers",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        {
          id: null,
          name: this.$t("STATUS.all"),
          value: null,
        },
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
        phone: null,
        is_active: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Users.name"),
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Users.phone"),
          value: "mobile",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Users.email"),
          value: "email",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.status"),
          value: "is_active",
          align: "center",
          width: "120",
          sortable: false,
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
      dialogImage: false,
      selectedItemImage: null,
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

      // Start:: Page Permissions
      permissions: null,
      // Start:: Page Permissions
      user_wallet_modal: false,
      button_waiting: false,
      balance: null,
      note: null,
      item_id: null,
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
        await this.$router.push({ path: "/users/all", query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.phone = null;
      this.filterOptions.is_active = null;
      if (this.$route.query.page !== "1") {
        await this.$router.push({ path: "/users/all", query: { page: 1 } });
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
          url: "clients",
          params: {
            page: this.paginations.current_page,
            name: this.filterOptions.name,
            mobile: this.filterOptions.phone,
            package_id: this.$route.query?.package_id,
            is_active: this.filterOptions.is_active?.value,
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

    // Start:: Control Modals
    showImageModal(image) {
      this.dialogImage = true;
      this.selectedItemImage = image;
    },
    // End:: Control Modals

    // ===== Start:: Handling Activation & Deactivation
    async changeActivationStatus(item) {
      try {
        await this.$axios({
          method: "POST",
          url: `clients/activate/${item.id}`,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Handling Activation & Deactivation
    // Start:: User Wallet Modal
    openWalletModal(item) {
      this.user_wallet_modal = true;
      this.balance = item.balance;
      this.note = item.note;
      this.item_id = item.id;
    },
    closeWalletModal() {
      this.user_wallet_modal = false;
    },
    async changeBalance() {
      this.button_waiting = true;
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("money", this.balance);
      if (this.note) {
        REQUEST_DATA.append("note", this.note);
      }
      try {
        await this.$axios({
          method: "POST",
          url: `wallet/changeBalance/${this.item_id}`,
          data: REQUEST_DATA,
        });
        this.user_wallet_modal = false;
        this.button_waiting = false;
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: User Wallet Modals
    // ===== Start:: Handling Activation & Deactivation
    selectDeactivateItem(item) {
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },
    async HandlingItemActivationStatus(selectedItem) {
      let targetItem = this.itemToChangeActivationStatus
        ? this.itemToChangeActivationStatus
        : selectedItem;
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.deactivateReason) {
        REQUEST_DATA.append("reason", this.deactivateReason);
      }
      try {
        await this.$axios({
          method: "POST",
          url: `admins/activate/${targetItem.id}`,
          data: REQUEST_DATA,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
        this.setTableRows();
        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;
        this.dialogDeactivate = false;
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Handling Activation & Deactivation
    // ===== Start:: End
    showItem(item) {
      this.$router.push({ path: `/users/show/${item.id}` });
    },
    // ===== End:: End
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
