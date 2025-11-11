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
                :placeholder="$t('PLACEHOLDERS.name_admin')"
                v-model="filterOptions.provider_name"
              />

              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.client-name')"
                v-model="filterOptions.client_name"
              />

              <!-- Start:: Status Input -->
              <!-- <base-select-input col="3" :optionsList="UserTypes" :placeholder="$t('PLACEHOLDERS.user_type')"
                v-model="filterOptions.type" /> -->
              <!-- End:: Status Input -->

              <!-- <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.user_phone_number')"
                v-model="filterOptions.user_phone_number" /> -->

              <!-- Start:: Start Date Input -->
              <base-picker-input
                col="3"
                type="date"
                :placeholder="$t('PLACEHOLDERS.startDate')"
                v-model.trim="filterOptions.from_date"
              />
              <!-- End:: Start Date Input -->

              <!-- Start:: End Date Input -->
              <base-picker-input
                col="3"
                type="date"
                :placeholder="$t('PLACEHOLDERS.endDate')"
                v-model.trim="filterOptions.to_date"
              />
              <!-- End:: End Date Input -->
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
          <h5>
            {{ $t("PLACEHOLDERS.total_completed_orders") }}
          </h5>
          <button
            v-if="!filterFormIsActive"
            class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive"
          >
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div class="title_route_wrapper">
          <!-- <div class="excel" @click="downloadExcel">
            {{ $t("BUTTONS.downloadExcel") }}
          </div> -->

          <base-button
            class="mt-0 pdf_btn"
            styleType="solid_btn"
            :btnText="$t('BUTTONS.downloadPdf')"
            @fireClick="downloadPdf"
            :disabled="pdfDownloadBtnIsLoading"
          >
            <template v-slot:btn_icon>
              <i class="fal fa-file-pdf"></i>
            </template>
          </base-button>
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

        <template v-slot:[`item.serial`]="{ item, index }">
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

        <!-- <template v-slot:[`item.count`]="{ item }">
          <router-link
            :to="{
              path: `/orders/all`,
              query: {
                page: 1,
                providerId: item.id,
                is_finished: 1,
              },
            }"
          >
            {{ item.count }}
          </router-link>
        </template> -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <!--  v-if="permissions.show" -->
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: pdf Modal -->
          <!-- <v-dialog v-model="dialogPdf">
            <v-card>
              <button class="ex-btn-s" @click="clickedDownload"> {{ $t("PLACEHOLDERS.export_pdf") }}</button>

              <v-card-actions>
                <v-btn class="modal_cancel_btn" @click="dialogPdf = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
          <!-- End:: pdf Modal -->

          <!-- Start:: excel Modal -->
          <!-- <v-dialog v-model="dialogExcel">
            <v-card>
              <a class="ex-btn-s" :href="excel" download>
                {{ $t("PLACEHOLDERS.export_excel") }}
              </a>
              <v-card-actions>
                <v-btn class="modal_cancel_btn" @click="dialogExcel = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
          <!-- End:: excel Modal -->
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
        <v-simple-table class="stat-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  {{ $t("PLACEHOLDERS.total_provider_profit") }}
                </th>
                <th class="text-center">
                  {{ $t("PLACEHOLDERS.totalTaxValue") }}
                </th>
                <th class="text-center">
                  {{ $t("PLACEHOLDERS.total_admin_profit") }}
                </th>
                <th class="text-center">
                  {{ $t("PLACEHOLDERS.total_orders_duration") }}
                </th>
                <th class="text-center">
                  {{ $t("PLACEHOLDERS.total_orders_with_tax") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template>
                <tr class="text-center all-stat">
                  <td>{{ total_provider_profit }}</td>
                  <td>{{ totalTaxValue }}</td>
                  <td>{{ total_admin_profit }}</td>
                  <td>{{ total_orders_duration }}</td>
                  <td>{{ total_orders_with_tax }}</td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <!-- ==== End:: Overall_statistics Addresses ==== -->
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

    <!-- Start:: Generate PDF Template Content -->
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :filename="$t('PLACEHOLDERS.total_completed_orders')"
      :pdf-quality="2"
      pdf-format="a4"
      :manual-pagination="false"
      :paginate-elements-by-height="1400"
      pdf-content-width="100%"
      @progress="bdfDownloadBtnIsLoading = true"
      @hasGenerated="$message.success($t('MESSAGES.generatedSuccessfully'))"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <div class="pdf_file_content">
          <h3 class="file_title">
            {{ $t("PLACEHOLDERS.total_completed_orders") }}
          </h3>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="(header, index) in tableHeaders"
                    :key="header.value"
                    v-if="index !== 0"
                  >
                    <span>{{ header.text }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableRows" :key="row.id">
                  <td v-if="index !== 0">
                    {{ row.id ? row.id : "-" }}
                  </td>
                  <td v-if="index !== 0">
                    {{ row.created_at ? row.created_at : "-" }}
                  </td>
                  <td v-if="index !== 0">
                    {{ row.user_name ? row.user_name : "-" }}
                  </td>
                  <td v-if="index !== 0">
                    {{ row.provider_name ? row.provider_name : "-" }}
                  </td>
                  <td v-if="index !== 0">
                    {{ row.provider_profit ? row.provider_profit : "-" }}
                  </td>
                  <td v-if="index !== 0">
                    {{ row.tax ? row.tax : "-" }}
                  </td>
                  <td v-if="index !== 0">
                    {{ row.commission ? row.commission : "-" }}
                  </td>
                  <!-- <td v-if="index !== 0">
                    {{ row.admin_profit ? row.admin_profit : "-" }}
                  </td> -->
                  <td v-if="index !== 0">
                    {{ row.number_of_minutes ? row.number_of_minutes : "-" }}
                  </td>
                  <td v-if="index !== 0">
                    {{ row.total ? row.total : "-" }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table class="stat-table mt-5">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    {{ $t("PLACEHOLDERS.total_provider_profit") }}
                  </th>
                  <th class="text-center">
                    {{ $t("PLACEHOLDERS.totalTaxValue") }}
                  </th>
                  <th class="text-center">
                    {{ $t("PLACEHOLDERS.total_admin_profit") }}
                  </th>
                  <th class="text-center">
                    {{ $t("PLACEHOLDERS.total_orders_duration") }}
                  </th>
                  <th class="text-center">
                    {{ $t("PLACEHOLDERS.total_orders_with_tax") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <template>
                  <tr class="text-center all-stat">
                    <td>{{ total_provider_profit }}</td>
                    <td>{{ totalTaxValue }}</td>
                    <td>{{ total_admin_profit }}</td>
                    <td>{{ total_orders_duration }}</td>
                    <td>{{ total_orders_with_tax }}</td>
                  </tr>
                </template>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </section>
    </vue-html2pdf>
    <!-- End:: Generate PDF Template Content -->
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import { mapGetters } from "vuex";

export default {
  name: "AllFinancialReports",

  components: {
    VueHtml2pdf,
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    UserTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.designer_filter"),
          value: "designer",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.service_requester"),
          value: "client",
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
      pdfDownloadBtnIsLoading: false,
      excelDownloadBtnIsLoading: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        provider_name: null,
        client_name: null,
        user_phone_number: null,
        from_date: null,
        to_date: null,
      },
      allproviders: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "serial",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.orderNum"),
          value: "id",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.orderDate"),
          value: "created_at",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.client-name"),
          value: "user_name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.name_admin"),
          value: "provider_name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.service_provider_profit"),
          value: "provider_profit",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.tax_value"),
          value: "tax",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.admin_profit"),
          value: "commission",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.total_order_duration"),
          value: "number_of_minutes",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.total_order_value"),
          value: "total",
          sortable: false,
          align: "center",
        },
        // {
        //   text: this.$t("TABLES.Areas.actions"),
        //   value: "actions",
        //   sortable: false,
        //   align: "center",
        // },
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
      // Start:: Dialogs Control Data
      dialogImage: false,
      selectedItemImage: null,
      dialogDescription: false,
      selectedDescriptionTextToShow: "",
      dialogPdf: false,
      itemToPdf: null,
      dialogExcel: false,
      itemToExcel: null,
      // End:: Dialogs Control Data

      // Start:: Page Permissions
      permissions: null,
      // Start:: Page Permissions
      total_provider_profit: null,
      totalTaxValue: null,
      total_admin_profit: null,
      total_orders_duration: null,
      total_orders_with_tax: null,

      pdf: null,
      excel_report: null,
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
          path: "/financial-finished-reports/all",
          query: { page: 1 },
        });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.provider_name = null;
      this.filterOptions.client_name = null;
      // this.filterOptions.user_phone_number = null;
      this.filterOptions.from_date = null;
      this.filterOptions.to_date = null;
      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/financial-finished-reports/all",
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
          url: "financial/finished-orders",
          params: {
            page: this.paginations.current_page,
            providerName: this.filterOptions.provider_name,
            clientName: this.filterOptions.client_name,
            // mobile: this.filterOptions.user_phone_number,
            from: this.filterOptions.from_date,
            to: this.filterOptions.to_date,
          },
        });
        this.loading = false;
        console.log("All Data ==>", res.data.data);
        this.loading = false;
        this.tableRows = res.data.data;
        // this.excel_report = res.data.data.excel_report;

        this.total_provider_profit = res.data.total.provider_profit;
        this.totalTaxValue = res.data.total.tax;
        this.total_admin_profit = res.data.total.commission;
        this.total_orders_duration = res.data.total.number_of_minutes;
        this.total_orders_with_tax = res.data.total.total;

        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // Start:: Handling Download Files
    async downloadPdf() {
      await this.$refs.html2Pdf.generatePdf();
      this.pdfDownloadBtnIsLoading = false;
    },

    async downloadExcel() {
      window.open(this.excel_report, "_blank");
    },
    // End:: Handling Download Files

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      // this.$router.push({ path: `/orders/show/${item.id}` });
      // this.$router.push({ path: `/orders/all`, query: { provider: item.user_applicant } });
    },
    // ===== End:: Show

    // ==================== End:: Crud ====================
  },

  created() {
    console.log("hihii");
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
}

.excel {
  background: darkgreen;
  padding: 7px 10px;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
}
</style>
