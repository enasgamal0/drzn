export default {
  // Start:: Set Roles
  setRoles(state, payload) {
    state.roles = payload;
  },
  // End:: Set Roles

  // Start:: Set Stores
  setStores(state, payload) {
    state.stores = payload;
  },
  // End:: Set Stores

  // Start:: Set Store Categories
  setStoreCategories(state, payload) {
    state.storeCategories = payload;
  },
  // End:: Set Stores Categories

  // Start:: Set Order Types
  setOrderTypes(state, payload) {
    state.orderTypes = payload;
  },
  // End:: Set Order Types

  // Start:: Set Countries
  setCountries(state, payload) {
    state.countries = payload;
  },
  // End:: Set Countries

  // Start:: Set Areas
  setAreas(state, payload) {
    state.areas = payload;
  },
  // End:: Set Areas

  // Start:: Set Cities
  setCities(state, payload) {
    state.cities = payload;
  },
  setCitiesByAreaId(state, payload) {
    state.citiesByAreaId = payload;
  },
  // End:: Set Cities

  // Start:: Set Areas
  setServicesTypes(state, payload) {
    state.servicesTypes = payload;
  },
  // End:: Set Areas
};
