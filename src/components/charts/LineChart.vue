<template>
    <div class="chart_card">
        <!-- START:: TITLE -->
        <h4 class="chart_title m-0">
            <slot name="chart_title"></slot>
        </h4>
        <!-- END:: TITLE -->

        <!-- START:: CHART -->
        <apexchart
            type="line"
            height="380px"
            :options="lineChartOptions"
            :series="lineChartSeries"
        ></apexchart>
        <!-- END:: CHART -->
    </div>
</template>

<script>
export default {
    name: "LineChart",

    props: ["ChartLabels", "ChartData"],

    data() {
        return {
            // START:: AREA CHART DATA
            lineChartOptions: {
                chart: {
                    type: "line",
                    width: "100%",
                    zoom: {
                        enabled: false,
                    },
                    dropShadow: {
                        enabled: true,
                        top: 0,
                        left: 0,
                        blur: 4,
                        opacity: 0.4
                    },
                },
                stroke: {
                    curve: "smooth",
                    width: 2,
                },
                colors: ["#249AD5", "#FFBE75", "#7FFFD0"],
                markers: {
                    size: 6,
                    strokeWidth: 0,
                    hover: {
                        size: 9,
                    },
                },
                grid: {
                    show: true,
                    padding: {
                        bottom: 0,
                    },
                },
                xaxis: {
                    axisBorder: {
                        show: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                    labels: {
                        style: {
                            colors: "#78909c",
                        },
                    },
                },
                yaxis: {
                    axisBorder: {
                        show: true,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        style: {
                            colors: "#78909c",
                        },
                    },
                },
                labels: this.ChartLabels,
            },

            lineChartSeries: this.ChartData,
            // END:: AREA CHART DATA
        };
    },
};
</script>
