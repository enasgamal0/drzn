<template>
    <div class="chart_card">
        <!-- START:: TITLE -->
        <h4 class="chart_title m-0">
            <slot name="chart_title"></slot>
        </h4>
        <!-- END:: TITLE -->

        <!-- START:: CHART DESCRIPTION -->
        <h4 class="chart_description">
            <slot name="chart_description"></slot>
        </h4>
        <!-- END:: CHART DESCRIPTION -->

        <!-- START:: CHART -->
        <apexchart
            type="donut"
            width="100%"
            height="310px"
            :options="donutChartOptions"
            :series="donutChartSeries"
        ></apexchart>
        <!-- END:: CHART -->
    </div>
</template>

<script>
export default {
    name: "DonutChart",

    props: ["ChartLabels", "ChartData"],

    data() {
        return {
            // START:: DONUT CHART DATA
            donutChartOptions: {
                dataLabels: {
                    enabled: false,
                },
                plotOptions: {
                    pie: {
                        customScale: 0.8,
                        donut: {
                            size: "80%",
                        },
                        offsetY: 20,
                    },
                    stroke: {
                        colors: undefined,
                    },
                },
                colors: [
                    "#4EF2A0",
                    "#29479A",
                    "#249AD5",
                    "#FF4560",
                    "#11324D",
                    "#7D5A50",
                    "#F76E11",
                ],
                labels: this.ChartLabels,
                legend: {
                    position: "left",
                    offsetY: 100,
                    offsetX: 30,
                },
            },

            donutChartSeries: this.ChartData,
            // END:: DONUT CHART DATA
        };
    },
};
</script>
