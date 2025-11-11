import router from "../../../router/index.js";
import axios from "axios";

export default {
  // Start:: Set Authenticated User Data
  setAuthenticatedUserData(context, payload) {
    context.commit("setAuthenticatedUserData", payload);
  },
  // End:: Set Authenticated User Data

  // Start:: Logout
  async logout() {
    try {
      await axios({
        method: "POST",
        url: `user/logout`,
      });
      localStorage.removeItem("drzn_admin_dashboard_user_id");
      localStorage.removeItem("drzn_admin_dashboard_user_token");
      localStorage.removeItem("drzn_admin_dashboard_userName");
      localStorage.removeItem("drzn_admin_dashboard_user_type");
      localStorage.removeItem("drzn_admin_dashboard_email");
      localStorage.removeItem("drzn_admin_dashboard_user_avatar");
      localStorage.removeItem("drzn_admin_dashboard_user_ability");
      localStorage.removeItem("drzn_admin_roles");
      router.replace("/");
      location.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // END:: Logout
};
