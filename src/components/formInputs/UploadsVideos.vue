<template>
  <main>
    <section class="file-container my-10">
      <h3
        style="
          color: #000;
          font-weight: 500;
          font-family: cairo;
          cursor: pointer;
        "
      >
        <slot></slot>
      </h3>
      <div @click="onFileClick" class="uploadphoto">
        <v-icon color="#0b7477">mdi-paperclip</v-icon>
        <img
          data-v-01034da1=""
          src="../../assets/media/images/image.png"
          alt="Image To Upload"
          width="100"
          height="100"
          class="image_placeholder"
        />
      </div>
      <div class="image-wrapper" ref="imageWrapper">
        <!-- loop who work #####################>>###################>>#########>###>###>##> -->
        <div
          class="image-preview"
          v-for="(videoUrl, index) in urls"
          :key="index"
        >
          <video
            width="100"
            height="100"
            loading="lazy"
            :src="videoUrl"
            controls
          ></video>
          <div class="overlay">
            <span @click.stop="onRemove(index)" class="remove-file">x</span>
          </div>
        </div>
        <!-- loop who work #####################>>###################>>#########>###>###>##> -->
        <div
          class="image-preview"
          v-for="(videoUrl, index) in videoUrls"
          :key="index"
        >
          <video
            width="100"
            height="100"
            loading="lazy"
            :src="videoUrl"
            controls
          ></video>
          <div class="overlay">
            <span @click.stop="onRemove(index)" class="remove-file">x</span>
          </div>
        </div>
      </div>
    </section>
    <!-- loop who work #####################>>###################>>#########>###>###>##> -->
    <input
      @change="onFileSelect"
      :multiple="multiple"
      type="file"
      hidden
      ref="file_input"
      :accept="accept"
    />
    <!-- loop who work #####################>>###################>>#########>###>###>##> -->
  </main>
</template>

<script>
export default {
  name: "FileUpload",
  props: {
    accept: {
      type: String,
      default: "video/* ",
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
    };
  },
  methods: {
    // <!-- is that img function  #####################>>###################>>#########>###>###>##> -->
    // isImage(fileType) {
    //   return fileType.startsWith("video/*");
    // },
    // <!-- is that img function  #####################>>###################>>#########>###>###>##> -->

    // <!-- scrollToEnd function  #####################>>###################>>#########>###>###>##> -->
    // scrollToEnd() {
    //   this.$refs.imageWrapper.scrollLeft = this.$refs.imageWrapper.scrollWidth;
    // },
    // <!-- scrollToEnd function  #####################>>###################>>#########>###>###>##> -->

    onRemove(index) {
      if (this.files && this.files[index] && this.files[index]["type"]) {
        this.$delete(this.files, index);
      } else {
        this.$emit("onFileRemove", index);
      }
    },
    onFileClick() {
      if (this.disabled) {
        return;
      }
      this.$refs.file_input.value = "";
      this.$refs.file_input.click();
    },
    onFileSelect(event) {
      const convertedFiles = Array.from(event.target.files);
      this.files = [...this.files, ...convertedFiles];
      this.$emit("onFileSelect", this.files);
    },
  },
  computed: {
    videoUrls() {
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
}

.image-wrapper img {
  border-radius: 8px;
  max-width: 100px;
  max-height: 100px;
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

.image-wrapper .image-preview:hover .overlay {
  opacity: 1;
}

/* Hide the scrollbar (for WebKit browsers) */
/* .image-wrapper::-webkit-scrollbar {
  display: none;
} */
</style>
