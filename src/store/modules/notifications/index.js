import notificationsMutations from "./mutations";
import notificationsActions from "./actions.js";
import notificationsGetters from "./getters.js";

export default {
    namespaced: true,
    state: {
        // START:: NOTIFICATIONS
        notifications: null,
        unreadNotifications: 0,
        // END:: NOTIFICATIONS

        // START:: ALL NOTIFICATIONS
        allNotifications: null,
        // END:: ALL NOTIFICATIONS
    },
    mutations: notificationsMutations,
    actions: notificationsActions,
    getters: notificationsGetters,
};
