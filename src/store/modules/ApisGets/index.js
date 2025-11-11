import ApiGetsMutations from "./mutations";
import ApiGetsActions from "./actions.js";
import ApiGetsGetters from "./getters.js";

export default {
  namespaced: true,
  state: {
    // Start:: Roles
    roles: null,
    // End:: Roles

    // Start:: Countries
    countries: null,
    // End:: Countries

    // Start:: Areas
    areas: null,
    // End:: Areas

    // Start:: Cities
    cities: null,
    citiesByAreaId: [],
    // End:: Cities

    // Start:: districts
    districts: null,
    districtsByAreaAndCityIds: [],
    // End:: districts

    // Start:: Services Types
    servicesTypes: null,
    // End:: Services Types

    // Start:: Stores
    stores: null,
    // End:: Stores

    // Start:: Store Categories
    storeCategories: null,
    // End:: Store Categories

    // Start:: Order Types
    orderTypes: [],
    // End:: Order Types
  },
  mutations: ApiGetsMutations,
  actions: ApiGetsActions,
  getters: ApiGetsGetters,
};
