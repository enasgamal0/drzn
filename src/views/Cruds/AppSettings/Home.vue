<template>
  <transition name="fadeInUp" mode="out-in">
    <div class="settings_page_wrapper">
      <div class="nested_routes_wrapper">
        <!-- <router-link to="/settings" class="nested_route"> {{ $t("NAVBAR.generalSettings") }} </router-link> -->
        <!-- <router-link to="/settings/app-settings" class="nested_route"> {{ $t("NAVBAR.appSettings") }} </router-link> -->
      </div>
      <router-view />
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppSettingsHome",
};
</script>

<style lang="scss" scoped>
.settings_page_wrapper {
  .nested_routes_wrapper {
    margin-bottom: 15px;
    @include flexStartAlignment;
    gap: 12px;

    .nested_route {
      @include borderedButtonStyle;
      margin: 0;
      padding: 8px 10px;
      font-size: 16px;
      width: max-content;

      &.router-link-exact-active {
        background-position: 0;
        color: var(--white_clr);
      }
    }
  }
}
</style>
