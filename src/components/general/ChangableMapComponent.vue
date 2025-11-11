<template>
  <div class="map_wrapper">
    <label v-if="placeName" class="place-label">{{ placeName }}</label>
    <GmapMap
      :center="{ lat: parseFloat(lat), lng: parseFloat(lng) }"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100%; height: 400px"
      @click="onMapClick"
    >
      <GmapMarker
        :position="{ lat: parseFloat(lat), lng: parseFloat(lng) }"
        :clickable="true"
        :draggable="true"
        @dragend="onMarkerDragEnd"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "MapComponent",
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      placeName: "", // To store the name of the clicked place
    };
  },

  methods: {
    onMarkerDragEnd(event) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();

      this.$emit("update:lat", newLat);
      this.$emit("update:lng", newLng);
      this.$emit("update:placeName", this.placeName);
      this.getPlaceName(newLat, newLng);
    },
    onMapClick(event) {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();

      this.$emit("update:lat", clickedLat);
      this.$emit("update:lng", clickedLng);
      this.$emit("update:placeName", this.placeName);
      this.getPlaceName(clickedLat, clickedLng);
    },

    async getPlaceName(lat, lng) {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results[0]) {
          this.placeName = results[0].formatted_address; // Set the place name
        } else {
          this.placeName = "Unknown Location"; // Fallback if no result
        }

        this.$emit("update:placeName", this.placeName);
      });
    },
  },
};
</script>

<style scoped>
.map_wrapper {
  width: 100%;
  height: 100%;
}

.place-label {
  display: block;
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
}
</style>
