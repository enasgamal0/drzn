import PermissionsMutations from "./mutations";
import PermissionsActions from "./actions.js";
import PermissionsGetters from "./getters.js";

export default {
  namespaced: true,
  state: {
    allSystemPermissions: null,
    authedUserPermissions: null,
  },
  mutations: PermissionsMutations,
  actions: PermissionsActions,
  getters: PermissionsGetters,
};
