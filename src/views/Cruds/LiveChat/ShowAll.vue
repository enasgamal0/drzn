<template>
  <div class="show_all_content_wrapper">
    <main>
      <!-- =========== Start:: Filter Form =========== -->
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
              <!-- Start:: Search -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('PLACEHOLDERS.name')"
                v-model.trim="filterOptions.search"
              />
              <!-- End:: Search -->

              <!-- Start:: Message Status -->
              <base-select-input
                col="6"
                :optionsList="messageStatuses"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.status"
              />
              <!-- End:: Message Status -->
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
      <!-- =========== End:: Filter Form =========== -->

      <!-- =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("SIDENAV.ContactMessages.liveChat") }}</h5>
          <button
            v-if="!filterFormIsActive"
            class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive"
          >
            <i class="fal fa-search"></i>
          </button>
        </div>
      </div>
      <!-- =========== End:: Table Title =========== -->

      <!-- =========== Start:: Data Table =========== -->
      <v-data-table
        class="thumb"
        :loading="loading"
        :loading-text="$t('TABLES.loadingData')"
        :headers="tableHeaders"
        :items="tableRows"
        item-class="ltr"
        :items-per-page="paginations.items_per_page"
        hide-default-footer
      >
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>

        <!-- Start:: Serial Number -->
        <template v-slot:[`item.serialNumber`]="{ index }">
          <p>
            {{
              (paginations.current_page - 1) * paginations.items_per_page +
              index +
              1
            }}
          </p>
        </template>
        <!-- End:: Serial Number -->

        <!-- Start:: User -->
        <template v-slot:[`item.user.name`]="{ item }">
          <div class="d-flex align-center justify-center gap-2">
            <!-- <img
              v-if="item.user && item.user.avatar"
              :src="item.user.avatar"
              alt="user"
              class="rounded-circle"
              width="40"
              height="40"
            />
            <v-avatar v-else color="grey" size="40">
              <i class="fal fa-user text-white"></i>
            </v-avatar> -->
            <span v-if="item.user">{{ item.user.name }}</span>
            <span v-else-if="item.is_anonymous">{{ $t("PLACEHOLDERS.guest") || "Guest" }}</span>
            <span v-else>{{ $t("PLACEHOLDERS.guest") || "Guest" }}</span>
          </div>
        </template>
        <!-- End:: User -->

        <!-- Start:: Phone Number -->
        <template v-slot:[`item.phone`]="{ item }">
          <span v-if="item.user && item.user.phone" dir="ltr">
            {{ item.user.phone }}
          </span>
          <span v-else>-</span>
        </template>
        <!-- End:: Phone Number -->

        <!-- Start:: Last Message -->
        <template v-slot:[`item.last_message.body`]="{ item }">
          <div class="actions" v-if="item.last_message?.body && item.last_message?.body.trim() !== ''">
            <button
              class="btn_show"
              @click="showReplayModal(item.last_message.body)"
            >
              <i class="fal fa-file-alt"></i>
            </button>
          </div>
          <div class="actions" v-else-if="item.last_message?.image">
            <button
              class="btn_show"
              @click="showReplayModal($t('PLACEHOLDERS.file'))"
            >
              <i class="fal fa-file-alt"></i>
            </button>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <!-- End:: Last Message -->

        <!-- Start:: Last Message Date -->
        <template v-slot:[`item.last_message.created_at`]="{ item }">
          <span v-if="item.last_message?.created_at">
            {{ formatDate(item.last_message.created_at) }}
          </span>
          <span v-else>--</span>
        </template>
        <!-- End:: Last Message Date -->

        <!-- Start:: Message Status -->
        <template v-slot:[`item.unread_count`]="{ item }">
          <v-chip
            v-if="item.unread_count > 0"
            color="red"
            text-color="white"
            small
          >
            {{ $t("STATUS.notReplied") }}
          </v-chip>
          <v-chip v-else color="green" text-color="white" small>
            {{ $t("STATUS.replied") }}
          </v-chip>
        </template>
        <!-- End:: Message Status -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions text-center">
            <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t("BUTTONS.chat") }}</span>
              </template>
              <button class="btn_chat" @click="showChat(item)">
                <i
                  class="fad fa-comments fs-5"
                  style="color: cornflowerblue"
                ></i>
              </button>
            </a-tooltip>
          </div>
        </template>
        <!-- End:: Actions -->
        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Replay Modal -->
          <description-modal
            v-if="dialogReplay"
            :modalIsOpen="dialogReplay"
            :modalDesc="selectedReplayTextToShow"
            @toggleModal="dialogReplay = !dialogReplay"
          />
          <!-- End:: Replay Modal -->

          <!-- Start:: Replay Modal -->
          <v-dialog v-model="dialogSendReplay">
            <v-card>
              <v-card-title class="text-h5 justify-center">
                {{ $t("TITLES.sendReplay") }}
              </v-card-title>

              <form class="w-100">
                <base-input
                  col="12"
                  rows="3"
                  type="textarea"
                  :placeholder="$t('PLACEHOLDERS.messageReplay')"
                  v-model.trim="messageReplay"
                  required
                />
              </form>

              <v-card-actions>
                <v-btn
                  class="modal_confirm_btn"
                  @click="sendReplay"
                  :disabled="!!!messageReplay || messageReplay?.length < 3"
                >
                  {{ $t("BUTTONS.replay") }}
                </v-btn>

                <v-btn
                  class="modal_cancel_btn"
                  @click="dialogSendReplay = false"
                  >{{ $t("BUTTONS.cancel") }}</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Replay Modal -->
        </template>
        <!-- ======================== End:: Dialogs ======================== -->
      </v-data-table>
      <!-- =========== End:: Data Table =========== -->
    </main>

    <!-- =========== Start:: Pagination =========== -->
    <div class="pagination_container text-center mt-3 mb-0">
      <v-pagination
        class="py-0"
        square
        v-model="paginations.current_page"
        :length="paginations.last_page"
        :total-visible="6"
        @input="updateRouterQueryParam($event)"
      />
    </div>
    <!-- =========== End:: Pagination =========== -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AllContactMessages",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    messageStatuses() {
      return [
        { id: 1, name: this.$t("STATUS.replied"), value: "closed" },
        { id: 2, name: this.$t("STATUS.notReplied"), value: "open" },
      ];
    },
  },

  data() {
    return {
      loading: false,
      isWaitingRequest: false,
      filterFormIsActive: false,
      dialogReplay: false,
      selectedReplayTextToShow: "",
      filterOptions: {
        search: null,
        status: null,
      },

      tableHeaders: [
        {
          text: "#",
          value: "serialNumber",
          align: "center",
          sortable: false,
          width: "80",
        },
        {
          text: this.$t("TABLES.ContactMessages.clientName"),
          value: "user.name",
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.phoneNumber"),
          value: "phone",
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.last_message"),
          value: "last_message.body",
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.last_message_status"),
          value: "unread_count",
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.data_last_message"),
          value: "last_message.created_at",
          align: "center",
        },
        {
          text: this.$t("TABLES.ContactMessages.actions"),
          value: "actions",
          align: "center",
        },
      ],

      tableRows: [],

      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 10,
      },
    };
  },

  methods: {
    showReplayModal(replay) {
      this.dialogReplay = true;
      this.selectedReplayTextToShow = replay;
    },
    formatDate(date) {
      if (!date) return "--";
      return new Date(date).toLocaleString();
    },

    async submitFilterForm() {
      this.paginations.current_page = 1;
      await this.setTableRows();
    },

    async resetFilter() {
      this.filterOptions = { search: null, status: null };
      this.paginations.current_page = 1;
      await this.setTableRows();
    },

    updateRouterQueryParam(pagenationValue) {
      this.paginations.current_page = pagenationValue;
      this.setTableRows();
      window.scrollTo(0, 0);
    },

    showChat(item) {
      this.$router.push({ path: `/live-chat/chat/${item?.id}` });
    },

    async setTableRows() {
      this.loading = true;
      try {
        const params = {
          page: this.paginations.current_page,
        };

        if (this.filterOptions.search) {
          params.search = this.filterOptions.search;
        }

        if (this.filterOptions.status?.value) {
          params["filter[status]"] = this.filterOptions.status.value;
        }

        const res = await this.$axios.get("conversations/admin", { params });

        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.pagination.last_page;
        this.paginations.items_per_page = res.data.pagination.per_page;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },

  created() {
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
  },
};
</script>

<style scoped>
.actions .btn_chat {
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
