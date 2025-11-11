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
                :placeholder="$t('PLACEHOLDERS.advertiser_name')"
                v-model="filterOptions.advertiser_name"
              />

              <base-input
                col="5"
                type="text"
                :placeholder="$t('PLACEHOLDERS.advertiser_mobile')"
                v-model="filterOptions.advertiser_mobile"
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
            {{ $t("PLACEHOLDERS.auctions_report") }}
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

        <template v-slot:[`item.serial`]="{ item, index }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.advertiser_id">
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
                  {{ $t("PLACEHOLDERS.total_app_profit") }}
                </th>
                <th class="text-center" style="color: white !important">
                  {{ $t("PLACEHOLDERS.total_paid_tax") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center">
                <td>{{ totals.total_paid_price }}</td>
                <td>{{ totals.total_paid_tax }}</td>
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
      :filename="$t('PLACEHOLDERS.auctions_report')"
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
            {{ $t("PLACEHOLDERS.auctions_report") }}
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
                <tr v-for="(row, index) in tableRows" :key="row.advertiser_id">
                  <td>
                    {{
                      (paginations.current_page - 1) *
                        paginations.items_per_page +
                      index +
                      1
                    }}
                  </td>
                  <td>{{ row.advertiser_name }}</td>
                  <td>{{ row.advertiser_mobile }}</td>
                  <td>{{ row.total_finished_auctions }}</td>
                  <td>{{ row.sum_last_bid }}</td>
                  <td>{{ row.total }}</td>
                  <td>{{ row.total_paid_price }}</td>
                  <td>{{ row.total_paid_tax }}</td>
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
                      {{ $t("PLACEHOLDERS.total_app_profit") }}
                    </th>
                    <th class="text-center" style="color: white !important">
                      {{ $t("PLACEHOLDERS.total_paid_tax") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center">
                    <td>{{ totals.total_paid_price }}</td>
                    <td>{{ totals.total_paid_tax }}</td>
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
        advertiser_name: null,
        advertiser_mobile: null,
        from_date: null,
        to_date: null,
      },
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "advertiser_id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.advertiser_name"),
          value: "advertiser_name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.advertiser_mobile"),
          value: "advertiser_mobile",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_finished_auctions"),
          value: "total_finished_auctions",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_finished_auctions_total"),
          value: "sum_last_bid",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_money"),
          value: "total",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_app_profit"),
          value: "total_paid_price",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.total_paid_tax"),
          value: "total_paid_tax",
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
        total_finished_auctions: 0,
        total_paid_price: 0,
        total_paid_tax: 0,
        total_app_profit: 0,
        total_tax_value: 0,
      },
    };
  },

  methods: {
    async submitFilterForm() {
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.advertiser_name = null;
      this.filterOptions.advertiser_mobile = null;
      this.filterOptions.from_date = null;
      this.filterOptions.to_date = null;
      this.setTableRows();
    },
    async setTableRows() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "financial-reports/auctions",
          params: {
            page: this.paginations.current_page,
            userName: this.filterOptions.advertiser_name,
            userMobile: this.filterOptions.advertiser_mobile,
            from: this.filterOptions.from_date,
            to: this.filterOptions.to_date,
          },
        });
        this.loading = false;
        this.tableRows = res.data.data.data.data;
        this.totals.total_finished_auctions =
          res.data.data.totals.total_finished_auctions;
        this.totals.total_paid_price = res.data.data.totals.total_paid_price;
        this.totals.total_paid_tax = res.data.data.totals.total_paid_tax;
        this.totals.total_app_profit = res.data.data.totals.total_app_profit;
        this.totals.total_tax_value = res.data.data.totals.total_tax_value;
        this.paginations.last_page = res.data.data.meta.last_page;
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
          url: "financial-reports/auctions",
          params: {
            userName: this.filterOptions.advertiser_name,
            userMobile: this.filterOptions.advertiser_mobile,
            from: this.filterOptions.from_date,
            to: this.filterOptions.to_date,
          },
        });
        const allData = res.data.data.data.data;

        // Map data with translated headers
        const translatedData = allData.map((row, index) => {
          if (this.getAppLocale == "ar") {
            return {
              [this.$t("PLACEHOLDERS.total_paid_tax")]: row.total_paid_tax,
              [this.$t("PLACEHOLDERS.total_app_profit")]: row.total_paid_price,
              [this.$t("PLACEHOLDERS.total_money")]: row.total,
              [this.$t("PLACEHOLDERS.total_finished_auctions_total")]:
                row.sum_last_bid,
              [this.$t("PLACEHOLDERS.total_finished_auctions")]:
                row.total_finished_auctions,
              [this.$t("PLACEHOLDERS.advertiser_mobile")]:
                row.advertiser_mobile,
              [this.$t("PLACEHOLDERS.advertiser_name")]: row.advertiser_name,
              [this.$t("TABLES.Admins.serialNumber")]: index + 1,
            };
          } else {
            return {
              [this.$t("TABLES.Admins.serialNumber")]: index + 1,
              [this.$t("PLACEHOLDERS.advertiser_name")]: row.advertiser_name,
              [this.$t("PLACEHOLDERS.advertiser_mobile")]:
                row.advertiser_mobile,
              [this.$t("PLACEHOLDERS.total_finished_auctions")]:
                row.total_finished_auctions,
              [this.$t("PLACEHOLDERS.total_finished_auctions_total")]:
                row.sum_last_bid,
              [this.$t("PLACEHOLDERS.total_money")]: row.total,
              [this.$t("PLACEHOLDERS.total_app_profit")]: row.total_paid_price,
              [this.$t("PLACEHOLDERS.total_paid_tax")]: row.total_paid_tax,
            };
          }
        });

        translatedData.push({});
        if (this.getAppLocale === "ar") {
          // Append overall statistics at the bottom
          translatedData.push({
            [this.$t("PLACEHOLDERS.advertiser_mobile")]: this.$t(
              "PLACEHOLDERS.total_app_profit"
            ),
            [this.$t("PLACEHOLDERS.total_finished_auctions")]:
              this.totals.total_paid_price,
          });

          // Append overall statistics at the bottom
          translatedData.push({
            [this.$t("PLACEHOLDERS.advertiser_mobile")]: this.$t(
              "PLACEHOLDERS.total_tax_value"
            ),
            [this.$t("PLACEHOLDERS.total_finished_auctions")]:
              this.totals.total_paid_tax,
          });
        } else {
          // Append overall statistics at the bottom
          translatedData.push({
            [this.$t("TABLES.Admins.serialNumber")]: this.$t(
              "PLACEHOLDERS.total_app_profit"
            ),
            [this.$t("PLACEHOLDERS.advertiser_name")]:
              this.totals.total_paid_price,
          });

          // Append overall statistics at the bottom
          translatedData.push({
            [this.$t("TABLES.Admins.serialNumber")]: this.$t(
              "PLACEHOLDERS.total_tax_value"
            ),
            [this.$t("PLACEHOLDERS.advertiser_name")]:
              this.totals.total_paid_tax,
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
          `${this.$t("PLACEHOLDERS.auctions_report")}.xlsx`
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
