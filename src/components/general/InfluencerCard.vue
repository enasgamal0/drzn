<template>
  <div class="d-flex flex-wrap mt-5">
    <div class="mx-5">
      <img
        alt="Influencer Image"
        :src="data?.instagram?.profile_picture"
        style="width: 300px; height: 300px; border-radius: 32px"
      />
    </div>
    <div
      style="margin-top: 50px; background-color: #f8f8f8; border-radius: 12px"
      class="mx-5 p-4 w-50"
    >
      <h2 style="font-size: 28px; font-weight: 800; color: #222222">
        {{ data?.instagram?.display_name }}
      </h2>
      <div class="d-flex">
        <img
          alt="Country Flag"
          src="../../../assets/media/images/flag.webp"
          style="width: 32px; height: 20px; border-radius: 5px"
        />
        <p class="mx-2" style="color: gray">{{ data?.country }}</p>
      </div>
      <div class="d-flex gap-3 mt-5">
        <div
          style="
            background: linear-gradient(180deg, #ffffff 0%, #ffe7f3 100%);
            color: #141475;
            font-weight: bold;
            font-size: 16px;
            border-radius: 5px;
          "
          class="px-2 py-1"
        >
          <img
            alt="followers count"
            src="../../../assets/media/images/followers.svg"
          />
          {{ data?.instagram?.followers_count }}
          {{ $t("PLACEHOLDERS.followers_count") }}
        </div>
        <div
          style="
            background: linear-gradient(180deg, #ffffff 0%, #ffe7f3 100%);
            color: #141475;
            font-weight: bold;
            font-size: 16px;
            border-radius: 5px;
          "
          class="px-2 py-1"
        >
          <img alt="posts count" src="../../../assets/media/images/posts.svg" />
          {{ data?.instagram?.posts_count }}
          {{ $t("PLACEHOLDERS.posts_count") }}
        </div>
        <div
          style="
            background: linear-gradient(180deg, #ffffff 0%, #ffe7f3 100%);
            color: #141475;
            font-weight: bold;
            font-size: 16px;
            border-radius: 5px;
          "
          class="px-2 py-1"
        >
          <img alt="reels count" src="../../../assets/media/images/reels.svg" />
          {{ data?.instagram?.highlight_reel_count }}
          {{ $t("PLACEHOLDERS.reels_count") }}
        </div>
      </div>
      <div class="d-flex mt-5 justify-content-between">
        <div class="d-flex mt-5">
          <a
            v-if="data?.instagram?.profile_url"
            :href="formatUrl(data?.instagram?.profile_url)"
            target="_blank"
            class="mx-2"
            ><img
              style="width: 30px; height: 30px"
              alt="Instagram"
              src="../../../assets/media/images/instagram.svg"
          /></a>
        </div>
        <div class="mt-4">
          <div style="color: #141475; font-size: 14px; font-weight: bold">
            % {{ data?.instagram?.average_stats?.engagement_rate }}
          </div>
          <div style="font-size: 14px">
            {{ $t("PLACEHOLDERS.engagement_rate") }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="m-5">
    <h1 style="color: #141475; font-size: 22px; font-weight: 800">
      {{ $t("PLACEHOLDERS.about_influencer") }}
    </h1>
    <div
      style="
        background-color: #f8f8f8;
        color: #2c2c2ccc;
        font-size: 15px;
        line-height: 2.2;
        border-radius: 12px;
      "
      class="py-3 px-4 mt-5"
    >
      {{ data?.instagram?.bio }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: Object,
})
</script>