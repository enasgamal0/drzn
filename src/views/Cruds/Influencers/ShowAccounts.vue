<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_influencer_data_account") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #E1423D">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <Tabs :tabsContent="tabsContent">
        <template #all>
          <div
            class="card_flex flex-wrap mt-5"
            style="justify-content: center !important"
          >
            <div class="text-center">
              <img
                alt="Influencer Image"
                :src="totalsData?.profile_picture || data?.image?.path"
                @error="onImageError"
                style="
                  width: 90px;
                  height: 90px;
                  border-radius: 50px;
                  margin-top: 100px;
                "
                class="influencer_img"
              />
            </div>
            <div
              style="
                margin-top: 50px;
                background-color: #f8f8f8;
                border-radius: 12px;
              "
              class="card_margin_x p-4 card_width"
            >
              <h2 style="font-size: 28px; font-weight: 800; color: #222222">
                {{ data?.name }}
              </h2>
              <div class="card_flex">
                <img
                  alt="Country Flag"
                  v-show="data?.country?.flag"
                  :src="data?.country?.flag"
                  style="width: 32px; height: 20px; border-radius: 5px"
                />
                <p class="mx-2" style="color: gray">
                  {{ data?.country?.name }}
                </p>
              </div>
              <div class="card_flex gap-3 mt-5">
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
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
                  <!-- (data?.instagram?.followers_count || 0) +
                    (data?.snapchat?.followers_count || 0) +
                    (data?.tiktok?.followers_count || 0) -->
                  {{ data?.total_followers }}
                  {{ $t("PLACEHOLDERS.followers_count") }}
                </div>
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
                    font-weight: bold;
                    font-size: 16px;
                    border-radius: 5px;
                  "
                  class="px-2 py-1"
                >
                  <img
                    alt="posts count"
                    src="../../../assets/media/images/posts.svg"
                  />
                  {{
                    (data?.instagram?.posts_count || 0) +
                    (data?.snapchat?.posts_count || 0) +
                    (data?.tiktok?.videos_count || 0)
                  }}
                  {{ $t("PLACEHOLDERS.posts_count") }}
                </div>
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
                    font-weight: bold;
                    font-size: 16px;
                    border-radius: 5px;
                  "
                  class="px-2 py-1"
                >
                  <img
                    alt="reels count"
                    src="../../../assets/media/images/reels.svg"
                  />
                  {{
                    (data?.instagram?.highlight_reel_count || 0) +
                    (data?.snapchat?.highlight_reel_count || 0) +
                    (data?.tiktok?.highlight_reel_count || 0)
                  }}
                  {{ $t("PLACEHOLDERS.reels_count") }}
                </div>
              </div>
              <div class="card_flex mt-5 justify-content-between">
                <div class="card_flex mt-5">
                  <a
                    v-show="data?.snapchat?.profile_url"
                    :href="formatUrl(data?.snapchat?.profile_url)"
                    target="_blank"
                    class="mx-2"
                    ><img
                      style="width: 30px; height: 30px"
                      alt="Snapchat"
                      src="../../../assets/media/images/snapchat.svg"
                  /></a>
                  <a
                    v-show="data?.facebook?.profile_url"
                    :href="formatUrl(data?.facebook?.profile_url)"
                    target="_blank"
                    class="mx-2"
                    ><img
                      style="width: 30px; height: 30px"
                      alt="Facebook"
                      src="../../../assets/media/images/facebook.svg"
                  /></a>
                  <a
                    v-show="data?.instagram?.profile_url"
                    :href="formatUrl(data?.instagram?.profile_url)"
                    target="_blank"
                    class="mx-2"
                    ><img
                      style="width: 30px; height: 30px"
                      alt="Instagram"
                      src="../../../assets/media/images/instagram.svg"
                  /></a>
                  <a
                    v-show="data?.tiktok?.profile_url"
                    :href="formatUrl(data?.tiktok?.profile_url)"
                    target="_blank"
                    class="mx-2"
                    ><img
                      style="width: 30px; height: 30px"
                      alt="Tiktok"
                      src="../../../assets/media/images/tiktok.svg"
                  /></a>
                </div>
                <div class="mt-4">
                  <div
                    style="color: #621178ff; font-size: 14px; font-weight: bold"
                  >
                    % {{ totalsData?.average_stats?.engagement_rate }}
                  </div>
                  <div style="font-size: 14px">
                    {{ $t("PLACEHOLDERS.engagement_rate") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_margin">
            <h1 style="color: #621178ff; font-size: 22px; font-weight: 800">
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
              {{ totalsData?.bio || $t("PLACEHOLDERS.no_data") }}
            </div>
          </div>
        </template>

        <template #instagram>
          <div
            class="card_flex flex-wrap mt-5"
            style="justify-content: center !important"
            v-show="data?.instagram && data?.instagram?.display_name"
          >
            <div class="text-center">
              <img
                alt="Influencer Image"
                :src="data?.instagram?.profile_picture || data?.image?.path"
                @error="onImageError"
                style="
                  width: 90px;
                  height: 90px;
                  border-radius: 50px;
                  margin-top: 100px;
                "
                class="influencer_img"
              />
            </div>
            <div
              style="
                margin-top: 50px;
                background-color: #f8f8f8;
                border-radius: 12px;
              "
              class="card_margin_x p-4 card_width"
            >
              <h2 style="font-size: 28px; font-weight: 800; color: #222222">
                {{ data?.instagram?.display_name }}
              </h2>
              <div class="card_flex">
                <img
                  alt="Country Flag"
                  v-show="data?.country?.flag"
                  :src="data?.country?.flag"
                  style="width: 32px; height: 20px; border-radius: 5px"
                />
                <p class="mx-2" style="color: gray">
                  {{ data?.country?.name }}
                </p>
              </div>
              <div class="card_flex gap-3 mt-5">
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
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
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
                    font-weight: bold;
                    font-size: 16px;
                    border-radius: 5px;
                  "
                  class="px-2 py-1"
                >
                  <img
                    alt="posts count"
                    src="../../../assets/media/images/posts.svg"
                  />
                  {{ data?.instagram?.posts_count }}
                  {{ $t("PLACEHOLDERS.posts_count") }}
                </div>
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
                    font-weight: bold;
                    font-size: 16px;
                    border-radius: 5px;
                  "
                  class="px-2 py-1"
                >
                  <img
                    alt="reels count"
                    src="../../../assets/media/images/reels.svg"
                  />
                  {{ data?.instagram?.highlight_reel_count }}
                  {{ $t("PLACEHOLDERS.reels_count") }}
                </div>
              </div>
              <div class="card_flex mt-5 justify-content-between">
                <div class="card_flex mt-5">
                  <a
                    v-show="data?.instagram?.profile_url"
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
                  <div
                    style="color: #621178ff; font-size: 14px; font-weight: bold"
                  >
                    % {{ data?.instagram?.average_stats?.engagement_rate }}
                  </div>
                  <div style="font-size: 14px">
                    {{ $t("PLACEHOLDERS.engagement_rate") }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card_margin" v-show="data?.instagram && data?.instagram?.display_name">
            <h1 style="color: #621178ff; font-size: 22px; font-weight: 800">
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
              {{ data?.instagram?.bio || $t("PLACEHOLDERS.no_data") }}
            </div>
          </div>
          <div v-show="data?.instagram && data?.instagram?.display_name">
            <hr />
            <div class="pt-5">
              <h1 style="color: #621178ff; font-size: 22px; font-weight: 800">
                {{ $t("PLACEHOLDERS.top_five_posts") }}
              </h1>
            </div>

            <div
              class="flex flex-wrap justify-center"
              style="display: flex"
              v-show="data?.instagram?.top_five_posts"
            >
              <div
                v-for="(post, index) in data?.instagram?.top_five_posts"
                class="border shadow"
                style="border-radius: 12px; margin: 30px"
                :key="post?.id"
              >
                <iframe
                  :src="`https://www.instagram.com/p/${post?.media_url
                    ?.split('/p/')[1]
                    ?.replace(/\/$/, '')}/embed`"
                  style="
                    border-radius: 12px;
                    border: none;
                    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5),
                      0 1px 10px rgba(0, 0, 0, 0.15);
                    display: block;
                    margin: auto;
                    height: 580px;
                  "
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div
            style="font-size: 16px; color: #8c8c8cff"
            class="text-center mt-5"
            v-show="!data?.instagram"
          >
            {{ $t("PLACEHOLDERS.no_account") }}
          </div>
          <div
            style="font-size: 16px; color: #8c8c8cff"
            class="text-center mt-5"
            v-show="data?.instagram && !data?.instagram?.display_name"
          >
            {{ $t("PLACEHOLDERS.invalid_username") }}
          </div>
        </template>

        <template #snapchat>
          <div
            class="card_flex flex-wrap mt-5"
            style="justify-content: center !important"
            v-show="data?.snapchat && data?.snapchat?.display_name"
          >
            <div class="text-center">
              <img
                alt="Influencer Image"
                :src="data?.snapchat?.profile_picture || data?.image?.path"
                @error="onImageError"
                style="
                  width: 90px;
                  height: 90px;
                  border-radius: 50px;
                  margin-top: 100px;
                "
                class="influencer_img"
              />
            </div>
            <div
              style="
                margin-top: 50px;
                background-color: #f8f8f8;
                border-radius: 12px;
              "
              class="card_margin_x p-4 card_width"
            >
              <h2 style="font-size: 28px; font-weight: 800; color: #222222">
                {{ data?.snapchat?.display_name }}
              </h2>
              <div class="card_flex">
                <img
                  alt="Country Flag"
                  v-show="data?.country?.flag"
                  :src="data?.country?.flag"
                  style="width: 32px; height: 20px; border-radius: 5px"
                />
                <p class="mx-2" style="color: gray">
                  {{ data?.country?.name }}
                </p>
              </div>
              <div class="card_flex gap-3 mt-5">
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
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
                  {{ data?.snapchat?.followers_count }}
                  {{ $t("PLACEHOLDERS.followers_count") }}
                </div>
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
                    font-weight: bold;
                    font-size: 16px;
                    border-radius: 5px;
                  "
                  class="px-2 py-1"
                >
                  <img
                    alt="reels count"
                    src="../../../assets/media/images/reels.svg"
                  />
                  {{ data?.snapchat?.stories_count }}
                  {{ $t("PLACEHOLDERS.stories_count") }}
                </div>
              </div>
              <div class="card_flex mt-5 justify-content-between">
                <div class="card_flex mt-5">
                  <a
                    v-show="data?.snapchat?.profile_url"
                    :href="formatUrl(data?.snapchat?.profile_url)"
                    target="_blank"
                    class="mx-2"
                    ><img
                      style="width: 30px; height: 30px"
                      alt="Snapchat"
                      src="../../../assets/media/images/snapchat.svg"
                  /></a>
                </div>
                <div class="mt-4">
                  <div
                    style="color: #621178ff; font-size: 14px; font-weight: bold"
                  >
                    % {{ data?.snapchat?.average_stats?.engagement_rate }}
                  </div>
                  <div style="font-size: 14px">
                    {{ $t("PLACEHOLDERS.engagement_rate") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_margin" v-show="data?.snapchat && data?.snapchat?.display_name">
            <h1 style="color: #621178ff; font-size: 22px; font-weight: 800">
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
              {{ data?.snapchat?.bio || $t("PLACEHOLDERS.no_data") }}
            </div>
          </div>
          <div v-show="data?.snapchat && data?.snapchat?.display_name">
            <hr />
            <div class="pt-5">
              <h1 style="color: #621178ff; font-size: 22px; font-weight: 800">
                {{ $t("PLACEHOLDERS.top_five_posts") }}
              </h1>
            </div>

            <div
              class="flex flex-wrap justify-center"
              style="display: flex"
              v-show="data?.snapchat?.top_five_posts"
            >
              <div
                v-for="(post, index) in data?.snapchat?.top_five_posts"
                class="border shadow"
                style="border-radius: 12px; margin: 30px"
                :key="post?.id"
              >
                <iframe
                  :src="`https://www.snapchat.com/add/${data?.snapchat?.username}/highlight/${post?.post_id}/embed`"
                  width="420"
                  height="500"
                  style="
                    border-radius: 12px;
                    border: none;
                    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5),
                      0 1px 10px rgba(0, 0, 0, 0.15);
                    display: block;
                    margin: auto;
                  "
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div
            style="font-size: 16px; color: #8c8c8cff"
            class="text-center mt-5"
            v-show="!data?.snapchat"
          >
            {{ $t("PLACEHOLDERS.no_account") }}
          </div>
          <div
            style="font-size: 16px; color: #8c8c8cff"
            class="text-center mt-5"
            v-show="data?.snapchat && !data?.snapchat?.display_name"
          >
            {{ $t("PLACEHOLDERS.invalid_username") }}
          </div>
        </template>

        <template #tiktok>
          <div
            class="card_flex flex-wrap mt-5"
            style="justify-content: center !important"
            v-show="data?.tiktok && data?.tiktok?.display_name"
          >
            <div class="text-center">
              <img
                alt="Influencer Image"
                :src="data?.tiktok?.profile_picture || data?.image?.path"
                @error="onImageError"
                style="
                  width: 90px;
                  height: 90px;
                  border-radius: 50px;
                  margin-top: 100px;
                "
                class="influencer_img"
              />
            </div>
            <div
              style="
                margin-top: 50px;
                background-color: #f8f8f8;
                border-radius: 12px;
              "
              class="card_margin_x p-4 card_width"
            >
              <h2 style="font-size: 28px; font-weight: 800; color: #222222">
                {{ data?.tiktok?.display_name }}
              </h2>
              <div class="card_flex">
                <img
                  alt="Country Flag"
                  v-show="data?.country?.flag"
                  :src="data?.country?.flag"
                  style="width: 32px; height: 20px; border-radius: 5px"
                />
                <p class="mx-2" style="color: gray">
                  {{ data?.country?.name }}
                </p>
              </div>
              <div class="card_flex gap-3 mt-5">
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
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
                  {{ data?.tiktok?.followers_count }}
                  {{ $t("PLACEHOLDERS.followers_count") }}
                </div>
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
                    font-weight: bold;
                    font-size: 16px;
                    border-radius: 5px;
                  "
                  class="px-2 py-1"
                >
                  <img
                    alt="posts count"
                    src="../../../assets/media/images/posts.svg"
                  />
                  {{ data?.tiktok?.videos_count }}
                  {{ $t("PLACEHOLDERS.videos_count") }}
                </div>
                <div
                  v-show="data?.tiktok?.highlight_reel_count"
                  style="
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #ffe7f3 100%
                    );
                    color: #621178ff;
                    font-weight: bold;
                    font-size: 16px;
                    border-radius: 5px;
                  "
                  class="px-2 py-1"
                >
                  <img
                    alt="reels count"
                    src="../../../assets/media/images/reels.svg"
                  />
                  {{ data?.tiktok?.highlight_reel_count }}
                  {{ $t("PLACEHOLDERS.reels_count") }}
                </div>
              </div>
              <div class="card_flex mt-5 justify-content-between">
                <div class="card_flex mt-5">
                  <a
                    v-show="data?.tiktok?.profile_url"
                    :href="formatUrl(data?.tiktok?.profile_url)"
                    target="_blank"
                    class="mx-2"
                    ><img
                      style="width: 30px; height: 30px"
                      alt="Tiktok"
                      src="../../../assets/media/images/tiktok.svg"
                  /></a>
                </div>
                <div class="mt-4">
                  <div
                    style="color: #621178ff; font-size: 14px; font-weight: bold"
                  >
                    % {{ data?.tiktok?.average_stats?.engagement_rate }}
                  </div>
                  <div style="font-size: 14px">
                    {{ $t("PLACEHOLDERS.engagement_rate") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_margin" v-show="data?.tiktok && data?.tiktok?.display_name">
            <h1 style="color: #621178ff; font-size: 22px; font-weight: 800">
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
              {{ data?.tiktok?.bio || $t("PLACEHOLDERS.no_data") }}
            </div>
          </div>
          <div v-show="data?.tiktok && data?.tiktok?.display_name">
            <hr />
            <div class="pt-5">
              <h1 style="color: #621178ff; font-size: 22px; font-weight: 800">
                {{ $t("PLACEHOLDERS.top_five_posts") }}
              </h1>
            </div>

            <div
              class="flex flex-wrap justify-center"
              style="display: flex"
              v-show="data?.tiktok?.top_five_posts"
            >
              <div
                v-for="(post, index) in data?.tiktok?.top_five_posts"
                class="border shadow"
                style="border-radius: 12px; margin: 30px"
                :key="post?.id"
              >
                <iframe
                  :src="`https://www.tiktok.com/embed/${post?.post_id}`"
                  style="
                    border-radius: 12px;
                    height: 740px;
                    width: 330px;
                    border: none;
                    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5),
                      0 1px 10px rgba(0, 0, 0, 0.15);
                    display: block;
                    margin: auto;
                  "
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div
            style="font-size: 16px; color: #8c8c8cff"
            class="text-center mt-5"
            v-show="!data?.tiktok"
          >
            {{ $t("PLACEHOLDERS.no_account") }}
          </div>
          <div
            style="font-size: 16px; color: #8c8c8cff"
            class="text-center mt-5"
            v-show="data?.tiktok && !data?.tiktok?.display_name"
          >
            {{ $t("PLACEHOLDERS.invalid_username") }}
          </div>
        </template>
      </Tabs>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import BasePhoneInput from "@/components/formInputs/BasePhoneInput.vue";
import Tabs from "@/components/structure/Tabs.vue";

export default {
  name: "CreateInfluencer",
  components: {
    BasePhoneInput,
    Tabs,
  },
  data() {
    return {
      tabsContent: [
        { tab: this.$t("PLACEHOLDERS.totals"), key_name: "all" },
        { tab: this.$t("PLACEHOLDERS.instagram"), key_name: "instagram" },
        { tab: this.$t("PLACEHOLDERS.snapchat"), key_name: "snapchat" },
        { tab: this.$t("PLACEHOLDERS.tiktok"), key_name: "tiktok" },
      ],
      isWaitingRequest: false,
      totalsData: null,
      test1: "https://www.tiktok.com/@islamfawzy_/video/7505344140431953170",
      test2: "7505344140431953170",
      data: {
        image: {
          path: null,
          file: null,
        },
        instagram: null,
        snapchat: null,
        tiktok: null,
        email: null,
        influencer_name: null,
        country: null,
        total_followers: null,
        nationality: null,
        hobbies: [],
        address: null,
        password: null,
        passwordConfirmation: null,
        phone: null,
        user_name: null,
        gender: null,
        date: null,
        fields: [],
        iban: null,
        dial_code: null,
        dial_code_whatsapp: null,
        name: null,
      },
    };
  },

  mounted() {
    this.loadScript("https://www.instagram.com/embed.js");
    this.loadScript("https://www.snapchat.com/embed.js");
    this.loadScript("https://www.tiktok.com/embed.js");

    // Log browser language
    const browserLanguage = navigator.language || navigator.userLanguage;
    console.log(browserLanguage);
  },

  methods: {
    loadScript(src) {
      const script = document.createElement("script");
      script.setAttribute("src", src);
      script.async = true;
      document.body.appendChild(script);
    },
    async fetchInfluencerData() {
      try {
        let response = await this.$axios.get(
          `/influencers/${this.$route.params?.id}`
        );
        const influencer = response.data.data.Influencer;
        this.data = {
          image: { path: influencer.image, file: null },
          email: influencer.email,
          full_name: influencer.full_name,
          influencer_name: influencer.name,
          country: influencer.country_id || null,
          total_followers: influencer.total_followers || null,
          area: influencer.area?.name || null,
          city: influencer.city?.name || null,
          district: influencer.district?.name || null,
          nationality: influencer.nationality_id?.name || null,
          hobbies: influencer.hobbies,
          address: influencer.address || influencer.full_address,
          street: influencer.street,
          zip_code: influencer.zip_code,
          phone: influencer.mobile,
          user_name: influencer.user_name,
          name: influencer.name,
          gender: influencer.gender,
          date: influencer.birth_date,
          dial_code: influencer.country_code,
          iso_code: influencer.iso_code,
          whatsapp_iso_code: influencer.whatsapp_iso_code,
          dial_code_whatsapp: influencer.whatsapp_country_code,
          whatsapp: influencer.whatsapp_number,
          instagram: influencer?.instagram,
          snapchat: influencer?.snapchat,
          tiktok: influencer?.tiktok,
          fields: influencer.social_media_accounts?.map((acc) => ({
            socialType:
              this.socialTypes?.find((s) => s.value === acc.platform) || null,
            account_id: acc.id,
            account_name: acc.account_name,
            id: acc.id,
          })),
        };
        this.isWhatsappSame = influencer.is_whatsapp_same;
        this.totalsData = null;
        const matchedAccountKey = Object.keys(influencer).find(
          (key) => key == influencer.best_platform
        );
        const matchedAccount = matchedAccountKey
          ? influencer[matchedAccountKey]
          : null;

        if (matchedAccount) {
          this.totalsData = matchedAccount;
        }
      } catch (error) {
        console.error("Error fetching influencer data:", error);
      }
    },
    formatUrl(url) {
      if (!url) return "#";
      return url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    },
    onImageError(event) {
      event.target.src = this.data?.image?.path;
    },
  },

  async created() {
    await this.fetchInfluencerData();
  },
};
</script>

<style>
.gender-options {
  color: #E1423D;
  font-size: 16px;
}
.card_width {
  width: 50%;
}
.card_flex {
  display: flex;
}
.card_margin {
  margin: 3rem;
}
.card_margin_x {
  margin-right: 3rem;
  margin-left: 3rem;
}
@media (max-width: 1300px) {
  .card_width {
    width: 100%;
  }
  .card_flex {
    display: block;
  }
  .card_margin {
    margin-right: 0;
    margin-left: 0;
  }
  .card_margin_x {
    margin-right: 0;
    margin-left: 0;
  }
  .influencer_img {
    margin-top: 20px !important;
  }
}
</style>
