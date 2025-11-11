<template>
  <div class="map_wrapper">
    <!-- <label v-if="placeName" class="place-label">{{ placeName }}</label> -->
    <GmapMap
      v-if="markers"
      :center="mapCenter"
      :zoom="5"
      map-type-id="terrain"
      style="width: 100%; height: 400px"
      @click="onMapClick"
    >
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="{ lat: marker.lat, lng: marker.lng }"
        :clickable="true"
        :draggable="true"
        @dragend="onMarkerDragEnd($event, index)"
        @click="removeMarker(index)"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "MapComponent",
  props: {
    markers: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      placeName: "",
      mapCenter: { lat: 23.8859, lng: 45.0792 },
    };
  },

  mounted() {
    setTimeout(() => {
      if (this.markers && this.markers.length > 0) {
        this.mapCenter = { lat: this.markers[0].lat, lng: this.markers[0].lng };
      }
    }, 2000);
  },

  methods: {
    onMarkerDragEnd(event, index) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();

      const updatedMarkers = [...this.markers];
      updatedMarkers[index] = { lat: newLat, lng: newLng };

      this.$emit("update:markers", updatedMarkers);
      this.mapCenter = { lat: newLat, lng: newLng };
      this.getPlaceName(newLat, newLng);
    },
    onMapClick(event) {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();

      const updatedMarkers = [
        ...this.markers,
        { lat: clickedLat, lng: clickedLng },
      ];
      this.$emit("update:markers", updatedMarkers);
      this.mapCenter = { lat: clickedLat, lng: clickedLng };
      this.getPlaceName(clickedLat, clickedLng);
    },
    removeMarker(index) {
      const updatedMarkers = [...this.markers];
      updatedMarkers.splice(index, 1);

      this.$emit("update:markers", updatedMarkers);
    },
    async getPlaceName(lat, lng) {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results[0]) {
          this.placeName = results[0].formatted_address;
        } else {
          this.placeName = "Unknown Location";
        }
        this.$emit("update:placeName", this.placeName);
      });
    },
  },
};
</script>
