<template>
  <!-- Start:: Placeholder Container -->
  <img id="avatar" width="45" height="45" alt="user_name" />
  <!-- End:: Placeholder Container -->
</template>

<script>
export default {
  props: ["nameAvatar"],

  methods: {
    generateAvatar(text, foregroundColor = "white", backgroundColor = "black") {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 130;
      canvas.height = 130;
      // Draw background
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      // Draw text
      context.imageSmoothingQuality = "high";
      context.font = "bold 60px Lucida Sans Unicode";
      context.fillStyle = foregroundColor;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, canvas.width / 1.9, canvas.height / 1.9);
      return canvas.toDataURL("image/png");
    },
    textAvatar() {
      if (this.nameAvatar.includes(" ")) {
        let nameSpaceIndex = this.nameAvatar.indexOf(" ");
        let nameLength = this.nameAvatar.length;
        let firstName = this.nameAvatar.substring(0, nameSpaceIndex);
        let lastName = this.nameAvatar.substring(
          nameSpaceIndex + 1,
          nameLength
        );
        let firstLetters = firstName.slice(0, 1) + lastName.slice(0, 1);
        document.getElementById("avatar").src = this.generateAvatar(
          firstLetters.toUpperCase(),
          "white",
          "#E1423D "
        );
      } else if (this.nameAvatar.includes("_")) {
        let nameSpaceIndex = this.nameAvatar.indexOf("_");
        let nameLength = this.nameAvatar.length;
        let firstName = this.nameAvatar.substring(0, nameSpaceIndex);
        let lastName = this.nameAvatar.substring(
          nameSpaceIndex + 1,
          nameLength
        );
        let firstLetters = firstName.slice(0, 1) + lastName.slice(0, 1);
        document.getElementById("avatar").src = this.generateAvatar(
          firstLetters.toUpperCase(),
          "white",
          "#E1423D "
        );
      } else if (
        !this.nameAvatar.includes(" ") ||
        !this.nameAvatar.includes("_")
      ) {
        document.getElementById("avatar").src = this.generateAvatar(
          this.nameAvatar.toUpperCase().slice(0, 2),
          "white",
          "#E1423D "
        );
      }
    },
  },
  mounted() {
    this.generateAvatar();
    setTimeout(() => {
      this.textAvatar();
    }, 1000);
  },
};
</script>
