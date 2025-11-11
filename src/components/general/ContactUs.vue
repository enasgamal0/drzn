<template>
    <div class="contactUs_section_wrapper" id="contact">
        <div class="container">
            <!-- START:: HEADER WRAPPER -->
            <div class="section_title_wrapper mb-5">
                <h2 class="title">
                    <span> {{ $t("TITLES.contactUs") }} </span>
                </h2>
            </div>
            <!-- END:: HEADER WRAPPER -->

            <!-- START:: SECTION CONTENT -->
            <div class="row mt-5">
                <!-- START:: CONTACT US FORM -->
                <div class="col-lg-5 order-2 order-lg-1 my-5">
                    <h3 class="form_title">{{ $t("TITLES.send_us") }}</h3>
                    <form @submit.prevent="validateContactFormInputs">
                        <div class="row">
                            <!-- START:: NAME INPUT GROUP -->
                            <div class="col-lg-6 my-5">
                                <div class="input_wrapper">
                                    <input
                                        type="text"
                                        class="form-control"
                                        :placeholder="$t('PLACEHOLDERS.name')"
                                        v-model.trim="contactFormData.name"
                                    />
                                </div>
                            </div>
                            <!-- END:: NAME INPUT GROUP -->

                            <!-- START:: SUGGESTION TITLE INPUT GROUP -->
                            <div class="col-lg-6 my-5">
                                <div class="input_wrapper">
                                    <input
                                        type="text"
                                        class="form-control"
                                        :placeholder="
                                            $t('PLACEHOLDERS.suggestion_title')
                                        "
                                        v-model.trim="
                                            contactFormData.suggestionTitle
                                        "
                                    />
                                </div>
                            </div>
                            <!-- END:: SUGGESTION TITLE INPUT GROUP -->

                            <!-- START:: PHONE INPUT GROUP -->
                            <div class="col-lg-12 my-5">
                                <div class="input_wrapper">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :placeholder="
                                            $t('PLACEHOLDERS.phoneNumber')
                                        "
                                        v-model.trim="
                                            contactFormData.phoneNumber
                                        "
                                    />
                                </div>
                            </div>
                            <!-- END:: PHONE INPUT GROUP -->

                            <!-- START:: MESSAGE INPUT GROUP -->
                            <div class="col-lg-12 my-5">
                                <div class="input_wrapper">
                                    <textarea
                                        class="form-control"
                                        :placeholder="
                                            $t('PLACEHOLDERS.complaint_details')
                                        "
                                        v-model.trim="contactFormData.message"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                            <!-- END:: MESSAGE INPUT GROUP -->

                            <!-- START:: SUBMIT BUTTON WRAPPER -->
                            <div class="btn_wrapper">
                                <button>
                                    {{ $t("BUTTONS.send") }}
                                    <span
                                        class="btn_loader"
                                        v-if="isWaitingRequest"
                                    ></span>
                                </button>
                            </div>
                            <!-- END:: SUBMIT BUTTON WRAPPER -->
                        </div>
                    </form>
                </div>
                <!-- END:: CONTACT US FORM -->

                <!-- START:: CONTACT US DATA -->
                <div class="col-lg-7 order-1 order-lg-2">
                    <div class="row">
                        <!-- START:: CONTACT INFO -->
                        <div class="col-lg-6 my-5 order-2 order-lg-1">
                            <h3 class="contact_info_title mb-3">
                                {{ $t("TITLES.contact_info") }}
                            </h3>
                            <div class="info_wrapper">
                                <p class="phone my-5">
                                    <span
                                        ><i class="fas fa-phone-alt"></i
                                    ></span>
                                    <span dir="ltr">{{
                                        contactUsData.phone
                                    }}</span>
                                </p>
                                <p class="email my-5">
                                    <span><i class="far fa-envelope"></i></span>
                                    <a
                                        :href="`mailto:${contactUsData.email}`"
                                        dir="ltr"
                                        >{{ contactUsData.email }}</a
                                    >
                                </p>
                                <p class="fax my-5">
                                    <span><i class="fas fa-fax"></i></span>
                                    <span dir="ltr">
                                        {{ contactUsData.lan_number }}
                                    </span>
                                </p>
                                <p class="address my-5">
                                    <span
                                        ><i class="fas fa-map-marker-alt"></i
                                    ></span>
                                    <span>{{
                                        contactUsData.location.desc
                                    }}</span>
                                </p>
                            </div>
                            <div class="social_media_links_wrapper">
                                <a
                                    :href="`https://wa.me/${contactUsData.whatsapp}`"
                                    target="_blank"
                                    v-if="contactUsData.whatsapp"
                                >
                                    <i class="fab fa-whatsapp"></i>
                                </a>

                                <a
                                    :href="contactUsData.social.youtube"
                                    target="_blank"
                                    v-if="contactUsData.social.youtube"
                                >
                                    <i class="fab fa-youtube"></i>
                                </a>

                                <a
                                    :href="contactUsData.social.instagram"
                                    target="_blank"
                                    v-if="contactUsData.social.instagram"
                                >
                                    <i class="fab fa-instagram"></i>
                                </a>

                                <a
                                    :href="contactUsData.social.twitter"
                                    target="_blank"
                                    v-if="contactUsData.social.twitter"
                                >
                                    <i class="fab fa-twitter"></i>
                                </a>

                                <a
                                    :href="contactUsData.social.facebook"
                                    target="_blank"
                                    v-if="contactUsData.social.facebook"
                                >
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </div>
                        </div>
                        <!-- END:: CONTACT INFO -->

                        <!-- START:: CONTACT US MAP -->
                        <div class="col-lg-6 my-5 order-1 order-lg-2">
                            <div class="map_wrapper">
                                <GmapMap
                                    :center="{
                                        lat: parseFloat(
                                            contactUsData.location.lat
                                        ),
                                        lng: parseFloat(
                                            contactUsData.location.lng
                                        ),
                                    }"
                                    :zoom="12"
                                    map-type-id="terrain"
                                    style="width: 100%; height: 400px"
                                >
                                    <GmapMarker
                                        :key="index"
                                        v-for="(m, index) in markers"
                                        :position="m.position"
                                        :clickable="false"
                                        :draggable="false"
                                        @click="center = m.position"
                                    />
                                </GmapMap>
                            </div>
                        </div>
                        <!-- END:: CONTACT US MAP -->
                    </div>
                </div>
                <!-- END:: CONTACT US DATA -->
            </div>
            <!-- END:: SECTION CONTENT -->
        </div>
    </div>
</template>

<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA"></script>
<script>
export default {
    name: "ContactUsSec",

    props: ["contactUsData"],

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: CONTACT US FORM DATA
            contactFormData: {
                name: null,
                suggestionTitle: null,
                phoneNumber: null,
                message: null,
            },
            // END:: CONTACT US FORM DATA

            // START:: MAP MARKERS DATA
            markers: [
                {
                    id: 1,
                    position: {
                        lat: parseFloat(this.contactUsData.location.lat),
                        lng: parseFloat(this.contactUsData.location.lng),
                    },
                },
            ],
            // END:: MAP MARKERS DATA
        };
    },

    methods: {
        // START:: VALIDATE CONTACT FORM INPUTS
        validateContactFormInputs() {
            this.isWaitingRequest = true;

            if (!this.contactFormData.name) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.name"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.contactFormData.suggestionTitle) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.suggestion_title"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.contactFormData.phoneNumber) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.phoneNumber"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.contactFormData.message) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.complaint_details"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitContactForm();
            }
        },
        // END:: VALIDATE CONTACT FORM INPUTS

        // START:: SUBMIT CONTACT FORM
        submitContactForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND CONTACT DATA
            theData.append("fullname", this.contactFormData.name);
            theData.append("title", this.contactFormData.suggestionTitle);
            theData.append("phone", this.contactFormData.phoneNumber);
            theData.append("content", this.contactFormData.message);
            // END:: APPEND CONTACT DATA

            // START:: SEND REQUEST
            this.$axios
                .post("contact", theData)
                .then(() => {
                    this.isWaitingRequest = false;
                    this.$iziToast.success({
                        timeout: 2000,
                        message: this.$t("MESSAGES.sentSuccessfully"),
                        messageSize: "22",
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    this.clearContactFormData();
                    return;
                })
                .catch((error) => {
                    this.isWaitingRequest = false;
                    this.$iziToast.error({
                        timeout: 2000,
                        message: error.response.data.message,
                        messageSize: "22",
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    return;
                });
            // END:: SEND REQUEST
        },
        // END:: SUBMIT CONTACT FORM

        // START:: CLEAR FORM INPUTS DATA
        clearContactFormData() {
            this.contactFormData.name = null;
            this.contactFormData.suggestionTitle = null;
            this.contactFormData.phoneNumber = null;
            this.contactFormData.message = null;
        },
        // END:: CLEAR FORM INPUTS DATA
    },
};
</script>
