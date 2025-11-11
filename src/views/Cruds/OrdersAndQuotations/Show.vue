<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div
      class="form_title_wrapper d-flex align-items-center justify-content-between"
    >
      <h4>{{ $t("SIDENAV.orders.show") }}</h4>
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Loader -->
    <!-- <div v-if="isWaitingRequest" class="text-center my-10">
      <v-progress-circular indeterminate color="#E1423D"></v-progress-circular>
    </div> -->
    <!-- End:: Loader -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>
        <div class="row">
          <!-- Basic info -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.orderNum')"
            v-model.trim="data.serial_number"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.service_name')"
            v-model.trim="data.sub_category"
            disabled
          />

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.city')"
            v-model.trim="data.city"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.district')"
            v-model.trim="data.district"
            disabled
          />

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.date')"
            v-model.trim="data.date"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.status')"
            v-model.trim="data.status_trans"
            disabled
          />

          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.user_name')"
            v-model.trim="data.user"
            disabled
          />

          <base-input
            v-if="data.note"
            col="12"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.note')"
            v-model.trim="data.note"
            disabled
          />

          <!-- Attachments -->
          <div class="col-12 mt-4 mb-3" v-if="data.attachments?.length > 0">
            <div class="section_header">
              <h5 class="section_title">
                <i class="fas fa-paperclip"></i>
                {{ $t("PLACEHOLDERS.attachments") }}
              </h5>
              <span class="attachments_count">{{ data.attachments.length }}</span>
            </div>
            
            <div class="attachments_grid">
              <a
                v-for="(file, index) in data.attachments"
                :key="index"
                :href="file.attachment"
                target="_blank"
                class="attachment_card"
              >
                <div class="attachment_preview">
                  <img
                    v-if="isImage(file.attachment)"
                    :src="file.attachment"
                    alt="attachment"
                    class="attachment_image"
                  />
                  <div v-else class="attachment_file_icon">
                    <i class="fas fa-file-pdf" v-if="isPDF(file.attachment)"></i>
                    <i class="fas fa-file-alt" v-else></i>
                  </div>
                </div>
                <div class="attachment_info">
                  <span class="attachment_name">{{ getFileName(file.attachment, index) }}</span>
                  <span class="attachment_type">{{ getFileType(file.attachment) }}</span>
                </div>
                <div class="attachment_overlay">
                  <i class="fas fa-external-link-alt"></i>
                </div>
              </a>
            </div>
          </div>

          <!-- Offers -->
          <div class="col-12 mt-5">
            <div class="quotations_header">
              <h5 class="quotations_title">
                <i class="fas fa-file-invoice-dollar"></i>
                {{ $t("PLACEHOLDERS.quotations") }}
              </h5>
              <div class="quotations_count" v-if="data.offers?.length">
                {{ data.offers.length }} {{ $t("PLACEHOLDERS.offers_num") }}
              </div>
            </div>

            <div v-if="!data.offers?.length" class="empty_state">
              <i class="fas fa-inbox"></i>
              <p>{{ $t("PLACEHOLDERS.noOffers") }}</p>
            </div>

            <div class="offers_grid">
              <div
                v-for="offer in data.offers"
                :key="offer.id"
                class="offer_card"
              >
                <!-- Offer Header -->
                <div class="offer_header">
                  <div class="provider_info">
                    <div class="provider_avatar">
                      <i class="fas fa-user"></i>
                    </div>
                    <div>
                      <h6 class="provider_name">{{ offer.provider_name }}</h6>
                      <span class="offer_date">
                        <i class="far fa-clock"></i>
                        {{ offer.created_at }}
                      </span>
                    </div>
                  </div>
                  <div class="offer_status" :class="getStatusClass(offer.status_trans)">
                    {{ offer.status_trans }}
                  </div>
                </div>

                <!-- Offer Details -->
                <div class="offer_details">
                  <div class="detail_item">
                    <div class="detail_icon price_icon">
                      <i class="fas fa-money-bill-wave"></i>
                    </div>
                    <div class="detail_content">
                      <span class="detail_label">{{ $t("PLACEHOLDERS.offer_price") }}</span>
                      <span class="detail_value price_value">{{ offer.total_price }} {{ $t("PLACEHOLDERS.riyal") }}</span>
                    </div>
                  </div>

                  <div class="detail_item">
                    <div class="detail_icon duration_icon">
                      <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="detail_content">
                      <span class="detail_label">{{ $t("PLACEHOLDERS.offer_duration") }}</span>
                      <span class="detail_value">{{ offer.count_days }} {{ $t("FIELDS.days") }}</span>
                    </div>
                  </div>
                </div>

                <!-- Offer attachments -->
                <div v-if="offer.attachments?.length" class="offer_attachments">
                  <div class="attachments_header">
                    <i class="fas fa-paperclip"></i>
                    {{ $t("PLACEHOLDERS.attachments") }}
                  </div>
                  <div class="attachments_list">
                    <a
                      v-for="(file, i) in offer.attachments"
                      :key="i"
                      :href="file.attachment"
                      target="_blank"
                      class="attachment_link"
                    >
                      <i class="fas fa-file"></i>
                      {{ $t("PLACEHOLDERS.file") }} {{ i + 1 }}
                    </a>
                  </div>
                </div>

                <!-- Offer products -->
                <div v-if="offer.offerProducts?.length" class="offer_products">
                  <div class="products_header">
                    <i class="fas fa-box"></i>
                    {{ $t("TITLES.products") }}
                  </div>
                  <div class="products_table_wrapper">
                    <table class="products_table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>{{ $t("PLACEHOLDERS.name") }}</th>
                          <th>{{ $t("PLACEHOLDERS.quantity") }}</th>
                          <th>{{ $t("PLACEHOLDERS.riyal_price") }}</th>
                          <th>{{ $t("PLACEHOLDERS.riyal_total_price") }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(p, i) in offer.offerProducts" :key="p.id">
                          <td>{{ i + 1 }}</td>
                          <td>{{ p.name }}</td>
                          <td>{{ p.quantity }}</td>
                          <td>{{ p.price }}</td>
                          <td class="total_price_cell">{{ p.total_price }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShowOrder",

  data() {
    return {
      isWaitingRequest: false,
      data: {
        serial_number: null,
        sub_category: null,
        city: null,
        district: null,
        date: null,
        note: null,
        status_trans: null,
        attachments: [],
        offers: [],
      },
    };
  },

  methods: {
    isImage(url) {
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    },

    isPDF(url) {
      return /\.pdf$/i.test(url);
    },

    getFileName(url, index) {
      const parts = url.split('/');
      const fileName = parts[parts.length - 1];
      return fileName.length > 20 ? `Attachment ${index + 1}` : fileName;
    },

    getFileType(url) {
      if (this.isImage(url)) return 'Image';
      if (this.isPDF(url)) return 'PDF';
      return 'File';
    },

    getStatusClass(status) {
      const statusMap = {
        'pending': 'status_pending',
        'accepted': 'status_accepted',
        'rejected': 'status_rejected',
        'completed': 'status_completed',
      };
      
      const statusLower = status?.toLowerCase() || '';
      for (const [key, className] of Object.entries(statusMap)) {
        if (statusLower.includes(key)) {
          return className;
        }
      }
      return 'status_default';
    },

    async showOrder() {
      this.isWaitingRequest = true;
      try {
        const res = await this.$axios.get(`/orders/${this.$route.params.id}`);
        this.data = res.data.data.orders;
      } catch (err) {
        console.error(err?.response?.data?.message);
      } finally {
        this.isWaitingRequest = false;
      }
    },
  },

  created() {
    this.showOrder();
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      getAppTheme: "AppThemeModule/getAppTheme",
    }),
    // End:: Vuex Getters
  },
};
</script>

<style scoped>
/* Section Header (Attachments) */
.section_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color, #e5e7eb);
}

.section_title {
  color: #E1423D;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.attachments_count {
  background: var(--count-bg, #f3f4f6);
  color: var(--count-text, #4b5563);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

/* Attachments Grid */
.attachments_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.attachment_card {
  position: relative;
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
}

.attachment_card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px var(--shadow-color, rgba(0, 0, 0, 0.1));
  border-color: #E1423D;
}

.attachment_preview {
  position: relative;
  width: 100%;
  height: 140px;
  background: var(--preview-bg, #f9fafb);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.attachment_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.attachment_file_icon {
  font-size: 48px;
  color: var(--icon-color, #9ca3af);
}

.attachment_info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--card-bg, #ffffff);
}

.attachment_name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary, #1f2937);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attachment_type {
  font-size: 11px;
  color: var(--text-secondary, #6b7280);
  font-weight: 500;
  text-transform: uppercase;
}

.attachment_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(27, 112, 111, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.attachment_card:hover .attachment_overlay {
  opacity: 1;
}

.attachment_overlay i {
  color: white;
  font-size: 24px;
}

/* Quotations Header */
.quotations_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color, #e5e7eb);
}

.quotations_title {
  color: #E1423D;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.quotations_count {
  background: #E1423D;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

/* Empty State */
.empty_state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted, #9ca3af);
}

.empty_state i {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty_state p {
  margin: 0;
  font-size: 16px;
}

/* Offers Grid */
.offers_grid {
  display: grid;
  gap: 24px;
  margin-top: 24px;
}

/* Offer Card */
.offer_card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px var(--shadow-color, rgba(0, 0, 0, 0.05));
}

.offer_card:hover {
  box-shadow: 0 4px 12px var(--shadow-hover, rgba(27, 112, 111, 0.15));
  border-color: #E1423D;
}

/* Offer Header */
.offer_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--header-bg, linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%));
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}

.provider_info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.provider_avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E1423D 0%, #2a9d9c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
}

.provider_name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary, #1f2937);
}

.offer_date {
  font-size: 13px;
  color: var(--text-secondary, #6b7280);
  display: flex;
  align-items: center;
  gap: 6px;
}

.offer_status {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
}

.status_pending {
  background: #fef3c7;
  color: #92400e;
}

.status_accepted {
  background: #d1fae5;
  color: #065f46;
}

.status_rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status_completed {
  background: #dbeafe;
  color: #1e40af;
}

.status_default {
  background: var(--status-default-bg, #f3f4f6);
  color: var(--status-default-text, #4b5563);
}

/* Offer Details */
.offer_details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
}

.detail_item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail_icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.price_icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.duration_icon {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.detail_content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail_label {
  font-size: 12px;
  color: var(--text-secondary, #6b7280);
  font-weight: 500;
}

.detail_value {
  font-size: 16px;
  color: var(--text-primary, #1f2937);
  font-weight: 600;
}

.price_value {
  color: #10b981;
}

/* Offer Attachments */
.offer_attachments {
  padding: 16px 20px;
  background: var(--section-bg, #f9fafb);
  border-top: 1px solid var(--border-color, #e5e7eb);
}

.attachments_header {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary, #4b5563);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.attachments_list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.attachment_link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 6px;
  color: #E1423D;
  font-size: 13px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.attachment_link:hover {
  background: #E1423D;
  color: white;
  border-color: #E1423D;
}

/* Offer Products */
.offer_products {
  padding: 16px 20px 20px;
  border-top: 1px solid var(--border-color, #e5e7eb);
}

.products_header {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary, #4b5563);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.products_table_wrapper {
  overflow-x: auto;
}

.products_table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.products_table thead {
  background: var(--table-header-bg, #f9fafb);
}

.products_table th {
  padding: 10px 12px;
  /* text-align: left; */
  font-weight: 600;
  color: var(--text-secondary, #4b5563);
  border-bottom: 2px solid var(--border-color, #e5e7eb);
  font-size: 13px;
}

.products_table td {
  padding: 12px;
  border-bottom: 1px solid var(--table-border, #f3f4f6);
  color: var(--text-primary, #1f2937);
}

.products_table tbody tr:hover {
  background: var(--table-hover, #f9fafb);
}

.products_table tbody tr:last-child td {
  border-bottom: none;
}

.total_price_cell {
  font-weight: 600;
  color: #E1423D;
}

/* Dark Mode Support */
.dark_theme .section_header,
.dark_theme .quotations_header {
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

.dark_theme .attachments_count {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

.dark_theme .attachment_card {
  background: #1e1e1e;
  border-color: rgba(255, 255, 255, 0.12);
}

.dark_theme .attachment_preview {
  background: #2a2a2a;
}

.dark_theme .attachment_file_icon {
  color: rgba(255, 255, 255, 0.5);
}

.dark_theme .attachment_info {
  background: #1e1e1e;
}

.dark_theme .attachment_name {
  color: rgba(255, 255, 255, 0.87);
}

.dark_theme .attachment_type {
  color: rgba(255, 255, 255, 0.6);
}

.dark_theme .empty_state {
  color: rgba(255, 255, 255, 0.5);
}

.dark_theme .offer_card {
  background: #1e1e1e;
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.dark_theme .offer_card:hover {
  box-shadow: 0 4px 12px rgba(27, 112, 111, 0.3);
}

.dark_theme .offer_header {
  background: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%);
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

.dark_theme .provider_name {
  color: rgba(255, 255, 255, 0.87);
}

.dark_theme .offer_date {
  color: rgba(255, 255, 255, 0.6);
}

.dark_theme .status_default {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

.dark_theme .detail_label {
  color: rgba(255, 255, 255, 0.6);
}

.dark_theme .detail_value {
  color: rgba(255, 255, 255, 0.87);
}

.dark_theme .offer_attachments {
  background: #2a2a2a;
  border-top-color: rgba(255, 255, 255, 0.12);
}

.dark_theme .attachments_header,
.dark_theme .products_header {
  color: rgba(255, 255, 255, 0.7);
}

.dark_theme .attachment_link {
  background: #1e1e1e;
  border-color: rgba(255, 255, 255, 0.12);
}

.dark_theme .offer_products {
  border-top-color: rgba(255, 255, 255, 0.12);
}

.dark_theme .products_table thead {
  background: #2a2a2a;
}

.dark_theme .products_table th {
  color: rgba(255, 255, 255, 0.7);
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

.dark_theme .products_table td {
  color: rgba(255, 255, 255, 0.87);
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

.dark_theme .products_table tbody tr:hover {
  background: #2a2a2a;
}

/* Responsive */
@media (max-width: 768px) {
  .offer_header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .offer_details {
    grid-template-columns: 1fr;
  }

  .quotations_header,
  .section_header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .attachments_grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
}
</style>