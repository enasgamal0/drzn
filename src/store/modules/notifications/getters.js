export default {
    // START:: NOTIFICATIONS GETTER
    notificationsData(state) {
        return {
            notificationsList: state.notifications,
            unreadNotifications: state.unreadNotifications,
        };
    },
    // END:: NOTIFICATIONS GETTER

    // START:: ALL READIED NOTIFICATIONS GETTER
    allReadiedNotificationsData(state) {
        return {
            allReadiedNotificationsList: state.allNotifications,
            unreadNotifications: state.unreadNotifications,
        };
    },
    // END:: ALL READIED NOTIFICATIONS GETTER
};
