import axios from "axios";

export default {
  // Start:: Get System Global Permissions (WIll Be Used For Creating Role Crud)
  async getAllSystemPermissions(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `permissions`,
      });
      console.log("allSystemPermissions", res.data.data);
      context.commit("setAllSystemPermissions", res.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get System Global Permissions (WIll Be Used For Creating Role Crud)

  // Start:: Get Authed User Permissions  (WIll Be Used For Conditional Rendering Side Menu)
  async getAuthedUserPermissions(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `admin/roles-permissions`,
      });
      context.commit(
        "setAuthedUserPermissions",
        res.data.body.roles_and_permissions
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Authed User Permissions  (WIll Be Used For Conditional Rendering Side Menu)

  // Start:: Check User Permissions For Each Route
  async checkRoutePermissions(_, payload) {
    try {
      await axios({
        method: "GET",
        url: `admin/check-permission`,
        params: {
          name: payload,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  // End:: Check User Permissions For Each Route
};
