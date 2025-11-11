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
                col="5"
                type="text"
                :placeholder="$t('PLACEHOLDERS.order_number')"
                v-model.trim="filterOptions.serial_number"
              />

              <base-select-input
                col="5"
                :optionsList="subCategories"
                :placeholder="$t('PLACEHOLDERS.sub_service_name')"
                v-model.trim="filterOptions.sub_category"
              />

              <base-input
                col="5"
                type="date"
                :placeholder="$t('PLACEHOLDERS.from_date')"
                v-model="filterOptions.from_date"
              />

              <base-input
                col="5"
                type="date"
                :placeholder="$t('PLACEHOLDERS.to_date')"
                v-model="filterOptions.to_date"
              />

              <!-- Start:: Status Input -->
              <!-- <base-select-input
                col="4"
                :optionsList="activeStatuses"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.is_active"
              /> -->
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
          <h5>{{ $t("PLACEHOLDERS.orders_and_quotations_management") }}</h5>
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

        <!-- Start:: Activation -->
        <template v-slot:[`item.is_active`]="{ item }">
          <!-- v-if="permissions.activate" -->
          <div
            class="activation"
            dir="ltr"
            style="z-index: 1"
            v-if="$can('orders activate', 'orders')"
          >
            <v-switch
              class="mt-2"
              color="success"
              v-model="item.is_active"
              hide-details
              @change="changeActivationStatus(item)"
            ></v-switch>
          </div>
        </template>
        <!-- End:: Activation -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <button
              class="btn_show"
              @click="showItem(item)"
              v-if="item.status != 'cancelled'"
            >
              <i class="fal fa-eye"></i>
            </button>
            <i v-if="item.status == 'cancelled'" class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"></i>
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

          <!-- Start:: Description Modal -->

          <description-modal
            v-if="dialogDescription"
            :modalIsOpen="dialogDescription"
            :modalDesc="selectedDescriptionTextToShow"
            @toggleModal="dialogDescription = !dialogDescription"
          />
          <!-- End:: Description Modal -->

          <v-dialog v-model="dialogOfferDetails" max-width="800px">
            <v-card>
              <v-card-title>{{ selectedOffer?.provider_name }}</v-card-title>
              <v-card-text>
                <div v-for="p in selectedOffer?.offerProducts" :key="p.id">
                  <p>{{ p?.name }} - {{ p?.quantity }} × {{ p?.price }}</p>
                </div>
                <div v-for="a in selectedOffer?.attachments" :key="a.id">
                  <a :href="a?.attachment" target="_blank">{{
                    a?.attachment
                  }}</a>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="dialogOfferDetails = false">{{
                  $t("BUTTONS.close")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllOrders",

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
      subCategories: [],
      dialogOfferDetails: false,
      selectedOffer: null,
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        is_active: null,
        from_date: null,
        to_date: null,
        serial_number: null,
        sub_category: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.serial_number"),
          value: "serial_number",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.service_name"),
          value: "sub_category",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.user_name"),
          value: "user",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.created_at"),
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.status"),
          value: "status_trans",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.offers_count"),
          value: "offers_count",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],

      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogImage: false,
      selectedItemImage: null,
      dialogDescription: false,
      selectedDescriptionTextToShow: "",
      dialogDelete: false,
      itemToDelete: null,
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
          path: "/orders-and-quotations/all",
          query: { page: 1 },
        });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.is_active = null;
      this.filterOptions.from_date = null;
      this.filterOptions.to_date = null;
      this.filterOptions.serial_number = null;
      this.filterOptions.sub_category = null;

      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/orders-and-quotations/all",
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

      // Scroll To Screen's Top After Get orders-and-quotations
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
            serial_number: this.filterOptions.serial_number,
            subCategoryId: this.filterOptions.sub_category?.id,
            "created_at[0]": this.filterOptions.from_date,
            "created_at[1]": this.filterOptions.to_date,
            isActive: this.filterOptions.is_active?.value,
          },
        });
        this.loading = false;
        console.log(res.data.data);
        this.tableRows = res.data.data?.orders?.data;
        this.paginations.last_page = res.data.data?.orders?.meta?.last_page;
        this.paginations.items_per_page = res.data.data?.orders?.meta?.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getSubCategories() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "sub-categories?is_active=1&limit=0&page=0",
        });
        console.log("aaaa", res.data.data);
        this.subCategories = res.data.data?.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows
    showReplayModal(replay) {
      this.dialogDescription = true;
      this.selectedDescriptionTextToShow = replay;
    },

    // Start:: Control Modals
    showImageModal(image) {
      this.dialogImage = true;
      this.selectedItemImage = image;
    },
    // End:: Control Modals
    // Start:: Change Activation Status
    async changeActivationStatus(item) {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      // REQUEST_DATA.append("_method", "PUT");
      try {
        await this.$axios({
          method: "POST",
          url: `orders/activate/${item.id}`,
          data: REQUEST_DATA,
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Activation Status

    // ==================== Start:: Crud ====================
    // ===== Start:: End
    editItem(item) {
      this.$router.push({ path: `/orders-and-quotations/edit/${item.id}` });
    },
    showItem(item) {
      this.$router.push({ path: `/orders-and-quotations/show/${item.id}` });
    },
    // ===== End:: End

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },

    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `orders/${this.itemToDelete.id}`,
        });
        this.dialogDelete = false;
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
    this.getSubCategories();
    // End:: Fire Methods
  },
};
</script>
