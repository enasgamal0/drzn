<template>
    <div class="tabs_wrapper custom_card">
        <v-card>
            <v-tabs v-model="tab" background-color="primary" dark show-arrows>
                <v-tab
                    v-for="item in tabsContent"
                    :key="item.tab"
                    :ref="item.tab"
                    @click="$emit('getItems', item.key_name)"
                >
                    {{ item.tab }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in tabsContent" :key="item.tab">
                    <v-card flat>
                        <slot :name="item.key_name"> </slot>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "Tabs",

    props: ["tabsContent"],

    data() {
        return {
            tab: null,
        };
    },
};
</script>
