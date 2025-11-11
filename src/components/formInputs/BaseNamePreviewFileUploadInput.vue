<template>
  <div class="my-5" :class="col ? `col-lg-${col}` : ''">
    <div class="wrapper">
      <img
        v-if="useImagePreview && selectedFile.path"
        :src="preSelectedFile ? preSelectedFile : selectedFile.path"
        width="120"
        height="120"
        class="selected_image_preview"
      />
      <div class="input_wrapper upload_file_text_preview top_label">
        <span class="form-label">
          {{ placeholder }}
          <span class="text-danger" v-if="required"> * </span>
        </span>

        <label class="input_file_label" :for="identifier">
          <span class="file_name" v-if="preSelectedFile">
            {{ preSelectedFile }}
          </span>
          <span class="file_name" v-else-if="selectedFile.name">
            {{ selectedFile.name }}
          </span>
        </label>

        <input
          type="file"
          accept="image/*, .pdf"
          class="form-control"
          :id="identifier"
          @change="selectFileToUpload"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseNamePreviewFileUploadInput",

  emits: ["selectFile"],

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
    preSelectedFile: {
      required: false,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    useImagePreview: {
      required: false,
      type: Boolean,
      default: false,
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
    // ====== End:: General Inputs Props ====== //
  },

  data() {
    return {
      selectedFile: {
        file: null,
        path: null,
        name: null,
      },
    };
  },

  methods: {
    // Start:: Select File
    selectFileToUpload(e) {
      this.selectedFile.file = e.target.files[0];
      this.selectedFile.path = URL.createObjectURL(e.target.files[0]);
      this.selectedFile.name = e.target.files[0].name;
      this.$emit("selectFile", {
        identifier: this.identifier,
        ...this.selectedFile,
      });
    },
    // End:: Select File
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include flexCenterAlignment;
  flex-direction: column;
  row-gap: 15px;
  .selected_image_preview {
    border-radius: 10px;
    object-fit: cover;
  }
  .upload_file_text_preview {
    width: 100%;
  }
}
</style>
