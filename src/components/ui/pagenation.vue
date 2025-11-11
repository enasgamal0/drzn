<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <!-- pagentaion  -->
    <div class="pagenation" v-if="last_page > 1">
        <ul>
            <li
                v-for="index in last_page"
                :key="index"
                v-if="
                    Math.abs(current_page - index) < 4 ||
                    index == last_page ||
                    index == 0
                "
                :class="{
                    last:
                        index == last_page &&
                        Math.abs(current_page - index) > 4,
                }"
            >
                <button
                    type="button"
                    @click="pagenationClick(index)"
                    :class="{
                        active: index == current_page,
                        last:
                            last_page == index &&
                            Math.abs(current_page - index) > 4,
                    }"
                >
                    {{ index }}
                </button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "pagenation",
    components: {},
    props: ["last_page", "current_page"],
    computed: {},

    data() {
        return {};
    },

    methods: {
        pagenationClick(pageNum) {
            this.$emit("pagenationClick", pageNum);
        },
    },

    mounted() {},
};
</script>
