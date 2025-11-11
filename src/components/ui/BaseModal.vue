<template>
    <!-- <teleport to="body"> -->
    <transition name="fadeInUp" mode="out-in">
        <div v-if="show" class="model_container">
            <div class="main_body">
                <slot name="modal"></slot>
            </div>
            <div class="modal_overlay" @click="closeModel"></div>
        </div>
    </transition>

    <!-- </teleport> -->
</template>

<script>
export default {
    name: "Model",

    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },

    emits: ["controleModalApperance"],

    watch: {
        show(newVal) {
            if( newVal == true ) {
                let mainContentWrapper = document.querySelector(".main_content");
                mainContentWrapper.style.position = "relative";
                mainContentWrapper.style.zIndex = 1;
            } else {
                let mainContentWrapper = document.querySelector(".main_content");
                mainContentWrapper.style.position = "unset";
                mainContentWrapper.style.zIndex = "unset";
            }
        },
    },

    methods: {
        closeModel() {
            // this.show = !this.show;
            this.$emit("controleModalApperance");
        },
    },
};
</script>
