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
                col="8"
                type="text"
                :placeholder="$t('TABLES.Notifications.title')"
                v-model.trim="filterOptions.name"
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
          <h5>{{ $t("TOOLTIPS.notifications") }}</h5>
          <button
            v-if="!filterFormIsActive"
            class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive"
          >
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div
          class="title_route_wrapper"
          v-if="$can('notifications create', 'notifications')"
        >
          <router-link to="/all-notifications/create">
            {{ $t("BUTTONS.add_notification") }}
          </router-link>
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
        <!-- End:: No Data State -->

        <template v-slot:[`item.serialNumber`]="{ item }">
          <p
            class="blue-grey--text text--darken-1 fs-3"
            v-if="!item.serialNumber"
          >
            -
          </p>
          <p v-else>{{ item.serialNumber }}</p>
        </template>

        <template v-slot:[`item.created_at`]="{ item }">
          <p
            class="blue-grey--text text--darken-1 fs-3"
            v-if="!item.created_at"
          >
            -
          </p>
          <p v-else>{{ item.created_at }}</p>
        </template>

        <!-- Start:: Notification Content -->
        <!-- <template v-slot:[`item.data.body`]="{ item }">
          <span class="text-danger" v-if="!item.data.body">
            {{ $t("TABLES.noData") }}
          </span>
          <div class="actions" v-else>
            <button
              class="btn_show"
              @click="showNotificationModal(item.data.body)"
            >
              <i class="fal fa-file-alt"></i>
            </button>
          </div>
        </template> -->
        <template v-slot:[`item.data.title`]="{ item }">
          <h6 class="text-danger" v-if="!item?.title">---</h6>
          <div v-if="item?.title">
            {{ item?.title }}
          </div>
        </template>
        <template v-slot:[`item.data.body`]="{ item }">
          <h6 class="text-danger" v-if="!item?.body">---</h6>
          <div
            class="dis"
            v-if="item?.body"
            @click="showDescriptionModal(item?.body)"
          >
            <i class="fas fa-file-alt"></i>
          </div>
        </template>
        <!-- End:: Notification Content -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip
              placement="bottom"
              v-if="$can('notifications index', 'notifications')"
            >
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
          <!-- Start:: Notification Modal -->
          <description-modal
            v-if="dialogNotification"
            :modalIsOpen="dialogNotification"
            :modalDesc="selectedNotificationTextToShow"
            @toggleModal="dialogNotification = !dialogNotification"
          />
          <!-- End:: Notification Modal -->
        </template>
        <!-- ======================== End:: Dialogs ======================== -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->
    <description-modal
      v-if="dialogDescription"
      :modalIsOpen="dialogDescription"
      :modalDesc="selectedDescriptionTextToShow"
      @toggleModal="dialogDescription = !dialogDescription"
    />
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
  name: "AllNotifications",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  data() {
    return {
      // Start:: Loading Data
      dialogNotification: false,
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
      },
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
          text: this.$t("TABLES.Notifications.title"),
          value: "data.title",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Notifications.notification"),
          value: "data.body",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Notifications.date"),
          value: "created_at",
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
      // End:: Table
      dialogDescription: false,
      selectedDescriptionTextToShow: "",

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
    showDescriptionModal(description) {
      this.dialogDescription = true;
      this.selectedDescriptionTextToShow = description;
    },
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/all-notifications/all",
          query: { page: 1 },
        });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/all-notifications/all",
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
          // url: "notification/admin-notifications",
          url: "notification/all_notifications",
          params: {
            page: this.paginations.current_page,
            title: this.filterOptions.name,
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
    showNotificationModal(notification) {
      this.dialogNotification = true;
      this.selectedNotificationTextToShow = notification;
    },
    // End:: Control Modals

    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/all-notifications/show/${item.id}` });
    },
    // ===== End:: Show
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

<style scoped>
.dis {
  cursor: pointer;
}
.dis i {
  font-size: 20px;
}
</style>
