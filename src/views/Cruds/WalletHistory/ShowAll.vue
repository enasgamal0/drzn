<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("SIDENAV.providers.history_wallet") }}</h5>
        </div>
        <router-link to="/users/all">
          <v-btn style="color: #E1423D">
            <i class="fas fa-backward"></i>
          </v-btn>
        </router-link>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table
        class="thumb"
        :loading="loading"
        :loading-text="$t('TABLES.loadingData')"
        :headers="tableHeaders"
        :items="currentPageData"
        item-class="ltr"
        hide-default-footer
        :items-per-page="paginations.items_per_page"
      >
        <template v-slot:[`item.id`]="{ index }">
          {{
            (paginations.current_page - 1) * paginations.items_per_page +
            index +
            1
          }}
        </template>
        <template v-slot:[`item.data[0]?.note`]="{ item }">
          {{ item.data[0]?.note || "-" }}
        </template>
        <template v-slot:[`item.steps`]="{ item }">
          {{ item.steps < 0 ? Math.abs(item.steps) : item.steps }}
        </template>
        <template v-slot:[`item.data[0]?.admin`]="{ item }">
          {{ item.data[0]?.admin || "-" }}
        </template>
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- End:: No Data State -->
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
            getAppLocale === 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
          "
          :next-icon="
            getAppLocale === 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
          "
        />
      </div>
    </template>
    <!-- End:: Pagination -->
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllWalletHistory",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        { id: 1, name: this.$t("STATUS.new"), value: "new" },
        { id: 2, name: this.$t("STATUS.accepted"), value: "accepted" },
        { id: 3, name: this.$t("STATUS.rejected"), value: "rejected" },
      ];
    },
  },

  data() {
    return {
      loading: false,
      isWaitingRequest: false,
      clients: [],
      // Start:: Table Data
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("SIDENAV.providers.progress_name"),
          value: "transaction_reasons",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("SIDENAV.providers.amount_riyal"),
          value: "steps",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("SIDENAV.Clients.note2"),
          value: "data[0]?.note",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("SIDENAV.providers.progress_time_and_date"),
          value: "created_at",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Admins.admin_name"),
          value: "data[0]?.admin",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [], // This will store all data
      currentPageData: [], // This will store the data to be displayed on the current page
      // End:: Table Data
      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 10,
      },
      // End:: Pagination Data
      // Start:: Dialogs Control Data
      dialogStatusAccept: false,
      dialogStatusReject: false,
      selectedDescriptionTextToShow: "",
      // End:: Dialogs Control Data
      regions: [],
      cites: [],
      currentRequest: {
        money: null,
        reason: "",
      },
    };
  },

  watch: {
    // Watch for changes in the page query parameter and update the pagination
    ["$route.query.page"](newPage) {
      this.paginations.current_page = +newPage || 1;
      this.updateTableForCurrentPage(); // Update table rows based on current page
    },
  },

  methods: {
    // Start:: Fetch Data
    async setTableRows() {
      this.loading = true;
      try {
        // Fetch all data from the server
        let res = await this.$axios({
          method: "GET",
          url: `clients/${this.$route.params.id}`,
        });
        this.loading = false;

        // Store all data in `tableRows`
        this.tableRows = res.data.data.User.wallet;

        // Calculate pagination info
        const totalItems = this.tableRows.length;
        this.paginations.last_page = Math.ceil(
          totalItems / this.paginations.items_per_page
        );

        // Call method to display data for the current page
        this.updateTableForCurrentPage();
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    // End:: Fetch Data

    // Start:: Update Table Data for the Current Page
    updateTableForCurrentPage() {
      const startIndex =
        (this.paginations.current_page - 1) * this.paginations.items_per_page;
      const endIndex = startIndex + this.paginations.items_per_page;
      this.currentPageData = this.tableRows.slice(startIndex, endIndex);
    },
    // End:: Update Table Data for the Current Page

    // Update router query parameters when the page number changes
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll to the top of the page when changing page
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    },
  },

  created() {
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page || 1;
    }

    // Fetch data and initialize table
    this.setTableRows();
  },
};
</script>
