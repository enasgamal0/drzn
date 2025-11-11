<template>
    <main>
      <section class="file-container my-10">
        <h5
          style="
            color: #E1423D;
            font-weight: 500;
          "
        >
          <slot></slot>
        </h5>
        <div class="uploadphoto">
          <v-icon color="#0b7477">mdi-paperclip</v-icon>
          <img
           @click="onFileClick"
            data-v-01034da1=""
            src="@/assets/media/images/upload_image.svg" 
            alt="Image To Upload"
            width="100"
            height="100"
            class="image_placeholder"
            style="cursor: pointer;"
          />
        </div>
        <div class="image-wrapper" ref="imageWrapper">
          <div class="image-preview" v-for="(imgUrl, index) in combinedUrls" :key="index">
            <img
              width="100"
              height="100"
              loading="lazy"
              :src="imgUrl"
              alt="photo"
            />
            <div class="overlay">
              <span v-if="imgUrl.startsWith('blob')" @click.stop="onRemove(index, 'new')" class="remove-file">x</span>
              <span v-else @click.stop="onRemove(index, 'old')" class="remove-file">x</span>
            </div>
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
    </main>
  </template>
  
  <script>
  export default {
    name: "FileUpload",
    props: {
      accept: {
        type: String,
        default: "image/* ",
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
      onRemove(index, type) {
        if (type === 'new') {
          this.$delete(this.files, index - this.urls.length);
          this.$emit("onFileSelect", this.files);
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
        const areAllTextsInvalidImages = (img) => {
          const validExtensions = [".jpg", ".jpeg", ".png", ".jfif", ".mp4", ".mov", ".webm"];
          return img.every((text) =>
            validExtensions.some((ext) => text.name.toLowerCase().endsWith(ext))
          );
        };
  
        if (areAllTextsInvalidImages(Array.from(event.target.files))) {
          const convertedFiles = Array.from(event.target.files);
          this.files = [...this.files, ...convertedFiles];
          this.$emit("onFileSelect", this.files);
        } else {
          this.$message.error(this.$t("VALIDATION.selectedFileMustBeImage"));
        }
      },
    },
  
    computed: {
      combinedUrls() {
        const imageFiles = this.files?.filter((file) =>
          file.type.startsWith("image/")
        );
        const imageUrls = imageFiles?.map((file) => URL.createObjectURL(file));
        return [...this.urls, ...imageUrls];
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