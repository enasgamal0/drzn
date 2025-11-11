<template>
    <div class="not_found_page_wrapper">
        <div class="illustration_wrapper">
            <img
                class="star"
                src="@/assets/media/illustrations/polygon_large.svg"
                alt="star"
            />
            <img
                class="star"
                src="@/assets/media/illustrations/polygon_small.svg"
                alt="star"
            />
            <img
                class="star"
                src="@/assets/media/illustrations/polygon_small.svg"
                alt="star"
            />
            <img
                class="star"
                src="@/assets/media/illustrations/polygon_large.svg"
                alt="star"
            />

            <img
                class="illustration"
                src="@/assets/media/illustrations/4.svg"
                width="100"
                height="100"
                alt="first_4"
            />

            <img
                class="illustration rotate_animation"
                src="@/assets/media/illustrations/Planet.svg"
                width="100"
                height="100"
                alt="0"
            />

            <img
                class="illustration"
                src="@/assets/media/illustrations/4.svg"
                width="100"
                height="100"
                alt="last_4"
            />
        </div>

        <div class="subtitle">Ooops !</div>

        <div class="not_found_text">Page Not Found</div>

        <div class="go_back_route">
            <span> Do You Want To Go </span>
            <button @click="goBack">Back</button>
            <span> ? </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFoundPage",
    methods: {
        // Start:: Go Back
        goBack() {
            this.$router.back();
        },
        // End:: Go Back
    },
};
</script>