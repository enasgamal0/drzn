<template>
  <div>
    <!-- :options="fromPage == 'show' ? mapOptions : ''" -->
    <GmapMap
      :center="mapCenter"
      :zoom="zoom"
      style="width: 100%; height: 600px"
      @click="addPoint"
    >
      <!-- Display points as draggable markers on the map -->
      <GmapMarker
        v-for="(point, index) in points"
        :key="index"
        :position="point"
        :draggable="fromPage !== 'show' ? true : false"
        @dragend="updatePointPosition(index, $event)"
        @click="removePoint(index)"
      />

      <!-- Draw a polygon to connect the points -->
      <GmapPolygon
        v-if="points.length > 1"
        :path="points"
        :options="polygonOptions"
      />
    </GmapMap>

    <!-- Save Button with Validation -->
    <button v-if="fromPage !== 'show'" @click="saveRegion" type="button">
      {{ $t("BUTTONS.save") }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    initialPoints: {
      type: Array,
      default: () => [],
    },

    fromPage: {
      type: String,
    },
  },

  watch: {
    initialPoints: {
      immediate: true,
      handler(newPoints) {
        // Update points from the prop if provided by parent
        this.points = [...newPoints];
        this.updateMapCenter();
      },
    },
  },

  data() {
    return {
      mapCenter: { lat: 24.7136, lng: 46.6753 }, // Center the map on Riyadh, for example
      zoom: 10,
      points: [], // Array to store the points (lat, lng) selected by the user
      polygonOptions: {
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      },

      mapOptions: {
        // Disable zoom controls
        zoomControl: false,
        // Disable pan/dragging
        draggable: false,
        // Disable mouse wheel zoom
        scrollwheel: false,
        // Disable double-click zoom
        disableDoubleClickZoom: true,
        // Disable map type control
        mapTypeControl: false,
        // Disable street view control
        streetViewControl: false,
        // Disable all default UI elements
        disableDefaultUI: true,
      },
      coordinates: [],
    };
  },
  methods: {
    // Add a point to the list when the map is clicked
    addPoint(event) {
      if (this.fromPage !== "show") {
        const { latLng } = event;
        this.points.push({ lat: latLng.lat(), lng: latLng.lng() });
        this.updateMapCenter();
      }
    },

    // Update point position when marker is dragged
    updatePointPosition(index, event) {
      const { latLng } = event;
      this.$set(this.points, index, { lat: latLng.lat(), lng: latLng.lng() });
      this.updateMapCenter();
    },

    // Remove point position when marker is dragged
    removePoint(index) {
      if (this.fromPage !== "show") {
        this.points.splice(index, 1);
        this.updateMapCenter();
      }
    },

    // Calculate and set the map center based on points
    updateMapCenter() {
      if (this.points.length === 0) return;

      const totalLat = this.points.reduce((sum, point) => sum + point.lat, 0);
      const totalLng = this.points.reduce((sum, point) => sum + point.lng, 0);

      this.mapCenter = {
        lat: totalLat / this.points.length,
        lng: totalLng / this.points.length,
      };
    },

    // Save the region with validation for minimum points
    saveRegion() {
      if (this.points.length < 4) {
        this.$message.error(this.$t("PLACEHOLDERS.select_points_for_region"));

        return;
      }

      this.coordinates = this.points.map((point) => ({
        lat: point.lat,
        lng: point.lng,
      }));

      this.$message.success(this.$t("PLACEHOLDERS.map_points_saved_success"));

      console.log("this.coordinates", this.coordinates);
    },
  },
};
</script>

<style scoped>
/* Optional styling */
button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #45a049;
}
</style>
