<template>
  <div class="forbidden_page_content_wrapper">
    <div class="image_wrapper">
      <img
        src="@/assets/media/illustrations/error_forbidden.svg"
        alt="error forbidden"
        width="250"
        height="250"
      >
    </div>

    <button 
      class="redirect_btn"
      @click="$router.back()"
    > 
      Go Back 
    </button>
  </div>
</template>

<script>
export default {
  name: "ForbiddenPage",
}
</script>

<style lang="scss" scoped>
  .forbidden_page_content_wrapper {
    min-height: 100vh;
    max-height: 100vh;
    @include flexCenterAlignment;
    flex-direction: column;
    row-gap: 35px;
    .image_wrapper {
      width: 450px;
      height: 450px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .redirect_btn {
      @include simpleButtonStyle;
    }
  }
</style>
