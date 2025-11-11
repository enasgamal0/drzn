export default {
    // START:: SET NOTIFICATIONS
    setNotifications(state, payload) {
        state.notifications = payload.notifications;
        state.unreadNotifications = payload.unreadNotificationsCount;
    },
    // END:: SET NOTIFICATIONS

    // START:: SET ALL READIED NOTIFICATIONS
    setAllReadiedNotifications(state, payload) {
        state.allNotifications = payload.notifications;
        state.unreadNotifications = payload.unreadNotificationsCount;
    },
    // END:: SET ALL READIED NOTIFICATIONS
};
