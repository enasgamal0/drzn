export default {
  // Start:: Set Authenticated User Data
  setAuthenticatedUserData(state, payload) {
    if (Object.prototype.hasOwnProperty.call(payload, "id")) {
      state.userId = payload.id;
      if (payload.id) {
        localStorage.setItem("drzn_admin_dashboard_user_id", payload.id);
      } else {
        localStorage.removeItem("drzn_admin_dashboard_user_id");
      }
    }
    if (Object.prototype.hasOwnProperty.call(payload, "token")) {
      state.userToken = payload.token;
      if (payload.token) {
        localStorage.setItem(
          "drzn_admin_dashboard_user_token",
          payload.token
        );
      } else {
        localStorage.removeItem("drzn_admin_dashboard_user_token");
      }
    }
    if (Object.prototype.hasOwnProperty.call(payload, "type")) {
      state.userType = payload.type;
      if (payload.type) {
        localStorage.setItem(
          "drzn_admin_dashboard_user_type",
          payload.type
        );
      } else {
        localStorage.removeItem("drzn_admin_dashboard_user_type");
      }
    }
    if (Object.prototype.hasOwnProperty.call(payload, "name")) {
      state.userName = payload.name;
      if (payload.name) {
        localStorage.setItem("drzn_admin_dashboard_userName", payload.name);
      } else {
        localStorage.removeItem("drzn_admin_dashboard_userName");
      }
    }
    if (Object.prototype.hasOwnProperty.call(payload, "email")) {
      state.email = payload.email;
      if (payload.email) {
        localStorage.setItem("drzn_admin_dashboard_email", payload.email);
      } else {
        localStorage.removeItem("drzn_admin_dashboard_email");
      }
    }
    if (Object.prototype.hasOwnProperty.call(payload, "image")) {
      state.userAvatar = payload.image;
      if (payload.image) {
        localStorage.setItem(
          "drzn_admin_dashboard_user_avatar",
          payload.image
        );
      } else {
        localStorage.removeItem("drzn_admin_dashboard_user_avatar");
      }
    }
    if (Object.prototype.hasOwnProperty.call(payload, "ability")) {
      state.ability = payload.ability;
      if (payload.ability) {
        localStorage.setItem(
          "drzn_admin_dashboard_user_ability",
          payload.ability
        );
      } else {
        localStorage.removeItem("drzn_admin_dashboard_user_ability");
      }
    }
  },
  // End:: Set Authenticated User Data
};
