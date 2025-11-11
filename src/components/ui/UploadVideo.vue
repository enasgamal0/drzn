<template>
  <main>
    <section class="file-container my-10">
      <h3
        style="
          color: #49a956;
          font-weight: 500;
          font-family: cairo;
          cursor: pointer;
        "
      >
        <slot></slot>
      </h3>

      <div class="image-wrapper" ref="imageWrapper">
        <!-- loop who work ##################????????????################### -->
        <div class="image-preview" v-for="(imgUrl, index) in urls" :key="index">
          <video
            width="100"
            height="100"
            loading="lazy"
            :src="imgUrl"
            controls
          ></video>
          <div @click="openImg(imgUrl)" class="eyeWrapper">
            <i class="fas fa-eye"></i>
          </div>
        </div>
        <!-- loop who work ##################????????????################### -->
        <div
          class="image-preview"
          v-for="(imgUrl, index) in imgUrls"
          :key="index"
        >
          <video
            width="100"
            height="100"
            loading="lazy"
            :src="imgUrl"
            controls
          ></video>
        </div>
      </div>
    </section>
    <input
      @change="onFileSelect"
      :multiple="multiple"
      type="file"
      hidden
      ref="file_input"
      :accept="accept"
    />
    <v-dialog v-model="showImg">
      <video
        width="100"
        height="100"
        loading="lazy"
        :src="bigImgSrc"
        controls
      ></video>
    </v-dialog>
  </main>
</template>

<script>
export default {
  name: "FileUpload",
  props: {
    accept: {
      type: String,
      default: "image/png, image/jpeg, image/jpg, image/jfif ,  video/* ",
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    urls: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      files: [],
      showImg: false,
      bigImgSrc: "",
    };
  },
  methods: {
    openImg(src) {
      this.showImg = true;
      this.bigImgSrc = src;
    },
    onFileSelect(event) {
      const convertedFiles = Array.from(event.target.files);
      this.files = [...this.files, ...convertedFiles];
      this.$emit("onFileSelect", this.files);
    },
  },
  computed: {
    imgUrls() {
      const videoFiles = this.files.filter((file) =>
        file.type.startsWith("video/")
      );
      const videoUrls = videoFiles.map((file) => URL.createObjectURL(file));

      return [...videoUrls];
    },
  },
};
</script>

<style scoped>
.file-container {
  position: relative;
}

.file-wrapper {
  position: relative;
  height: 150px;
  border: 1px dashed #444;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.image-wrapper {
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-inline: 10px;
}

.image-wrapper .image-preview {
  position: relative;
  transition: all 1s ease;
  overflow: hidden;
  z-index: 1;
}

.image-wrapper video {
  border-radius: 8px;
  max-width: 100px;
  max-height: 100px;
  z-index: 2;
}

.remove-file {
  position: absolute;
  width: 20px;
  height: 20px;
  outline: none;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: white;
  top: 5px;
  left: 5px;
  cursor: pointer;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(000, 000, 000, 0.5);
  opacity: 0;
  z-index: 2;
  border-radius: 8px;
  transition: all 0.6s ease;
}

.eyeWrapper {
  background-color: white;
  width: fit-content;
  padding: 0 3px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 0;
}
.v-dialog--active video {
  height: 60vh;
}

.image-wrapper .image-preview:hover .overlay {
  opacity: 1;
}

/* Hide the scrollbar (for WebKit browsers) */
/* .image-wrapper::-webkit-scrollbar {
  display: none;
} */
</style>
