export default {
  setAllSystemPermissions(state, payload) {
    state.allSystemPermissions = payload;
  },

  setAuthedUserPermissions(state, payload) {
    state.authedUserPermissions = payload;
  },
};
