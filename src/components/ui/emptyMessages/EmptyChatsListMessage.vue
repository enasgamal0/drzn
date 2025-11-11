<template>
    <div class="empty_chats_list_message_wrapper">
        <EmptyMessage>
            <template #image>
                <img
                    src="../../../assets/media/empty_messages/select_message.png"
                    alt="Empty Message Image"
                    width="250"
                    height="120"
                />
            </template>

            <template #message>
                <h2 class="message_title">{{ $t("TITLES.empty_chats") }}</h2>
            </template>
        </EmptyMessage>
    </div>
</template>
<script>
// START:: IMPORTING EMPTY MESSAGE UI COMPONENT
import EmptyMessage from "../UserEmptyMessage.vue";
// END:: IMPORTING EMPTY MESSAGE UI COMPONENT

export default {
    name: "EmptyChatsList",

    components: {
        EmptyMessage,
    },
};
</script>
