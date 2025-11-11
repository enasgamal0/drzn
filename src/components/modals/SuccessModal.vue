<template>
    <div class="success_wrapper" v-if="modalApperanceData">
        <BaseModal
            :show="modalApperanceData"
            @controleModalApperance="controleModalApperance"
        >
            <template #modal>
                <div class="success_card">
                    <div class="icon">
                        <i class="fal fa-check"></i>
                    </div>
                    <h2>
                        <slot name="title"> </slot>
                    </h2>

                    <p>
                        <slot name="sub_title"> </slot>
                    </p>

                    <div class="success_btn">
                        <!-- <router-link to="/">
                            {{ $t("TITLES.home") }}
                        </router-link> -->
                        <slot name="success_btn"></slot>
                    </div>
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script>
// START:: IMPORTING BASE MODAL
import BaseModal from "../ui/BaseModal.vue";
// END:: IMPORTING BASE MODAL

export default {
    name: "SuccessModal",

    data() {
        return {
            // START:: LOADER WAIT
            isWaitingRequest: false,
            // END:: LOADER WAIT

            // START:: ADD ACCOUNT DATA
            addAccount: {
                ownerName: null,
                bankName: null,
                accountNumber: null,
                iban: null,
            },
            // END:: ADD ACCOUNT DATA
        };
    },

    components: {
        BaseModal,
    },

    props: ["modalApperanceData"],

    emits: ["controleModalApperance"],

    methods: {
        // START:: CONTROLE MODAL APPERANCE
        controleModalApperance() {
            this.$emit("controleModalApperance");
        },
        // END:: CONTROLE MODAL APPERANCE

        // START:: VALIDATE LOGIN FORM INPUTS
        addAccountFormValidate() {
            this.isWaitingRequest = true;

            if (!this.addAccount.ownerName) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.owner_name"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.addAccount.bankName) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.bank_name"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.addAccount.accountNumber) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.account_number"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.addAccount.iban) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.iban"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.addAccountFormSubmit();
            }
        },
        // END:: VALIDATE LOGIN FORM INPUTS

        // START:: SUBMIT ADD ACCOUNT FORM
        addAccountFormSubmit() {
            setTimeout(() => {
                this.isWaitingRequest = false;
                this.modalApperanceData = false;
            }, 2000);
        },
        // END:: SUBMIT ADD ACCOUNT FORM
    },
};
</script>
