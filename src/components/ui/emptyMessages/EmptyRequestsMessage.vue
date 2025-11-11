<template>
    <div class="empty_courses_message_wrapper">
        <EmptyMessage>
            <template #image>
                <img
                    src="../../../assets/media/empty_messages/empty_courses.png"
                    alt="Empty Message Image"
                    width="250"
                    height="130"
                />
            </template>

            <template #message>
                <h2 class="message_title">{{ $t("TITLES.empty_requests") }}</h2>
            </template>
        </EmptyMessage>
    </div>
</template>
<script>
// START:: IMPORTING EMPTY MESSAGE UI COMPONENT
import EmptyMessage from "../UserEmptyMessage.vue";
// END:: IMPORTING EMPTY MESSAGE UI COMPONENT

export default {
    name: "EmptyRequestsMessage",

    components: {
        EmptyMessage,
    },
};
</script>
