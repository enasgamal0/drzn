<template>
  <div class="side_nav_wrapper" :class="{ active: navIsActive }">
    <!-- Start:: Toggle Btn -->
    <button class="close_btn" @click="$emit('fireToggleNavDrawerEmit')">
      <i class="fal fa-times"></i>
    </button>
    <!-- End:: Toggle Btn -->

    <!-- Start:: Logo -->
    <div class="logo_wrapper" v-if="getAppTheme == 'light_theme'">
      <router-link class="logo" to="/home">
        <img
          src="@/assets/media/logo/logo.png"
          alt="Logo"
          width="170"
          height="125"
        />
      </router-link>
    </div>

    <div class="logo_wrapper" v-else>
      <router-link class="logo" to="/home">
        <img
          src="@/assets/media/logo/logo.png"
          alt="Logo"
          width="170"
          height="125"
        />
      </router-link>
    </div>
    <!-- End:: Logo -->

    <!-- Start:: Side Nav Links -->
    <div class="side_nav_links_wrapper">
      <!-- Start:: Home Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')">
        <router-link to="/home">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/home.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.dashboard") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Home Route -->

      <!-- Start::  Roles and Admins Routes-->
      <div class="side_routes_wrapper"
      v-if="
            $can('roles index', 'roles') ||
            $can('permissions-index', 'permissions') ||
            $can('admins-index', 'admins') ||
            $can('admins index', 'admins')
          ">
        <a-menu
          style="width: 100%"
          mode="vertical"
          :open-keys="openKeys"
          @openChange="onOpenChange"
          
        >
          <a-sub-menu
            v-for="item in sideNavbarList_Admins"
            :key="item.key"
            :data-type="!item.children ? 'single_route' : ''"
          >
            <template v-if="item.children">
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <a-menu-item
                v-for="childItem in item.children"
                :key="childItem.key"
                v-if="childItem.hasPermission"
              >
                <button
                  v-if="childItem.hasPermission"
                  class="text-start w-100"
                  @click="$emit('fireToggleNavDrawerEmit')"
                >
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </a-menu>
      </div>
      <!-- <div class="side_routes_wrapper side_routes_wrapper_clients" v-if="$can('clients index', 'clients')">
        <a-menu
          style="width: 100%"
          mode="vertical"
          :open-keys="openKeys"
          @openChange="onOpenChange"
        >
          <a-sub-menu
            v-for="item in sideNavbarList_users"
            :key="item.key"
            :data-type="!item.children ? 'single_route' : ''"
          >
            <template v-if="item.children">
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <a-menu-item
                v-for="childItem in item.children"
                :key="childItem.key"
              >
                <button
                  v-if="childItem.hasPermission"
                  class="text-start w-100"
                  @click="$emit('fireToggleNavDrawerEmit')"
                >
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </a-menu>
      </div> -->
      <!-- End::  Roles and Admins Routes -->

      <!-- Start:: Admins Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('admins index', 'admins')"
      >
        <router-link to="/admins/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/admins.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.adminsManeg") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: Admins Route -->
      <!-- Start:: Capacities Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('capacities index', 'capacities')"
      >
        <router-link to="/Capacities/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/orders.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.Capacities") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: Admins Route -->

      <!-- Start:: users Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('users index', 'users')"
      >
        <router-link to="/users/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/users.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.manage_users") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: users Route -->

      <!-- Start:: users Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('clients index', 'clients')"
      >
        <router-link to="/Clients/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/users.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Clients.title") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: users Route -->

      <!-- Start:: Clients Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('users index', 'users')"
      >
        <router-link to="/Clients/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/users.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.manage_users") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Clients Route -->

      <!-- Start:: Clients Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('providers index', 'providers')"
      >
        <router-link to="/providers/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/users_red.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.control_admins") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Clients Route -->

      <!-- Start:: Customers Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('customers index', 'customers')"
      >
        <router-link to="/Customers/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/users_red.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Customers.title") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: Customers Route -->

      <!-- Start:: main_sections Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('categories index', 'categories')"
      >
        <router-link to="/main-categories/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/categories_less_radius.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.main_section") }}
          </span>
        </router-link>
      </div>
      <!-- End:: main_sections Route -->

      <!-- Start:: sub_sections Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('subcategories index', 'subcategories')"
      >
        <router-link to="/sub-categories/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/subcategories_less_radius.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.sub_sections") }}
          </span>
        </router-link>
      </div>
      <!-- End:: sub_sections Route -->

      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('subcategoryquestions index', 'subcategoryquestions')"
      >
        <router-link to="/sub-categories-questions/sub-categories">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/subcategories_less_radius.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.sub_categories_questions") }}
          </span>
        </router-link>
      </div>

      <!-- Start:: acceptedproviders Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('withdraw_requests index', 'withdraw_requests')"
      >
        <router-link to="/request-wallets/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/bill.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.service_provider_wallet_requests") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: service_provider_wallet_requests Route -->

      <!-- Start:: orders Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('orders index', 'orders')"
      >
        <router-link to="/orders/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/paymentmethods.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.orders") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: orders Route -->
      <!-- Start:: orders Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('coupons index', 'coupons')"
      >
        <router-link to="/financialorders/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/budgeting.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.FinancialOrders") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: orders Route -->
      <!-- Start:: orders Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('coupons index', 'coupons')"
      >
        <router-link to="/financialpack/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/budgeting.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.financialpack") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: orders Route -->
      <!-- Start:: orders Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('coupons index', 'coupons')"
      >
        <router-link to="/coupons/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/coupon.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.coupons") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: orders Route -->

      <!-- Start:: reasons Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('reasonscancellations index', 'reasonscancellations')"
      >
        <router-link to="/reasons/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/cancel.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.reasons") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: reasons Route -->

      

      <!-- Start:: RequestWallets Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('requestwallets index', 'requestwallets')"
      >
        <router-link to="/RequestWallets/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/bill.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Users.wallet-settlement-requests") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: RequestWallets Route -->

      <!-- Start:: workplaces Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('workplaces index', 'workplaces')"
      >
        <router-link to="/workplaces/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/house.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.workplaces") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: workplaces Route -->

      <!-- Start:: recommendations Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('recommendations index', 'recommendations')"
      >
        <router-link to="/recommendations/all">
          <span
          class="route_icon d-flex justify-center"
            style="
              background-color: rgba(116, 193, 252, 0.3);
              border-radius: 6px;
              width: 40px;
              height: 40px;
            "
          >
            <img
              src="@/assets/media/icons/ui_icons/thumbs-up-regular-full.svg"
              alt="icon"
              width="30"
              height="30"
              class="m-auto"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.recommendations") }}
          </span>
        </router-link>
      </div>
      <!-- End:: recommendations Route -->

      <!-- Start:: services Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('services index', 'services')"
      >
        <router-link to="/services/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/service.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.services") }}
          </span>
        </router-link>
      </div>
      <!-- End:: services Route -->

      <!-- Start:: places Route -->
      <div class="side_routes_wrapper" v-if="
          $can('countries index', 'countries') || $can('areas index', 'areas') || $can('cities index', 'cities') || $can('districts index', 'districts')
          ">
        <a-menu
          style="width: 100%"
          mode="vertical"
          :open-keys="openKeys"
          @openChange="onOpenChange"
        >
          <a-sub-menu
            v-for="item in sideNavbarList_Places"
            :key="item.key"
            :data-type="!item.children ? 'single_route' : ''"
            style="border: none"
          >
            <template v-if="item.children">
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <a-menu-item
                v-for="childItem in item.children"
                :key="childItem.key"
                v-if="childItem.hasPermission"
              >
                <button
                  class="text-start w-100"
                  @click="$emit('fireToggleNavDrawerEmit')"
                >
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </a-menu>
      </div>
      <!-- Start:: places Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('districts index', 'districts')"
      >
        <router-link to="/districts/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/village.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.districts") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: districts Route -->

      <!-- Start:: cities Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('countries index', 'countries')"
      >
        <router-link to="/countries/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/city.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.countries") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: cities Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('hobbies index', 'hobbies')"
      >
        <router-link to="/hobbies/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/hobby.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.hobbies_management") }}
          </span>
        </router-link>
      </div>
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('nationalities index', 'nationalities')"
      >
        <router-link to="/nationalities/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/nationalities.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.nationalities_management") }}
          </span>
        </router-link>
      </div>

      <!-- Start:: Customer Opinions Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('customeropinions index', 'customeropinions')"
      >
        <router-link to="/customeropinions/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/authourization.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.customer_opinions_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Customer Opinions Route -->

      <!-- Start:: banks Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('banks index', 'banks')"
      >
        <router-link to="/banks/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/bank.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.banks.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: banks Route -->

      <!-- Start:: packages Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('packages index', 'packages')"
      >
        <router-link to="/packages/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/subscription.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.package_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: packages Route -->

      <!-- Start:: auctions Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('auctions index', 'auctions')"
      >
        <router-link to="/auctions/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/adventage.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.auctions.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: auctions Route -->

      <!-- Start:: durations Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('auctiondurations index', 'auctiondurations')"
      >
        <router-link to="/durations/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/hs_code.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.durations") }}
          </span>
        </router-link>
      </div>
      <!-- End:: durations Route -->

      <!-- Start:: managements Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('management index', 'management')"
      >
        <router-link to="/managements/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/pm.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.manage_departments_and_managers") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: managements Route -->

      <!-- Start:: sectors Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('sections index', 'sections')"
      >
        <router-link to="/Sectors/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/module.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.sectors.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: sectors Route -->

      <!-- Start:: ads Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('advertisements index', 'advertisements')"
      >
        <router-link to="/Ads/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/image.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.ads.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: ads Route -->

      <!-- Start:: splash Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('openingscreens index', 'openingscreens')"
      >
        <router-link to="/Splash/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/star.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.splash") }}
          </span>
        </router-link>
      </div>
      <!-- End:: splash Route -->

      <!-- Start:: blogs Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('blogs index', 'blogs')"
      >
        <router-link to="/Blogs/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/book_mark.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.blogs.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: blogs Route -->

      <!-- Start::financial-reports Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('financialreports auctions', 'financialreports')"
      >
        <router-link to="/auctions-financial-reports/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/bill.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.auctions_report") }}
          </span>
        </router-link>
      </div>
      <!-- End::financial-reports Route -->

      <!-- Start::packages-financial-reports Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('financialreports packages', 'financialreports')"
      >
        <router-link to="/packages-financial-reports/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/bill.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.packages_report") }}
          </span>
        </router-link>
      </div>
      <!-- End::financial-reports Route -->

      <!-- Start::financial-not-finished-reports Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="
          $can('financial_reports finishedordersreports', 'financial_reports')
        "
      >
        <router-link to="/financial-finished-reports/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/areas.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.completed_orders") }}
          </span>
        </router-link>
      </div> -->
      <!-- End::financial-not-finished-reports Route -->

      <!-- Start:: rates Route -->
      <!-- <div class="side_routes_wrapper">
        <a-menu
          style="width: 100%"
          mode="vertical"
          :open-keys="openKeys"
          @openChange="onOpenChange"
          v-if="$can('rates apprates', 'rates')"
        >
          <a-sub-menu
            v-for="item in sideNavbarList_Rates"
            :key="item.key"
            :data-type="!item.children ? 'single_route' : ''"
            style="border: none"
          >
            <template v-if="item.children">
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <a-menu-item
                v-for="childItem in item.children"
                :key="childItem.key"
              >
                <button
                  v-if="childItem.hasPermission"
                  class="text-start w-100"
                  @click="$emit('fireToggleNavDrawerEmit')"
                >
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </a-menu>
      </div> -->
      <!-- Start:: rates Route -->

      <!-- Start:: rates Route -->
       <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="
          $can('rates index', 'rates')
        "
      >
        <router-link to="/app-rate/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/star.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.rates") }}
          </span>
        </router-link>
      </div>
      <!-- Start:: rates Route -->

      <!-- Start:: Referral Codes Route -->
       <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="
          $can('referralprovidercodes index', 'referralprovidercodes')
        "
      >
        <router-link to="/referral-providers-codes/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/hs_code.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.referral_codes_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Referral Codes Route -->

      <!-- Start:: Orders and Quotations Management Route -->
       <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="
          $can('orders index', 'orders')
        "
      >
        <router-link to="/orders-and-quotations/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/box.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.orders_and_quotations_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Orders and Quotations Management Route -->

      <!-- Start:: notifications Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('notifications index', 'notifications')"
      >
        <router-link to="/all-notifications/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/notifications.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.notifications.title") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: notifications Route -->

      <!-- Start:: FAQ Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('faqs index', 'faqs')"
      >
        <router-link to="/questions/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/question.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.faq") }}
          </span>
        </router-link>
      </div>
      <!-- End:: FAQ Route -->

      <!-- Start:: app settings Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('settings index', 'settings')"
      >
        <router-link to="/app_settings">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/settings.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.settings.general_app") }}
          </span>
        </router-link>
      </div>
      <!-- End:: app settings Route -->
      <!-- Start:: Side Nav Routes -->
      <div class="side_routes_wrapper" v-if="$can('settings index', 'settings')">
        <a-menu
          style="width: 100%"
          mode="vertical"
          :open-keys="openKeys"
          @openChange="onOpenChange"
        >
          <a-sub-menu
            v-for="item in sideNavbarList"
            :key="item.key"
            :data-type="!item.children ? 'single_route' : ''"
            style="border: none"
          >
            <template v-if="item.children">
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <a-menu-item
                v-for="childItem in item.children"
                :key="childItem.key"
              >
                <button
                  class="text-start w-100"
                  @click="$emit('fireToggleNavDrawerEmit')"
                  v-if="childItem.hasPermission"
                >
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: contacts Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('contacts index', 'contacts')"
      >
        <router-link to="/contact-messages/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/messages.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.ContactMessages.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: contacts Route -->

      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="inline">
          <!-- Start:: Logout Tab -->
          <a-sub-menu
            key="logout"
            @titleClick="logoutConfirmationModalIsOpen = true"
          >
            <!-- ========= Start:: Main Tab -->
            <span slot="title" class="logout_btn">
              <img
                src="../../assets/media/icons/ui_icons/logout.svg"
                alt="icon"
                width="35"
                height="35"
              />
              <span>
                {{ $t("SIDENAV.Logout.title") }}
              </span>
            </span>
            <!-- ========= End:: Main Tab -->
          </a-sub-menu>
          <!-- End:: Logout Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: Logout Confirmation Modal -->
      <v-dialog v-model="logoutConfirmationModalIsOpen">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            {{ $t("TITLES.logoutConfirmingMessage") }}
          </v-card-title>
          <v-card-actions>
            <v-btn class="modal_confirm_btn" @click="logout">{{
              $t("BUTTONS.logout")
            }}</v-btn>

            <v-btn
              class="modal_cancel_btn"
              @click="logoutConfirmationModalIsOpen = false"
              >{{ $t("BUTTONS.cancel") }}</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End:: Logout Confirmation Modal -->
    </div>
  </div>
  <!-- End:: Side Nav Links -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideNav",

  emits: ["fireToggleNavDrawerEmit"],

  props: {
    navIsActive: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    // Start:: Vuex Get Authenticated User Data
    ...mapGetters({
      getAppTheme: "AppThemeModule/getAppTheme",
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    }),
    // End:: Vuex Get Authenticated User Data

    // Start:: Extract Side Nav Keys
    extractSideNavItemsKeys() {
      let extractedKeys = [];
      this.sideNavbarList_Admins.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      this.sideNavbarList_Places.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      this.sideNavbarList.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      this.sideNavbarList_Rates.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      return extractedKeys;
    },

    // End:: Extract Side Nav Keys
  },

  data() {
    return {
      // Start:: Controle Open Tabs Data
      openKeys: [],
      // End:: Controle Open Tabs Data

      // Start:: Side Navbar List
      sideNavbarList_Admins: [
        {
          key: "dashboard",
          title: this.$t("SIDENAV.control_admins"),
          icon: require("@/assets/media/icons/ui_icons/roles.svg"),
          hasPermission: this.$can("roles index", "roles"),
          children: [
            {
              key: "roles",
              title: this.$t("SIDENAV.Roles.title"),
              route: "/roles/all",
              hasPermission:
                this.$can("roles index", "roles") ||
                this.$can("permissions index", "permissions"),
            },
            {
              key: "admins",
              title: this.$t("SIDENAV.Admins.title"),
              route: "/admins/all",
              hasPermission: this.$can("admins index", "admins"),
            },
          ],
        },
      ],

      sideNavbarList_Places: [
        {
          key: "dashboard_places",
          title: this.$t("PLACEHOLDERS.places"),
          icon: require("@/assets/media/icons/ui_icons/addresses.svg"),
          hasPermission:
          this.$can("countries index", "countries") ||
            this.$can("areas index", "areas") ||
            this.$can("cities index", "cities") ||
            this.$can("districts index", "districts"),
          children: [
            {
              key: "countries",
              title: this.$t("PLACEHOLDERS.manage_countries"),
              route: "/countries/all",
              hasPermission: this.$can("countries index", "countries"),
            },
            {
              key: "areas",
              title: this.$t("PLACEHOLDERS.manage_areas"),
              route: "/areas/all",
              hasPermission: this.$can("areas index", "areas"),
            },
            {
              key: "cities",
              title: this.$t("PLACEHOLDERS.cities"),
              route: "/cities/all",
              hasPermission: this.$can("cities index", "cities"),
            },
            {
              key: "districts",
              title: this.$t("PLACEHOLDERS.districts"),
              route: "/districts/all",
              hasPermission: this.$can("districts index", "districts"),
            },
          ],
        },
      ],

      sideNavbarList_users: [
        {
          key: "users_control",
          title: this.$t("PLACEHOLDERS.manage_users"),
          icon: require("@/assets/media/icons/ui_icons/clients.svg"),
          hasPermission: this.$can("clients index", "clients"),
          children: [
            {
              key: "users",
              title: this.$t("PLACEHOLDERS.manage_all_users"),
              route: "/clients/all",
              hasPermission: this.$can("clients index", "clients"),
            },
            {
              key: "joinUsers",
              title: this.$t("PLACEHOLDERS.joinClients"),
              route: "/joinClients/all",
              hasPermission: this.$can("clients index", "clients"),
            },
          ],
        },
      ],

      sideNavbarList: [
        {
          key: "appContent",
          title: this.$t("SIDENAV.AppContent.title"),
          icon: require("@/assets/media/icons/ui_icons/book_mark.svg"),
          children: [
            // {
            //   key: "contact-messages",
            //   title: this.$t("SIDENAV.ContactMessages.title"),
            //   route: "/contact-messages/all",
            //   hasPermission: this.$can("contacts index", "contacts"),
            // },
            {
              key: "contact",
              title: this.$t("PLACEHOLDERS.contact_admins"),
              route: "/contact_settings",
              hasPermission: this.$can("settings create", "settings"),
            },
            {
              key: "AboutUs",
              title: this.$t("SIDENAV.AppContent.aboutUs"),
              route: "/app-content/about-us",
              hasPermission: this.$can("settings create", "settings"),
            },
            // {
            //   key: "addresses",
            //   title: this.$t("SIDENAV.AppContent.addresses"),
            //   route: "/app-content/addresses",
            //   hasPermission: this.$can("settings create", "settings"),
            // },
            {
              key: "termsAndConditions",
              title: this.$t("SIDENAV.AppContent.termsAndConditions"),
              route: "/app-content/terms",
              hasPermission: this.$can("settings create", "settings"),
            },
            {
              key: "privacyPolicy",
              title: this.$t("SIDENAV.AppContent.privacyPolicy"),
              route: "/app-content/policy",
              hasPermission: this.$can("settings create", "settings"),
            },
            {
              key: "delete-account",
              title: this.$t("PLACEHOLDERS.how_to_delete_account"),
              route: "/app-content/delete-account",
              hasPermission: this.$can("settings create", "settings"),
            },
            // {
            //   key: "vision",
            //   title: this.$t("PLACEHOLDERS.vision"),
            //   route: "/app-content/vision",
            //   hasPermission: this.$can("settings create", "settings"),
            // },
            // {
            //   key: "goals",
            //   title: this.$t("PLACEHOLDERS.goals"),
            //   route: "/app-content/goals",
            //   hasPermission: this.$can("settings create", "settings"),
            // },
            // {
            //   key: "message",
            //   title: this.$t("PLACEHOLDERS.message"),
            //   route: "/app-content/message",
            //   hasPermission: this.$can("settings create", "settings"),
            // },
            // {
            //   key: "statistics",
            //   title: this.$t("PLACEHOLDERS.statistics"),
            //   route: "/app-content/statistics",
            //   hasPermission: this.$can("settings create", "settings"),
            // },
            // {
            //   key: "influencer",
            //   title: this.$t("PLACEHOLDERS.influencer"),
            //   route: "/app-content/influencer",
            //   hasPermission: this.$can("settings create", "settings"),
            // },
          ],
        },
      ],

      sideNavbarList_Rates: [
        {
          key: "rates",
          title: this.$t("PLACEHOLDERS.comments_management"),
          icon: require("@/assets/media/icons/ui_icons/star.svg"),
          hasPermission: this.$can("rates index", "rates"),
          children: [
            {
              key: "app_rate",
              title: this.$t("PLACEHOLDERS.app_ratings"),
              route: "/app-rate/all",
              hasPermission: this.$can("rates apprates", "rates"),
            },
            {
              key: "store_rate",
              title: this.$t("PLACEHOLDERS.store_ratings"),
              route: "/store-rate/all",
              hasPermission: this.$can("rates salonrates", "rates"),
            },
          ],
        },
      ],

      sideNavbarList_providers: [
        {
          key: "providers",
          title: this.$t("PLACEHOLDERS.influencers_management"),
          icon: require("@/assets/media/icons/ui_icons/star.svg"),
          hasPermission: this.$can("influencers index", "influencers"),
          children: [
            {
              key: "providers_list",
              title: this.$t("PLACEHOLDERS.influencers"),
              route: "/influencers/all",
              hasPermission: this.$can("influencers index", "influencers"),
            },
            {
              key: "providers_join",
              title: this.$t("PLACEHOLDERS.influencers_join_requests"),
              route: "/influencers-requests/all",
              hasPermission: this.$can("influencers index", "influencers"),
            },
          ],
        },
      ],

      // Start:: Modal Controlling Data
      logoutConfirmationModalIsOpen: false,
      // End:: Modal Controlling Data
    };
  },

  methods: {
    // Start:: Vuex Auth Actions
    ...mapActions({
      logout: "AuthenticationModule/logout",
    }),
    // End:: Vuex Auth Actions
    handleClick() {
      this.open = !this.open;
    },
    closeMenu() {
      this.open = false;
    },

    handleClickOrder() {
      this.openOrder = !this.openOrder;
    },
    closeMenuOrder() {
      this.openOrder = false;
    },
    handleClickcities() {
      this.openCities = !this.openCities;
    },
    closeMenuCities() {
      this.openCities = false;
    },
    // Start:: Controle Open Tabs
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.extractSideNavItemsKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // End:: Controle Open Tabs
  },

  created() {},
};
</script>
