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
                :placeholder="$t('PLACEHOLDERS.name')"
                v-model.trim="filterOptions.name"
              />
              <!-- End:: Name Input -->

              <!-- Start:: Email Input -->
              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.email')"
                v-model.trim="filterOptions.email"
              />
              <!-- End:: Email Input -->

              <!-- Start:: Phone Input -->
              <base-input
                col="3"
                type="tel"
                :placeholder="$t('TABLES.Clients.phone')"
                v-model.trim="filterOptions.phone"
              />
              <!-- End:: Phone Input -->

              <!-- Start:: Roles Input -->
              <!-- <base-select-input
                v-if="allRoles"
                col="3"
                :optionsList="allRoles"
                :placeholder="$t('PLACEHOLDERS.role')"
                v-model="filterOptions.role"
              /> -->
              <!-- End:: Roles Input -->

              <!-- Start:: Status Input -->
              <base-select-input
                col="3"
                :optionsList="activeStatuses"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.isActive"
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
          <h5>{{ $t("TITLES.admins") }}</h5>
          <button
            v-if="!filterFormIsActive"
            class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive"
          >
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div class="title_route_wrapper" v-if="$can('create-admin', 'Admins') || $can('create-admin', 'المدراء')">
          <router-link to="/admins/create">
            {{ $t("BUTTONS.addAdmin") }}
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
        <!-- Start:: No Data State -->

        <!-- Start:: Item Image -->
        <template v-slot:[`item.avatar`]="{ item }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.avatar">
              {{ $t("TABLES.noData") }}
            </h6>

            <button class="my-1" @click="showImageModal(item.avatar)" v-else>
              <img
                class="rounded"
                :src="item.avatar"
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
          <span v-if="!item.phone">
            -
          </span>
          <span v-else> {{ item.phone }} </span>
        </template>
        <!-- End:: Phone -->

        <!-- Start:: Email -->
        <template v-slot:[`item.email`]="{ item }">
          <span v-if="!item.email">
            -
          </span>
          <span v-else> {{ item.email }} </span>
        </template>
        <!-- End:: Email -->

        <!-- Start:: Activation Status -->
        <template v-slot:[`item.status`]="{ item }">
          <span class="text-success text-h5" v-if="item?.status == 'active'">
            <i class="far fa-check"></i>
          </span>
          <span class="text-danger text-h5" v-else>
            <i class="far fa-times"></i>
          </span>
        </template>
        <!-- End:: Activation Status -->

        <!-- Start:: role_obj -->
        <!-- <template v-slot:[`item.role_obj`]="{ item }">
          <h6 class="text-danger" v-if="!item.role_obj.length">
            {{ $t("TABLES.noData") }}
          </h6>

          <div v-else>
            <v-chip
              color="blue-grey darken-3"
              text-color="white"
              small
              v-for="(role, index) in item.role_obj"
              :key="'k' + index"
            >
              {{ role.name }}
            </v-chip>
          </div>
        </template> -->
        <!-- End:: role_obj -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip placement="bottom" v-if="$can('read-admin', 'Admins') || $can('read-admin', 'المدراء')">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <a-tooltip
              placement="bottom"
              v-if="$can('update-admin', 'Admins') || $can('update-admin', 'المدراء') && item?.id !== 1"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>
              <button class="btn_edit" @click="editItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip>

            <a-tooltip
              placement="bottom"
              v-if="$can('delete-admin', 'Admins') || $can('delete-admin', 'المدراء') && item?.id !== 1"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>

            <template v-if="$can('activate-admin', 'Admins') || $can('activate-admin', 'المدراء') && item?.id !== 1">
              <a-tooltip placement="bottom" v-if="!item?.is_active">
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
              <a-tooltip placement="bottom" v-if="item?.is_active">
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
                  :disabled="!!!deactivateReason || deactivateReason?.length < 3"
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
  name: "AllAdmins",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      //allRoles: "ApiGetsModule/allRoles",
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
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        phone: null,
        email: null,
        role: null,
        isActive: null,
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
        // {
        //   text: this.$t("TABLES.Admins.image"),
        //   value: "avatar",
        //   align: "center",
        //   sortable: false,
        // },
        {
          text: this.$t("TABLES.Admins.name"),
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Admins.phone"),
          value: "phone",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Admins.email"),
          value: "email",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.role"),
          value: "roles[0].name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Admins.joiningDate"),
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.status"),
          value: "status",
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
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== "1") {
        await this.$router.push({ path: "/admins/all", query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.phone = null;
      this.filterOptions.email = null;
      this.filterOptions.role = null;
      this.filterOptions.isActive = null;
      if (this.$route.query.page !== "1") {
        await this.$router.push({ path: "/admins/all", query: { page: 1 } });
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
          url: "users?filter[user_type]=individual",
          params: {
            page: this.paginations.current_page,
            search: this.filterOptions.name,
            'filter[email]': this.filterOptions.email,
            'filter[phone]': this.filterOptions.phone,
            'filter[is_active]': this.filterOptions.isActive?.value,
          },
        });
        this.loading = false;
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.pagination?.last_page;
        this.paginations.items_per_page = res.data.pagination?.per_page;
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
    selectDeactivateItem(item) {
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },
    async HandlingItemActivationStatus(selectedItem) {
      this.dialogDeactivate = false;
      let targetItem = this.itemToChangeActivationStatus
        ? this.itemToChangeActivationStatus
        : selectedItem;
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.deactivateReason) {
        REQUEST_DATA.append("reason", this.deactivateReason);
      }
      // REQUEST_DATA.append("is_active", targetItem.is_active == 1 ? 0 : 1);
      // Start:: Append Request Data
      // REQUEST_DATA.append("_method", "PUT");

      try {
        await this.$axios({
          method: "POST",
          url: `admins/toggle/${targetItem?.id}`,
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

    // ==================== Start:: Crud ====================
    // ===== Start:: End
    editItem(item) {
      this.$router.push({ path: `/admins/edit/${item?.id}` });
    },
    showItem(item) {
      this.$router.push({ path: `/admins/show/${item?.id}` });
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
          url: `admins/${this.itemToDelete?.id}`,
        });
        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => {
          return item.id != this.itemToDelete?.id;
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Delete
    // ==================== End:: Crud ====================

    // Start:: Vuex Actions
    //...mapActions({
    //  getRoles: "ApiGetsModule/getRoles",
    //}),
    // End:: Vuex Actions
  },

  async created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    //await this.getRoles();
    // End:: Fire Methods
  },
};
</script>
