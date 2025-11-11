<template>
    <div class="map_wrapper">
        <GmapMap
            :center="{ lat: parseFloat(lat), lng: parseFloat(lng) }"
            :zoom="12"
            map-type-id="terrain"
            style="width: 100%; height: 400px"
        >
            <GmapMarker
                :position="{ lat: parseFloat(lat), lng: parseFloat(lng) }"
                :clickable="false"
                :draggable="false"
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
};
</script>

<style scoped>
.map_wrapper {
    width: 100%;
    height: 100%;
}
</style>
