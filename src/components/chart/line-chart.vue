<template>
  <div ref="lineChart" style="width: 100%; height: 100%"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
let option = {};
let lineElement: echarts.ECharts | null = null;
const lineChart = ref(null);
const props = defineProps(["graph", "node"]);
onBeforeMount(() => {
  option = {
    tooltip: {
      trigger: "axis",
    },
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "0%",
      top: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    // dataZoom: [
    //   {
    //     type: 'inside'
    //   }
    // ],
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
});
onMounted(() => {
  lineElement = echarts.init(lineChart.value, null, {
    // renderer: "svg",
  });
  lineElement.setOption(option);
  props.graph?.on("node:resized", ({ node }: any) => {
    if (node.store.data.shape === "custom-vue-node") {
      resizeChart();
    }
  });
  props.node?.on("change:data", () => {
    // if (node.store.data.shape === "custom-vue-node") {
    //   resizeChart()
    // }
    lineElement?.setOption({
      title: {
        text: props.node?.data.label,
      },
    });
  });
});
onBeforeUnmount(() => {
  if (lineElement) {
    lineElement.dispose();
  }
});
const resizeChart = () => {
  lineElement?.resize();
};

defineExpose({
  resizeChart,
});
</script>
<style></style>
