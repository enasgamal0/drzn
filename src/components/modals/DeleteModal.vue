<template>
    <div class="delete_modal_wrapper">
        <BaseModal
            :show="modalApperanceData"
            @controleModalApperance="controleModalApperance"
        >
            <template #modal>
                <div class="delete_card">
                    <div class="icon">
                        <i class="fal fa-times"></i>
                    </div>

                    <h2>{{ $t("MESSAGES.deleteItem") }}</h2>

                    <div class="btns_wrapper">
                        <button class="delete_btn" @click="deleteCourse">
                            {{ $t("BUTTONS.delete") }}
                        </button>

                        <button
                            class="close_btn"
                            @click="controleModalApperance"
                        >
                            {{ $t("BUTTONS.close") }}
                        </button>
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
    name: "DeleteModal",

    components: {
        BaseModal,
    },

    props: ["modalApperanceData", "targetElement", "selectedLesson"],

    emits: ["controleModalApperance", "getDetailsAfterDelete"],

    watch: {
        modalApperanceData(newVal) {
            if (newVal == true) {
                this.lessonId = this.selectedLesson.id;
            }
        },
    },

    data() {
        return {
            // START:: LESSON ID DATA
            lessonId: null,
            // END:: LESSON ID DATA
        };
    },

    methods: {
        // START:: CONTROLE MODAL APPERANCE
        controleModalApperance() {
            this.$emit("controleModalApperance");
        },
        // END:: CONTROLE MODAL APPERANCE

        // START:: GET COURSE DETAILS AFTER EDIT
        getDetailsAfterDelete() {
            this.$emit("getDetailsAfterDelete");
        },
        // END:: GET COURSE DETAILS AFTER EDIT

        // START:: DELETE COURSE METHOD
        deleteCourse() {
            if (this.targetElement == "lesson") {
                this.$axios
                    .delete(`teacher/subject/listen/${this.lessonId}`, {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem(
                                    "elmo3lm_elmosa3d_user_token"
                                ),
                            "Accept-language": localStorage.getItem(
                                "elmo3lm_elmosa3d_app_lang"
                            ),
                            "cache-control": "no-cache",
                            Accept: "application/json",
                        },
                    })
                    .then(() => {
                        this.$iziToast.success({
                            timeout: 2000,
                            message: this.$t("MESSAGES.deletedSuccessfully"),
                            messageSize: "22",
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                        this.controleModalApperance();
                        this.getDetailsAfterDelete();
                    });
            } else {
                this.$axios
                    .delete(`teacher/subject/delete/${this.$route.params.id}`, {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem(
                                    "elmo3lm_elmosa3d_user_token"
                                ),
                            "Accept-language": localStorage.getItem(
                                "elmo3lm_elmosa3d_app_lang"
                            ),
                            "cache-control": "no-cache",
                            Accept: "application/json",
                        },
                    })
                    .then(() => {
                        this.$router.replace("/added-subjects");
                    });
            }
        },
        // END:: DELETE COURSE METHOD
    },
};
</script>
