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
              <!-- Start:: Status Input -->
              <!-- <base-input
                col="4"
                type="text"
                :placeholder="$t('PLACEHOLDERS.orderNum')"
                v-model="filterOptions.orderNum"
              /> -->
              <!-- End:: Status Input -->

              <!-- Start:: Status Input -->
              <base-input
                col="4"
                type="text"
                :placeholder="$t('PLACEHOLDERS.client-name')"
                v-model="filterOptions.client_name"
              />
              <!-- End:: Status Input -->

              <!-- Start:: Status Input -->
              <base-select-input
                col="4"
                :optionsList="activeStatuses"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.status"
              />
              <!-- End:: Status Input -->

              <!-- Start:: Rate Input -->
              <base-rate-input
                col="4"
                :placeholder="$t('PLACEHOLDERS.rating_stars')"
                v-model="filterOptions.rate"
                size="22"
              />
              <!-- End:: Rate Input -->

              <base-picker-input
                col="4"
                type="date"
                :placeholder="$t('PLACEHOLDERS.startDate')"
                v-model.trim="filterOptions.from_date"
              />
              <!-- End:: Start Date Input -->

              <!-- Start:: End Date Input -->
              <base-picker-input
                col="4"
                type="date"
                :placeholder="$t('PLACEHOLDERS.endDate')"
                v-model.trim="filterOptions.to_date"
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
          <h5>{{ $t("PLACEHOLDERS.store_ratings") }}</h5>
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

        <template v-slot:[`item.serialNumber`]="{ item }">
          <p
            class="blue-grey--text text--darken-1 fs-3"
            v-if="!item.serialNumber"
          >
            -
          </p>
          <p v-else>{{ item.serialNumber }}</p>
        </template>

        <!-- Start:: Rate Comment Btns -->
        <template v-slot:[`item.comment`]="{ item }">
          <h6 class="text-danger" v-if="!item.comment">
            {{ $t("TABLES.noData") }}
          </h6>

          <div class="actions" v-else>
            <button class="btn_show" @click="showCommentModal(item.comment)">
              <i class="fal fa-file-alt"></i>
            </button>
          </div>
        </template>
        <!-- End:: Rate Comment Btns -->
        <!-- Start:: Name -->
        <template v-slot:[`item.name`]="{ item }">
          <h6 class="text-danger" v-if="!item.name">
            {{ $t("TABLES.noData") }}
          </h6>
          <h6 v-else>{{ item.name }}</h6>
        </template>

        <!-- Start:: status Type -->
        <template v-slot:[`item.status`]="{ item }">
          <h6 class="text-danger" v-if="!item.status">
            {{ $t("TABLES.noData") }}
          </h6>
          <v-chip v-else color="blue-grey darken-3" text-color="white" small>
            {{ item.status }}
          </v-chip>
        </template>
        <!-- End:: status Type -->

        <!-- Start:: Activation -->
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
          <div class="actions" v-if="$can('rates changestatus', 'rates')">
            <a-tooltip
              placement="bottom"
              v-if="
                item.status_enum == 'new' || item.status_enum == 'unpublished'
              "
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.share") }}</span>
              </template>
              <button
                class="btn_activate"
                @click="confirmAccept(item), 'published'"
              >
                <i class="fas fa-share"></i>
              </button>
            </a-tooltip>
            <a-tooltip
              placement="bottom"
              v-if="
                item.status_enum == 'new' || item.status_enum == 'published'
              "
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.block") }}</span>
              </template>
              <button class="btn_deactivate" @click="confirmChangeStatus(item)">
                <i class="fas fa-ban"></i>
              </button>
            </a-tooltip>
          </div>
          <template v-else>
            <i class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"></i>
          </template>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Image Modal -->
          <description-modal
            v-if="dialogComment"
            :modalIsOpen="dialogComment"
            :modalDesc="selectedCommentTextToShow"
            @toggleModal="dialogComment = !dialogComment"
          />
          <!-- End:: Image Modal -->

          <!-- Start:: Update Modal -->
          <v-dialog v-model="dialogUpdate">
            <v-card>
              <v-card-title
                class="text-h5 justify-center w-100"
                v-if="itemToUpdate"
              >
                {{ $t("PLACEHOLDERS.block_reason") }}

                <div class="filter_form_wrapper w-100">
                  <form class="w-100">
                    <div class="form-group">
                      <base-input
                        col="12"
                        rows="3"
                        type="textarea"
                        :placeholder="$t('PLACEHOLDERS.reason')"
                        v-model="reason"
                        required
                      />
                    </div>
                  </form>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmChangeStatus">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogUpdate = false">{{
                  $t("BUTTONS.cancel")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Update Modal -->
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
  name: "AllRates",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.published"),
          value: "published",
        },
        {
          id: 2,
          name: this.$t("STATUS.notPublished"),
          value: "unpublished",
        },
        {
          id: null,
          name: this.$t("STATUS.new"),
          value: "new",
        },
      ];
    },
  },

  data() {
    return {
      dialogUpdate: false,
      itemToUpdate: null,
      reason: "",
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        orderNum: "",
        client_name: "",
        status: "",
        rate: "",
        from_date: "",
        to_date: "",
      },
      providers_list: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Rates.serialNumber"),
          value: "serialNumber",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.client-name"),
          value: "user.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.salon_name"),
          value: "salon.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.rating_stars"),
          value: "rate",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Rates.comment"),
          value: "comment",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.add_at"),
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Rates.publishStatus"),
          value: "status",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.ContactMessages.actions"),
          value: "actions",
          sortable: false,
          align: "center",
          width: "80",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogComment: false,
      selectedCommentTextToShow: "",
      dialogBalance: false,
      itemToBalance: null,
      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      status_word: "",
      balance_package: "",
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
          path: "/store-rate/all",
          query: { page: 1 },
        });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.client_name = null;
      this.filterOptions.status = null;
      this.filterOptions.rate = null;
      this.filterOptions.from_date = null;
      this.filterOptions.to_date = null;
      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/store-rate/all",
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
          url: "salon-rates",

          params: {
            page: this.paginations.current_page,
            // number_order: this.filterOptions.orderNum,
            name: this.filterOptions.client_name,
            review: this.filterOptions.rate,
            from: this.filterOptions.from_date,
            to: this.filterOptions.to_date,
            status: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
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

    // Start:: Control Modals
    showCommentModal(comment) {
      this.dialogComment = true;
      this.selectedCommentTextToShow = comment;
    },
    // End:: Control Modals

    // Start:: Change Activation Status
    // async changeActivationStatus(item) {
    //   if (item.is_active == "new") {
    //     this.status_word = "unpublished"
    //   } else {
    //     this.status_word = "published"
    //   }
    //   try {
    //     await this.$axios({
    //       method: "POST",
    //       url: `rates/${item.id}`,
    //       data: { status: this.status_word }
    //     });
    //     this.$message.success(this.$t("MESSAGES.changedSuccessfully"));
    //   } catch (error) {
    //     this.$message.error(error.response.data.message);
    //   }
    // },
    // End:: Change Activation Status
    showItem(item) {},
    // ===== Start:: balance
    selectAcceptItem(item) {
      console.log("item", item);
      this.dialogBalance = true;
      this.itemToBalance = item;

      this.balance_package = item.comment;
    },
    selectUpdateItem(item) {
      this.dialogUpdate = true;
      this.itemToUpdate = item;
      // console.log(item);
    },
    async confirmAccept(item) {
      try {
        let res = await this.$axios({
          method: "POST",
          url: `rates/change-status/${item.id}`,
          data: { status: "published " },
        });
        this.setTableRows();
        this.$message.success(res.data.message);
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    async confirmChangeStatus(item) {
      try {
        let res = await this.$axios({
          method: "POST",
          url: `rates/change-status/${item.id}`,
          data: { status: "unpublished" },
        });
        this.setTableRows();
        this.$message.success(res.data.message);
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

    // ===== End:: balance
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
<style></style>
