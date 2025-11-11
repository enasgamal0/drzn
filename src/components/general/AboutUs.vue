<template>
    <div class="aboutUs_section_wrapper">
        <div class="container">
            <div class="row">
                <!-- START:: SECTION TEXT -->
                <div class="col-lg-8">
                    <div class="section_title_wrapper">
                        <h2 class="title"> 
                            <span> {{ $t("TITLES.aboutUs") }} </span>
                        </h2>
                    </div>

                    <div class="section_subtitle_wrapper">
                        <h3 class="subtitle"> المعلم المساعد </h3>
                    </div>

                    <div class="section_text">
                        {{ aboutUsData }}
                    </div>

                    <div class="section_route">
                        <router-link to="/about-us">
                            {{ $t("BUTTONS.more") }}
                        </router-link>
                    </div>
                </div>
                <!-- END:: SECTION TEXT -->

                <!-- START:: SECTION IMAGE -->
                <div class="col-lg-4 p-0 d-none d-lg-block">
                    <!-- START:: SECTION IMAGE WRAPPER -->
                    <div class="border_wrapper">
                        <div class="section_image_wrapper"></div>
                    </div>
                    <!-- END:: SECTION IMAGE WRAPPER -->
                </div>
                <!-- END:: SECTION IMAGE -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AboutUsSec",

    props: ["aboutUsData"],
}
</script>