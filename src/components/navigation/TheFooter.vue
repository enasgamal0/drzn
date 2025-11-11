<template>
  <footer>
    <!-- Start:: Copyrights -->
    <p class="copy_rights">
      {{ $t("TITLES.copyRights", { year: currentYear }) }}
    </p>
    <!-- End:: Copyrights -->

    <!-- Start:: Company Signature -->
    <a
      href="https://www.moltaqa.net/?fbclid=IwAR282W4sahp39VYd53v_iyBp_hyKtKihCOfmkhjOWA-fWKfdq8hdQvGr6cY"
      target="_blank"
      class="company_signature"
    >
      {{ $t("TITLES.madeWithLove") }}
    </a>
    <!-- End:: Company Signature -->
  </footer>
</template>

<script>
export default {
  name: "TheFooter",

  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
