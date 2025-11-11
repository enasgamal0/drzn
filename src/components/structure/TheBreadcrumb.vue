<template>
    <div class="breadcrumb_wrapper">
        <!-- START:: PAGE TITLE -->
        <h2 class="page_title">
            <slot name="page_title"></slot>
        </h2>
        <!-- END:: PAGE TITLE -->

        <!-- START:: BREADCRUMB -->
        <h4 class="breadcrumb_routs">
            <!-- ====== HOME PAGE ROUTE -->
            <router-link to="/"> {{ $t("TITLES.home") }} </router-link>

            <!-- ====== BREADCRUMB ARROW -->
            <span> > </span>

            <!-- ====== CURRENT PAGE NAME -->
            <p>
                <slot name="breadcrumb_current_page"></slot>
            </p>
        </h4>
        <!-- END:: BREADCRUMB -->
    </div>
</template>

<script>
export default {
    name: "Breadcrumb",
}
</script>