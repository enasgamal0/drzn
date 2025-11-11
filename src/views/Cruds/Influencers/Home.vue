<template>
  <transition name="fadeInUp" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: "InfluencersHome",
};
</script>
