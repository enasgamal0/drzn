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
                col="10"
                type="text"
                :placeholder="$t('PLACEHOLDERS.package_name')"
                v-model="filterOptions.package_name"
              />

              <!-- Start:: Start Date Input -->
              <base-picker-input
                col="5"
                type="date"
                :placeholder="$t('PLACEHOLDERS.time_from')"
                v-model.trim="filterOptions.from_date"
              />
              <!-- End:: Start Date Input -->

              <!-- Start:: End Date Input -->
              <base-picker-input
                col="5"
                type="date"
                :placeholder="$t('PLACEHOLDERS.time_to')"
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
            {{ $t("PLACEHOLDERS.packages_report") }}
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
          <base-button
            class="mt-0 pdf_btn"
            styleType="solid_btn"
            :btnText="$t('BUTTONS.downloadPdf')"
            @fireClick="downloadPdf"
          >
            <template v-slot:btn_icon>
              <i class="fal fa-file-pdf"></i>
            </template>
          </base-button>
          <base-button
            class="mt-0 excel_btn"
            styleType="solid_btn"
            :btnText="$t('BUTTONS.downloadExcel')"
            @fireClick="downloadExcelAllData"
            :disabled="excelDownloadBtnIsLoading"
          >
            <template v-slot:btn_icon>
              <i class="fal fa-file-excel"></i>
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
        <template v-slot:[`item.advertiser_id`]="{ index }">
          {{
            (paginations.current_page - 1) * paginations.items_per_page +
            index +
            1
          }}
        </template>
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <template v-slot:[`item.package_id`]="{ item, index }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.package_id">
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
          </div>
        </template>
        <!-- End:: Actions -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->

      <!-- ==== Start:: Overall_statistics Addresses ==== -->
      <div class="table_content mt-5">
        <v-simple-table class="stat-table">
          <template v-slot:default>
            <thead class="all-stat">
              <tr>
                <th class="text-center" style="color: white !important">
                  {{ $t("PLACEHOLDERS.total_application_profit") }}
                </th>
                <th class="text-center" style="color: white !important">
                  {{ $t("PLACEHOLDERS.total_tax") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center">
                <td>{{ totals.total_application_profit }}</td>
                <td>{{ totals.total_tax }}</td>
              </tr>
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
      :filename="$t('PLACEHOLDERS.packages_report')"
      :pdf-quality="2"
      pdf-format="a4"
      :manual-pagination="false"
      :paginate-elements-by-height="1400"
      pdf-content-width="100%"
      @hasGenerated="$message.success($t('MESSAGES.generatedSuccessfully'))"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <div class="pdf_file_content">
          <h3 class="file_title">
            {{ $t("PLACEHOLDERS.packages_report") }}
          </h3>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="(header, index) in tableHeaders"
                    :key="header.value"
                  >
                    <span>{{ header.text }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableRows" :key="row.package_id">
                  <td>
                    {{
                      (paginations.current_page - 1) *
                        paginations.items_per_page +
                      index +
                      1
                    }}
                  </td>
                  <td>{{ row.auction_order }}</td>
                  <td>{{ row.package_name }}</td>
                  <td>{{ row.total_purchases }}</td>
                  <td>{{ row.total_revenue }}</td>
                  <td>{{ row.total_application_profit }}</td>
                  <td>{{ row.total_tax }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <!-- ==== Start:: Overall_statistics Addresses ==== -->
          <div class="table_content mt-5">
            <v-simple-table class="stat-table">
              <template v-slot:default>
                <thead class="all-stat">
                  <tr>
                    <th class="text-center" style="color: white !important">
                      {{ $t("PLACEHOLDERS.total_application_profit") }}
                    </th>
                    <th class="text-center" style="color: white !important">
                      {{ $t("PLACEHOLDERS.total_tax") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center">
                    <td>{{ totals.total_application_profit }}</td>
                    <td>{{ totals.total_tax }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <!-- ==== End:: Overall_statistics Addresses ==== -->
        </div>
      </section>
    </vue-html2pdf>
    <!-- End:: Generate PDF Template Content -->
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import { mapGetters } from "vuex";
import * as XLSX from "xlsx";

export default {
  name: "AllFinancialReports",

  components: {
    VueHtml2pdf,
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  data() {
    return {
      loading: false,
      isWaitingRequest: false,
      excelDownloadBtnIsLoading: false,

      filterFormIsActive: false,
      filterOptions: {
        package_name: null,
        from_date: null,
        to_date: null,
      },
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "package_id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.auction_order"),
          value: "auction_order",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.package_name"),
          value: "package_name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_purchases"),
          value: "total_purchases",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_revenue"),
          value: "total_revenue",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_application_profit"),
          value: "total_application_profit",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_tax"),
          value: "total_tax",
          align: "center",
          sortable: false,
        },
      ],
      tableRows: [],
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      totals: {
        total_purchases: 0,
        total_revenue: 0,
        total_application_profit: 0,
        total_tax: 0,
      },
    };
  },

  methods: {
    async submitFilterForm() {
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.package_name = null;
      this.filterOptions.from_date = null;
      this.filterOptions.to_date = null;
      this.setTableRows();
    },
    async setTableRows() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "financial-reports/packages",
          params: {
            page: this.paginations.current_page,
            name: this.filterOptions.package_name,
            from: this.filterOptions.from_date,
            to: this.filterOptions.to_date,
          },
        });
        this.loading = false;
        this.tableRows = res.data.data.data.data;
        this.totals.total_purchases = res.data.data.totals.total_purchases;
        this.totals.total_revenue = res.data.data.totals.total_revenue;
        this.totals.total_application_profit =
          res.data.data.totals.total_application_profit;
        this.totals.total_tax = res.data.data.totals.total_tax;
        this.paginations.items_per_page = res.data.data.data.meta.per_page;
        this.paginations.last_page = res.data.data.data.meta.last_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async downloadPdf() {
      await this.$refs.html2Pdf.generatePdf();
    },
    async downloadExcelAllData() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "financial-reports/packages",
          params: {
            packageName: this.filterOptions.package_name,
            from: this.filterOptions.from_date,
            to: this.filterOptions.to_date,
          },
        });
        const allData = res.data.data.data.data;

        // Map data with translated headers, using ordered index instead of package_id
        const translatedData = allData.map((row, index) => {
          if (this.getAppLocale == "ar") {
            return {
              [this.$t("PLACEHOLDERS.total_tax")]: row.total_tax,
              [this.$t("PLACEHOLDERS.total_application_profit")]:
                row.total_application_profit,
              [this.$t("PLACEHOLDERS.total_revenue")]: row.total_revenue,
              [this.$t("PLACEHOLDERS.total_purchases")]: row.total_purchases,
              [this.$t("PLACEHOLDERS.package_name")]: row.package_name,
              [this.$t("PLACEHOLDERS.auction_order")]: Number(row.auction_order),
              [this.$t("TABLES.Admins.serialNumber")]: index + 1,
            };
          } else {
            return {
              [this.$t("TABLES.Admins.serialNumber")]: index + 1,
              [this.$t("PLACEHOLDERS.auction_order")]: Number(row.auction_order),
              [this.$t("PLACEHOLDERS.package_name")]: row.package_name,
              [this.$t("PLACEHOLDERS.total_purchases")]: row.total_purchases,
              [this.$t("PLACEHOLDERS.total_revenue")]: row.total_revenue,
              [this.$t("PLACEHOLDERS.total_application_profit")]:
                row.total_application_profit,
              [this.$t("PLACEHOLDERS.total_tax")]: row.total_tax,
            };
          }
        });
        translatedData.push({});
        // Set Excel file direction based on locale
        if (this.getAppLocale === "ar") {
          // Append overall statistics at the bottom
          translatedData.push({
            [this.$t("PLACEHOLDERS.package_name")]: this.$t(
              "PLACEHOLDERS.total_application_profit"
            ),
            [this.$t("PLACEHOLDERS.total_purchases")]:
              this.totals.total_application_profit,
          });

          translatedData.push({
            [this.$t("PLACEHOLDERS.package_name")]: this.$t(
              "PLACEHOLDERS.total_tax"
            ),
            [this.$t("PLACEHOLDERS.total_purchases")]: this.totals.total_tax,
          });
        } else {
          // Append overall statistics at the bottom
          translatedData.push({
            [this.$t("TABLES.Admins.serialNumber")]: this.$t(
              "PLACEHOLDERS.total_application_profit"
            ),
            [this.$t("PLACEHOLDERS.auction_order")]:
              this.totals.total_application_profit,
          });

          translatedData.push({
            [this.$t("TABLES.Admins.serialNumber")]: this.$t(
              "PLACEHOLDERS.total_tax"
            ),
            [this.$t("PLACEHOLDERS.auction_order")]: this.totals.total_tax,
          });
        }

        const worksheet = XLSX.utils.json_to_sheet(translatedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Reports");

        // Generate Excel file
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const data = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${this.$t("PLACEHOLDERS.packages_report")}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      } finally {
        this.loading = false;
      }
    },
  },

  created() {
    this.setTableRows();
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

.all-stat th {
  color: white !important;
  font-size: 16px !important;
  font-weight: 800;
}

.excel {
  background: darkgreen;
  padding: 7px 10px;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
}
</style>
