<template>
    <div class="row">
        <div
            class="col-md-3 mb-4 mt-4"
            v-for="number in number"
            :key="number.index"
        >
            <div class="skeleton_loader_card_wrapper">
                <div class="skeleton_box course_card_loader">
                    <div class="skeleton_unit img_skeleton"></div>

                    <div class="row">
                        <div class="col-8">
                            <div
                                class="skeleton_unit details_skeleton_row"
                            ></div>
                        </div>

                        <div class="col-4" v-if="price">
                            <div
                                class="skeleton_unit details_skeleton_row"
                            ></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-5">
                            <div
                                class="skeleton_unit details_skeleton_row"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CourseCardSkeletonLoader",

    props: {
        number: {
            type: Number,
            required: false,
        },
        price: {
            type: Boolean,
            required: false,
        },
    },
};
</script>
