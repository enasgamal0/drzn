<template>
    <div class="user_empty_message_wrapper">
        <!-- START:: EMPTY MESSAGE IMAGE WRAPPER -->
        <div class="image_wrapper">
            <slot name="image"></slot>
        </div>
        <!-- END:: EMPTY MESSAGE IMAGE WRAPPER -->

        <!-- START:: EMPTY MESSAGE TEXT WRAPPER -->
        <div class="text_wrapper">
            <slot name="message"></slot>
        </div>
        <!-- END:: EMPTY MESSAGE TEXT WRAPPER -->
    </div>
</template>

<script>
export default {
    name: "UserEmptyMessage",
};
</script>
