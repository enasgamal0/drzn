<template>
  <!--  v-if="$can('mostafa delete', 'mostafa')" -->
  <div class="coming_soon_container" dir="ltr">
    <h3>COMING SOON</h3>
    <div class="bar">
      <div class="progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",
  data() {
    return {
    }
  }
};
</script>

<style lang="scss" scoped>
.coming_soon_container {
  position: absolute;
  inset: 0;
  min-height: calc(100vh - 230px);
  max-height: calc(100vh - 230px);
  width: 100%;
  background-color: var(--theme_main_bg_clr);
  border-radius: 10px;
  @include flexCenterAlignment;
  flex-direction: column;
  row-gap: 10px;
  z-index: 5;

  h3 {
    text-align: center;
    font-size: 2em;
    letter-spacing: 1em;
    color: var(--main_theme_clr);
    text-shadow: 0px 0px 12px var(--main_theme_clr);
    display: inline-block;
  }

  .bar {
    height: 8px;
    width: 40%;
    border-radius: 10px;
    background: transparent;
    box-shadow: inset 0px 0px 8px var(--border_clr);
    overflow: hidden;

    .progress {
      height: inherit;
      border-radius: inherit;
      width: 0;
      background: var(--main_theme_clr);
      animation: load 4s linear infinite;
      animation-delay: 2s;
    }
  }
}

@media screen and (max-width: 850px) {
  .coming_soon_container {
    h3 {
      font-size: 1.4em;
      letter-spacing: 0.8em;
    }

    .bar {
      width: 70%;
    }
  }
}

@keyframes load {
  0% {
    width: 0%;
  }

  50% {
    width: 100%;
  }

  100% {
    width: 0%;
    float: right;
  }
}
</style>
