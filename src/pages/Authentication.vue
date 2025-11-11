<template>
  <div class="auth_wrapper">
    <!-- Start:: Particles -->
    <vue-particles
      color="#FE9C00"
      :particleOpacity="0.7"
      :particlesNumber="150"
      shapeType="circle"
      :particleSize="5"
      linesColor="#FE9C00"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.3"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <!-- End:: Particles -->

    <!-- Start:: Language Switcher Button -->
    <div class="theme_changer_wrapper">
      <button
        aria-label="theme_changer"
        class="theme_changer"
        @click="changeAppTheme"
      >
        <i class="fal fa-moon" v-if="getAppTheme == 'light_theme'"></i>
        <i class="fal fa-sun" v-else></i>
      </button>
    </div>

    <div class="lang_toggler_wrapper">
      <button
        aria-label="lang_toggeler_btn"
        class="lang_toggeler_btn"
        @click="changeAppLanguage('en')"
        v-if="getAppLocale == 'ar'"
      >
        En
      </button>
      <button
        aria-label="lang_toggeler_btn"
        class="lang_toggeler_btn pb-2"
        @click="changeAppLanguage('ar')"
        v-else
      >
        ع
      </button>
    </div>
    <!-- End:: Language Switcher Button -->

    <!-- Start:: Auth Router View -->
    <div class="auth_form_wrapper blur_form">
      <!-- Start:: Form Title -->
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
      <!-- End:: Form Title -->

      <transition name="fadeInUp" mode="out-in">
        <router-view />
      </transition>
    </div>
    <!-- End:: Auth Router View -->
  </div>
</template>

<script>
// Start:: Importing Vuex Helpers
import { mapActions, mapGetters } from "vuex";
// End:: Importing Vuex Helpers

export default {
  name: "Authentication",

  computed: {
    // Start:: Vuex Get App Lang
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      getAppTheme: "AppThemeModule/getAppTheme",
    }),
    // End:: Vuex Get App Lang
  },

  methods: {
    // Start:: Vuex Set App Lang
    ...mapActions({
      changeAppLanguage: "AppLangModule/changeAppLanguage",
      changeAppTheme: "AppThemeModule/changeAppTheme",
    }),
    // End:: Vuex Set App Lang
  },
};
</script>
