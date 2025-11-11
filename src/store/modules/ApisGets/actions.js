import axios from "axios";

export default {
  // Start:: Get Roles
  async getRoles(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `roles?page=0&limit=0&isActive=1`,
      });
      // console.log("ROLES =>", res.data.data);
      context.commit("setRoles", res.data.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Roles

  // Start:: Get Stores
  async getStores(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `admin/stores`,
        params: {
          is_paginate: 0,
        },
      });
      // console.log("STORES =>", res.data.body);
      context.commit(
        "setStores",
        res.data.body.stores.map((item) => {
          return {
            id: item.id,
            name: item.title,
          };
        })
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Stores

  // Start:: Get Order Types & Store Categories
  async getStoreCategoriesAndOrderTypes(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `admin/stores/types/categories`,
      });
      context.commit(
        "setStoreCategories",
        res.data.body.mainCategories.map((item) => {
          return {
            id: item.id,
            name: item.title,
          };
        })
      );
      context.commit(
        "setOrderTypes",
        res.data.body.orderTypes.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        })
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get OrderTypes & Store Categories

  // Start:: Get Countries
  async getCountries(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `countries`,
      });
      // console.log("countries =>", res.data.data);
      context.commit("setCountries", res.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Countries

  // Start:: Get Cities
  async getCities(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `cities`,
      });
      // console.log("Cities =>", res.data.data);
      context.commit("setCities", res.data.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Countries

  // Start:: Get Region
  async getAreas(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `regions`,
      });
      // console.log("AREAS =>", res.data.data);
      context.commit("setAreas", res.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Region

  async getCitiesByAreaId(context, payload) {
    try {
      let res = await axios({
        method: "GET",
        url: `main/cities-of-regions`,
        params: {
          region_id: payload,
        },
      });
      // console.log("CITIES =>", res.data.data);
      context.commit("setCitiesByAreaId", res.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Cities

  // Start:: Get Services Types
  async getServicesTypes(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `main/service-type`,
      });
      // console.log("SERVICES TYPES =>", res.data.data);
      context.commit("setServicesTypes", res.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Services Types
};
