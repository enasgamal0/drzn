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
              <!-- Start::company name Input -->
              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.full_name')"
                v-model.trim="filterOptions.influencer_name"
              />

              <!-- End::company Name Input -->
              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.phone')"
                v-model="filterOptions.phone"
              />

              <!-- Start:: nationality Input -->
              <base-select-input
                :optionsList="nationalities"
                col="3"
                :placeholder="$t('PLACEHOLDERS.nationality')"
                v-model="filterOptions.nationality"
              />
              <!-- End:: nationality Input -->

              <!-- Start:: country Input -->
              <base-select-input
                :optionsList="countries"
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.country')"
                v-model="filterOptions.country"
              />
              <!-- End:: country Input -->

              <!-- Start:: area Input -->
              <base-select-input
                :optionsList="areas"
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.area')"
                v-model="filterOptions.area"
              />
              <!-- End:: area Input -->

              <!-- Start:: city Input -->
              <base-select-input
                :optionsList="cities"
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.city')"
                v-model="filterOptions.city"
              />
              <!-- End:: city Input -->

              <!-- Start:: district Input -->
              <base-select-input
                :optionsList="districts"
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.district')"
                v-model="filterOptions.district"
              />
              <!-- End:: district Input -->

              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.street')"
                v-model="filterOptions.street"
              />
              <div
                v-if="!showAllFilters && !filterFormIsActive"
                class="text-center"
                style="height: 80px"
              >
                <img
                  @click="showAllFilters = true"
                  alt="Arrow Down"
                  src="../../../assets/media/icons/ui_icons/arrow_down.svg"
                  style="width: 30px; height: 30px; cursor: pointer"
                />
              </div>
              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.address')"
                v-model="filterOptions.full_address"
                v-if="showAllFilters || filterFormIsActive"
              />
              <base-input
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.zip_code')"
                v-model="filterOptions.zip_code"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-input
                col="3"
                type="date"
                :placeholder="$t('TABLES.Users.joiningDate')"
                v-model="filterOptions.date"
                v-if="showAllFilters || filterFormIsActive"
              />
              <base-select-input
                :optionsList="genders"
                col="3"
                type="text"
                :placeholder="$t('PLACEHOLDERS.gender')"
                v-model="filterOptions.gender"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-select-input
                col="3"
                :optionsList="yesOrNo"
                :placeholder="$t('PLACEHOLDERS.verified')"
                v-model.trim="filterOptions.verified"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-select-input
                col="3"
                :optionsList="yesOrNo"
                :placeholder="$t('PLACEHOLDERS.mothoq')"
                v-model.trim="filterOptions.mothoq"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-select-input
                col="3"
                :optionsList="yesOrNo"
                :placeholder="$t('PLACEHOLDERS.speak')"
                v-model.trim="filterOptions.speak"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-select-input
                col="3"
                :optionsList="yesOrNo"
                :placeholder="$t('PLACEHOLDERS.face')"
                v-model.trim="filterOptions.face"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-select-input
                col="3"
                :optionsList="yesOrNo"
                :placeholder="$t('PLACEHOLDERS.hijab')"
                v-model.trim="filterOptions.hijab"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-select-input
                col="3"
                :optionsList="maritalStatus"
                :placeholder="$t('PLACEHOLDERS.marital_status')"
                v-model.trim="filterOptions.marital_status"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-select-input
                col="3"
                :optionsList="yesOrNo"
                :placeholder="$t('PLACEHOLDERS.children')"
                v-model.trim="filterOptions.children"
                v-if="showAllFilters || filterFormIsActive"
              />

              <base-select-input
                col="3"
                :optionsList="platforms"
                :placeholder="$t('PLACEHOLDERS.best_platform')"
                v-model.trim="filterOptions.best_platform"
                v-if="showAllFilters || filterFormIsActive"
              />
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.full_name')"
                v-model="filterOptions.full_name"
                v-if="showAllFilters || filterFormIsActive"
              />
              <base-select-input
                col="6"
                :optionsList="hobbies"
                :placeholder="$t('PLACEHOLDERS.hobbies')"
                v-model.trim="filterOptions.hobbies"
                :multiple="true"
                v-if="showAllFilters || filterFormIsActive"
              />

              <div
                v-if="showAllFilters && !filterFormIsActive"
                class="text-center"
                style="height: 80px"
              >
                <img
                  alt="Arrow Down"
                  src="../../../assets/media/icons/ui_icons/arrow_up.svg"
                  style="width: 30px; height: 30px; cursor: pointer"
                  @click="showAllFilters = false"
                />
              </div>
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
          <h5>{{ $t("PLACEHOLDERS.influencers_management") }}</h5>
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
          v-if="$can('influencers create', 'influencers')"
        >
          <router-link to="/influencers/create">
            {{ $t("PLACEHOLDERS.add_influencer") }}
          </router-link>
          <label
            for="influencer-upload"
            :style="{ cursor: isWaitingRequest ? 'not-allowed' : 'pointer' }"
          >
            {{ $t("PLACEHOLDERS.add_influencer_excel") }}
          </label>

          <!-- Hidden file input -->
          <input
            type="file"
            id="influencer-upload"
            class="hidden"
            style="display: none !important"
            accept=".xlsx,.xls,.csv"
            @input="importExcelFile"
            :disabled="isWaitingRequest"
          />
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
        <template v-slot:[`item.id`]="{ item, index }">
          <div class="table_image_wrapper">
            <!-- <h6 class="text-danger" v-if="!item.id">
              {{ $t("TABLES.noData") }}
            </h6> -->
            <p>
              {{
                (paginations.current_page - 1) * paginations.items_per_page +
                index +
                1
              }}
            </p>
          </div>
        </template>
        <!-- End:: Item Image -->
        <!-- Start:: Activation -->
        <template v-slot:[`item.is_active`]="{ item }">
          <!-- v-if="permissions.activate" -->
          <div
            class="activation"
            dir="ltr"
            style="z-index: 1"
            v-if="$can('influencers activate', 'influencers')"
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

        <!-- Start:: Item is_verified -->
        <template v-slot:[`item.is_verified`]="{ item, index }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="item.is_verified">
              {{ $t("PLACEHOLDERS.active") }}
            </h6>

            <p v-else>{{ $t("PLACEHOLDERS.notActive") }}</p>
          </div>
        </template>
        <!-- End:: Item Image -->

        <!-- Start:: Title -->
        <template v-slot:[`item.title`]="{ item }">
          <p class="text-danger" v-if="!item.title">
            {{ $t("TABLES.noData") }}
          </p>
          <p v-else>{{ item.title }}</p>
        </template>

        <template v-slot:[`item.city.name`]="{ item }">
          <p v-if="!item.city?.name">
            -
          </p>
          <p v-else>{{ item.city?.name }}</p>
        </template>

        <template v-slot:[`item.user.companyName`]="{ item }">
          <p class="text-danger" v-if="!item.user.companyName">
            {{ $t("TABLES.noData") }}
          </p>
          <p v-else>{{ item.user.companyName }}</p>
        </template>
        <!-- End:: Title -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip
              placement="bottom"
              v-if="$can('influencers delete', 'influencers')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>
            <a-tooltip
              placement="bottom"
              v-if="$can('influencers edit', 'influencers')"
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
              v-if="$can('influencers show', 'influencers')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <a-tooltip
              placement="bottom"
              v-if="$can('influencers show', 'influencers')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.social") }}</span>
              </template>
              <button class="btn_show" @click="showItemAccounts(item)">
                <i class="fal fa-star text-primary"></i>
              </button>
            </a-tooltip>

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

          <!-- Start:: Description Modal -->
          <description-modal
            v-if="dialogDescription"
            :modalIsOpen="dialogDescription"
            :modalDesc="selectedDescriptionTextToShow"
            @toggleModal="dialogDescription = !dialogDescription"
          />
          <!-- End:: Description Modal -->

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

          <v-dialog v-model="dialogStatusAccept">
            <v-card>
              <v-card-title class="text-h5 justify-center">
                {{ $t("PLACEHOLDERS.accept_settlement_request") }}
              </v-card-title>
              <div class="w-100">
                <div class="mt-3">
                  <h6 class="d-inline-block font-weight-bold mb-4">
                    {{ $t("SIDENAV.Clients.user_balance") }}:
                  </h6>
                  <h6 class="d-inline-block mx-1">
                    {{ modalRequest?.amount }}
                    {{ $t("PLACEHOLDERS.riyal") }}
                  </h6>
                  <div>
                    <label class="font-weight-bold mx-1"
                      >{{ $t("PLACEHOLDERS.settlement_request_money") }}:
                    </label>
                    <input
                      type="number"
                      v-model.trim="modalRequest.money"
                      class="bg-white rounded mx-3 p-2 w-25"
                    />
                    <span>{{ $t("PLACEHOLDERS.riyal") }}</span>
                    <div class="text-center mt-5">
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-success text-white"
                        @click="
                          openRequestStatusModal(modalRequest, 'accepted')
                        "
                        >{{ $t("BUTTONS.save") }}</v-btn
                      >
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-danger text-white"
                        @click="cancelRequest()"
                        >{{ $t("BUTTONS.cancel") }}</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogStatusReject">
            <v-card>
              <!-- <v-card-title class="text-h5 justify-center">
                {{ $t("PLACEHOLDERS.accept_settlement_request") }}
              </v-card-title> -->
              <div class="w-100">
                <div class="mt-3">
                  <div>
                    <label class="font-weight-bold mx-1"
                      >{{ $t("PLACEHOLDERS.reason_reject") }}:
                    </label>
                    <input
                      type="textarea"
                      rows="4"
                      v-model.trim="modalRequest.reason"
                      class="bg-white rounded p-2 w-100 mt-4"
                    />
                    <div class="text-center mt-5">
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-success text-white"
                        @click="
                          openRequestStatusModal(modalRequest, 'rejected')
                        "
                        >{{ $t("BUTTONS.save") }}</v-btn
                      >
                      <v-btn
                        class="modal_confirm_btn mx-1 bg-danger text-white"
                        @click="cancelRequest()"
                        >{{ $t("BUTTONS.cancel") }}</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>
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
          id: 5,
          name: this.$t("STATUS.pending"),
          value: "pending",
        },
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: "active",
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: "inactive",
        },
        {
          id: 3,
          name: this.$t("STATUS.blocked"),
          value: "blocked",
        },
        {
          id: 4,
          name: this.$t("STATUS.no_response"),
          value: "no_response",
        },
      ];
    },
    yesOrNo() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
    genders() {
      return [
        {
          id: 1,
          name: this.$t("TABLES.Users.male"),
          value: "male",
        },
        {
          id: 2,
          name: this.$t("TABLES.Users.female"),
          value: "female",
        },
      ];
    },
    socialTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.x"),
          value: "x",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.facebook"),
          value: "facebook",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.tiktok"),
          value: "tiktok",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.snapchat"),
          value: "snapchat",
        },
        {
          id: 5,
          name: this.$t("PLACEHOLDERS.youtube"),
          value: "youtube",
        },
        {
          id: 6,
          name: this.$t("PLACEHOLDERS.instagram"),
          value: "instagram",
        },
      ];
    },
    platforms() {
      return [
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.tiktok"),
          value: "tiktok",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.snapchat"),
          value: "snapchat",
        },
        {
          id: 6,
          name: this.$t("PLACEHOLDERS.instagram"),
          value: "instagram",
        },
      ];
    },

    maritalStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.single"),
          value: "single",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.married"),
          value: "married",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.divorced"),
          value: "divorced",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.widowed"),
          value: "widowed",
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
        influencer_name: null,
        phone: null,
        email: null,
        nationality: null,
        country: null,
        city: null,
        area: null,
        district: null,
        full_name: null,
        zip_code: null,
        street: null,
        full_address: null,
        verified: null,
        mothoq: null,
        speak: null,
        face: null,
        hijab: null,
        marital_status: null,
        children: null,
        best_platform: null,
        date: null,
        hobbies: null,
      },
      // End:: Filter Data
      nationalities: [],
      countries: [],
      areas: [],
      cities: [],
      districts: [],
      hobbies: [],
      showAllFilters: false,
      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.full_name"),
          value: "name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.influencer_name"),
          value: "full_name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.phone"),
          value: "mobile",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("SIDENAV.Cities.name"),
          value: "city.name",
          sortable: false,
          align: "center",
        },
        // {
        //   text: this.$t("PLACEHOLDERS.country"),
        //   value: "country_id.name",
        //   sortable: false,
        //   align: "center",
        // },
        // {
        //   text: this.$t("PLACEHOLDERS.nationality"),
        //   value: "nationality_id.name",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: this.$t("PLACEHOLDERS.gender"),
          value: "_gender",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.status"),
          value: "is_active",
          sortable: false,
          align: "center",
        },
        // {
        //   text: this.$t("PLACEHOLDERS.created_at"),
        //   value: "created_at",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: this.$t("TABLES.Roles.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data

      dialogStatusAccept: false,
      dialogStatusReject: false,

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

      currentRequest: {
        money: null,
        reason: "",
      },
      modalRequest: {},
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
          path: "/influencers/all",
          query: { page: 1 },
        });
      }
      this.setTableRows();
    },

    // Start:: Change Activation Status
    async changeActivationStatus(item) {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      // REQUEST_DATA.append("_method", "PUT");
      try {
        await this.$axios({
          method: "POST",
          url: `influencers/toggle-status/${item.id}`,
          data: REQUEST_DATA,
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Activation Status

    // Start:: Import Excel File
    async importExcelFile(event) {
      this.isWaitingRequest = true;
      const input = event.target;
      const file = input.files[0];
      // if (!file) {
      //   return;
      // }
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("file", file);

      try {
        let res = await this.$axios({
          method: "POST",
          url: `influencers/import`,
          data: REQUEST_DATA,

        });
        this.setTableRows();
        this.$message.success(
          this.$t("MESSAGES.excel_success")
        );
      } catch (error) {
        this.$message.error(
          error?.response?.data?.message || this.$t("MESSAGES.uploadFailed")
        );
      } finally {
        this.isWaitingRequest = false;
        input.value = null;
      }
    },
    // End:: Import Excel File

    // start accepted  influencer request
    async approvedInfluencers(item, status) {
      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("status", status);
      try {
        await this.$axios({
          method: "POST",
          url: `influencers/change-statusRequest/${item.id}`,
          data: REQUEST_DATA,
        });
        this.setTableRows();

        this.$message.success(this.$t("MESSAGES.accept_join_request"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `influencers/${this.itemToDelete.id}`,
        });
        this.dialogDelete = false;
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // end accepted influencer request
    async resetFilter() {
      this.filterOptions.influencer_name = null;
      this.filterOptions.phone = null;
      this.filterOptions.nationality = null;
      this.filterOptions.country = null;
      this.filterOptions.city = null;
      this.filterOptions.area = null;
      this.filterOptions.district = null;
      this.filterOptions.full_name = null;
      this.filterOptions.zip_code = null;
      this.filterOptions.street = null;
      this.filterOptions.full_address = null;
      this.filterOptions.verified = null;
      this.filterOptions.mothoq = null;
      this.filterOptions.speak = null;
      this.filterOptions.face = null;
      this.filterOptions.hijab = null;
      this.filterOptions.marital_status = null;
      this.filterOptions.children = null;
      this.filterOptions.best_platform = null;
      this.filterOptions.date = null;
      this.filterOptions.gender = null;
      this.filterOptions.hobbies = null;

      if (this.$route.query.page !== "1") {
        await this.$router.push({
          path: "/influencers/all",
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
        let params = {
          page: this.paginations.current_page,
          name: this.filterOptions.influencer_name,
          mobile: this.filterOptions.phone,
          country_id: this.filterOptions.country?.id,
          nationality_id: this.filterOptions.nationality?.id,
          city_id: this.filterOptions.city?.id,
          area_id: this.filterOptions.area?.id,
          district_id: this.filterOptions.district?.id,
          full_name: this.filterOptions.full_name,
          zip_code: this.filterOptions.zip_code,
          street: this.filterOptions.street,
          full_address: this.filterOptions.full_address,
          verified: this.filterOptions.verified?.value,
          mothoq: this.filterOptions.mothoq?.value,
          speak: this.filterOptions.speak?.value,
          face: this.filterOptions.face?.value,
          hajib: this.filterOptions.hijab?.value,
          gender: this.filterOptions.gender?.value,
          married: this.filterOptions.marital_status?.value,
          have_child: this.filterOptions.children?.value,
          best_platform: this.filterOptions.best_platform?.value,
          birth_date: this.filterOptions.date,
        };
        if (Array.isArray(this.filterOptions.hobbies)) {
          params["hobbies"] = this.filterOptions.hobbies
            .filter((hobby) => hobby?.id)
            .map((hobby) => hobby.id);
        }
        let res = await this.$axios({
          method: "GET",
          url: "influencers?status=accepted",
          params: params,
        });
        this.loading = false;
        this.tableRows = res.data.data.data;
        this.paginations.last_page = res.data.data.meta.last_page;
        this.paginations.items_per_page = res.data.data.meta.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // Start:: Change Activation Status
    openRequestStatusModal(item, status) {
      if (status == "accepted") {
        this.approvedInfluencers(item, status);
      } else if (status == "rejected") {
        this.dialogStatusReject = true;
      }
      this.modalRequest = { ...item };
      this.currentRequest = item;
    },
    // async changeRequestStatus(modalRequest, status) {
    //   const REQUEST_DATA = new FormData();
    //   REQUEST_DATA.append("status", status);

    //   if (status === "rejected" && modalRequest?.reason) {
    //     REQUEST_DATA.append("reason", modalRequest?.reason);
    //   }
    //   // if (status === "accepted" && modalRequest?.money) {
    //   //   REQUEST_DATA.append("amount", modalRequest?.money);
    //   // }

    //   try {
    //     let res = await this.$axios({
    //       method: "POST",
    //       url: `influencers/status/${modalRequest.id}`,
    //       data: REQUEST_DATA,
    //     });

    //     this.setTableRows();
    //     this.dialogStatusAccept = false;
    //     this.dialogStatusReject = false;
    //     this.$message.success(res.data.message);
    //   } catch (error) {
    //     this.$message.error(error.response.data.message);
    //   }
    // },

    cancelRequest() {
      this.dialogStatusAccept = false;
      this.dialogStatusReject = false;
    },
    // End:: Change Activation Status
    async getCountries() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `/countries?page=0&limit=0&is_active=1&ignorePermissionCheck=1`,
        });
        this.countries = res.data.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getAreas() {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `areas?is_active=1&page=0&limit=0&ignorePermissionCheck=1`,
        });

        this.areas = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getCities() {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `cities?is_active=1&page=0&limit=0&ignorePermissionCheck=1`,
        });

        this.cities = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getDistricts() {
      // this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `districts?is_active=1&page=0&limit=0&ignorePermissionCheck=1`,
        });

        this.districts = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getHobbies() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `hobbies?is_active=1&page=0&limit=0&ignorePermissionCheck=1`,
        });

        this.hobbies = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getNationalities() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `nationalities?page=0&limit=0&is_active=1&ignorePermissionCheck=1`,
        });
        this.nationalities = res.data.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },

    // ==================== Start:: Crud ====================
    // ===== Start:: End
    editItem(item) {
      this.$router.push({ path: `/influencers/edit/${item.id}` });
    },

    showItem(item) {
      this.$router.push({ path: `/influencers/show/${item.id}` });
    },
    showItemAccounts(item) {
      this.$router.push({ path: `/influencers/show-accounts/${item.id}` });
    },
    // ===== End:: End

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
    this.getNationalities();
    this.getCountries();
    this.getAreas();
    this.getCities();
    this.getDistricts();
    this.getHobbies();
    this.setTableRows();
    // End:: Fire Methods
  },
};
</script>
