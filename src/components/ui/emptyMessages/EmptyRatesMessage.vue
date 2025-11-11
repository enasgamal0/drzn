<template>
    <div class="empty_rates_message_wrapper">
        <EmptyMessage>
            <template #image>
                <img
                    src="../../../assets/media/empty_messages/empty _rate.png"
                    alt="Empty Message Image"
                    width="250"
                    height="130"
                />
            </template>

            <template #message>
                <h2 class="message_title">{{ $t("MESSAGES.empty_rates") }}</h2>
            </template>
        </EmptyMessage>
    </div>
</template>

<script>
// START:: IMPORTING EMPTY MESSAGE UI COMPONENT
import EmptyMessage from "../UserEmptyMessage.vue";
// END:: IMPORTING EMPTY MESSAGE UI COMPONENT

export default {
    name: "EmptyRatesMessage",

    components: {EmptyMessage}
}
</script>