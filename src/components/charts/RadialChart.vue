<template>
    <div class="chart_card">
        <!-- START:: TITLE -->
        <h4 class="chart_title m-0">
            <slot name="chart_title"></slot>
        </h4>
        <!-- END:: TITLE -->

        <!-- START:: CHART -->
        <apexchart
            type="radialBar"
            width="380px"
            height="350px"
            :options="radialChartOptions"
            :series="radialChartSeries"
        ></apexchart>
        <!-- END:: CHART -->
    </div>
</template>

<script>
export default {
    name: "RadialChart",

    props: ["ChartLabels", "ChartData"],

    data() {
        return {
            // START:: RADIAL BAR CHART DATA
            radialChartOptions: {
                plotOptions: {
                    radialBar: {
                        size: undefined,
                        inverseOrder: true,
                        hollow: {
                            margin: 10,
                            size: "50%",
                            background: "transparent",
                        },
                        track: {
                            show: false,
                        },
                        startAngle: -180,
                        endAngle: 180,
                    },
                },
                stroke: {
                    lineCap: "round",
                },
                colors: ["#79CAF2", "#EE79F2", "#29479A"],
                labels: this.ChartLabels,
                legend: {
                    show: true,
                    floating: true,
                    position: "right",
                    offsetX: 0,
                    offsetY: 200,
                },
            },

            radialChartSeries: this.ChartData,
            // END:: RADIAL BAR CHART DATA
        };
    },
};
</script>
