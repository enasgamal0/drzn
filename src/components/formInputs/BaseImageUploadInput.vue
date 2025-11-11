<template>
  <div class="my-5" :class="col ? `col-lg-${col}` : ''">
    <div class="single_image_input_wrapper">
      <span class="input_placeholder" v-if="placeholder">
        {{ placeholder }}
        <span class="text-danger" v-if="required"> * </span>
      </span>
      <div class="wrapper">
        <label :for="identifier"></label>
        <img
          v-if="image.type == 'image_file'"
          :class="
            preSelectedImage || image.file
              ? 'image_uploaded'
              : 'image_placeholder'
          "
          :src="preSelectedImage ? preSelectedImage : image.path"
          alt="Image To Upload"
          width="100"
          height="100"
        />
        <video
          v-if="image.type == 'video_file'"
          autoplay
          controls
          loop
          class="w-100 h-100"
          ref="videoPreview"
        >
          <source :src="image.path" type="video/mp4" />
        </video>
        <input
          type="file"
          :accept="inputAccept"
          class="form-control"
          :id="identifier"
          @change="selectImageToUpload"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import predictFileType from "@/utils/predictFileType.js";

export default {
  name: "BaseImageUploadInput",

  emits: ["selectImage"],

  props: {
    // ====== Start:: General Inputs Props ====== //
    col: {
      required: false,
      type: String,
    },
    identifier: {
      required: true,
      type: String,
    },
    preSelectedImage: {
      required: false,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    acceptVideo: {
      required: false,
      type: Boolean,
      default: false,
    },
    // ====== End:: General Inputs Props ====== //
  },

  data() {
    return {
      image: {
        path: require("@/assets/media/images/upload_image.svg"),
        file: null,
        type: "image_file",
      },
      inputAccept: "image/png, image/jpg, image/jpeg, image/jfif ,video/*",
    };
  },

  methods: {
    checkExtension() {
      const fileType = this.image?.file?.type?.split("/")[0];
      console.log("🚀 ~ checkExtension ~ fileType:", fileType);
      return fileType;
    },
    // Start:: Select Image
    selectImageToUpload(e) {
      const selectedFile = e.target.files[0];
      const fileType = predictFileType(selectedFile.name);

      if (fileType !== "image_file" && !this.acceptVideo) {
        this.$message.error(this.$t("VALIDATION.selectedFileMustBeImage"));
        return;
      } else if (fileType !== "video_file" && fileType !== "image_file" && this.acceptVideo) {
        this.$message.error(this.$t("VALIDATION.selectedFileMustBeImageOrVideo"));
        return;
      } else {
        this.image.path = URL.createObjectURL(selectedFile);
        this.image.file = selectedFile;
        this.image.type = fileType == "image_file" ? "image_file" : "video_file";
        this.$emit("selectImage", {
          identifier: this.identifier,
          ...this.image,
        });
        console.log(this.image.path);

        if (this.image.type == "video_file") {
          this.$refs.videoPreview.load();
        }
      }
    },
    // End:: Select Image
  },

  updated() {
    if (this.acceptVideo && !this.image.file) {
      this.inputAccept = "";
      this.image.path =
        this.preSelectedImage ??
        require("@/assets/media/images/upload_image.svg");
      this.image.type = this.preSelectedImage
        ? predictFileType(this.preSelectedImage)
        : "image_file";
    }
  },
  created() {
    if (this.preSelectedImage) {
      if (
        this.preSelectedImage.endsWith("png") ||
        this.preSelectedImage.endsWith("jpg") ||
        this.preSelectedImage.endsWith("jpeg") ||
        this.preSelectedImage.endsWith("jfif") ||
        this.preSelectedImage.endsWith("gif") ||
        this.preSelectedImage.endsWith("bmp") ||
        this.preSelectedImage.endsWith("webp")
      ) {
        this.image.type = "image_file";
        this.image.path = this.preSelectedImage;
      } else {
        this.image.type = "video_file";
        this.image.path = this.preSelectedImage;
      }
    } else {
      this.image.path = require("@/assets/media/images/upload_image.svg");
    }
    if (this.acceptVideo == true) {
      this.inputAccept = "video/* ,image/png, image/jpg, image/jpeg, image/jfif";
    } else {
      this.inputAccept = "image/png, image/jpg, image/jpeg, image/jfif ";
    }
  },
};
</script>
